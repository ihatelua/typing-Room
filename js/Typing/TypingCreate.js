import {defaultTypingData as Contents} from '../utils/TypingMockData.js';   // 샘플데이터를 가져온다.
import {initTypingTemp} from '../utils/templates.js'                        // 샘플데이터를 세팅모듈을 가져온다.

/**
 * 샘플데이터 Manager
 * @returns 
 */
export default function TypingCreate() {
    const textSourceTemp = document.getElementById("textSourceTemp");
    const typingTemp = document.getElementById("typingTemp");

    /**
     * 샘플데이터를 세팅한다.
     * @param {TypingMockData} data 
     */
    const initTypingCreateTemp = () => {
        const mockSize = Contents.length;
        const rand = Math.floor(Math.random() * mockSize);
        const selectContent = Contents[rand];

        textSourceTemp.innerHTML = selectContent.author;
        initTypingTemp(selectContent.contents);

        return selectContent;
    }

    /**
     * 샘플데이터를 삭제한다.
     */
    const clearTypingTemp = () => {
        textSourceTemp.innerHTML = "";
        while (typingTemp.hasChildNodes()) {
            typingTemp.removeChild(typingTemp.firstChild);
        }
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