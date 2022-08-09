import {initTypingTemp} from '../utils/templates.js'    // 샘플데이터를 세팅할 모듈을 가져온다.

export default function TypingCreate() {
    const textSourceTemp = document.getElementById("textSourceTemp");
    const typingTemp = document.getElementById("typingTemp");

    /**
     * 샘플데이터를 세팅한다.
     * @param {TypingMockData} data 
     */
    const initTypingCreateTemp = (data) => {
        textSourceTemp.innerHTML = data.author;
        initTypingTemp(data.contents);
    }

    /**
     * 샘플데이터를 삭제한다.
     */
    const clearTypingTemp = () => {
        textSourceTemp.innerHTML = "";
        typingTemp.removeChild();
    }

    /**
     * 샘플데이터를 초기화한다.
     */
    const resetTypingTemp = () => {
        const tempContents = document.querySelectorAll("#tempContents");
        for(let i = 0; i < tempContents.length; i++){
            tempContents[i].className = "normal";
            if(tempContents[i].innerHTML == "_"){
                tempContents[i].innerHTML = " ";
            }
        }
    }

    return {
        initTypingCreateTemp,
        clearTypingTemp,
        resetTypingTemp
    }
}