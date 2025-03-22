# Mono Hub

Next.js 기반 웹 서비스를 빠르게 개발하기 위한 모노레포입니다.

## 시작하기

새로운 웹 서비스 생성:
```bash
bun run create-app
```

개발 서버 실행:
```bash
bun run dev
```

빌드:
```bash
bun run build
```

## 디렉토리 구조

```
/apps/*        # 각 웹 서비스
/packages/*    # 공유 컴포넌트, 설정
/templates/*   # 새 앱 생성용 템플릿
```

## 기술 스택

- TypeScript
- Next.js (Pages Router)
- TailwindCSS
- Turborepo
- ESLint + Prettier