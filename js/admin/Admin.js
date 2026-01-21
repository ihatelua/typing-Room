import { model, chartModalModel } from './AdminInitData.js';
import Util from '../utils/util.js';
import Request from '../utils/request.js';
import TypingManager from '../Typing/TypingManager.js';
import NormalManager from '../game/NormalManager.js';
import ResultModalManager from '../Typing/resultModalManager.js';

/**
 * 게임 관리 모듈 (Admin)
 */
class Admin {
    constructor() {
        this.percentCount = document.getElementById("count");
        this.typingMain = new TypingManager();
        this.resultModal = new ResultModalManager();
        this.manager = null;
        this.background = null;

        this.init();
    }

    /**
     * 모듈 초기화
     */
    init() {
        this.setupModules();
        this.setupEventListeners();
    }

    /**
     * 모듈 설정
     */
    setupModules() {
        this.typingMain.init(model.successPoint);
        this.setupManager(Request.getParameter("map"));
        this.manager.initRoomSetting({
            level: model.currentLevel,
            background: this.background
        });
        this.resultModal.init({}, chartModalModel);
    }

    /**
     * 매니저 설정
     */
    setupManager(map) {
        switch (map) {
            case "normal":
                this.manager = new NormalManager();
                this.background = model.normalBackground;
                model.currentMap = "normal";
                break;

            default:
                this.manager = new NormalManager();
                this.background = model.normalBackground;
                model.currentMap = "normal";
                break;
        }
    }

    /**
     * 이벤트 리스너 설정
     */
    setupEventListeners() {
        this.percentCount.addEventListener("pass", (event) => this.handleRoundComplete(event));
    }

    /**
     * 라운드 완료 핸들러
     */
    handleRoundComplete(event) {
        const data = event.detail;

        // 다음 라운드로 진행
        this.manager.nextRoomObject();

        // 레벨이 변경되었다면 결과 모달 표시
        if (model.currentLevel !== this.manager.getCurrentLevel()) {
            model.currentLevel = this.manager.getCurrentLevel();

            this.resultModal.setBaseModalData({
                titleDate: Util.getDate(),
                roomSrc: `./img/${model.currentMap}/level${this.manager.getCurrentLevel() - 1}.png`,
                maxSpeed: data.maxSpeed,
                avgSpeed: data.averageSpeed,
                accPercent: data.accuracy
            });

            this.resultModal.resetModal();
            this.resultModal.createChartEvent();
        }
    }

    /**
     * 정리
     */
    destroy() {
        this.resultModal.destroy();
    }
}

// 페이지 로드 시 초기화
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new Admin();
    });
} else {
    new Admin();
}