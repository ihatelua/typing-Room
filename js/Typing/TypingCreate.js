import { defaultTypingData as Contents } from '../utils/TypingMockData.js';
import { initTypingTemp } from '../utils/templates.js'

/**
 * 타이핑 콘텐츠 관리 모듈
 */
class TypingCreate {
    constructor() {
        this.textSourceElement = document.getElementById("textSourceTemp");
        this.typingContainer = document.getElementById("typingTemp");
        this.currentContent = null;
    }

    /**
     * 랜덤 타이핑 콘텐츠 초기화
     */
    initTypingCreateTemp() {
        const randomIndex = Math.floor(Math.random() * Contents.length);
        this.currentContent = Contents[randomIndex];

        this.textSourceElement.innerHTML = this.currentContent.author;
        initTypingTemp(this.currentContent.contents);

        return this.currentContent;
    }

    /**
     * 타이핑 콘텐츠 초기화 (DOM 제거)
     */
    clearTypingTemp() {
        this.textSourceElement.innerHTML = "";
        while (this.typingContainer.hasChildNodes()) {
            this.typingContainer.removeChild(this.typingContainer.firstChild);
        }
    }

    /**
     * 타이핑 스타일 초기화
     */
    resetTypingTemp() {
        const tempContents = document.querySelectorAll("#tempContents");
        tempContents.forEach(element => {
            element.className = "normal";
            if (element.innerHTML === "_") {
                element.innerHTML = " ";
            }
        });
    }
}

export default TypingCreate;