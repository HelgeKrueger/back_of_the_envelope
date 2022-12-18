import requests
import time

import json
from datetime import date


def url_for_server(server):
    return f"https://{server}/api/v1/trends/tags"


def trends(server):
    response = requests.get(url_for_server(server))
    return response.json()


servers = [
    "mastodon.online",
    "mas.to",
    "mstdn.social",
    "mastodon.social",
    "urbanists.social",
    "mastodon.green",
    "fosstodon.org",
    "mastodon.lol",
    "climatejustice.social",
    "ravenation.club",
    "gensokyo.social",
    "mastodon.art",
    "hostux.social",
    "meow.social",
    "tech.lgbt",
    # 'forall.social',
    "cyberplace.social",
]

data = {}

for s in servers:
    start_time = time.time()
    data[s] = trends(s)
    print(f"Done with server {s} in {time.time() - start_time}")


tag_to_server = {}

for server_name, tags in data.items():
    for t in tags:
        tag = t["name"].lower()
        uses = t["history"][0]["uses"]
        if tag not in tag_to_server:
            tag_to_server[tag] = []

        tag_to_server[tag].append({"server": server_name, "uses": uses})

total_uses = {
    tag: sum([int(x["uses"]) for x in val]) for tag, val in tag_to_server.items()
}

output = sorted(
    [{"tag": a, "uses": b} for a, b in total_uses.items() if b > 20],
    key=lambda x: x["uses"],
    reverse=True,
)

filename = "webapp/public/data/mastodon-trending-tags.json"

with open(filename, "r") as f:
    current_data = json.load(f)

current_data.append({"date": date.today().isoformat(), "data": output})


with open(filename, "w") as f:
    json.dump(current_data, f)
