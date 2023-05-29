import pandas as pd

# Ler o arquivo JSON combinado
df_combined = pd.read_json('DataBase.json')

# Pergunta 09

# Substituir os valores "muito" e "pouco" por "Sim" na coluna "MotoristadeApp"
df_combined['MotoristadeApp'] = df_combined['MotoristadeApp'].replace(
    ['muito', 'pouco'], 'Sim')
# Substituir o valor "nao" por "Não" na coluna "MotoristadeApp"
df_combined['MotoristadeApp'] = df_combined['MotoristadeApp'].replace(
    'nao', 'Não')


# Pergunta 08

# Substituir os valores "facil", "medio" e "difícil" por "Fácil", "Médio" e "Difícil" na coluna "Avaliacao"
df_combined['Avaliacao'] = df_combined['Avaliacao'].replace(
    {'facil': 'Fácil', 'medio': 'Médio', 'difícil': 'Difícil'})

# Pergunta 07

# Substituir os valores "descontos", "facilidade" e "promoções" por "Descontos", "Facilidade" e "Promoções" na coluna "MelhoriasnoApp"
df_combined['MelhoriasnoApp'] = df_combined['MelhoriasnoApp'].replace(
    {'descontos': 'Descontos', 'facilidade': 'Facilidade', 'promoções': 'Promoções'})

# Pergunta 06
df_combined['BeneficioPosto'] = df_combined['BeneficioPosto'].replace(
    {'combustivel': 'Combustível', 'conveniencia': 'Conveniência', 'cashback': 'Cash-Back'})

# Pergunta 05
df_combined['escolhaPosto'] = df_combined['escolhaPosto'].replace(
    {'preço': 'Preço', 'localização': 'Localização', 'qualidade': 'Qualidade', 'descontos': 'Descontos'})


# Salvar o DataFrame modificado em um novo arquivo JSON
df_combined.to_json('DataBaseModified.json', orient='records')
