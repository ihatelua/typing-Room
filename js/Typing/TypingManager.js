/**
 * 타이핑 게임 관리 모듈
 * 실시간 정확도 계산로직 미개발
 */

import Wave from './TypingWave.js';
import TypingCreate from './TypingCreate.js';
import NormalManager from '../game/NormalManager.js'
import { EVENT_TYPE, KEY_TYPE } from '../utils/constants.js';
import CharacterUtil from './CharacterUtil.js';

class TypingManager {
    constructor() {
        this.inputTyping = document.getElementById("inputTyping");
        this.typingSpeed = document.getElementById("typingSpeed");
        this.mainhead = document.getElementById('mainhead');
        
        this.wave = new Wave();
        this.typingCreate = new TypingCreate();
        this.characterUtil = new CharacterUtil();

        this.tempContent = null;
        this.startTypingFlag = true;
        this.startTime = 0;
        this.missScore = 0;
        this.successPoint = 0;
        this.liveCheckIntervals = [];
        
        this.archive = this.initializeArchive();
    }

    /**
     * 아카이브 객체 초기화
     */
    initializeArchive() {
        return {
            prevSpeed: 0,
            maxSpeed: 0,
            accuracy: 0,
            count: 0,
            recordData: [],
            averageSpeed: 0
        };
    }

    /**
     * 타이핑 입력 이벤트 핸들러
     */
    onTypingHandler = (event) => {
        this.checkCharacterInput();

        if (this.inputTyping.value.length === 0) {
            this.resetTypingState();
            return;
        }

        if (this.inputTyping.value.length > 1 && this.startTypingFlag) {
            this.startTypingFlag = false;
            this.startTime = new Date();
            this.startLiveChecking();
        }

        const keyCode = event.code;
        if (keyCode === KEY_TYPE.SPACE || keyCode === KEY_TYPE.ENTER) {
            this.checkTypingCompletion(keyCode);
        } else {
            this.checkTypingCompletion();
        }
    }

    /**
     * 타이핑 상태 리셋
     */
    resetTypingState() {
        this.startTypingFlag = true;
        this.typingCreate.resetTypingTemp();
        this.missScore = 0;
        this.stopLiveChecking();
    }

    /**
     * 타이핑 완료 여부 확인
     */
    checkTypingCompletion(key = null) {
        const typingValue = this.inputTyping.value;
        const answer = this.tempContent.contents;
        
        const isCompleted = (key === KEY_TYPE.SPACE && typingValue.length - 1 === answer.length) ||
                           (key === KEY_TYPE.ENTER && typingValue.length === answer.length) ||
                           (!key && typingValue.length - 1 >= answer.length);

        if (!isCompleted) return;

        this.processCompletedTyping(answer, typingValue);
    }

    /**
     * 완료된 타이핑 처리
     */
    processCompletedTyping(answer, typingValue) {
        const correctCount = this.getCorrectContents().length;
        const incorrectCount = answer.length - correctCount;
        const wordAccuracy = Math.max(0, Math.floor((correctCount / answer.length * 100) - incorrectCount));
        const wordSpeed = parseInt(this.typingSpeed.innerHTML);

        this.updateArchive(wordAccuracy, wordSpeed);
        this.updateResultDisplay();
        this.wave.addWave(this.successPoint, this.archive);
        this.restartGame();
    }

    /**
     * 아카이브 업데이트
     */
    updateArchive(wordAccuracy, wordSpeed) {
        this.archive.prevSpeed = wordSpeed;
        
        if (wordSpeed > this.archive.maxSpeed) {
            this.archive.maxSpeed = wordSpeed;
        }

        if (this.archive.accuracy === 0) {
            this.archive.accuracy = Math.floor(wordAccuracy);
        } else {
            this.archive.accuracy = Math.floor((this.archive.accuracy + wordAccuracy) / 2);
        }

        this.archive.count++;
        this.archive.recordData.push(wordSpeed);
        this.archive.averageSpeed = this.calculateAverageSpeed();
    }

    /**
     * 평균 타수 계산
     */
    calculateAverageSpeed() {
        const total = this.archive.recordData.reduce((sum, speed) => sum + Number(speed), 0);
        return Math.floor(total / this.archive.recordData.length);
    }

    /**
     * 결과 표시 업데이트
     */
    updateResultDisplay() {
        document.getElementById("resultPrevSpeed").innerHTML = this.archive.prevSpeed;
        document.getElementById("resultAcc").innerHTML = this.archive.accuracy;
        document.getElementById("resultMax").innerHTML = this.archive.maxSpeed;
        document.getElementById("typingCount").innerHTML = this.archive.count;
        document.getElementById("typingAcc").innerHTML = this.archive.accuracy;
    }

    /**
     * 게임 재시작
     */
    restartGame() {
        this.startTypingFlag = true;
        this.inputTyping.value = "";
        this.typingCreate.clearTypingTemp();
        this.tempContent = this.typingCreate.initTypingCreateTemp();
        this.missScore = 0;
        this.stopLiveChecking();
    }

    /**
     * 실시간 체크 시작
     */
    startLiveChecking() {
        // 실시간 타이핑 체크 (60ms)
        this.liveCheckIntervals.push(
            setInterval(() => {
                this.checkLiveGrammar(this.inputTyping.value);
            }, 60)
        );

        // 실시간 타수 체크 (150ms)
        this.liveCheckIntervals.push(
            setInterval(() => {
                this.updateLiveTypingSpeed(this.getCorrectContents());
            }, 150)
        );
    }

    /**
     * 실시간 체크 중지
     */
    stopLiveChecking() {
        this.liveCheckIntervals.forEach(intervalId => clearInterval(intervalId));
        this.liveCheckIntervals = [];
    }

    /**
     * 실시간 타이핑 문법 체크
     */
    checkLiveGrammar(typingValue) {
        const displayContents = document.querySelectorAll("#tempContents");
        const contents = this.tempContent.contents;

        for (let i = 0; i < typingValue.length; i++) {
            if (typingValue.length <= contents.length) {
                this.updateCharacterDisplay(displayContents[i], contents[i], typingValue[i]);
            }
        }

        // 초과 입력 문자 스타일 초기화
        for (let i = typingValue.length; i < contents.length; i++) {
            displayContents[i].className = "normal";
            if (displayContents[i].innerHTML === "_") {
                displayContents[i].innerHTML = " ";
            }
        }
    }

    /**
     * 개별 문자 표시 업데이트
     */
    updateCharacterDisplay(element, expectedChar, typedChar) {
        if (expectedChar === " " && typedChar !== " " && element.className !== "wrong") {
            element.innerHTML = "_";
            element.className = "wrong";
        } else if (expectedChar === " " && typedChar === " ") {
            element.innerHTML = " ";
            element.className = "correct";
        } else if (expectedChar === typedChar) {
            element.className = "correct";
        } else if (element.className !== "wrong") {
            element.className = "wrong";
        }
    }

    /**
     * 실시간 타수 계산 및 업데이트
     */
    updateLiveTypingSpeed(correctValue) {
        const typingCount = this.characterUtil.getConstantVowelCount(correctValue);
        const endTime = new Date();
        const elapsedSeconds = (endTime.getTime() - this.startTime.getTime()) / 1000;
        const resultSpeed = Math.max(0, parseInt((typingCount - this.missScore) / (elapsedSeconds / 60)));

        this.typingSpeed.innerHTML = resultSpeed;
    }

    /**
     * 입력된 문자 검증 및 감점
     */
    checkCharacterInput() {
        const displayContents = document.querySelectorAll("#tempContents");
        const contents = this.tempContent.contents;
        const inputText = this.inputTyping.value;

        if (inputText.length === 0) return;

        const lastExpectedChar = contents.charAt(inputText.length - 1);
        const lastInputChar = inputText.charAt(inputText.length - 1);

        if (this.characterUtil.isCompareChar(lastExpectedChar, lastInputChar)) {
            this.applyShakeAnimation();
            this.missScore++;
        }
    }

    /**
     * 흔들림 애니메이션 적용
     */
    applyShakeAnimation() {
        this.mainhead.classList.remove('shake');
        // 리플로우를 강제하여 CSS 애니메이션 재시작
        void this.mainhead.offsetWidth;
        this.mainhead.classList.add("shake");

        setTimeout(() => {
            this.mainhead.classList.remove('shake');
        }, 50);
    }

    /**
     * 올바른 내용 수집
     */
    getCorrectContents() {
        const correctContents = document.querySelectorAll("#tempContents.correct");
        return Array.from(correctContents).map(el => el.innerHTML).join("");
    }

    /**
     * 타이핑 설정 초기화
     */
    initTypingSetting(point) {
        this.successPoint = point;
        this.tempContent = this.typingCreate.initTypingCreateTemp();
        this.wave.setWave(0);
    }

    /**
     * 이벤트 리스너 등록
     */
    initEventListeners() {
        this.inputTyping.addEventListener(EVENT_TYPE.KEY_UP, this.onTypingHandler);
    }

    /**
     * 모듈 초기화
     */
    init(model) {
        this.initTypingSetting(model);
        this.initEventListeners();
    }
}

export default TypingManager;
