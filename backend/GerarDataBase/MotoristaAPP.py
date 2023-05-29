import json
import random
import uuid


def gerar_cpfa_aleatorio():
    n1 = random.randint(1, 9)
    n2 = random.randint(0, 9)
    n3 = random.randint(0, 9)
    n4 = random.randint(0, 9)
    n5 = random.randint(0, 9)
    n6 = random.randint(0, 9)
    n7 = random.randint(0, 9)
    n8 = random.randint(0, 9)
    n9 = random.randint(0, 9)

    d1 = (n1*10 + n2*9 + n3*8 + n4*7 + n5*6 + n6*5 + n7*4 + n8*3 + n9*2) % 11
    if d1 < 2:
        d1 = 0
    else:
        d1 = 11 - d1

    d2 = (n1*11 + n2*10 + n3*9 + n4*8 + n5*7 +
          n6*6 + n7*5 + n8*4 + n9*3 + d1*2) % 11
    if d2 < 2:
        d2 = 0
    else:
        d2 = 11 - d2

    return "{}{}{}.{}{}{}.{}{}{}-{}{}".format(n1, n2, n3, n4, n5, n6, n7, n8, n9, d1, d2)


data = []

for i in range(500):
    appdrivre = "muito" if random.random() < 0.5 else "pouco"
    use = "facil" if appdrivre in ["muito", "pouco"] else "medio"
    better = "descontos" if use == "facil" else "facilidade"
    choice = "preço" if better == "descontos" else "qualidade"
    fuelweek = random.randint(
        4, 8) if choice == "preço" else random.randint(1, 5)
    literstime = random.randint(
        30, 45) if fuelweek >= 5 else random.randint(1, 30)
    data.append({
        'id': str(uuid.uuid4()),
        'CPF': gerar_cpfa_aleatorio(),
        'Abastece_week': str(fuelweek),
        'Litros_vez': str(literstime),
        'App_instalados': str(random.randint(0, 4)),
        'escolhaPosto': random.choice(["preço", "localização", "qualidade", "descontos"]),
        'BeneficioPosto': random.choice(["combustivel", "conveniencia", "cashback"]),
        'MelhoriasnoApp': random.choice(["descontos", "facilidade", "promoções"]),
        'Avaliacao': random.choice(["facil", "medio", "difícil"]),
        'MotoristadeApp': appdrivre,
    })


with open('db.json', 'w') as f:
    json.dump(data, f, indent=2)

print("Data written to file")
