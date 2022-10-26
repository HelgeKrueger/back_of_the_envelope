import random


def choose_from_weights(weights_dict):
    keys = list(weights_dict.keys())
    total = sum(weights_dict[k] for k in keys)
    x = random.random() * total
    y = 0
    for k in keys:
        y += weights_dict[k]
        if x < y:
            return k
