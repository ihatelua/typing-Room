import Wave from './TypingWave.js';
import TypingCreate from './TypingCreate.js';
import {EVENT_TYPE, KEY_TYPE} from '../utils/constants.js';
import {defaultTypingData as Contents} from '../utils/TypingMockData.js';
import VowerUtil from './VowerUtil.js';

function TypingMain() {
    const inputTyping = document.getElementById("inputTyping"); // input
    const typingSpeed = document.getElementById("typingSpeed"); // 타수
    const wave = new Wave();
    let typingCreate = new TypingCreate();
    let vowerUtil = new VowerUtil();

    let startTypingFlag = true;
    let currentPercent = 0;     // 현재 퍼센트값
    let startTime = 0;          // start 시간
    let missTypingNum = 0;      // 틀린 갯수


    /** 정확도/타수 로직
        var wordAccuracy = Math.floor(wordTrueCnt / word.length*100);     // 정확도
        var typingSpeed = Math.floor(wordTrueCnt / timeSecond * 6000);    // 타수
    */


    // 타이핑 이벤트
    const onTypingHandler = event => {
        // console.log(inputTyping.value + " : " + inputTyping.value.length + " = " + Contents[0].contents[inputTyping.value.length-2])
        
        if(inputTyping.value.length == 0){
            startTypingFlag = true;             // 시작할때 한 번 실행
            typingCreate.resetTypingTemp();     // 샘플데이터 리셋하기
            missTypingNum = 0;                  // 틀린갯수 초기화
            stopLiveCheck();                    // 실시간 체킹 종료
        }
        
        if(inputTyping.value.length > 1 && startTypingFlag){
            startTime = new Date();             // 시간 측정 시작
            liveCheck();                        // 실시간 체킹 시작
            startTypingFlag = false;            
        }
    
        if(event.code == KEY_TYPE.SPACE){
            // perfectTypingCheck();               // 문자열이 정확한지 확인
        }
    
        if(event.code == KEY_TYPE.ENTER){
            perfectTypingCheck();               // 문자열이 정확한지 확인
        }
    }

    /**
     * 타이핑이 완료됐을때 체크
     */
    const perfectTypingCheck = () => {
        let typingValue = inputTyping.value;
        let answer = Contents[0].contents;

        if(typingValue.lastIndexOf(answer.charAt(answer.length-1)) === answer.length - 1){
            let typingCount = vowerUtil.getConstantVowelCount(answer);

            let endTime = new Date();
            let resultTime=(endTime.getTime()-startTime.getTime()) / 1000;

            console.log(typingCount * 60 / resultTime );
            console.log("typingCount : " + typingCount + " startTime : " + resultTime)
            // console.log("통과!")
        }else{
            console.log("실패ㅠㅠ");
        }
        // inputTyping.value.lastIndexOf(Contents[0].contents.at(Contents[0].contents.length-1))
        // Contents[0].contents.length-1 이 같다면 통과
        // Contents[0]
    }


    /**
     * 실시간 체킹 Strat
     */
    const liveCheck = () => {
        // 실시간 타이핑 체크
        setInterval(() => {
            const typingValue = inputTyping.value;
            return liveTypingCheck(typingValue);
        }, 60);

        // 실시간 타수 체크
        setInterval(() => {
            const correctValues = document.querySelectorAll("#tempContents.correct");
            let resultValue = "";
            for(let i = 0; i < correctValues.length; i++) {
                resultValue += correctValues[i].innerHTML
            }
            return liveTypingSpeed(resultValue);
        }, 100);
    }
    
    /**
     * 실시간 체킹 Stop
     */
    const stopLiveCheck = () => {
        clearInterval();
    }


    /**
     * 실시간 타이핑 체크
     */
    const liveTypingCheck = async(typingValue) => {
        return new Promise((resolve, reject) => {
            const selectContents = document.querySelectorAll("#tempContents");
            const displayText = Contents[0].contents;
            for(let i=0;i<typingValue.length;i++){
                if(typingValue.length <= displayText.length){
                    // 일치하지않는 문자가 빈값일때
                    if(displayText.charAt(i) == " " && typingValue.charAt(i) != " "){ 
                        selectContents[i].innerHTML = "_"; 
                        selectContents[i].className = "wrong";
                        missTypingNum++;
                    }
                    
                    // 일치한 문자가 빈값일때
                    if(displayText.charAt(i) == " " && typingValue.charAt(i) == " "){ 
                        selectContents[i].innerHTML = " "; 
                        selectContents[i].className = "correct";
                    }

                    if(displayText.charAt(i) == typingValue.charAt(i)){   // 문자가 일치하면
                        selectContents[i].className = "correct";
                    }else if(typingValue.length == i+1){
                        selectContents[i].className = "normal";
                    }else{
                        selectContents[i].className = "wrong";
                        missTypingNum++;
                    }

                }
            }

            for(let i=0;i<displayText.length;i++){
                // 타이핑한 문자열보다 샘플데이터 길이가 클 때
                if(typingValue.length <= i){
                    selectContents[i].className = "normal";
                    if(selectContents[i].innerHTML == "_"){
                        selectContents[i].innerHTML = " "
                    }
                }
            }

            resolve();
        });
    }

    const liveTypingSpeed = (correctValue) => {
        return new Promise((resolve, reject) => {
            let typingCount = vowerUtil.getConstantVowelCount(correctValue);

            let endTime = new Date();
            let resultTime = (endTime.getTime() - startTime.getTime()) / 1000;
            let resultSpeed = parseInt(typingCount * 60 / resultTime) - (missTypingNum * 5) + 17;
            
            if(resultSpeed < 0){
                typingSpeed.innerHTML = 0;
            }else{
                typingSpeed.innerHTML = resultSpeed;
            }
            

            resolve();
        });
    }

    /**
     * 초기화
     */
     const initTypingSetting = async() => {
        typingCreate.initTypingCreateTemp(Contents[0]);
        wave.setWave(40);
    }


    /**
     * 이벤트 설정
     */
    const initEventListeners = () => {
        inputTyping.addEventListener(EVENT_TYPE.KEY_UP, onTypingHandler);
    }


    this.init = () => {
        initTypingSetting();
        initEventListeners();
    }
}

const typingMain = new TypingMain();
typingMain.init();