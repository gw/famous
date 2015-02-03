FROM ubuntu

MAINTAINER Grant Wu

RUN apt-get update

RUN apt-get install -y build-essential python-dev python-pip

ADD . /src

WORKDIR /src

RUN pip install -r /src/requirements.txt

EXPOSE 8000

CMD ["gunicorn", "-b 0.0.0.0", "app:app"]
