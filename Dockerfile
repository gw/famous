FROM nodesource/node:trusty

COPY . /src/
WORKDIR /src

# install your application's dependencies
RUN npm install

# replace this with your application's default port
EXPOSE 5000

# replace this with your startup command
CMD ["node", "index.js"]
