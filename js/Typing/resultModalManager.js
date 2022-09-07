import RadialProgressManager from './RadialProgressManager.js';
import {initResultModalBaseTemp} from '../utils/templates.js';

export default function resultModalManager()  {
    let time;

    const createBase = () => {
        initResultModalBaseTemp("modal-container", {
            titleDate   : "2022-01-01"
          , roomSrc     : "./img/normal/level1.png"
          , maxSpeed    : "400"
          , avgSpeed    : "300"
          , accPercent  : "100%"
        })
        setEvent();
    }
    
    const setEvent = () => {
        document.getElementById("confirm").addEventListener('click', function () {
            if(document.getElementsByClassName("modalWrap").length == 0) {
                // document.getElementsByClassName("modalWrap")[0].classList.remove("none");
                createBase();
                return;
            }
            document.getElementsByClassName("modalWrap")[0].classList.remove("none");
            // 사이즈, id, 바 사이즈, 바 색깔, 백그라운드 색깔, z-index
            let progress = new RadialProgressManager("circleChart", 'A', 180, 10, '#EB6540', '#FFF', '60');
            let progress2 = new RadialProgressManager("circleChart", 'B', 130, 10, '#48A7BD', '#FFF', '65');
            let progress3 = new RadialProgressManager("circleChart", 'C', 80, 10, '#A66EF5', '#FFF', '70');

            time = setTimeout(function() {
                progress.setProgress(20, 0.5, "A", "최고타수");
                progress2.setProgress(40, 0.5, "B", "평균타수");
                progress3.setProgress(50, 0.5, "C", "정확도");
            }, 1000);
        });
    
        document.getElementById("modalWrap").addEventListener('click', function () {
            clearTimeout(time);
            // document.getElementsByClassName("modalWrap")[0].classList.add("none");
            let chart = document.getElementById("modal-container");
            while (chart.hasChildNodes()) {
                chart.removeChild(chart.firstChild);
            }
        });
    }
    createBase();
}
