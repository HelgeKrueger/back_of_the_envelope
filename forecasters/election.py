import random

from .statistics import choose_from_weights, beta_dist


class ElectionForecaster:
    def __init__(self, polling_data, samples=250, sigma_polling=0.044):
        self.polling_data = polling_data
        self.samples = samples
        self.parties = list(polling_data.keys())

        # self.sigma_polling = 0.044
        self.sigma_polling = sigma_polling
        # 360 -> 0.048
        # 120 -> 0.044
        # 60 -> 0.04
        # 30 -> 0.03
        # 10 -> 0.025
        # 0 -> 0.022

    def sample(self):
        return next(self.predict(1))

    def predict(self, n):
        for _ in range(n):
            result = self.election_result()
            parliament = self.result_to_parliament(result)
            coalitions = self.result_to_coalitions(parliament)
            possible_coalitions = [" ".join(c) for c in coalitions]

            government = self.predict_coalition(possible_coalitions)

            yield {
                "parliament": parliament,
                "possible coalitions": possible_coalitions,
                "government": government,
            }

    def election_result(self):
        party_weights = {
            p: beta_dist(self.polling_data[p] / 100.0, self.sigma_polling).rvs(1)[0]
            for p in self.parties
        }
        result = {p: 0 for p in self.parties}
        for _ in range(self.samples):
            p = choose_from_weights(party_weights)
            result[p] += 100.0 / self.samples

        return result

    def result_to_parliament(self, result):
        result2 = {p: r for p, r in result.items() if r > 5 and p != "Sonstige"}
        factor = 100 / sum(result2.values())

        return {p: r * factor for p, r in result2.items()}

    def result_to_coalitions(self, result):
        pip = sorted(result.keys(), key=lambda x: result[x], reverse=True)

        def get_coalitions(parties, result, needed=50):
            to_return = []
            for j, p in enumerate(parties):
                r = result[p]
                if r > needed:
                    to_return.append([p])
                else:
                    c = get_coalitions(parties[j + 1 :], result, needed=needed - r)
                    cc = [[p] + rc for rc in c]
                    to_return += cc

            return to_return

        coalitions = get_coalitions(pip, result)

        return coalitions

    def predict_coalition(self, coalitions):
        def weight_coalition(coalition):
            parties = coalition.split(" ")
            if len(parties) == 1:
                return 100

            base = 1 / len(parties) ** 2

            if coalition in [
                "SPD GRÜNE",
                "GRÜNE SPD",
                "SPD GRÜNE LINKE",
                "GRÜNE SPD LINKE",
                "CDU GRÜNE",
                "GRÜNE CDU",
                "CDU FDP",
                "SPD FDP",
                "SPD LINKE",
                "CSU FDP",
                "CSU FW",
            ]:
                base += 50

            if coalition in ["CSU GRÜNE"]:
                base += 10

            if coalition in ["SPD CDU"]:
                base += 5

            return base

        weights = {c: weight_coalition(c) for c in coalitions}

        return choose_from_weights(weights)
