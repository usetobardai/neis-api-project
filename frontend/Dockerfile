FROM node:18-alpine

WORKDIR /app

# package 파일 복사 + 종속성 설치
COPY package.json ./
RUN npm install

# 코드 복사
COPY . .

# 개발용 dev server 실행
CMD ["npm", "start"]