/**
 * 인덱스 슬라이드 라디오 부모 템플릿
 * @param {jsonArr length의 인덱스 배열} selectArr 
 * @returns 
 */
const createIndexSlideRadioParent = selectArr => selectArr.map(temp => createIndexSlideRadioChild(temp)).join('')

/**
 * 인덱스 슬라이드 라디오 자식 템플릿
 * @param {인덱스} index 
 * @returns 
 */
const createIndexSlideRadioChild = index => `<input type="radio" name="radio-btn" id="radio${index}" ${index == 1 ? "checked" : ""}>`


/**
 * 인덱스 슬라이드 내용을 세팅할 부모 템플릿
 */
const createIndexSlideContentParent = (jsonArr) => {
    return jsonArr.map((temp, index) => {
        if(Object.keys(temp) != 0){
            return createIndexSlideContentChild(index, temp);
        }else{
            return createIndexSlideContentBlankChild(index);
        }
    }).join('')
}

/**
 * 인덱스 슬라이드 내용을 세팅할 템플릿
 * @param {} json 
 * @returns 
 */
const createIndexSlideContentChild = (index, json) => {
    return `
        <div class="slide ${index == 0 ? 'first' : ''}">
                                    
            <div class="section2Base"></div>
            
            <div class="sliderGradation-sideBar"></div>
            <div class="sliderGradation" style="background: linear-gradient(90deg, 
                rgb(${json.red}, ${json.green}, ${json.blue}) 0%, rgba(${ (json.red > 90 ? (json.red + ', 255, ' + (Number(json.blue)  + 15))
                                                                                         : (json.red + ','       + (Number(json.green) + 15) + ',255')) } , 0.201) 100%, rgba(217, 217, 217, 0) 100%);"></div>
            <div class="sliderGradation-black"></div>
            
            <div class="info">
                <div class="left">
                    <div class="header">
                        DETAIL
                        <div class="header-bar"></div>
                    </div>
                    <div class="content">
                        <div class="rating-title">난이도</div>
                        <div class="rating-star">
                            ${json.starArr.map(temp => createIndexSlideStar(temp)).join('')}
                        </div>
                        <div class="detail-line">
                            <div class="detail-title">총 레벨</div>
                            <div class="detail-content">${json.level} 레벨</div>
                        </div>
                        <div class="detail-line">
                            <div class="detail-title">가구 수</div>
                            <div class="detail-content">총 ${json.funitureCnt}개의 가구</div>
                        </div>
                        <div class="detail-line">
                            <div class="detail-title">문제유형</div>
                            <div class="detail-content">${json.question}</div>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <div class="header">
                        NORMAL ROOM
                    </div>
                    <div class="room"></div>
                </div>
            </div>
        </div>
    `
}

const createIndexSlideContentBlankChild = (index) => {
    return `
        <div class="slide ${index == 0 ? `first` : ``}">
            <div class="section2Base"></div>

            <div class="sliderGradation-sideBar"></div><!-- (15.29, 51, 25.5)    85.10-->
            <div class="sliderGradation" style="background: linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(6, 20, 9, 0.5) 54.17%, rgba(217, 217, 217, 0) 100%);"></div>
            <div class="sliderGradation-black"></div>
            
            <div class="info">
                <div class="left">
                    <div class="header">
                        DETAIL
                        <div class="header-bar"></div>
                    </div>
                    <div class="content">
                        <div class="rating-title">난이도</div>
                        <div class="rating-star">
                            <div class="blank-star"></div>
                            <div class="blank-star"></div>
                            <div class="blank-star"></div>
                            <div class="blank-star"></div>
                            <div class="blank-star"></div>
                        </div>
                        <div class="detail-line">
                            <div class="detail-title">총 레벨</div>
                            <div class="detail-content">X 레벨</div>
                        </div>
                        <div class="detail-line">
                            <div class="detail-title">가구 수</div>
                            <div class="detail-content">총 XX개의 가구</div>
                        </div>
                        <div class="detail-line">
                            <div class="detail-title">문제유형</div>
                            <div class="detail-content">XXXXXX</div>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <div class="header">
                        XXXXX ROOM
                    </div>
                    <div class="blank-room"></div>
                </div>
            </div>
            <div class="sliderComingSoon">COMING SOON</div>
        </div>
    `
}

/**
 * 인덱스 슬라이드 내용의 별표를 세팅할 템플릿
 * @param {클래스 이름} classNm 
 * @returns 
 */
const createIndexSlideStar = classNm => `<div class="${classNm}"></div>`;


/**
 * 인덱스 슬라이드 네비게이션 auto 부모 템플릿
 * @param {jsonArr length의 인덱스 배열} selectArr 
 * @returns 
 */
const createIndexSlideNavigationAutoParent = (selectArr) => `<div class="navigation-auto">${selectArr.map(temp => createIndexSlideNavigationAutoChild(temp)).join('')}</div>`

/**
 * 인덱스 슬라이드 네비게이션 auto 자식 템플릿
 * @param {인덱스} index
 * @returns
 */
const createIndexSlideNavigationAutoChild = index => `<div class="auto-btn${index}"></div>`;


/**
 * 인덱스 슬라이드 네비게이션 manual 부모 템플릿
 * @param {jsonArr length의 인덱스 배열} selectArr 
 * @returns 
 */
const createIndexSlideNavigationManualParent = selectArr => `<div class="navigation-manual">${selectArr.map(temp => createIndexSlideNavigationManualChild(temp)).join('')}</div>`;

/**
 * 인덱스 슬라이드 네비게이션 manual자식 템플릿
 * @param {인덱스} index
 * @returns 
 */
 const createIndexSlideNavigationManualChild = index => `<label for="radio${index}" class="manual-btn"></label>`;

/**
 * 인덱스 슬라이드 세팅
 * @param {인덱스 슬라이드 데이터} jsonArr
 */
export const initIndexSlideTemp = jsonArr => {
    let length = jsonArr.length;
    let selectArr = Array.from({length}, (v, i) => i+1);  // [1,2,3,4...]
    return [
        createIndexSlideRadioParent(selectArr),                 // 라디오 버튼
        createIndexSlideContentParent(jsonArr),                 // 슬라이드 설명
        createIndexSlideNavigationAutoParent(selectArr),        // 네비게이션 auto
        createIndexSlideNavigationManualParent(selectArr),      // 네비게이션 manual
    ].join('')
}


/**
 * 샘플데이터 세팅할 템플릿
 * @param {TypingMockData.Content} data 
 * @returns 
 */
const createTypingTemp = data => `<span class="normal" id="tempContents">${data}</span>`

/**
 * 샘플데이터를 세팅한다.
 * @param {TypingMockData.Content} data 
 */
export const initTypingTemp = (data) => {
    const sample = [...data].map(temp => createTypingTemp(temp)).join('');
    document.getElementById('typingTemp').insertAdjacentHTML('beforeend', sample);
}

/**
 * 노말 룸을 세팅할 템플릿
 * @param {레벨} level 
 * @returns 
 */
const createNormalRoom = level => `<object class="room" data="./img/normal/level${level}.svg" type="image/svg+xml" id="room"> </object>`


/**
 * 게임 룸 타입 세팅
 */
const gameRoomTempJSON = {
    normal: level => document.getElementById("gameBox").insertAdjacentHTML('beforeend', createNormalRoom(level))
  , default: level => undefined
}
const gameRoomTempfn = (obj, defaultCase = 'default') => (gameType, level) => (obj[gameType] || obj[defaultCase])(level);

/**
 * 게임 룸을 세팅한다.
 * @param {게임타입, 레벨} gameType, level 
 */
 export const initGameRoomTemp = gameRoomTempfn(gameRoomTempJSON, 'default');

/**
 * 결과창모달 베이스 템플릿
 * @param {titleDate, roomSrc, maxSpeed, avgSpeed, accPercent} json
 */
const createResultModalBase = (json) => 
    `<div class="modalWrap none" id="modalWrap">

        <div class="resultModal" id="resultModal">
        <!-- 모달 타이틀-->
        <div class="resultTitle">
            <div class="titleHeader">
            <div class="titleHeaderLine">
                <div class="titleHeaderIcon">
                <object class="icon" data="./img/icon/congratulate.svg" type="image/svg+xml" id="firecracker"></object>
                </div>
                <div class="titleHeaderText">
                    Congratulations!!
                </div>
                </div>
            </div>
            <div class="titleBodyDate" id="modal-titleBodyDate">
                ${json.titleDate}
            </div>
            <div class="titleBodyText">
            결과리포트
            </div>
        </div>
        <!-- 모달 타이틀 끝-->

        <!-- 모달 룸 이미지 -->
        <div class="resultTitleRoom">
            <img class="resultTitleRoomImg" src="${json.roomSrc}">
        </div>
        <!-- 모달 룸 이미지 끝 -->

        <!-- 상세 모달 -->
        <div class="detailResult">
            <!-- 차트부분 -->
            <div class="left">
                <!-- 헤더 -->
                <div class="cardHeader">Average Speed</div>
                
                <!-- 바디 -->
                <div class="chartBody">
                    <div class="circleChart" id="circleChart">
                    </div>
                </div>

                <!-- 푸터 -->
                <div class="chartFooter" id="chartFooter"></div>
            </div>
            <!-- 차트부분 끝 -->

            <!-- 리포트 부분 -->
            <div class="right">
                <!-- 헤더 -->
                <div class="cardHeader">Report</div>

                <!-- 바디 -->
                <div class="cardBody">
                    <div class="reportList">
                    <div class="reportIcon red">
                        <object class="icon" data="./img/icon/firecracker.svg" type="image/svg+xml" id="firecracker"></object>
                    </div>
                    <div class="reportText">
                        <div class="reportHeader">최고타수</div>
                        <div class="reportNumber" id="resultNumber">${json.maxSpeed}</div>
                    </div>
                    </div>

                    <div class="reportList">
                    <div class="reportIcon blue">
                        <object class="icon" data="./img/icon/crown.svg" type="image/svg+xml" id="crown"></object>
                    </div>
                    <div class="reportText">
                        <div class="reportHeader">평균타수</div>
                        <div class="reportNumber" id="resultNumber">${json.avgSpeed}</div>
                    </div>
                    </div>

                    <div class="reportList">
                    <div class="reportIcon purple">
                        <object class="icon" data="./img/icon/trophy.svg" type="image/svg+xml" id="trophy"></object>
                    </div>
                    <div class="reportText">
                        <div class="reportHeader">정확도</div>
                        <div class="reportNumber" id="resultNumber">${json.accPercent}</div>
                    </div>
                    </div>
                </div>
            </div>
            <!-- 리포트 부분 끝-->
        </div>
        <!-- 상세 모달 끝-->

        <!-- 모달 베이스 -->
        <div class="resultModalTopBar"></div>
        <div class="resultModalMiddleBar"></div>
        <div class="resultModalFooterBar"></div>
        <!-- 모달 베이스 끝-->
            
        </div>
    </div>`

/**
 * 결과창모달 베이스를 세팅한다.
 * @param {titleDate, roomSrc, maxSpeed, avgSpeed, accPercent} json
 */
export const initResultModalBaseTemp = (parentId, json) => {
    document.getElementById(parentId).insertAdjacentHTML('beforeend', createResultModalBase(json));
}

/**
 * 결과창모달 차트 스타일 템플릿
 * @param {원의 사이즈} size 
 * @param {className} id 
 * @param {바 사이즈} barSize 
 * @param {바 색깔} barColor 
 * @param {백그라운드 색깔} backgroundColor 
 * @param {순서} zIndex 
 * @param {innerSize} innerSize 
 * @param {innerMargin} innerMargin 
 */
const createResultModalStyle = (id, size, barSize, barColor, backgroundColor, zIndex, innerSize, innerMargin) => 
    `<style type="text/css" id="${id}Css">
        .radial-progress${id} {
            width: ${size}px;
            height: ${size}px;
            position: absolute;
            margin: auto;
            top: 0; 
            right: 0; 
            bottom: 0; 
            left: 0;
            z-index: ${zIndex};
            background-color: #DDD;
            border-radius: 50%;
            box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
        }
        .radial-progress${id} .inner-circle${id} {
            width: ${innerSize}px;
            height: ${innerSize}px;
            position: absolute;
            margin-top: ${innerMargin}px;
            margin-left: ${innerMargin}px;
            background-color: ${backgroundColor};
            border-radius: 50%;z-index: 10;
        }
        .radial-progress${id} .outer-circle${id} .mask${id},.radial-progress${id} .outer-circle${id} .fill${id} {
            width: ${size}px;
            height: ${size}px;
            position: absolute;
            border-radius: 50%;
            -webkit-backface-visibility: hidden;
        }
        .radial-progress${id} .outer-circle${id} .mask${id} {
            clip: rect(0px, ${size}px, ${size}px, ${size / 2}px);
        }
        .radial-progress${id} .outer-circle${id} .mask${id} .fill${id} {
            clip: rect(0px, ${size / 2}px, ${size}px, 0px);
            background-color: ${barColor};
        }
    </style>`

/**
 * 결과창모달 차트 스타일을 세팅한다.
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
 * 결과창모달 차트 템플릿
 * @param {className} id 
 */
const createResultModal = (id) => 
    `<div class="radial-progress${id}">
        <div class="inner-circle${id}">
            <div class="chartGrade" id="chartGrade"></div>
        </div>
        <div class="outer-circle${id}">
            <div class="mask${id} full${id}">
                <div class="fill${id}"></div>
            </div>
            <div class="mask${id}">
                <div class="fill${id}"></div>
                <div class="fill${id} fix${id}"></div>
            </div>
        </div>
    </div>`

/**
 * 결과창모달을 차트 템플릿을 세팅한다.
 * @param {부모의 id} parentId 
 * @param {className} id 
 */
export const initResultModalTemp = (parentId, id) => {
    document.getElementById(parentId).insertAdjacentHTML('beforeend', createResultModal(id));
}

/**
 * 결과창모달 푸터 범례 템플릿
 * @comment red, blue, purple
 */
const createResultChartFooter = (json) => 
    `<div class="chartLabel">
        <div class="chartPoint" style="background:${json.legendColor};"></div>
        <div class="chartText">${json.legendName}</div>
        <span class="tooltip-text" id="legend-${json.legendId}">${json.legendPercent}%</span>
    </div>`

/**
 * 결과창모달 푸터 범례 템플릿을 세팅한다.
 * @param {부모Id, {색깔, 범례이름, 차트id, 퍼센트}} parentId, json
 */
export const initResultChartFooterTemp = (parentId, json) => {
    document.getElementById(parentId).insertAdjacentHTML('beforeend', createResultChartFooter(json));
}
