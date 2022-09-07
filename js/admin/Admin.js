import Request from '../utils/Request.js';
import TypingManager from '../Typing/TypingManager.js';     // 타이핑 모듈을 가져온다.
import NormalManager from '../game/NormalManager.js';       // 노말맵 모듈을 가져온다.
import resultModalManager from '../Typing/resultModalManager.js';


function Admin() {
    const request = new Request();
    const percentCount = document.getElementById("count");  // wave 퍼센트 셀렉터
    const typingMain = new TypingManager();                 // 타이핑매니저 선언
    const resultModal = new resultModalManager();           // 모달매니저 선언
    let manager;  
    let background;  
    
    // 공통 세팅 변수
    const model = {
        successPoint     : 45,      // 성공시 퍼센트 게이지
        normalBackground : "red",   // 노말맵 백그라운드
    }

    // 다음라운드
    const nextRound = () => {
        manager.nextRoomObject();
    }

    const setModules = () => {
        typingMain.init(model.successPoint);                            // 타이핑 세팅
        setManager(request.getParameter("map"))                         // 파라미터값에 따라 맵을 가져온다.
        manager.initRoomSetting({level: 1, background: background});    // 게임맵 세팅
    }

    const setEvent = () => {
        // 웨이브가 100퍼센트가 되면 다음라운드로 넘어간다.
        percentCount.addEventListener("pass", nextRound);
    }

    const setManager = (map) => {
        switch (map) {
            case "normal":
                manager = new NormalManager();
                background = model.normalBackground;
                break;
        
            default:
                break;
        }
    }

    this.init = () => {
        setModules();
        setEvent();
    }
}

let admin = new Admin();
admin.init();