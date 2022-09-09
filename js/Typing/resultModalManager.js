import RadialProgressManager from './RadialProgressManager.js';
import {initResultModalBaseTemp} from '../utils/templates.js';

/**
 * 결과모달창 매니저
 */
export default function resultModalManager()  {
    let time = null;
    let time2 = null;

    // 결과모달창 베이스 데이터
    let baseModalData = {
        titleDate : ""
      , roomSrc : ""
      , maxSpeed : ""
      , avgSpeed : ""
      , accPercent : ""
    }; 

    // 결과모달창 차트 데이터
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
        document.getElementById("modalWrap").addEventListener('click', this.resetModal);
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

        time2 = setTimeout(function () {
            getChartGrade("inner-circle" + chartModalData[2].id, [5,5,5])
            document.getElementsByClassName("inner-circle" + chartModalData[2].id)[0].firstChild.classList.add("fadeIn")
        }, 1500);
    }

    /**
     * 모달 리셋
     */
    this.resetModal = () => {
        // 차트애니메이션 중지
        clearTimeout(time);
        clearTimeout(time2);

        // 모달 삭제
        let modalContainer = document.getElementById("modal-container");    
        modalContainer.innerHTML = "";

        // 모달 재 세팅
        this.createModal();   
    }

    const getChartGrade = (domId, percentArr) => {
        let chartGrade = document.getElementsByClassName(domId)[0].firstChild;
        let sum = 0;
        let arg = 0;
        percentArr.forEach((data) => {
            sum += data;
        });
        arg = sum / percentArr.length;

        if(arg <= 5){
            chartGrade.innerHTML = "S+";
        }else if(arg <= 10){
            chartGrade.innerHTML = "S";
        }else if(arg <= 20){
            chartGrade.innerHTML = "A+";
        }else if(arg <= 30){
            chartGrade.innerHTML = "A";
        }else if(arg <= 40){
            chartGrade.innerHTML = "A-";
        }else if(arg <= 50){
            chartGrade.innerHTML = "B+";
        }else if(arg <= 60){
            chartGrade.innerHTML = "B";
        }else if(arg <= 70){
            chartGrade.innerHTML = "C";
        }else if(arg <= 80){
            chartGrade.innerHTML = "D";
        }else if(arg <= 90){
            chartGrade.innerHTML = "E";
        }else if(arg <= 100){
            chartGrade.innerHTML = "F";
        }
    }

    this.setBaseModalData = (data) => {
        baseModalData = data;
    }

    this.setChartModalData = (data) => {
        chartModalData = data;
    }

    this.init = (baseModal, chartModal) => {
        baseModalData = baseModal;
        chartModalData = chartModal;
        this.createModal();
    }
    
}
