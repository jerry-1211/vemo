# 베이스 이미지 설정
FROM node:22

# 작업 디렉토리 생성
WORKDIR /usr/src/app/backend

# package.json과 package-lock.json 파일들을 먼저 복사
COPY package*.json ./

# 전역으로 @nestjs/cli 설치
RUN npm install -g @nestjs/cli

# 의존성 설치 (package-lock.json 기준으로 깔끔하게 설치)
RUN npm ci --no-cache

# 소스 코드 복사 (node_modules 덮어쓰기 방지)
COPY . .

# 권한 설정
RUN chmod +x node_modules/.bin/nest

# mute-stream 직접 설치 (중요)
RUN npm install mute-stream

# 빌드
RUN npx nest build

# 개발 모드로 실행
CMD ["npm", "run", "start:dev"]

# 포트 5050
EXPOSE 5050
