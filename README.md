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

![ezgif com-gif-maker (10)](https://user-images.githubusercontent.com/67466789/172030480-9efe3684-5d40-4779-b5c8-1a90b11be26d.gif)

- TASK MANAGE 탭을 클릭하면 테스크를 관리할 수 있는 페이지로 이동하고, DASHBOARD 탭을 클릭하면 데시보드 페이지로 이동한다.

- `활성화 되는 탭`의 색상이 변화한다. 


### 보드에 테스크 추가

![ezgif com-gif-maker (3)](https://user-images.githubusercontent.com/67466789/172029945-f1d46bc6-7f90-4877-873a-fd0ade07140f.gif)

- 보드 특정 process 영역의 플러스 버튼을 클릭하면 테스크를 추가할 수 있는 모달이 열리게 된다. 

- 테스크 제목, 카테고리, 날짜, 이미지, 설명을 추가할 수 있도록 구현하였다.

- 제목이나 카테고리는 필수로 작성해야 하므로 미작성 시 테스크가 추가가 되지 않으며, `오류 메세지`를 띄워준다.

- 카테고리 추가 버튼을 누르면 input 창이 나타나며, 추가한 카테고리를 클릭하면 삭제가 된다. 


### 테스크 카드 수정

![ezgif com-gif-maker (5)](https://user-images.githubusercontent.com/67466789/172030182-d8e9b912-2416-41d4-bf81-936b4971344a.gif)

- 테스크의 수정 버튼 클릭 시 모달창이 띄워지며 클릭한 테스크 기존의 데이터 수정을 할 수 있다.  


### 테스크 카드 삭제

![ezgif com-gif-maker (6)](https://user-images.githubusercontent.com/67466789/172030186-12dce2cd-60c2-4b5c-a75e-c3388e2ba919.gif)

- 데스크의 삭제 버튼 클릭 시 해당 테스크의 삭제가 이루어 진다. 

- 배경화면을 클릭하면 수정 및 삭제 설정 박스가 닫히게 된다.  


### 새로운 보드 생성

![ezgif com-gif-maker (7)](https://user-images.githubusercontent.com/67466789/172030293-823221d3-dfb8-4aff-a3ac-9e7ca698692c.gif)

- DONE process 보드 옆에 있는 플러스 버튼을 클릭하면 새로운 process 보드를 생성할 수 있는 input창이 나타나게 된다. 

- 해당 input 창에 새 process 이름을 입력 후 엔터를 하면 `새 이름의 보드가 생성`이 되며 앞의 TODO, DOING, DONE 보드들과 같은 기능을 한다.

- 새로 생성한 보드 옆의 마이너스 버튼을 클릭하면 해당 보드가 삭제 된다. 

> **하나의 보드만 생성이 가능한 이유**
> 
>   테스크 관리 페이지이기 때문에 TODO, DOING, DONE 이렇게 크게 세 가지 종류의 process 보드가 default로 생성 되어있다. 
>   
>   테스크 관련 카테고리는 테스크 생성 시 카테고리 생성 부분에서 추가 및 수정 할 수 있으며, 키워드 서치로 같은 카테고리끼리 찾을 수 있다. 
>   
>   따라서 혹시 모를 사용자의 needs에 대비해 최소한의 보드 생성 기능을 구현하였다. 
>   
>   물론 브라우저 화면 크기에 의한 제약도 없진 않았다. 


### 드래그 앤 드랍

![ezgif com-gif-maker (8)](https://user-images.githubusercontent.com/67466789/172030341-11143681-33ab-48a7-88f2-bd3afcacb64f.gif)

- 같은 보드 내에서의 테스크 끼리 드래그 앤 드랍을 통해 `중요도에 따라` 순서를 바꿀 수 있다. 

- 드래그 앤 드랍을 통해 다른 보드로의 이동이 가능하여 테스크 process 상태를 `직관적으로` 바꿔줄 수 있다. 

- 테스크가 보드 크기를 넘을 시 `스크롤`이 생긴다. 


### 테스크 키워드 서치

![ezgif com-gif-maker (9)](https://user-images.githubusercontent.com/67466789/172030440-4c762e3e-8122-429b-ba3e-12a6961ee45a.gif)

- 키워드 서치 input 창에 키워드 검색 시 `사용자가 생성한 테스크 제목 및 카테고리 안에서 드롭다운으로` 키워드가 찾아지게 된다. 

- 해시태그를 이용하여 키워드를 입력하면 테스크 제목을 제외한 카테고리 안에서만 키워드가 검색 된다. 

- 해시태그를 붙이지 않은 키워드의 경우엔 해당 키워드가 포함된 테스크 제목과 카테고리 모두에서 검색 된다.

- 배경화면을 클릭하면 드롭 다운 박스가 닫히게 된다. 

<img src="https://user-images.githubusercontent.com/67466789/172031876-888b56cd-b9e7-4e3e-be54-45ff6f9ed724.png" width="300px" height="500px"></img>


- 검색된 키워드는 `노란색 하이라이트 표시`로 찾아지게 된다. 

- input 창의 x 버튼을 누르면 input 내의 키워드 값이 지워지며, 검색되었던 하이라이트 또한 사라지게 된다. 


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



## 구현 예정 기능

- 키워드 입력 시 검색된 해당 키워드를 포함한 테스크 카드만 보여지기

- 테스크 생성 시 시간 입력하여 알림 기능

- 데시보드 페이지

- 다크 모드



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
