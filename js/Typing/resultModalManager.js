import RadialProgressManager from './RadialProgressManager.js';
import { initResultModalBaseTemp } from '../utils/templates.js';

/**
 * 결과 모달 관리 모듈
 */
class ResultModalManager {
    constructor() {
        this.baseModalData = this.initializeBaseModalData();
        this.chartModalData = this.initializeChartModalData();
        this.animationTimeouts = [];
        this.chartArray = [];
    }

    /**
     * 베이스 모달 데이터 초기화
     */
    initializeBaseModalData() {
        return {
            titleDate: "",
            roomSrc: "",
            maxSpeed: "",
            avgSpeed: "",
            accPercent: ""
        };
    }

    /**
     * 차트 모달 데이터 초기화
     */
    initializeChartModalData() {
        return [{
            id: "",
            size: "",
            barSize: "",
            barColor: "",
            backgroundColor: "",
            zIndex: "",
            legendName: ""
        }];
    }

    /**
     * 성적 등급 계산
     */
    getChartGrade(percent) {
        const grades = [
            { min: 0, max: 5, grade: "S+" },
            { min: 5, max: 10, grade: "S" },
            { min: 10, max: 20, grade: "A+" },
            { min: 20, max: 30, grade: "A" },
            { min: 30, max: 40, grade: "A-" },
            { min: 40, max: 50, grade: "B+" },
            { min: 50, max: 60, grade: "B" },
            { min: 60, max: 70, grade: "C" },
            { min: 70, max: 80, grade: "D" },
            { min: 80, max: 90, grade: "E" },
            { min: 90, max: 100, grade: "F" }
        ];

        const gradeData = grades.find(g => percent > g.min && percent <= g.max);
        return gradeData ? gradeData.grade : "F";
    }

    /**
     * 모달 생성
     */
    createModal() {
        initResultModalBaseTemp("modal-container", {
            titleDate: this.baseModalData.titleDate,
            roomSrc: this.baseModalData.roomSrc,
            maxSpeed: this.baseModalData.maxSpeed,
            avgSpeed: this.baseModalData.avgSpeed,
            accPercent: this.baseModalData.accPercent
        });

        this.setupEventListeners();
    }

    /**
     * 이벤트 리스너 설정
     */
    setupEventListeners() {
        const modalWrap = document.getElementById("modalWrap");
        if (modalWrap) {
            modalWrap.addEventListener('click', () => this.resetModal());
        }
    }

    /**
     * 차트 애니메이션 이벤트
     */
    createChartEvent() {
        const modalWrap = document.getElementsByClassName("modalWrap")[0];
        modalWrap.classList.remove("none");

        // 차트 생성
        this.chartArray = this.chartModalData.map(
            data => new RadialProgressManager("circleChart", data)
        );

        // 1초 후 애니메이션 시작
        this.animationTimeouts.push(
            setTimeout(() => {
                this.chartArray[0].setProgress(20, 0.5, "A", "최고타수");
                this.chartArray[1].setProgress(40, 0.5, "B", "평균타수");
                this.chartArray[2].setProgress(50, 0.5, "C", "정확도");
            }, 1000)
        );

        // 등급 표시
        this.animationTimeouts.push(
            setTimeout(() => {
                this.displayChartGrade("inner-circle" + this.chartModalData[2].id, [5, 5, 5]);
            }, 1500)
        );
    }

    /**
     * 차트 등급 표시
     */
    displayChartGrade(domId, percentArray) {
        const average = percentArray.reduce((a, b) => a + b) / percentArray.length;
        const grade = this.getChartGrade(average);

        const elements = document.getElementsByClassName(domId);
        if (elements.length > 0) {
            const gradeElement = elements[0].firstElementChild;
            gradeElement.innerHTML = grade;
            gradeElement.classList.add("fadeIn");
        }
    }

    /**
     * 모달 리셋
     */
    resetModal() {
        // 애니메이션 중지
        this.animationTimeouts.forEach(timeout => clearTimeout(timeout));
        this.animationTimeouts = [];

        // 모달 내용 제거
        const modalContainer = document.getElementById("modal-container");
        if (modalContainer) {
            modalContainer.innerHTML = "";
        }

        // 모달 재생성
        this.createModal();
    }

    /**
     * 베이스 모달 데이터 설정
     */
    setBaseModalData(data) {
        this.baseModalData = { ...this.baseModalData, ...data };
    }

    /**
     * 차트 모달 데이터 설정
     */
    setChartModalData(data) {
        this.chartModalData = Array.isArray(data) ? data : [data];
    }

    /**
     * 모듈 초기화
     */
    init(baseModal, chartModal) {
        this.setBaseModalData(baseModal);
        this.setChartModalData(chartModal);
        this.createModal();
    }

    /**
     * 정리
     */
    destroy() {
        this.animationTimeouts.forEach(timeout => clearTimeout(timeout));
        this.animationTimeouts = [];
        this.chartArray = [];
    }
}

export default ResultModalManager;
