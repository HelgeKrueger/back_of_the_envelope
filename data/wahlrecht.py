from datetime import datetime


def parse_date(s):
    try:
        return datetime.strptime(s, "%d.%m.%Y").date()
    except:
        return None


def parse_poll_value(poll_string):
    try:
        return float(poll_string.split(" ")[0].replace(r",", "."))
    except:
        return None
