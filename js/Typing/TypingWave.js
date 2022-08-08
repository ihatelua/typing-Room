/**
 * wave 
 */
export default function Wave() {
    const percentCount = document.getElementById("count"); // wave 퍼센트 셀렉터
    const percentWater = document.getElementById("water"); // wave water 셀렉터

    // wave 세팅
    const setWave = (num) => {
        percentCount.innerHTML = num;
        percentWater.style.transform = 'translate(0'+','+(100-num)+'%)';
    }

    return {
        setWave
    };
}
