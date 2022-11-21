import random
import math
import pandas as pd

from .election import ElectionForecaster


def forecast_election(forecaster, sample_size=1000):
    in_parliament = {}
    government = {}

    def aggregate(result, dictionary):
        if result in dictionary:
            dictionary[result] += 100.0 / sample_size
        else:
            dictionary[result] = 100.0 / sample_size

    for x in forecaster.predict(sample_size):
        for p in x["parliament"].keys():
            aggregate(p, in_parliament)
        aggregate(x["government"], government)

    return {
        "Chance to be in parliament": sorted(
            [
                {"name": n, "percentage": round(p, 1)}
                for n, p in in_parliament.items()
                if p > 2
            ],
            key=lambda x: x["percentage"],
            reverse=True,
        ),
        "Probability of Government": sorted(
            [
                {"name": n, "percentage": round(p, 1)}
                for n, p in government.items()
                if p > 2
            ],
            key=lambda x: x["percentage"],
            reverse=True,
        ),
    }


def get_forecaster(region):

    sigma_polling = 0.044

    if region == "Hessen":
        url = "https://www.wahlrecht.de/umfragen/landtage/hessen.htm"
    elif region == "Bayern":
        url = "https://www.wahlrecht.de/umfragen/landtage/bayern.htm"
    elif region == "Bremen":
        url = "https://www.wahlrecht.de/umfragen/landtage/bremen.htm"
    elif region == "Berlin":
        url = "https://www.wahlrecht.de/umfragen/landtage/berlin.htm"
        sigma_polling = 0.04
    else:
        raise ("Unknown region")

    df = pd.read_html(url)[1]

    row = df.iloc[0]

    parties = ["CDU", "CSU", "SPD", "GRÜNE", "FDP", "LINKE", "FW", "AfD", "Sonstige"]

    polling_data = {p: int(row[p].split(" ")[0]) for p in parties if p in row}

    return ElectionForecaster(polling_data, sigma_polling=sigma_polling)
