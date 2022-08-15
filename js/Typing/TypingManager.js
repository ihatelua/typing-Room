/**
 * 실시간 정확도 계산로직 미개발
 */

import Wave from './TypingWave.js';
import TypingCreate from './TypingCreate.js';
import NormalManager from '../game/NormalManager.js'
import {EVENT_TYPE, KEY_TYPE} from '../utils/constants.js';
import VowerUtil from './VowerUtil.js';

export default function TypingManager() {
    const inputTyping = document.getElementById("inputTyping"); // input
    const typingSpeed = document.getElementById("typingSpeed"); // 타수
    const wave = new Wave();
    let typingCreate = new TypingCreate();
    let vowerUtil = new VowerUtil();

    let tempContent = "";       // 샘플데이터
    let startTypingFlag = true;
    let currentPercent = 0;     // 현재 퍼센트값
    let startTime = 0;          // start 시간
    let missScore = 0;          // 감점

    let archive = {
        prevSpeed: 0,   // 최근타수
        maxSpeed: 0,    // 최고타수
        accuracy: 0,    // 정확도
        count: 0        // 카운트
    }

    // 변수값 초기화
    let successPoint = 100;  // 성공시 게이지퍼센트


    // 타이핑 이벤트
    const onTypingHandler = event => {
        if(inputTyping.value.length == 0){
            startTypingFlag = true;             // 시작할때 한 번 실행
            typingCreate.resetTypingTemp();     // 샘플데이터 리셋하기
            missScore = 0;                      // 틀린갯수 초기화
            stopLiveCheck();                    // 실시간 체킹 종료
        }
        
        if(inputTyping.value.length > 1 && startTypingFlag){
            startTypingFlag = false;       
            startTime = new Date();             // 시간 측정 시작
            liveCheck();                        // 실시간 체킹 시작
        }
    
        if(event.code == KEY_TYPE.SPACE){
            perfectTypingCheck();            // 문자열이 정확한지 확인
        }
    
        if(event.code == KEY_TYPE.ENTER){
            perfectTypingCheck();               // 문자열이 정확한지 확인
        }
    }

    /**
     * 타이핑이 완료됐을때 체크
     */
    const perfectTypingCheck = () => {
        let typingValue = inputTyping.value;
        let answer = tempContent.contents;

        if(typingValue.length-1 == answer.length ){
            const passData = getCorrectContents().length;
            const failData = answer.length - passData;
            const wordAccuracy = parseInt(Math.floor(passData / answer.length * 100) - failData);     // 정확도 계산
            const wordSpeed = typingSpeed.innerHTML;                                 // 현재타수
            
            // 최근타수 아카이브 저장
            archive.prevSpeed = wordSpeed;

            // 최고타수 아카이브 저장
            if(wordSpeed > archive.maxSpeed){
                archive.maxSpeed = wordSpeed;
            }

            // 정확도 아카이브 저장
            if(archive.accuracy == 0){
                archive.accuracy = wordAccuracy;
            }else{
                archive.accuracy = (archive.accuracy + wordAccuracy) / 2;
            }

            // 카운트 아카이브 저장
            archive.count++;

            wave.addWave(successPoint); 
            setResultBox();     // 결과값 세팅
            restartGame();      // 게임 재시작
        }
    }

    /**
     * 결과값 세팅
     */
    const setResultBox = () => {
        document.getElementById("resultPrevSpeed").innerHTML    = archive.prevSpeed;   // 최근타수
        document.getElementById("resultAcc").innerHTML          = archive.accuracy;    // 정확도
        document.getElementById("resultMax").innerHTML          = archive.maxSpeed;    // 최고타수
        document.getElementById("typingCount").innerHTML        = archive.count;       // 카운트
    }

    /**
     * 게임 재시작
     */
    const restartGame = () => {
        startTypingFlag = true;                             // 시작할때 한 번 실행
        inputTyping.value = "";                             // 입력값 초기화
        typingCreate.clearTypingTemp();                     // 샘플데이터 삭제
        tempContent = typingCreate.initTypingCreateTemp();  // 샘플데이터 초기화
        missScore = 0;                                      // 틀린갯수 초기화
        stopLiveCheck();                                    // 실시간 체킹 종료
    }


    /**
     * 실시간 체킹 Strat
     */
    const liveCheck = () => {
        // 실시간 타이핑 체크
        setInterval(() => {
            const typingValue = inputTyping.value;
            return liveTypingCheck(typingValue);
        }, 60);

        // 실시간 타수 체크
        setInterval(() => {
            let passData = getCorrectContents();
            return liveTypingSpeed(passData);
        }, 100);
    }
    
    /**
     * 실시간 체킹 Stop
     */
    const stopLiveCheck = () => {
        clearInterval();
    }


    /**
     * 
     * 실시간 타이핑 체크
     * 감점계산과 스타일을 변경한다.
     * @param {타이핑한 모든 문자열} typingValue 
     * @returns 
     */
    const liveTypingCheck = async(typingValue) => {
        return new Promise((resolve, reject) => {
            const displayContents = document.querySelectorAll("#tempContents");
            const contents = tempContent.contents;
            for(let i = 0; i < typingValue.length; i++){
                if(typingValue.length <= contents.length){
                    // 일치하지않는 문자가 빈값일때
                    if(contents.charAt(i) == " " && typingValue.charAt(i) != " "){ 
                        displayContents[i].innerHTML = "_"; 
                        displayContents[i].className = "wrong";
                        missScore++;
                    }
                    
                    // 일치한 문자가 빈값일때
                    if(contents.charAt(i) == " " && typingValue.charAt(i) == " "){ 
                        displayContents[i].innerHTML = " "; 
                        displayContents[i].className = "correct";
                    }

                    if(contents.charAt(i) == typingValue.charAt(i)){   // 문자가 일치하면
                        displayContents[i].className = "correct";
                    }else if(typingValue.length == i+1){               // 현재 타이핑중인 문자라면
                        displayContents[i].className = "normal";
                    }else{      
                        displayContents[i].className = "wrong";
                        missScore++;
                    }

                }
            }

            // 타이핑한 문자열보다 샘플데이터 길이가 클 때
            // 스타일을 지운다.
            for(let i=0;i<contents.length;i++){
                if(typingValue.length <= i){
                    displayContents[i].className = "normal";
                    if(displayContents[i].innerHTML == "_"){
                        displayContents[i].innerHTML = " "
                    }
                }
            }

            resolve();
        });
    }

    /**
     * 실시간 타수계산
     * 맞힌 문자로만 계산한다.
     * @param {맞힌 값} correctValue 
     * @returns 
     */
    const liveTypingSpeed = (correctValue) => {
        return new Promise((resolve, reject) => {
            let typingCount = vowerUtil.getConstantVowelCount(correctValue);

            let endTime = new Date();
            let resultTime = (endTime.getTime() - startTime.getTime()) / 1000;
            let resultSpeed = parseInt(typingCount * 60 / resultTime) - missScore;
            
            missScore = 0;

            if(resultSpeed < 0){
                typingSpeed.innerHTML = 0;
            }else{
                typingSpeed.innerHTML = resultSpeed;
            }

            resolve();
        });
    }

    const getCorrectContents = () => {
        const correctContents = document.querySelectorAll("#tempContents.correct");
        let resultValue = "";
        for(let i = 0; i < correctContents.length; i++) {
            resultValue += correctContents[i].innerHTML
        }
        return resultValue;
    }

    /**
     * 초기화
     */
     const initTypingSetting = async() => {
        tempContent = typingCreate.initTypingCreateTemp();
        wave.setWave(0);
    }


    /**
     * 이벤트 설정
     */
    const initEventListeners = () => {
        inputTyping.addEventListener(EVENT_TYPE.KEY_UP, onTypingHandler);
    }


    this.init = () => {
        initTypingSetting();
        initEventListeners();
    }
}