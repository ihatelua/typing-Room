import RadialProgressManager from './RadialProgressManager.js';
import {initResultModalBaseTemp} from '../utils/templates.js';

export default function resultModalManager()  {
    let time = null;

    /**
     * 모달 세팅
     */
    const createModal = () => {
        initResultModalBaseTemp("modal-container", {
            titleDate   : "2022-01-01"
            , roomSrc     : "./img/normal/level1.png"
            , maxSpeed    : "400"
            , avgSpeed    : "300"
            , accPercent  : "100%"
        })
        setEvent();
    }
    
    /**
     * 모달 이벤트
     */
    const setEvent = () => {
        document.getElementById("confirm").addEventListener('click', createChartEvent);
        document.getElementById("modalWrap").addEventListener('click', removeModal);
    }

    /**
     * 모달 차트 이벤트
     */
    const createChartEvent = () => {
        document.getElementsByClassName("modalWrap")[0].classList.remove("none");
        // 사이즈, id, 바 사이즈, 바 색깔, 백그라운드 색깔, z-index
        let progress = new RadialProgressManager("circleChart", 'A', 180, 10, '#EB6540', '#FFF', '60');
        let progress2 = new RadialProgressManager("circleChart", 'B', 130, 10, '#48A7BD', '#FFF', '65');
        let progress3 = new RadialProgressManager("circleChart", 'C', 80, 10, '#A66EF5', '#FFF', '70');

        // 나중에 ajax 로 상위 몇퍼센트 인지 가져올 라인
        // 퍼센트를 가져와서 아래 차트애니메이션 데이터를 뿌린다.


        // 1초 뒤에 차트 애니메이션 시작
        time = setTimeout(function () {
            progress.setProgress(20, 0.5, "A", "최고타수");
            progress2.setProgress(40, 0.5, "B", "평균타수");
            progress3.setProgress(50, 0.5, "C", "정확도");
        }, 1000);
    }

    /**
     * 모달 삭제 이벤트
     */
    const removeModal = () => {
        // 차트애니메이션 중지
        clearTimeout(time);

        // 모달 삭제
        let modalContainer = document.getElementById("modal-container");    
        modalContainer.innerHTML = "";

        // 모달 재 세팅
        createModal();   
    }

    this.init = () => {
        createModal();
    }
}
