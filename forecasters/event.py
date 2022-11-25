from .statistics import choose_from_weights


class Event:
    def __init__(self, outcomes):
        self.outcomes = outcomes

    def sample(self):
        return choose_from_weights(self.outcomes)


class TossUpEvent(Event):
    def __init__(self):
        super().__init__({"yes": 1, "no": 1})


class LikelyEvent(Event):
    def __init__(self):
        super().__init__({"yes": 4, "no": 1})


class UnLikelyEvent(Event):
    def __init__(self):
        super().__init__({"yes": 1, "no": 4})


class ProbableEvent(Event):
    def __init__(self):
        super().__init__({"yes": 19, "no": 1})


class UnProbableEvent(Event):
    def __init__(self):
        super().__init__({"yes": 1, "no": 19})
