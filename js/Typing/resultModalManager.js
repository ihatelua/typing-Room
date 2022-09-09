import RadialProgressManager from './RadialProgressManager.js';
import {initResultModalBaseTemp} from '../utils/templates.js';

export default function resultModalManager()  {
    let time = null;

    let baseModalData = {
        titleDate : ""
      , roomSrc : ""
      , maxSpeed : ""
      , avgSpeed : ""
      , accPercent : ""
    }; 

    let chartModalData = [{
        id: ""
      , size : ""
      , barSize : ""
      , barColor : ""
      , backgroundColor : ""
      , zIndex : ""
      , legendName : ""
    }];

    /**
     * 모달 세팅
     */
    this.createModal = () => {
        initResultModalBaseTemp("modal-container", {
            titleDate     : baseModalData.titleDate
            , roomSrc     : baseModalData.roomSrc
            , maxSpeed    : baseModalData.maxSpeed
            , avgSpeed    : baseModalData.avgSpeed
            , accPercent  : baseModalData.accPercent
        })
        setEvent();
    }
    
    /**
     * 모달 이벤트
     */
    const setEvent = () => {
        // createChartEvent 함수를 실행해서 모달을 열도록 해야함
        // document.getElementById("confirm").addEventListener('click', this.createChartEvent); 
        document.getElementById("modalWrap").addEventListener('click', this.restartModal);
    }

    /**
     * 모달 차트 이벤트
     */
     this.createChartEvent = () => {
        document.getElementsByClassName("modalWrap")[0].classList.remove("none");

        let ChartArr = [];
        chartModalData.forEach((data) => {
            ChartArr.push(new RadialProgressManager("circleChart", data.id, data.size, data.barSize, data.barColor, data.backgroundColor, data.zIndex));
        });

        // 사이즈, id, 바 사이즈, 바 색깔, 백그라운드 색깔, z-index
        // let progress = new RadialProgressManager("circleChart", 'A', 180, 10, '#EB6540', '#FFF', '60');
        // let progress2 = new RadialProgressManager("circleChart", 'B', 130, 10, '#48A7BD', '#FFF', '65');
        // let progress3 = new RadialProgressManager("circleChart", 'C', 80, 10, '#A66EF5', '#FFF', '70');

        // 나중에 ajax 로 상위 몇퍼센트 인지 가져올 라인
        // 퍼센트를 가져와서 아래 차트애니메이션 데이터를 뿌린다.


        // 1초 뒤에 차트 애니메이션 시작
        time = setTimeout(function () {
            ChartArr[0].setProgress(20, 0.5, "A", "최고타수");
            ChartArr[1].setProgress(40, 0.5, "B", "평균타수");
            ChartArr[2].setProgress(50, 0.5, "C", "정확도");
        }, 1000);
    }

    /**
     * 모달 삭제 이벤트
     */
    this.restartModal = () => {
        // 차트애니메이션 중지
        clearTimeout(time);

        // 모달 삭제
        let modalContainer = document.getElementById("modal-container");    
        modalContainer.innerHTML = "";

        // 모달 재 세팅
        this.createModal();   
    }

    this.setBaseModalData = (data) => {
        baseModalData = data;
    }

    const setChartModalData = (data) => {
        chartModalData = data;
    }

    this.init = (baseModal, chartModal) => {
        baseModalData = baseModal;
        chartModalData = chartModal;
        this.createModal();
    }
    
}
