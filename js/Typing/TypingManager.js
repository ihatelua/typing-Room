import Wave from './TypingWave.js'
import {EVENT_TYPE, KEY_TYPE} from '../utils/constants.js'

function TypingMain() {
    const inputTyping = document.getElementById("inputTyping"); // input
    const wave = new Wave();

    let currentPercent = 0; // 현재 퍼센트값
    let startTime = 0;      // start 시간

    // 타이핑 이벤트
    const onTypingHandler = event => {
        if(inputTyping.value.length > 2){
            startTime = 0;
        }
    
        if(event.code == KEY_TYPE.SPACE){
            console.log("스페이스입력");
        }
    
        if(event.code == KEY_TYPE.ENTER){
            console.log("엔터입력");
        }
    }

    // 초반 세팅
    const initTypingSetting = () => {
        wave.setWave(40);
    }

    // 이벤트 설정
    const initEventListeners = () => {
        inputTyping.addEventListener(EVENT_TYPE.KEY_PRESS, onTypingHandler);
    }

    this.init = () => {
        initTypingSetting();
        initEventListeners();
    }
}

const typingMain = new TypingMain();
typingMain.init();