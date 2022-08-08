
const percentCount = document.getElementById("count"); // wave 퍼센트 셀렉터
const percentWater = document.getElementById("water"); // wave water 셀렉터
const inputTyping = document.getElementById("inputTyping"); // input

// 현재 퍼센트값
let currentPercent = 0;

// start 시간
let startTime = 0;

/**
 * wave 세팅
 */
const setWave = (num) => {
    percentCount.innerHTML = num;
    percentWater.style.transform = 'translate(0'+','+(100-num)+'%)';
}


setWave(40);


inputTyping.addEventListener('keyup', (e) => {
debugger;
    if(inputTyping.value.length > 2){
        startTime = 0;
    }

    if(e.code == "Space"){
        console.log("스페이스입력");
    }

    if(e.code == "Enter"){
        console.log("엔터입력");
    }
})