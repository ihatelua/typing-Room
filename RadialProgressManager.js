import {initResultModalStyleTemp, initResultModalTemp} from './js/utils/templates.js'                        // 샘플데이터를 세팅모듈을 가져온다.

/**
 * 원형차트 매니저
 * @param {원 사이즈} size 
 * @param {className} id 
 * @param {바 사이즈} barSize 
 * @param {바 색깔} barColor 
 * @param {백그라운드 색깔} backgroundColor 
 * @param {순서} zIndex 
 */
function RadialProgressManager(parentId, id, size,  barSize, barColor, backgroundColor, zIndex)  {
    let progress = 0;
    let requestAnimationFrame = window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame;

    // 선언과 동시에 템플릿을 생성시킨다.
    initResultModalStyleTemp(id, size, barSize, barColor, backgroundColor, zIndex);
    initResultModalTemp(parentId, id);

    // 원형차트 삭제
    const remove = () => {
        let radialProgress = document.getElementsByClassName("radial-progress" + id)[0];
        let style = document.getElementById(id + "Css");
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
    const setProgress = (percent, duration, id) => {
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

            // if (progress === 100) {
            //     setTimeout(function() {
                    // remove();   // 종료
            //     }, 1000);
            // }
        }

        requestAnimationFrame(step);
    };  

    return {
        remove,
        setProgress
    }
};


const createProgress = () => {
    let time;
    document.getElementById("confirm").addEventListener('click', function () {
        document.getElementsByClassName("modalWrap")[0].classList.remove("none");


        // 사이즈, id, 바 사이즈, 바 색깔, 백그라운드 색깔, z-index
        var progress = new RadialProgressManager("circleChart", 'A', 180, 10, '#EB6540', '#FFF', '60');
        var progress2 = new RadialProgressManager("circleChart", 'B', 130, 10, '#48A7BD', '#FFF', '65');
        var progress3 = new RadialProgressManager("circleChart", 'C', 80, 10, '#A66EF5', '#FFF', '70');

        time = setTimeout(function() {
            progress.setProgress(20, 0.5, "A");
            progress2.setProgress(40, 0.5, "B");
            progress3.setProgress(50, 0.5, "C");
        }, 1000);
    });

    document.getElementById("modalWrap").addEventListener('click', function () {
        clearTimeout(time);
        document.getElementsByClassName("modalWrap")[0].classList.add("none");
        let chart = document.getElementById("circleChart");
        while (chart.hasChildNodes()) {
            chart.removeChild(chart.firstChild);
        }
    });
}

createProgress();