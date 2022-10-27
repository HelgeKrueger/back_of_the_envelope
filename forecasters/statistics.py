import random
from scipy.stats import beta


def choose_from_weights(weights_dict):
    keys = list(weights_dict.keys())
    total = sum(weights_dict[k] for k in keys)
    x = random.random() * total
    y = 0
    for k in keys:
        y += weights_dict[k]
        if x < y:
            return k


def beta_dist(mean, std):
    a = mean * (mean**2 / std**2 * (1 / mean - 1) - 1)
    b = a * (1 / mean - 1)

    return beta(a, b)
