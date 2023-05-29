import pandas as pd

# Ler o arquivo JSON modificado
df_modified = pd.read_json('DataBaseModified.json')

# Filtrar os dados para selecionar os que responderam "Sim" ou "Não" em MotoristadeApp
df_filtered = df_modified[df_modified['MotoristadeApp'].isin(['Sim', 'Não'])]

# Agrupar os dados por App_instalados e contar o número de ocorrências
table = df_filtered.groupby('App_instalados').size(
).reset_index(name='Número de Usuários')

# Imprimir a tabela no console
print(table)

# Filtrar os dados para selecionar aqueles que responderam "0" em App_instalados
df_filtered = df_modified[df_modified['App_instalados'] == 0]

# Contar a quantidade de respostas "Sim" e "Não" em MotoristadeApp para o filtro aplicado
count = df_filtered['MotoristadeApp'].value_counts()

# Imprimir a contagem no console
print(count)
