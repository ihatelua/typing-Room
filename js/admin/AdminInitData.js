/**
 * 게임 초기화 데이터
 */

// 공통 게임 설정
export const model = {
    successPoint: 20,           // 성공 시 게이지 증가량
    normalBackground: "red",    // 일반 맵 배경색
    currentMap: "",             // 현재 맵
    currentLevel: 1             // 현재 레벨
};

// 차트 모달 데이터
export const chartModalModel = [
    {
        id: "A",
        size: "180",
        barSize: "10",
        barColor: "#EB6540",
        backgroundColor: "#FFF",
        zIndex: "60",
        legendName: "최고타수"
    },
    {
        id: "B",
        size: "130",
        barSize: "10",
        barColor: "#48A7BD",
        backgroundColor: "#FFF",
        zIndex: "65",
        legendName: "평균타수"
    },
    {
        id: "C",
        size: "80",
        barSize: "10",
        barColor: "#A66EF5",
        backgroundColor: "#FFF",
        zIndex: "70",
        legendName: "정확도"
    }
];
