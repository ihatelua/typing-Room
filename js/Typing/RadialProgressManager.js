import {initResultModalStyleTemp, initResultModalTemp, initResultChartFooterTemp} from '../utils/templates.js'                  // 샘플데이터를 세팅모듈을 가져온다.

/**
 * 원형차트 매니저
 * @param {원 사이즈} size 
 * @param {className} id 
 * @param {바 사이즈} barSize 
 * @param {바 색깔} barColor 
 * @param {백그라운드 색깔} backgroundColor 
 * @param {순서} zIndex 
 */
 export default function RadialProgressManager(parentId, data)  {
    let progress = 0;
    let requestAnimationFrame = window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame;

    // 선언과 동시에 차트 템플릿을 생성시킨다.
    initResultModalStyleTemp(data.id, data.size, data.barSize, data.barColor, data.backgroundColor, data.zIndex);
    initResultModalTemp(parentId, data.id);
    

    // 원형차트 삭제
    const remove = () => {
        let radialProgress = document.getElementsByClassName("radial-progress" + data.id)[0];
        let style = document.getElementById(data.id + "Css");
        let scale = 1;
        let deltaScale = 0.1 / 10;

        function step() {
            scale += deltaScale;
            scale = (scale < 0) ? 0 : scale;
            radialProgress.style.transform = 'scale(' + scale + ')';

            if (scale > 1.1) {
                deltaScale = -1.1 / 8;
            }

            if (scale > 0) {
                requestAnimationFrame(step);
            } else {
                document.getElementsByTagName('head')[0].removeChild(style);
                document.getElementById("resultModal").removeChild(radialProgress);
            }
        }

        requestAnimationFrame(step);
    };

    // 퍼센트바 세팅
    const setProgress = (percent, duration, id, name) => {
        let radialProgress = document.getElementsByClassName("radial-progress" + id)[0];
        percent = (percent > 100) ? 100 : percent;
        let $maskFull = radialProgress.getElementsByClassName('mask' + id + ' full' + id)[0];
        let $fill = radialProgress.getElementsByClassName('fill' + id);
        let $fillFix = radialProgress.getElementsByClassName('fill' + id + ' fix' + id)[0];
        let deltaProgress = (percent - progress) / (duration * 60);

        function step() {
            progress += deltaProgress;
            progress = (progress > percent) ? percent : progress;
            let rotate = progress * 1.8;
            $maskFull.style.transform = 'rotate(' + rotate + 'deg)';

            for (var i = 0; i < $fill.length; ++i) {
                $fill[i].style.transform = 'rotate(' + rotate + 'deg)';
            }

            $fillFix.style.transform = 'rotate(' + 2 * rotate + 'deg)';

            if (progress < percent) {
                requestAnimationFrame(step);
            }

            if (progress === percent) {
                // setTimeout(function() {
                //     remove();   // 종료
                // }, 1000);
                initResultChartFooterTemp("chartFooter", {"legendColor" : data.barColor, "legendName": name, "legendId": id, "legendPercent": percent})
            }
        }

        requestAnimationFrame(step);
    };  

    return {
        remove,
        setProgress
    }
};
