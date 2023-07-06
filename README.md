# React

## 리액트설치설명

### 리액트 설치
(node.js랑 npx 설치되어있어야함)

npx create-react-app 프로젝트이름
(vue에서 vue-cli 역할)

### 브라우저세팅
크롬 확장프로그램에서
React developer tools 라는 확장프로그램 받기

---------

## 리액트 메모

### useState
```
import React, { useState } from 'react';
const [count, setCount] = useState(0);
```
useState를 쓸때는 위와같이 useState를 react에서 가져와야함

### Props

상위 컴포넌트에서 템플릿구문에 props를 내려줌.
```
<Counter initialValue={number} />
```
### children
컴포넌트를 children으로 아래와같이 템플릿안에 내용을 넣을때
```
//상위
<Container>
    <div className="App">
        <Counter {...counterProps} />
    </div>
</Container>
//껍데기 컴포넌트
const Container = ({children}) =>{
    return(
        <div style={{margin:20, padding:20, border:"1px solid #222"}}>
            {children}
        </div>
    )
}
export default Container
```

### useRef
포커스 기능 쓸때 사용
```
const contentInput = useRef();
contentInput.current.focus();
```
태그 속성으로
```
ref={contentInput}
```
### map()
가져온 배열을 map으로 하나씩 보여줌
vue에서 v-for=item in List와 같은 역할
```
{diaryList.map((it) =>(
    <div>
        <div>작성자 : {it.author}</div>
    </div>
))}
```
### 배열 못가져올때 디폴트값 설정하기
함수에 defaultProps 추가해서 설정해주기
```
DiaryList.defaultProps={
    diaryList : [],
}
```
### map쓸때 key값 설정
가장 상위 div에  
 key={it.id} 추가  
 id값이 배열중에 없다면 그냥 idx을 넣어도 무방  
 ```
{diaryList.map((it) =>(
<div key={it.id}>
    <div>작성자 : {it.author}</div>
    <div>일기 : {it.content}</div>
    <div>감정 : {it.emotion}</div>
    <div>작성 시간(ms) : {it.create_date}</div>
</div>
))}
```
### useEffect
라이프사이클을 관리하는 기능  
MOUNT돼었을때 주는 기능(ON.READY같은거,새로고침)  
```
const [count,setCount] = useState(0);
const [text,setText] = useState("");

//처음 mount시
useEffect(()=>{
    console.log("Mount!");
},[]);

//업데이트시
useEffect(() =>{
    console.log("update");
});

//usestate가 변할때만 감지해서 작동시킬수 있음
useEffect(()=>{
    console.log(`count is update : ${count}`);
    if(count > 5){
        alert("count가 5를 넘었습니다 따라서 1로 초기화합니다.");
        setCount(1);
    }
},[count]);
```
### useMemo
연산최적화 역활, 어떤값이 변화할때만 함수를 작용하고싶을때 쓴다  
단, 주의할점은 useMemo를 쓸 경우 변수가 함수가 아니라 그대로 값을 return해서  
불러올때 func()가 아니라 func 자체로 가져와야한다.
```
const getDiaryAnalysis = useMemo(() =>{
    console.log("일기 분석 시작");
    const goodCount = data.filter((it)=>it.emotion>=3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return {goodCount,badCount,goodRatio};
},[data.length]);
const {goodCount, badCount, goodRatio} = getDiaryAnalysis;
```

### 함수형 컴포넌트에 업데이트 조건을 거는 방법
