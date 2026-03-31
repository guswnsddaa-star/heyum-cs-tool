# 혜윰, 송강당 CS 자동화

브랜드별 CS 응대 초안을 생성하는 내부용 도구입니다.

## 로컬 실행

1. `Node.js` 설치
2. 프로젝트 루트에 `.env` 준비
3. 아래 명령 실행

```powershell
node server.mjs
```

또는 `start-tool.bat`를 실행합니다.

## 필수 환경변수

`.env.example` 기준:

```env
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-5
HOST=0.0.0.0
PORT=8080
```

로컬 단독 사용이면 `HOST=127.0.0.1`로 바꿔도 됩니다.

## GitHub 업로드

1. GitHub 계정 생성
2. 새 repository 생성
3. 아래 명령 실행

```powershell
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <깃허브 저장소 주소>
git push -u origin main
```

`.env`는 `.gitignore`에 포함되어 있어 업로드되지 않습니다.

## Vercel 배포

이 프로젝트는 정적 파일과 `api/reply.mjs` Vercel Function 구조를 사용합니다.

1. Vercel 가입 후 GitHub 연결
2. GitHub 저장소 import
3. Vercel 프로젝트 환경변수 추가

필수 환경변수:

- `OPENAI_API_KEY`
- `OPENAI_MODEL`

4. Deploy 실행

배포 후에는 발급된 Vercel URL로 접속합니다.

## 보안 주의

- OpenAI API 키는 프론트엔드에 넣지 않습니다.
- `.env`는 GitHub에 올리지 않습니다.
- 운영 배포에서는 Vercel 환경변수만 사용합니다.
