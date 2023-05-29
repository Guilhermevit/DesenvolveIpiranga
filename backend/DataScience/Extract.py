import pandas as pd

# Ler o arquivo JSON modificado
df_modified = pd.read_json('DataBaseModified.json')

# Filtrar os dados com resposta "Sim" na coluna "MotoristadeApp" e "0" na coluna "App_instalados"
df_extracted = df_modified[(df_modified['MotoristadeApp'] == 'Sim') & (
    df_modified['App_instalados'] == 0)]


# Obter o número de usuários extraídos
num_extracted_users = len(df_extracted)

# Imprimir o resultado no console
print(f"\nO número de usuários extraídos é: {num_extracted_users}")

# Obter o número total de usuários que responderam "Sim" na coluna "MotoristadeApp"
num_total_users_sim = len(df_modified[df_modified['MotoristadeApp'] == 'Sim'])

# Calcular a porcentagem de usuários extraídos em relação ao total de usuários "Sim"
percentage_extracted_users = (num_extracted_users / num_total_users_sim) * 100

# Imprimir o resultado no console
print(
    f"\n{percentage_extracted_users:.2f}% dos usuários que foram extraídos não possuem nenhum aplicativo de desconto.")


# Salvar os dados extraídos em um novo arquivo JSON
df_extracted.to_json('extractnoApp.json', orient='records')
