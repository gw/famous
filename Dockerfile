FROM ubuntu

MAINTAINER Grant Wu

RUN apt-get update

RUN apt-get install -y python python-pip

ADD . /src

RUN pip install -r /src/requirements.txt

WORKDIR /src

EXPOSE 8000

CMD ["gunicorn", "app:app"]
