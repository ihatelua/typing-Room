import {model, chartModalModel} from './AdminInitData.js';                        // admin 초기화 데이터
import util from '../utils/util.js';
import Request from '../utils/request.js';
import TypingManager from '../Typing/TypingManager.js';     // 타이핑 모듈을 가져온다.
import NormalManager from '../game/NormalManager.js';       // 노말맵 모듈을 가져온다.
import resultModalManager from '../Typing/resultModalManager.js';


(function Admin() {
    const request = new Request();
    const percentCount = document.getElementById("count");  // wave 퍼센트 셀렉터
    const typingMain = new TypingManager();                 // 타이핑매니저 선언
    const resultModal = new resultModalManager();           // 모달매니저 선언
    const Util = new util();
    let manager;  
    let background;  
    
    // 다음라운드
    // ./img/normal/level1.png
    const nextRound = (data) => {
        // 다음라운드
        manager.nextRoomObject();

        // 만약 다음레벨로 넘어갔다면 모달창을 띄운다.
        if(model.currentLevel != manager.getCurrentLevel()){
            model.currentLevel = manager.getCurrentLevel();
            resultModal.setBaseModalData({
                titleDate     : Util.getDate()
                , roomSrc     : "./img/" + model.currentMap + "/level" + (manager.getCurrentLevel()-1) + ".png"
                , maxSpeed    : data.detail.maxSpeed
                , avgSpeed    : data.detail.averageSpeed
                , accPercent  : data.detail.accuracy
            });
            resultModal.resetModal();
            resultModal.createChartEvent();
        }
        // dispatchEvent(new CustomEvent("pass", {}));
    }

    const setModules = () => {
        typingMain.init(model.successPoint);                            // 타이핑 세팅
        setManager(request.getParameter("map"))                         // 파라미터값에 따라 맵을 가져온다.
        manager.initRoomSetting({level: model.currentLevel, background: background});    // 게임맵 세팅
        resultModal.init({}, chartModalModel);                          // 결과창 모달 세팅
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
                model.currentMap = "normal"
                break;
        
            default:
                break;
        }
    }


    setModules();
    setEvent();
}());