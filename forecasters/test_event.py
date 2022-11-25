from .event import Event, TossUpEvent


def test_event():
    e = Event({"one": 1, "two": 3})

    results = [e.sample() for _ in range(1000)]
    number_twos = sum(1 if x == "two" else 0 for x in results)

    assert number_twos > 700


def test_toss_up_event():
    e = TossUpEvent()

    results = [e.sample() for _ in range(1000)]
    number_yes = sum(1 if x == "yes" else 0 for x in results)

    assert number_yes > 450
    assert number_yes < 550
