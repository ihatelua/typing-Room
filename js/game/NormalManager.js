import {NORMAL_LEVEL_1, NORMAL_LEVEL_2, NORMAL_LEVEL_3, NORMAL_LEVEL_4, NORMAL_LEVEL_5} from '../utils/constants.js';   // 노말 데이터를 가져온다.
import {initGameRoomTemp} from '../utils/templates.js'  // 룸 데이터 세팅모듈을 가져온다.

export default function NormalManager() {
    const background = document.getElementById("mainhead");
    let object;                 // 룸 요소
    let gameRoom;               // 룸 svg 요소
    let currentLevel;           // 현재 레벨
    let currentRound;           // 현재 라운드 오브젝트
    let currentObjectCount = 0  // 현재 라운드 수
    let backgroundColor = "";

    // 룸 세팅
    const initRoomSetting = (model) => {
        backgroundColor = model.background;
        currentLevel = model.level;

        background.className = "mainhead " + backgroundColor;
        initGameRoomTemp("normal", currentLevel);                // 노말맵 SVG 템플릿을 세팅한다.

        document.getElementById("room").onload = function() {
            object = document.querySelector('.room')
            gameRoom = object.contentDocument
            
            currentRound = getLevelObject(currentLevel, currentObjectCount);           // 현재 오브젝트 저장
            gameRoom.getElementsByClassName(currentRound)[0].classList.remove("none"); // 오브젝트 보이기
            // gameRoom.getElementsByClassName(currentRound)[0].classList.add("view");    // 오브젝트 애니메이션 추가
            gameRoom.getElementsByClassName(currentRound)[0].classList.add("vibration");    // 오브젝트 애니메이션 추가
        };
    };

    
    const nextRoomObject = () => {
        // 다음라운드로
        if(getLevelLength(currentLevel) != currentObjectCount + 1){  
            currentRound = getLevelObject(currentLevel, ++currentObjectCount);
            gameRoom.getElementsByClassName(currentRound)[0].classList.remove("none");      // 오브젝트 보이기
            gameRoom.getElementsByClassName(currentRound)[0].classList.add("vibration");    // 오브젝트 애니메이션 추가
        } else{  // 다음레벨로
            currentObjectCount = 0;
            object.remove();
            initRoomSetting({level: ++currentLevel, background: backgroundColor})
        }
    }

    // 레벨의 총 길이를 가져온다.
    const getLevelLength = (level) => {
        switch (level) {
            case 1:
                return NORMAL_LEVEL_1.length;
            case 2:
                return NORMAL_LEVEL_2.length;
            case 3:
                return NORMAL_LEVEL_3.length;
            case 4:
                return NORMAL_LEVEL_4.length;
            case 5:
                return NORMAL_LEVEL_5.length;
            default:
                break;
        }
    }

    // 레벨의 오브젝트 값을 가져온다.
    const getLevelObject = (level, cnt) => {
        switch (level) {
            case 1:
                return NORMAL_LEVEL_1[cnt];
            case 2:
                return NORMAL_LEVEL_2[cnt];
            case 3:
                return NORMAL_LEVEL_3[cnt];
            case 4:
                return NORMAL_LEVEL_4[cnt];
            case 5:
                return NORMAL_LEVEL_5[cnt];
            default:
                break;
        }
    }

    return {
        initRoomSetting,
        nextRoomObject
    }
}