import random


class ElectionForecaster:
    def __init__(self, polling_data, samples=500):
        self.polling_data = polling_data
        self.samples = samples
        self.parties = list(polling_data.keys())

    def predict(self, n):
        for _ in range(n):
            result = self.election_result()
            yield self.result_to_parliament(result)

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
