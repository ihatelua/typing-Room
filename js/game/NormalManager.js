import {
    NORMAL_LEVEL_1, NORMAL_LEVEL_2, NORMAL_LEVEL_3, 
    NORMAL_LEVEL_4, NORMAL_LEVEL_5 
} from '../utils/constants.js';
import { initGameRoomTemp } from '../utils/templates.js'

/**
 * 일반 게임 룸 관리 모듈
 */
class NormalManager {
    constructor() {
        this.background = document.getElementById("mainhead");
        this.gameRoomElement = null;
        this.gameRoomDocument = null;
        this.currentLevel = 1;
        this.currentObjectCount = 0;
        this.backgroundColor = "";

        this.LEVEL_DATA = {
            1: NORMAL_LEVEL_1,
            2: NORMAL_LEVEL_2,
            3: NORMAL_LEVEL_3,
            4: NORMAL_LEVEL_4,
            5: NORMAL_LEVEL_5
        };
    }

    /**
     * 룸 설정 초기화
     */
    initRoomSetting(model) {
        this.backgroundColor = model.background;
        this.currentLevel = model.level;
        this.currentObjectCount = 0;

        this.background.className = `mainhead ${this.backgroundColor}`;
        initGameRoomTemp("normal", this.currentLevel);

        this.setupRoomLoadHandler();
    }

    /**
     * 룸 로드 완료 핸들러
     */
    setupRoomLoadHandler() {
        const roomElement = document.getElementById("room");
        roomElement.onload = () => {
            this.gameRoomElement = document.querySelector('.room');
            this.gameRoomDocument = this.gameRoomElement.contentDocument;

            this.displayCurrentObject();
        };
    }

    /**
     * 현재 오브젝트 표시
     */
    displayCurrentObject() {
        const objectName = this.getCurrentObjectName();
        const objects = this.gameRoomDocument.getElementsByClassName(objectName);
        
        if (objects.length > 0) {
            objects[0].classList.remove("none");
            objects[0].classList.add("vibration");
        }
    }

    /**
     * 다음 오브젝트 로드
     */
    nextRoomObject() {
        const levelLength = this.getLevelLength();

        if (this.currentObjectCount + 1 < levelLength) {
            this.currentObjectCount++;
            this.displayCurrentObject();
        } else {
            this.moveToNextLevel();
        }
    }

    /**
     * 다음 레벨로 이동
     */
    moveToNextLevel() {
        this.currentObjectCount = 0;
        this.gameRoomElement.remove();
        this.initRoomSetting({
            level: this.currentLevel + 1,
            background: this.backgroundColor
        });
    }

    /**
     * 현재 오브젝트 이름 획득
     */
    getCurrentObjectName() {
        const levelData = this.LEVEL_DATA[this.currentLevel];
        return levelData[this.currentObjectCount];
    }

    /**
     * 현재 레벨 길이 획득
     */
    getLevelLength() {
        return (this.LEVEL_DATA[this.currentLevel] || []).length;
    }

    /**
     * 현재 레벨 반환
     */
    getCurrentLevel() {
        return this.currentLevel;
    }

    /**
     * 현재 오브젝트 카운트 반환
     */
    getCurrentObjectCount() {
        return this.currentObjectCount;
    }
}

export default NormalManager;