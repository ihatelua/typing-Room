/**
 * 파동 게이지 관리 모듈
 */
class Wave {
    constructor() {
        this.percentDisplay = document.getElementById("count");
        this.waveElement = document.getElementById("water");
        this.currentPercent = 0;
    }

    /**
     * 파동 게이지 설정
     */
    setWave(percent) {
        this.currentPercent = percent;
        this.updateDisplay();
    }

    /**
     * 파동 게이지 추가
     */
    addWave(addAmount, resultData) {
        if (this.currentPercent + addAmount < 100) {
            this.currentPercent += addAmount;
        } else {
            this.currentPercent = (this.currentPercent + addAmount) - 100;
            this.dispatchPassEvent(resultData);
        }

        this.updateDisplay();
    }

    /**
     * 게이지 표시 업데이트
     */
    updateDisplay() {
        this.percentDisplay.innerHTML = this.currentPercent;
        this.waveElement.style.transform = `translate(0, ${100 - this.currentPercent}%)`;
    }

    /**
     * 완료 이벤트 발생
     */
    dispatchPassEvent(resultData) {
        const event = new CustomEvent("pass", { detail: resultData });
        this.percentDisplay.dispatchEvent(event);
    }

    /**
     * 현재 게이지 비율 반환
     */
    getWaveCurrentPercent() {
        return this.currentPercent;
    }
}

export default Wave;
