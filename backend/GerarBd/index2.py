import json
import random
import uuid


def gerar_cpfa_aleatorio():
    n1 = random.randint(1, 9)
    nums = [n1] + [random.randint(0, 9) for i in range(8)]
    d1 = 11 - (sum([nums[i]*(10-i) for i in range(9)]) % 11)
    if d1 >= 10:
        d1 = 0
    nums.append(d1)
    d2 = 11 - (sum([nums[i]*(11-i) for i in range(10)]) % 11)
    if d2 >= 10:
        d2 = 0
    nums.append(d2)
    return '{}{}{}.{}{}{}.{}{}{}-{}{}'.format(*nums)


def generate_data(size):
    data = []
    for i in range(size):
        appdrivre = "muito" if random.random() < 0.5 else "pouco"
        use = "facil" if appdrivre in ["muito", "pouco"] else "medio"
        better = "descontos" if use == "facil" else "facilidade"
        choice = "preço" if better == "descontos" else "qualidade"
        fuelweek = random.randint(
            5, 7) if choice == "preço" else random.randint(1, 5)
        literstime = random.randint(
            30, 45) if fuelweek >= 5 else random.randint(1, 30)
        data.append({
            'id': str(uuid.uuid4()),
            'CPF': gerar_cpfa_aleatorio(),
            'Abastece_week': str(fuelweek),
            'Litros_vez': str(literstime),
            'App_instalados': str(random.randint(0, 4)),
            'escolhaPosto': choice,
            'BeneficioPosto': 'cashback',
            'MelhoriasnoApp': better,
            'Avaliacao': use,
            'MotoristadeApp': appdrivre,
        })
    return data


sample_data = generate_data(5000)

with open('db.json', 'w') as outfile:
    json.dump({'data': sample_data}, outfile, indent=2)
