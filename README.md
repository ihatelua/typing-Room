# Typing Game 

![캡처](/md_assets/mainScreenShot.png)

## 1. 서비스 소개
타이핑연습과 미니게임 요소를 추가한 형태의 미니게임입니다.
미니멀한 디자인을 추구하고싶어 `Isometric` 디자인기법을 채택하여 개발하였습니다.
___
현재는 노말 룸만 구현되어 있는 상태이며, 총 5단계로 나뉘어져있습니다.
추후에 다른 룸도 구현준비중입니다.

게임방법은 화면에 제시되는 문장을 입력하여 문장을 완성시킵니다.
문장이 완성하게 되면 파란색 게이지가 일정점수에 따라 올라갑니다.
게이지가 100%가 되면 가운데 룸에서 가구가 배치됩니다.
<br><br>

## 2. 기술스택
back단 쪽 스택은 추후에 추가할 예정입니다.
* HTML
* CSS
* JavaScript


<br><br>
## 3. 핵심기능
1. 타이핑 연습과 자신의 속도를 측정 할 수 있습니다.
	* 최고속도, 현재속도, 평균속도(현재 미완), 정확도

2. 다른 사람들과 순위경쟁을 할 수 있습니다(개발중)
	* 단계가 끝날때마다 모달창으로 결과리포트를 볼 수 있습니다.
	* 데이터베이스 기반으로 자신이 상위 몇%에 위치하는지 차트형식으로 볼 수 있습니다.


<br>
<br>
## 4. 모듈화
JavaScript ES6의 export 키워드를 이용하여 모듈화를 구현하였습니다.

> 모듈화 구조
```
.
└─ Admin
   │
   ├── TypingManager  
   │   ├── TypingWave
   │   ├── TypingCreate
   │   │   ├── Utils.TypingMockData
   │   │   └── Utils.templates
   │   │
   │   ├── VowerUtil 
   │   │   └── Utils.constants
   │   └── Utils.constants
   │
   ├── NormalManager
   │   ├── Utils.constants
   │   └── Utils.templates
   │
   └── Utils.Request


Utils
│
├─ constants
│   ├─ ... 
│   └─ ...
│   
├─ templates
│   ├─ ... 
│   ├─ ...
│
├─ TypingMockData
│   ├─ ... 
│   └─ ...
│
└─ Request
   ├─ ... 
   └─ ...
   
```

