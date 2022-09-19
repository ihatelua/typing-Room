import RadialProgressManager from './RadialProgressManager.js';
import {initResultModalBaseTemp} from '../utils/templates.js';

/**
 * 결과모달창 매니저
 */
export default function resultModalManager()  {
    let time = null;
    let time2 = null;
    let chartGradeJSON = {};

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
     * @comment new RadialProgressManager("circleChart", 'A', 180, 10, '#EB6540', '#FFF', '60')
     */
     this.createChartEvent = () => {
        // 모달 백그라운드 클래스 삭제
        document.getElementsByClassName("modalWrap")[0].classList.remove("none");

        // 모달 차트 클래스 가져오기
        let ChartArr = chartModalData.map(data => new RadialProgressManager("circleChart", data))

        // 나중에 ajax 로 상위 몇퍼센트 인지 가져올 라인
        // 퍼센트를 가져와서 아래 차트애니메이션 데이터를 뿌린다.

        // 1초 뒤에 차트 애니메이션 시작
        time = setTimeout(function () {
            ChartArr[0].setProgress(20, 0.5, "A", "최고타수");
            ChartArr[1].setProgress(40, 0.5, "B", "평균타수");
            ChartArr[2].setProgress(50, 0.5, "C", "정확도");
        }, 1000);

        time2 = setTimeout(function () {
            setChartGrade("inner-circle" + chartModalData[2].id, [5,5,5])
            document.getElementsByClassName("inner-circle" + chartModalData[2].id)[0].firstElementChild.classList.add("fadeIn")
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

   
    const getChartGrade = (chartGrade, data) => 
        chartGradeJSON = {
              [0  < data && data <= 5   ?  'P' : 'F']  : "S+"
            , [5  < data && data <= 10  ?  'P' : 'F']  : "S"
            , [10 < data && data <= 20  ?  'P' : 'F']  : "A+"
            , [20 < data && data <= 30  ?  'P' : 'F']  : "A"
            , [30 < data && data <= 40  ?  'P' : 'F']  : "A-"
            , [40 < data && data <= 50  ?  'P' : 'F']  : "B+"
            , [50 < data && data <= 60  ?  'P' : 'F']  : "B"
            , [60 < data && data <= 70  ?  'P' : 'F']  : "C"
            , [70 < data && data <= 80  ?  'P' : 'F']  : "D"
            , [80 < data && data <= 90  ?  'P' : 'F']  : "E"
            , [90 < data && data <= 100 ?  'P' : 'F']  : "F"
        }['P']

    const setChartGrade = (domId, percentArr) => {
        let chartGrade = document.getElementsByClassName(domId)[0].children[0];
        let sum = 0;
        let arg = 0;
        percentArr.forEach((data) => {
            sum += data;
        });
        arg = sum / percentArr.length;
        chartGrade.innerHTML = getChartGrade(chartGrade, arg);
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
