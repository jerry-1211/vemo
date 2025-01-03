# 베이스 이미지 설정
FROM node:22

# 작업 디렉토리 생성
WORKDIR /usr/src/app/backend

# package.json 파일들을 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 소스 코드 복사
COPY . .

# 빌드
RUN npm run build

# 개발 모드로 실행
CMD ["npm", "run", "start:dev"]

# 포트 노출
EXPOSE 5050
