FROM node:6.11.2

RUN apt-get install -y git
RUN git clone https://github.com/mobielabs/mr-redis-proxy.git

WORKDIR mr-redis-proxy
RUN npm install
ENTRYPOINT ["node", "bin/www"]

EXPOSE 7979 3000