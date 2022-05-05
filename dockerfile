FROM node:lts-slim

WORKDIR /app
ADD app /app

# RUN apt update -y && \
#     apt install wget unzip -y && \
#     wget http://cdn.n1net4il.kr/dreamhack-ucc-beta/dreamboard-v2/chrome.zip -O chrome.zip && \
#     unzip chrome.zip && rm chrome.zip && \
#     chmod +x chrome/chrome
COPY ../내부-면접용-Web문제 ./
RUN apt install mysql-server
# RUN apt install -y gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget -y

RUN chown -R node:node /app

USER node
RUN npm install 

ENV PORT 3000
ENTRYPOINT [ "npm", "start" ]

EXPOSE 3000