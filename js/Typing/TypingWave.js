/**
 * wave Manager
 */
export default function Wave() {
    const percentCount = document.getElementById("count"); // wave 퍼센트 셀렉터
    const percentWater = document.getElementById("water"); // wave water 셀렉터
    let currentPercent = 0;

    // wave 세팅
    const setWave = (num) => {
        percentCount.innerHTML = num;
        percentWater.style.transform = 'translate(0'+','+(100-num)+'%)';
        currentPercent = num;
    }

    // wave 퍼센트 추가
    const addWave = (num) => {
        if(currentPercent + num <= 100){
            percentCount.innerHTML = currentPercent + num;
            percentWater.style.transform = 'translate(0'+','+(100-(currentPercent + num))+'%)';
            currentPercent += num;
        }else{
            percentCount.innerHTML = 100;
            percentWater.style.transform = 'translate(0'+','+(100-(100))+'%)';
            currentPercent = 100;
            percentCount.dispatchEvent(new CustomEvent("pass", {}));
        }
    }

    // 현재 wave의 퍼센트를 가져온다.
    const getWaveCurrentPercent = () => {
        return currentPercent;
    }
    

    return {
        setWave,
        addWave,
        getWaveCurrentPercent
    };
}
