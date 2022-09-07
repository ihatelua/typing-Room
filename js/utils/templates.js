/**
 * 샘플데이터 세팅할 템플릿
 * @param {TypingMockData.Content} data 
 * @returns 
 */
const createTypingTemp = data => {
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
const createNormalRoom = level => {
    return `<object class="room" data="./img/normal/level${level}.svg" type="image/svg+xml" id="room"> </object>`
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

/**
 * 결과창모달 스타일 템플릿
 * @param {원의 사이즈} size 
 * @param {className} id 
 * @param {바 사이즈} barSize 
 * @param {바 색깔} barColor 
 * @param {백그라운드 색깔} backgroundColor 
 * @param {순서} zIndex 
 * @param {innerSize} innerSize 
 * @param {innerMargin} innerMargin 
 */
const createResultModalStyle = (id, size, barSize, barColor, backgroundColor, zIndex, innerSize, innerMargin) => {
    return `<style type="text/css" id="${id}Css">.radial-progress${id} {width: ${size}px;height: ${size}px;position: absolute;margin: auto;top: 0; right: 0; bottom: 0; left: 0;z-index: ${zIndex};background-color: #DDD;border-radius: 50%;box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);}.radial-progress${id} .inner-circle${id} {width: ${innerSize}px;height: ${innerSize}px;position: absolute;margin-top: ${innerMargin}px;margin-left: ${innerMargin}px;background-color: ${backgroundColor};border-radius: 50%;z-index: 10;}.radial-progress${id} .outer-circle${id} .mask${id},.radial-progress${id} .outer-circle${id} .fill${id} {width: ${size}px;height: ${size}px;position: absolute;border-radius: 50%;-webkit-backface-visibility: hidden;}.radial-progress${id} .outer-circle${id} .mask${id} {clip: rect(0px, ${size}px, ${size}px, ${size / 2}px);}.radial-progress${id} .outer-circle${id} .mask${id} .fill${id} {clip: rect(0px, ${size / 2}px, ${size}px, 0px);background-color: ${barColor};}</style>`
}

/**
 * 결과창모달 스타일을 세팅한다.
 * @param {className} id 
 * @param {원의 사이즈} size 
 * @param {바 사이즈} barSize 
 * @param {바 색깔} barColor 
 * @param {백그라운드 색깔} backgroundColor 
 * @param {순서} zIndex 
 */
export const initResultModalStyleTemp = (id, size, barSize, barColor, backgroundColor, zIndex) => {
    barSize = (barSize % 2 === 1) ? (barSize + 1) : barSize;
    let innerSize = size - barSize;
    let innerMargin = barSize / 2;
    document.getElementsByTagName('head')[0].insertAdjacentHTML('beforeend', createResultModalStyle(id, size, barSize, barColor, backgroundColor, zIndex, innerSize, innerMargin));
}

/**
 * 결과창모달 템플릿
 * @param {className} id 
 */
export const createResultModal = (id) => {
    return `<div class="radial-progress${id}"><div class="inner-circle${id}"></div><div class="outer-circle${id}"><div class="mask${id} full${id}"><div class="fill${id}"></div></div><div class="mask${id}"><div class="fill${id}"></div><div class="fill${id} fix${id}"></div></div></div></div>`
}

/**
 * 결과창모달을 세팅한다.
 * @param {부모의 id} parentId 
 * @param {className} id 
 */
export const initResultModalTemp = (parentId, id) => {
    document.getElementById(parentId).insertAdjacentHTML('beforeend', createResultModal(id));
}





