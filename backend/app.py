from flask import Flask, request, jsonify, abort
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r'/*': {'origins': '*'}})


def read_data():
    try:
        with open('../backend/DataScience/DataBase.json', 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        return []


def write_data(data):
    with open('../backend/DataScience/DataBase.json', 'w') as f:
        json.dump(data, f)


@app.route('/submit', methods=['POST'])
def submit():
    data = request.json
    if 'CPF' not in data:
        abort(400, description="CPF is required")

    users_data = read_data()
# Verifique se o CPF já existe caso exista atualizar

    for user in users_data:
        if user['CPF'] == data['CPF']:
            user.update(data)
            break

# Se o CPF não existir, adicione um novo usuário

    else:
        users_data.append(data)

    write_data(users_data)

    return jsonify({"message": "Dados salvos com sucesso!"})

# Busca do usuario cadastrado


@app.route('/dados/<cpf>', methods=['GET'])
def get_user(cpf):
    users_data = read_data()

    user = next((item for item in users_data if item['CPF'] == cpf), None)

    if user is not None:
        return user
    else:
        abort(404, description="Usuário não encontrado")


if __name__ == '__main__':
    app.run(debug=True, port=8000)
