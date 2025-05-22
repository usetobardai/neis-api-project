FROM python:3.11-slim

# 작업 디렉토리
WORKDIR /app

# 의존성만 먼저 복사·설치 (빌드 캐시 활용)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 코드 복사
COPY . .

# flask run을 써도 되지만, Gunicorn으로 띄우면 조금 더 안정적입니다.
# 환경변수 FLASK_APP은 docker-compose.yml에서 지정
CMD ["gunicorn", "-b", "0.0.0.0:5000", "app:app"]
