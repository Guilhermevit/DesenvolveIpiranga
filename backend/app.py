from flask import Flask, request, jsonify, send_file, abort
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r'/*': {'origins': '*'}})


@app.route('/submit', methods=['POST'])
def submit():
    data = request.json

    # Abra o arquivo data.json e leia o conteúdo
    with open('data.json', 'r') as f:
        users_data = json.load(f)

    # Verifique se o CPF já existe
    cpf_exists = False
    for user in users_data:
        if user['CPF'] == data['CPF']:
            cpf_exists = True
            # Atualiza as informações do usuário existente
            user.update(data)
            break

    # Se o CPF não existir, adicione um novo usuário
    if not cpf_exists:
        users_data.append(data)

    # Salve as alterações no arquivo data.json
    with open('data.json', 'w') as f:
        json.dump(users_data, f)

    return jsonify({"message": "Dados salvos com sucesso!"})

# Busca do usuario cadastrado


@app.route('/dados/<cpf>', methods=['GET'])
def get_user(cpf):
    with open('data.json', 'r') as f:
        data = json.load(f)

    user = next((item for item in data if item['CPF'] == cpf), None)

    if user is not None:
        return user
    else:
        abort(404, description="Usuário não encontrado")


if __name__ == '__main__':
    app.run(debug=True)
