import Wave from './TypingWave.js';
import TypingCreate from './TypingCreate.js';
import {EVENT_TYPE, KEY_TYPE} from '../utils/constants.js';
import {defaultTypingData as Contents} from '../utils/TypingMockData.js';

function TypingMain() {
    const inputTyping = document.getElementById("inputTyping"); // input
    const wave = new Wave();
    let typingCreate = new TypingCreate();

    let currentPercent = 0; // 현재 퍼센트값
    let startTime = 0;      // start 시간
    let startTypingFlag = true;


    // 타이핑 이벤트
    const onTypingHandler = event => {
        console.log(inputTyping.value + " : " + inputTyping.value.length + " = " + Contents[0].contents[inputTyping.value.length-2])
        
        if(inputTyping.value.length == 0){
            startTypingFlag = true;
            typingCreate.resetTypingTemp();
        }
        
        if(inputTyping.value.length > 1 && startTypingFlag){
            startTime = new Date();
            startTypingFlag = false;
        }
    
        if(event.code == KEY_TYPE.SPACE){
            perfectTypingCheck();
        }
    
        if(event.code == KEY_TYPE.ENTER){
            perfectTypingCheck();
        }

        liveTypingCheck(inputTyping.value);
    }

    /**
     * 실시간 타이핑 체크
     */
    const liveTypingCheck = (typingValue) => {
        if(typingValue.length != 0){
            const tempContent = document.querySelectorAll("#tempContents");
            for(let i = 0; i < typingValue.length; i++){
                if(tempContent[i].innerHTML == typingValue[i]){
                    tempContent[i].className = "correct";
                }else{
                    tempContent[i].className = "wrong";
                }
            }
        }
    }

    /**
     * 타이핑이 완료됐을때 체크
     */
    const perfectTypingCheck = () => {
        let typingValue = inputTyping.value;
        let answer = Contents[0].contents;

        if(typingValue.lastIndexOf(answer.charAt(answer.length-1)) === answer.length - 1){
            console.log("통과!")
        }else{
            console.log("실패ㅠㅠ");
        }
        // inputTyping.value.lastIndexOf(Contents[0].contents.at(Contents[0].contents.length-1))
        // Contents[0].contents.length-1 이 같다면 통과
        // Contents[0]
    }


    /**
     * 초반 세팅
     */
    const initTypingSetting = () => {
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