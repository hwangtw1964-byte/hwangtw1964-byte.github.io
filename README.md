# 황교수의 서재

책과 영화로 세상을 읽는 황교수의 개인 페이지입니다. 순수 HTML/CSS/JS로 만들었고 빌드 도구가 필요 없습니다.

공개 주소: https://hwangtw1964-byte.github.io

## 구조

```
index.html     내용 (섹션: 소개, 강의, 독서, 영화, 연락처)
css/style.css  스타일 (상단 :root 변수에서 색상 변경)
js/main.js     책·영화·명언 데이터, 필터, 다크 모드, 모바일 메뉴, 스크롤 효과
assets/        프로필 이미지, 파비콘
```

## 내용 수정하기

- **책·영화·명언 추가**: `js/main.js` 맨 위의 `books`, `movies`, `quotes` 목록에 한 줄씩 추가합니다.
  새 장르를 쓰면 `index.html`의 필터 버튼(`data-filter`)도 함께 추가합니다.
- **소개·강의 문구**: `index.html`에서 직접 수정합니다.
- **프로필 사진**: `assets/`에 사진(예: `profile.jpg`)을 넣고 `index.html`의 `assets/profile.svg` 경로를 바꿉니다.
- **대표 색상**: `css/style.css`의 `--accent` 값을 바꿉니다.
- **연락처 폼**: 현재는 데모라 실제로 메일이 전송되지 않습니다.
  Formspree 같은 서비스를 연결하거나 이메일 링크로 바꿀 수 있습니다.

## 로컬에서 보기

`index.html`을 브라우저로 열거나, 이 폴더에서 아래 명령 실행 후 http://localhost:8000 접속:

```
python -m http.server 8000
```

## 배포

`main` 브랜치에 push하면 GitHub Pages가 1~2분 뒤 자동으로 반영합니다.

```
git add .
git commit -m "내용 수정"
git push
```
