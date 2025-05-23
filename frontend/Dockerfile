FROM node:18-alpine
WORKDIR /

# 1) 의존성 설치를 위한 package.json 복사
COPY package.json ./
RUN npm install

# 2) 앱 소스 복사 (public, src 디렉토리 포함)
COPY public ./public
COPY src ./src

# 3) 개발용 dev server 실행
CMD ["npm", "start"]