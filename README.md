# Task_Management
TODO, DOING, DONE 보드 또는 새로운 보드에 카드로 일정 관리를 할 수 있는 대시보드

## 배포 사이트 
https://yourtaskdashboard.netlify.app

## Project-Tree
```
📦src
 ┣ 📂assets
 ┃ ┗ 📂svgs
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┣ 📜add-outline.svg
 ┃ ┃ ┣ 📜calendar.svg
 ┃ ┃ ┣ 📜edit.svg
 ┃ ┃ ┣ 📜filetext.svg
 ┃ ┃ ┣ 📜home.svg
 ┃ ┃ ┣ 📜image.svg
 ┃ ┃ ┣ 📜minus.svg
 ┃ ┃ ┣ 📜plus.svg
 ┃ ┃ ┣ 📜search.svg
 ┃ ┃ ┣ 📜x.svg
 ┃ ┃ ┗ 📜list.svg
 ┣ 📂components
 ┃ ┣ 📂BoardCard
 ┃ ┃ ┣ 📂utils
 ┃ ┃ ┃ ┣ 📜highlightWord.tsx
 ┃ ┃ ┣ 📜boardCard.module.scss
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂Modal
 ┃ ┃ ┣ 📜modal.module.scss
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┗ 📜ModalPortal.tsx
 ┃ ┃ ┣ 📂Category
 ┃ ┃ ┣ 📜category.module.scss
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📂Detail
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜detail.module.scss
 ┃ ┃ ┣ 📂Title
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜title.module.scss
 ┃ ┗ 📂NavBar
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜NavBar.module.scss
 ┣ 📂hooks
 ┃ ┣ 📜index.ts
 ┣ 📂routes
 ┃ ┣ 📂DashBoard
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂MakeTodo
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜makeTodo.module.scss
 ┃ ┃ ┣ 📂Boards
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜boards.module.scss
 ┃ ┃ ┣ 📂SearchInput
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜searchInput.module.scss
 ┃ ┣ 📜index.tsx
 ┃ ┗ 📜routes.module.scss
 ┣ 📂store
 ┃ ┣ 📜atoms.ts
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
 ┃ ┣ 📜global.scss
 ┃ ┗ 📜index.scss
 ┣ 📜index.tsx
 ┣ 📜react-app-env.d.ts
 ┗ 📜reportWebVitals.ts
```

## 화면 기능 예시
**확대를 위해 화면 일부만 찍어서 영상에서는 테스크 및 확인 모달이 한 쪽으로 치우쳐 보입니다.**

### 보드 생성

보드 추가 네모 버튼 클릭 -> 생성 모달 -> 보드 이름  -> 추가 버튼 클릭 -> 새 보드 

![ezgif com-gif-maker (32)](https://user-images.githubusercontent.com/67466789/206710785-ffc84f3b-f6f6-44b2-9bb7-6f82f3f08209.gif)

- 5개 이상의 보드 생성 시 `가로 스크롤`이 생깁니다. 


### 보드 수정

- 보드 햄버거 아이콘 클릭 -> 보드 수정 클릭 -> 수정 모달 -> 보드 이름 수정 -> 수정 버튼 클릭 -> 보드 수정 


### 보드 삭제

- 보드 햄버거 아이콘 클릭 -> 보드 삭제 클릭 -> 보드 삭제

![ezgif com-gif-maker (27)](https://user-images.githubusercontent.com/67466789/206704993-f816c8f0-a618-4030-8222-a82970e0f062.gif)


### 테스크 생성

플러스 버튼 클릭 -> 모달 -> title, 태그, 내용, 날짜, 사진 선택 후 Create Task -> 카드 생성

![ezgif com-gif-maker (29)](https://user-images.githubusercontent.com/67466789/206707611-5bd32950-8dd1-4b8b-b86e-ca0a8910a16a.gif)

- 중복 카테고리 작성 시 중복된 카테고리 항목이 `미적용` 됩니다.

- 카테고리 추가 버튼을 누르면 input 창이 나타나며, 추가한 카테고리를 클릭하면 `삭제`가 됩니다. 

- 제목이나 카테고리는 필수로 작성해야 하므로 미작성 시 테스크가 추가가 되지 않으며, `오류 메세지`를 띄워줍니다. 

- 테스크가 보드 크기를 넘을 시 `스크롤`이 생깁니다. 


### 테스크 Drag & Drop

같은 보드 내 카드 위치 이동 & 다른 보드로의 카드 이동

![ezgif com-gif-maker (33)](https://user-images.githubusercontent.com/67466789/206711882-6f1c7b40-013a-4cb4-a63c-4fb5e0f16b0e.gif)

- 같은 보드 내에서의 테스크 끼리 Drag & Drop을 통해 `중요도에 따라 순서`를 바꿀 수 있습니다. 

- Drag & Drop을 통해 다른 보드로의 이동이 가능하여 `테스크 process 상태`를 바꿔줄 수 있다. 


### 테스크 수정

연필 아이콘 클릭 -> 수정 버튼 클릭 -> 모달 -> title, 태그, 내용, 날짜, 사진 수정 후 Edit Task -> 카드 수정

![ezgif com-gif-maker (30)](https://user-images.githubusercontent.com/67466789/206709827-c30bd913-e85a-4366-93e9-4de6e569ff7e.gif)


### 테스크 삭제

연필 아이콘 클릭 -> 삭제 버튼 클릭 -> 모달 -> 확인 버튼 클릭 -> 카드 삭제

![ezgif com-gif-maker (31)](https://user-images.githubusercontent.com/67466789/206710133-492ab880-cd74-4eaf-8133-ce3c97a7e8aa.gif)


### 테스크 카드 필터링

**제목, 카테고리, 내용 필터링**: 검색 필터링 드롭다운 제목, 카테고리, 내용 클릭 후 단어 또는 문장 입력 

![ezgif com-gif-maker (35)](https://user-images.githubusercontent.com/67466789/206713475-6dca59cc-2d7e-4261-8a04-a75fba6c5d06.gif)

**전체 필터링**: 검색 필터링 클릭 x -> 단어 또는 문장 입력

![ezgif com-gif-maker (36)](https://user-images.githubusercontent.com/67466789/206714093-448379ec-9b7a-462a-afa6-9bcf7560069d.gif)

- 검색어를 입력하면 키워드가 있는 테스크 카드만 필터링되어 보여집니다.

- 키워드는 `노란색으로 하이라이트` 되어 보여집니다. 

- input 창의 x 버튼을 누르면 input 내의 키워드 값이 지워지며, 필터링이 초기화 됩니다.

*highlightWords, filtercontent utils 코드

## 모바일 화면
### 보드 생성

프로젝트 메뉴 클릭 -> 보드 생성 클릭 -> 생성 모달 -> 보드 이름 입력 -> 추가 버튼 클릭 -> 새 보드 생성



- 4개 이상의 보드 생성 시 스크롤이 생깁니다. 

### 보드 수정

프로젝트 메뉴 클릭 -> 보드 수정 클릭 -> 수정 모달 -> 보드 이름 수정 -> 수정 버튼 클릭 -> 보드 수정 



### 보드 삭제

프로젝트 메뉴 클릭 -> 보드 삭제 클릭 -> 보드 삭제



### 테스크 생성

프로젝트 메뉴 클릭 -> 모달 -> title, 태그, 내용, 날짜, 사진 선택 후 Create Task -> 카드 생성

### 테스크 Drag & Drop

드래그를 통해 같은 보드 내 카드 위치 이동이 가능합니다. 

### 테스크 수정

연필 아이콘 클릭 -> 수정 버튼 클릭 -> 모달 -> title, 태그, 내용, 날짜, 사진 수정 후 Edit Task -> 카드 수정

### 테스크 삭제

연필 아이콘 클릭 -> 삭제 버튼 클릭 -> 모달 -> 확인 버튼 클릭 -> 카드 삭제

### 테스크 보드 이동

연필 아이콘 클릭 -> 카드 이동 버튼 클릭 -> 보드 선택 -> 카드 이동

## 구현한 방법과 이유, 어려웠던 점

### 네비게이션 바

- 활성화 되는 탭의 색상에 변화를 주기 위해 `navLink`를 사용하여 구현하였다. 



### 보드에 테스크 추가

- `react-date-picker` 를 이용하여 날짜 데이터를 테스크 생성 시 활용하였다.

- input의 `file type`을 사용하여 image를 불러오고 `FileReader 객체`를 이용하여 image의 url을 불러와 활용하였다. 

- 추가된 task는 recoil의 todoList Atom에 저장하여 `전역적으로 관리`하였다. 



### 테스크 카드 수정

- 모달에서 테스크 추가 기능과 테스크 수정 기능을 동시에 담당해야 하기 때문에 구현하면서 시간을 많이 쏟은 것 같다. 이에 수정 버튼을 누를 시에는 누른 테스크의 정보가 모달로 
넘어가게 되면서 첫 마운트 시 데이터가 모달 창 안으로 들어갈 수 있게 구현하였다. 



### 새로운 보드 생성 

- 보드 생성 시 process 배열과 todoList의 key 속성 값으로 새로운 process를 추가해주는 부분에서 어려움을 겪었다. 

- react-date-picker에서 받은 데이터를 `dayjs를 이용해 포맷팅`하여 날짜를 띄워주었다. 



### 드래그 앤 드랍

- `react-beutiful-dnd`를 이용하여 드래그 앤 드랍을 구현하였다.

- 같은 process 보드 내에서의 이동은 구현이 쉬웠는데 다른 보드에서 다른 보드로 이동할 때 구현이 어려웠던 것 같다. 

- 다른 보드로 이동 시 기존 테스크의 process 보드 정보도 함께 바꾸어 테스크 수정 시 기존에 있던 장소로 이동하지 않도록 구현하였다. 



### 테스크 키워드 서치

- 해당 키워드를 포함하는 테스크 제목이나 카테고리를 찾는 정규표현식을 사용하였다. 

- 찾은 키워드의 경우 `mark 태그를 이용해 감싸주었고`, 이를 제대로 파싱하기 위해 html-react-parse 라이브러리를 사용하였다. 

- 해시태그를 이용할 때는 카테고리 영역에서만 키워드 검색이 되게하기 위해 데이터를 따로 처리해 주었다. 


## Tech & Libraries

**라우팅**
- react-router-dom

**스타일**
- scss
- css module
- classnames

**중앙 저장소**
- recoil
- recoil-persist(브라우저 localStorage)

**코딩 컨벤션**
- eslint
- prettier
- stylelint

**기타**
- html-react-parser: `dangerouslySetInnerHTML`의 안전한 대체제
- react-beautiful-dnd: 드래그 앤 드롭 구현
- react-datepicker: 날짜 선택 가능 달력 모달 라이브러리
- dayjs: 날짜 포맷팅
