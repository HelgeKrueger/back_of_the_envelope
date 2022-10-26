import random

from .statistics import choose_from_weights


class ElectionForecaster:
    def __init__(self, polling_data, samples=500):
        self.polling_data = polling_data
        self.samples = samples
        self.parties = list(polling_data.keys())

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
        poll_ranges = {}
        ss = 0
        for p in self.parties:
            value = self.polling_data[p]
            poll_ranges[p] = value + ss
            ss += value

        result = {p: 0 for p in self.parties}

        for _ in range(self.samples):
            r = random.random() * 100
            for p in self.parties:
                if r < poll_ranges[p]:
                    result[p] += 100.0 / self.samples
                    break

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
