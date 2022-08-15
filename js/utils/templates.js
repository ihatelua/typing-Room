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


/**
 * 노말 룸을 세팅할 템플릿
 * @param {레벨} level 
 * @returns 
 */
export const createNormalRoom = level => {
    return `<object class="room" data="./img/normal/level${level}.svg" type="image/svg+xml" id="room"></object>`
}

/**
 * 게임 룸을 세팅한다.
 * @param {게임타입, 레벨} gameType, level 
 */
 export const initGameRoomTemp = (gameType, level) => {
    switch (gameType) {
        case "normal":
            document.getElementById("gameBox").insertAdjacentHTML('beforeend', createNormalRoom(level));
            break;
    
        default:
            break;
    }
}