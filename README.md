# Task_Management

## Project-Tree
```
📦src
 ┣ 📂assets
 ┃ ┗ 📂svgs
 ┃ ┃ ┣ 📜bannerImage.svg
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┣ 📜logo.svg
 ┃ ┃ ┗ 📜search.svg
 ┣ 📂components
 ┃ ┣ 📂Banner
 ┃ ┃ ┣ 📜Banner.module.scss
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂Footer
 ┃ ┃ ┣ 📜Footer.module.scss
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂Header
 ┃ ┃ ┣ 📜Header.module.scss
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂KeywordRecommendItem
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜KeywordRecommendItem.module.scss
 ┃ ┣ 📂KeywordRecommendList
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜KeywordRecommendList.module.scss
 ┃ ┗ 📂SearchBar
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜SearchBar.module.scss
 ┣ 📂hooks
 ┃ ┣ 📜index.ts
 ┃ ┗ 📜useQueryDebounce.ts
 ┣ 📂routes
 ┃ ┣ 📂SearchPage
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜SearchPage.module.scss
 ┃ ┣ 📂SearchResultPage
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜SearchResultPage.module.scss
 ┃ ┣ 📜index.tsx
 ┃ ┗ 📜Routes.module.scss
 ┣ 📂services
 ┃ ┗ 📜search.ts
 ┣ 📂store
 ┃ ┣ 📂slices
 ┃ ┃ ┣ 📜searchInputSlice.ts
 ┃ ┃ ┗ 📜searchSlice.ts
 ┃ ┗ 📜store.ts
 ┣ 📂styles
 ┃ ┣ 📂base
 ┃ ┃ ┣ 📜_fonts.scss
 ┃ ┃ ┣ 📜_more.scss
 ┃ ┃ ┗ 📜_reset.scss
 ┃ ┣ 📂constants
 ┃ ┃ ┣ 📜_colors.scss
 ┃ ┃ ┣ 📜_levels.scss
 ┃ ┃ ┗ 📜_sizes.scss
 ┃ ┣ 📜index.js
 ┃ ┗ 📜index.scss
 ┣ 📂types
 ┃ ┗ 📜search.d.ts
 ┣ 📂utils
 ┃ ┗ 📜fuzzySearch.ts
 ┣ 📜index.tsx
 ┣ 📜react-app-env.d.ts
 ┗ 📜reportWebVitals.ts
```

## 화면 기능 예시

### 네비게이션 바

![ezgif com-gif-maker](https://user-images.githubusercontent.com/67466789/172029489-058b46f3-77c5-4ac4-9f20-9d69ab104a3d.gif)

### 보드에 테스크 추가

![ezgif com-gif-maker (3)](https://user-images.githubusercontent.com/67466789/172029945-f1d46bc6-7f90-4877-873a-fd0ade07140f.gif)

### 드래그 앤 드랍

![ezgif com-gif-maker (8)](https://user-images.githubusercontent.com/67466789/172030341-11143681-33ab-48a7-88f2-bd3afcacb64f.gif)


### 테스크 카드 수정

![ezgif com-gif-maker (5)](https://user-images.githubusercontent.com/67466789/172030182-d8e9b912-2416-41d4-bf81-936b4971344a.gif)


### 테스크 카드 삭제

![ezgif com-gif-maker (6)](https://user-images.githubusercontent.com/67466789/172030186-12dce2cd-60c2-4b5c-a75e-c3388e2ba919.gif)

### 새로운 보드 생성

![ezgif com-gif-maker (7)](https://user-images.githubusercontent.com/67466789/172030293-823221d3-dfb8-4aff-a3ac-9e7ca698692c.gif)

### 테스크 키워드 서치

![ezgif com-gif-maker (9)](https://user-images.githubusercontent.com/67466789/172030440-4c762e3e-8122-429b-ba3e-12a6961ee45a.gif)

## 구현한 방법과 이유, 어려웠던 점

## Tech & Libraries
서버 및 API 통신 관련
- axios
- cors
- express
- react-query

라우팅
- react-router-dom

스타일
- scss
- css module
- classnames

중앙 저장소
- react-redux
- redux toolkit

코딩 컨벤션
- eslint
- prettier
- stylelint

기타
- html-react-parser: `dangerouslySetInnerHTML`의 안전한 대체제
- lodash.escaperegexp: 퍼지 문자열 검색을 위한 정규 표현식
