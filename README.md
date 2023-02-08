# :pushpin: task dashboard
보드에 일정 관리와 필터링을 할 수 있는 카드형 대시보드

## 1. 배포 사이트 
https://yourtaskdashboard.netlify.app

## 2. 제작 기간 & 참여 인원
- 2022.6.2 - 6.7(+ 리팩토링 10.20-)
- 개인 프로젝트

## 3. 사용 기술 및 라이브러리
- react v18
- typescript
- **라우팅**
  - react-router-dom
- **스타일**
  - scss
  - css module
  - classnames
- **중앙 저장소**
  - recoil
  - recoil-persist(브라우저 localStorage)
- **코딩 컨벤션**
  - eslint
  - prettier
  - stylelint
- **기타**
  - html-react-parser: `dangerouslySetInnerHTML`의 안전한 대체제
  - react-beautiful-dnd: 드래그 앤 드롭 구현
  - react-datepicker: 날짜 선택 가능 달력 모달 라이브러리
  - dayjs: 날짜 포맷팅

## 4. 화면 기능 예시

**확대를 위해 화면 일부만 찍어서 영상에서는 테스크 및 확인 모달이 한 쪽으로 치우쳐 보입니다.**

### 4.1. 보드 생성

보드 추가 네모 버튼 클릭 -> 추가 모달 -> 보드 이름 입력 -> 새 보드 생성

![ezgif com-gif-maker (32)](https://user-images.githubusercontent.com/67466789/206710785-ffc84f3b-f6f6-44b2-9bb7-6f82f3f08209.gif)

- 5개 이상의 보드 생성 시 `가로 스크롤`이 생깁니다. 


### 4.2. 보드 수정

보드 햄버거 아이콘 클릭 -> 보드 수정 클릭 -> 수정 모달 -> 보드 이름 수정 ->  보드 수정 


### 4.3. 보드 삭제

보드 햄버거 아이콘 클릭 -> 보드 삭제 클릭 -> 보드 삭제

![ezgif com-gif-maker (27)](https://user-images.githubusercontent.com/67466789/206704993-f816c8f0-a618-4030-8222-a82970e0f062.gif)


### 4.4. 테스크 생성

플러스 버튼 클릭 -> 제목, 태그, 내용, 날짜, 사진 선택 후 Create Task 클릭 -> 카드 생성

![ezgif com-gif-maker (29)](https://user-images.githubusercontent.com/67466789/206707611-5bd32950-8dd1-4b8b-b86e-ca0a8910a16a.gif)

- 중복 카테고리 작성 시 중복된 카테고리 항목이 `미적용` 됩니다.

- 카테고리 추가 버튼을 누르면 input 창이 나타나며, 추가한 카테고리를 클릭하면 `삭제`가 됩니다. 

- 제목이나 카테고리는 필수로 작성해야 하므로 미작성 시 테스크가 추가가 되지 않으며, `오류 메세지`를 띄워줍니다. 

- 테스크가 보드 크기를 넘을 시 `스크롤`이 생깁니다. 


### 4.5. 테스크 Drag & Drop
> 사용자가 카드의 우선 순위와 카드의 진행 상황을 직관적으로 변경할 수 있도록 드래그 앤 드롭 기능을 구현하였습니다. 

같은 보드 내 카드 위치 이동 & 다른 보드로의 카드 이동

![ezgif com-gif-maker (33)](https://user-images.githubusercontent.com/67466789/206711882-6f1c7b40-013a-4cb4-a63c-4fb5e0f16b0e.gif)

- 같은 보드 내에서의 테스크 끼리 Drag & Drop을 통해 `중요도에 따라 순서`를 바꿀 수 있습니다. 

- Drag & Drop을 통해 다른 보드로의 이동이 가능하여 `테스크 process 상태`를 바꿔줄 수 있습니다. 


### 4.6. 테스크 수정

연필 아이콘 클릭 -> 수정 버튼 클릭 -> 제목, 태그, 내용, 날짜, 사진 수정 후 Edit Task 클릭 -> 카드 수정

![ezgif com-gif-maker (30)](https://user-images.githubusercontent.com/67466789/206709827-c30bd913-e85a-4366-93e9-4de6e569ff7e.gif)


### 4.7. 테스크 삭제

연필 아이콘 클릭 -> 삭제 버튼 클릭 -> 모달 확인 버튼 클릭 -> 카드 삭제

![ezgif com-gif-maker (31)](https://user-images.githubusercontent.com/67466789/206710133-492ab880-cd74-4eaf-8133-ce3c97a7e8aa.gif)


### 4.8. 테스크 카드 필터링
> 사용자가 일정을 관리하면서 여러 테스크 카드에서 `원하는 키워드 또는 문장`이 포함된 카드만 보고 싶어할 것이라 생각하였습니다. 또한 제목나 카테고리 또는 내용에 `한정한 세부적인 필터링`을 할 수 있도록 하는 것이 테스크를 `유연하게 관리`하는 데 좋을 것이라고 판단하였습니다. 따라서 필터링 종류를 선택하고, 글자를 인풋에 입력하면 즉각적으로 키워드가 포함된 카드들만 보드에 띄워주도록 하였습니다. 

**제목, 카테고리, 내용 필터링**: 검색 필터링 드롭다운 제목, 카테고리, 내용 클릭 후 단어 또는 문장 입력 

![ezgif com-gif-maker (35)](https://user-images.githubusercontent.com/67466789/206713475-6dca59cc-2d7e-4261-8a04-a75fba6c5d06.gif)

**전체 필터링**: 검색 필터링 클릭 x -> 단어 또는 문장 입력

![ezgif com-gif-maker (36)](https://user-images.githubusercontent.com/67466789/206714093-448379ec-9b7a-462a-afa6-9bcf7560069d.gif)

- 검색어를 입력하면 키워드가 있는 테스크 카드만 필터링되어 보여집니다.

- 키워드는 `노란색으로 하이라이트` 되어 보여집니다. 

- input 창의 x 버튼을 누르면 input 내의 키워드 값이 지워지며, 필터링이 초기화 됩니다.

***
- 필터링 하이라이트 로직 :round_pushpin: [코드 보기](https://github.com/han-byul-yang/Task_Management/blob/36affca96f38c1b631d891b63948ec1f64e56d22/src/utils/highlightWords.tsx#L3)
***

### 4.9. 모바일 화면
> 스크롤을 이용해서 다른 보드를 쉽게 확인할 수 있는 데스크톱 화면과는 달리, 화면이 작은 모바일 화면에서는 그러기가 쉽지 않다고 생각했습니다. 또한 보드에서 보드로의 자유로운 드래그 앤 드롭이 힘들 것이라고 판단하였습니다. 따라서 모바일 반응형 화면에서는 `보드마다 다른 route 를 적용`하여, 네비게이션으로 보드 사이를 쉽게 이동하고 확인할 수 있도록 하였습니다. 

#### 4.9.1. 보드 생성

프로젝트 메뉴 클릭 -> 보드 추가 클릭 -> 보드 이름 입력 -> 새 보드 생성

![ezgif com-gif-maker (41)](https://user-images.githubusercontent.com/67466789/206856184-079ab5bf-e3cc-4f86-ad39-6071e2f0efa4.gif)

- 4개 이상의 보드 생성 시 스크롤이 생깁니다. 

#### 4.9.2. 보드 수정

프로젝트 메뉴 클릭 -> 보드 수정 클릭 -> 보드 이름 수정 -> 보드 수정 

![ezgif com-gif-maker (42)](https://user-images.githubusercontent.com/67466789/206856237-ee6b55bc-c28b-4cb0-b721-695f30ab10bb.gif)

#### 4.9.3. 보드 삭제

프로젝트 메뉴 클릭 -> 보드 삭제 클릭 -> 보드 삭제

![ezgif com-gif-maker (43)](https://user-images.githubusercontent.com/67466789/206856285-f8f1ca99-5e4b-4e79-8138-90cdb0bd8e80.gif)


#### 4.9.4. 테스크 생성

프로젝트 메뉴 클릭 -> 제목, 태그, 내용, 날짜, 사진 선택 후 Create Task 클릭 -> 카드 생성

![ezgif com-gif-maker (46)](https://user-images.githubusercontent.com/67466789/206857135-339d86ff-5b0e-493c-b090-73023bf422db.gif)


#### 4.9.5. 테스크 Drag & Drop

![ezgif com-gif-maker (39)](https://user-images.githubusercontent.com/67466789/206856004-127c0802-220a-4010-a269-98bc585d0fc8.gif)

- 드래그를 통해 같은 보드 내 카드 위치 이동이 가능합니다. 

#### 4.9.6. 테스크 수정

연필 아이콘 클릭 -> 수정 버튼 클릭-> 제목, 태그, 내용, 날짜, 사진 수정 후 Edit Task 클릭 -> 카드 수정

![ezgif com-gif-maker (37)](https://user-images.githubusercontent.com/67466789/206855848-24aa350f-2790-4f3e-be28-d7d92727c797.gif)

#### 4.9.7. 테스크 삭제

연필 아이콘 클릭 -> 삭제 버튼 클릭 -> 모달 확인 버튼 클릭 -> 카드 삭제

![ezgif com-gif-maker (38)](https://user-images.githubusercontent.com/67466789/206855894-686eefdf-4d02-41e4-a412-1aa3cbf32d66.gif)

#### 4.9.8. 테스크 보드 이동

연필 아이콘 클릭 -> 카드 이동 버튼 클릭 -> 보드 선택 -> 선택한 보드로 카드 이동

![ezgif com-gif-maker (40)](https://user-images.githubusercontent.com/67466789/206856107-0318a809-eb56-4b71-87f1-156b8f6eadce.gif)

#### 4.9.9. 테스크 카드 필터링

**제목, 카테고리, 내용 필터링**

![ezgif com-gif-maker (45)](https://user-images.githubusercontent.com/67466789/206857041-917ac4f9-a895-4e62-9e95-0a9c35bdf52c.gif)


**전체 필터링**

![ezgif com-gif-maker (44)](https://user-images.githubusercontent.com/67466789/206857005-8a08edbb-25d7-4d56-bf95-aac3b42597ad.gif)


## 5. 트러블 슈팅
### 5.1. input 입력 끊김 현상 해결 :bookmark_tabs:[블로그 글](https://velog.io/@han-byul-yang/world-map-note-%EA%B0%9C%EC%9D%B8-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B81)
 모바일 환경에서 키워드를 입력할 때, 카드 필터링의 업데이트가 동시에 일어나면서 입력 끊김 UI 현상이 일어났다. 이에 React18의 concurrent 기능을 활용하여 긴급 업데이트(input에 입력)와 전환 업데이트(카드 필터링)를 구분하였다. 이로써 키워드가 부드럽게 입력이 되어 사용성이 높아질 수 있었다.
