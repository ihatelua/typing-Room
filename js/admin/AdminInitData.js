// 공통 세팅 변수
export const  model = {
    successPoint     : 45,      // 성공시 퍼센트 게이지
    normalBackground : "red",   // 노말맵 백그라운드
    currentMap : "",            // 현재맵
    currentLevel : 1
}

// 차트 데이터
export const chartModalModel = 
[
    {
        id: "A"
        , size : "180"
        , barSize : "10"
        , barColor : "#EB6540"
        , backgroundColor : "#FFF"
        , zIndex : "60"
        , legendName : "최고타수"
    },
    {
        id: "B"
        , size : "130"
        , barSize : "10"
        , barColor : "#48A7BD"
        , backgroundColor : "#FFF"
        , zIndex : "65"
        , legendName : "평균타수"
    },
    {
        id: "C"
        , size : "80"
        , barSize : "10"
        , barColor : "#A66EF5"
        , backgroundColor : "#FFF"
        , zIndex : "70"
        , legendName : "정확도"
    },
];