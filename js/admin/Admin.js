import TypingManager from '../Typing/TypingManager.js';   // 타이핑 모듈을 가져온다.
import NormalManager from '../game/NormalManager.js';     // 노말게임 모듈을 가져온다.

function Admin() {
    const percentCount = document.getElementById("count"); // wave 퍼센트 셀렉터
    const typingMain = new TypingManager();
    const normalManager = new NormalManager();

    const nextRound = () => {
        normalManager.nextRoomObject();
    }

    const setModules = () => {
        typingMain.init();              // 타이핑 세팅
        normalManager.initRoomSetting(1);
    }

    const setEvent = () => {
        percentCount.addEventListener("pass", nextRound);
    }

    this.init = () => {
        setModules();
        setEvent();
    }
}

let admin = new Admin();
admin.init();