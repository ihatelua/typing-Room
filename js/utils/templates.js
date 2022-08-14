/**
 * 샘플데이터 세팅할 템플릿
 * @param {TypingMockData.Content} data 
 * @returns 
 */
export const createTypingTemp = data => {
    return `<span class="normal" id="tempContents">${data}</span>`
}

/**
 * 샘플데이터를 세팅한다.
 * @param {TypingMockData.Content} data 
 */
export const initTypingTemp = (data) => {
    for(let i = 0; i < data.length; i++){
        let char = data[i];
        document.getElementById('typingTemp').insertAdjacentHTML('beforeend', createTypingTemp(char));
    }
}
