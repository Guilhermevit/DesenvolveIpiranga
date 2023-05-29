import pandas as pd

df1 = pd.read_json('../GerarDataBase/db.json')
df2 = pd.read_json('../GerarDataBase/db2.json')

dbfinal = pd.concat([df1, df2], ignore_index=True)


dbfinal.to_json('DataBase.json', orient='records')
