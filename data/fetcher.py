import requests
from bs4 import BeautifulSoup


def get_title(soup):
    titles = soup.find_all("title")
    if len(titles) == 0:
        return "No title"

    return titles[0].text


class Fetcher:
    def __init__(self):
        self.sources = []
        self.soup = None
        pass

    def add_data(self, name, url):
        resp = requests.get(url)
        text = resp.text

        soup = BeautifulSoup(text, "html.parser")

        self.sources.append({"name": name, "title": get_title(soup), "url": url})

        self.soup = soup

        return soup.find_all("body")[0]

    def get_main(self):
        mains = self.soup.find_all("main")

        if len(mains) != 1:
            return

        return mains[0]
