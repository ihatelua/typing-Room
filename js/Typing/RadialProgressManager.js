import {
    initResultModalStyleTemp,
    initResultModalTemp,
    initResultChartFooterTemp
} from '../utils/templates.js';

/**
 * 원형 진행률 차트 관리 모듈
 */
class RadialProgressManager {
    constructor(parentId, data) {
        this.parentId = parentId;
        this.data = data;
        this.progress = 0;
        this.requestAnimFrameId = null;

        // 차트 템플릿 생성
        initResultModalStyleTemp(data.id, data.size, data.barSize, data.barColor, data.backgroundColor, data.zIndex);
        initResultModalTemp(parentId, data.id);
    }

    /**
     * 요청 애니메이션 프레임 가져오기
     */
    getRequestAnimationFrame() {
        return window.requestAnimationFrame ||
               window.mozRequestAnimationFrame ||
               window.webkitRequestAnimationFrame ||
               window.oRequestAnimationFrame ||
               window.msRequestAnimationFrame;
    }

    /**
     * 원형 차트 제거
     */
    remove() {
        const requestAnimFrame = this.getRequestAnimationFrame();
        const radialProgress = document.getElementsByClassName(`radial-progress${this.data.id}`)[0];
        const style = document.getElementById(`${this.data.id}Css`);
        let scale = 1;
        const deltaScale = -1.1 / 8;

        const step = () => {
            scale += deltaScale;
            scale = Math.max(0, scale);
            radialProgress.style.transform = `scale(${scale})`;

            if (scale > 0) {
                requestAnimFrame(step);
            } else {
                document.getElementsByTagName('head')[0].removeChild(style);
                document.getElementById("resultModal").removeChild(radialProgress);
            }
        };

        requestAnimFrame(step);
    }

    /**
     * 진행률 바 설정 및 애니메이션
     */
    setProgress(percent, duration, id, name) {
        const requestAnimFrame = this.getRequestAnimationFrame();
        const radialProgress = document.getElementsByClassName(`radial-progress${id}`)[0];
        
        percent = Math.min(100, Math.max(0, percent));
        
        const maskFull = radialProgress.getElementsByClassName(`mask${id} full${id}`)[0];
        const fills = radialProgress.getElementsByClassName(`fill${id}`);
        const fillFix = radialProgress.getElementsByClassName(`fill${id} fix${id}`)[0];
        
        const deltaProgress = (percent - this.progress) / (duration * 60);
        let currentProgress = this.progress;

        const step = () => {
            currentProgress += deltaProgress;
            currentProgress = Math.min(currentProgress, percent);

            const rotate = currentProgress * 1.8;

            maskFull.style.transform = `rotate(${rotate}deg)`;

            for (let i = 0; i < fills.length; i++) {
                fills[i].style.transform = `rotate(${rotate}deg)`;
            }

            fillFix.style.transform = `rotate(${2 * rotate}deg)`;

            if (currentProgress < percent) {
                requestAnimFrame(step);
            }

            if (currentProgress === percent) {
                this.progress = percent;
                initResultChartFooterTemp("chartFooter", {
                    legendColor: this.data.barColor,
                    legendName: name,
                    legendId: id,
                    legendPercent: percent
                });
            }
        };

        requestAnimFrame(step);
    }
}

export default RadialProgressManager;
