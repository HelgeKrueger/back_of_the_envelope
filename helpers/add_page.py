from argparse import ArgumentParser
from jinja2 import Template


def main():
    parser = ArgumentParser()
    parser.add_argument("component_name")
    parser.add_argument("--datafile")
    args = parser.parse_args()

    with open("helpers/templates/webapp_page.j2") as f:
        template = Template(f.read())

    arguments = {"component_name": args.component_name}

    if args.datafile:
        arguments["datafile"] = args.datafile

    with open(f"webapp/src/pages/{args.component_name}.js", "w") as f:
        f.write(template.render(arguments))


if __name__ == "__main__":
    main()
