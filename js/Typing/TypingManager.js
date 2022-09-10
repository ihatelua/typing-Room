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
    const mainhead =  document.getElementById('mainhead');
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
        count: 0,        // 카운트
        recordData: [],  // 타수기록
        averageSpeed: 0
    }

    // 변수값 초기화
    let successPoint  // 성공시 게이지퍼센트


    // 타이핑 이벤트
    const onTypingHandler = event => {
        typingEventCheck();   // 입력한 글자 체크

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
    
        if(event.code == KEY_TYPE.SPACE){       // 스페이스바를 입력했을 때
            perfectTypingCheck(event.code);            
        }else if(event.code == KEY_TYPE.ENTER){
            perfectTypingCheck(event.code);     // 엔터를 입력했을 때
        }else{
            perfectTypingCheck("null");
        }
    }

    /**
     * 타이핑이 완료됐을때 체크
     */
    const perfectTypingCheck = (key) => {
        let typingValue = inputTyping.value;
        let answer = tempContent.contents;
        
        if(    (key == KEY_TYPE.SPACE && typingValue.length-1 == answer.length)   // 스페이스바 일때
            || (key == KEY_TYPE.ENTER && typingValue.length == answer.length)   // 엔터키일때
            || (key == "null" && typingValue.length-1 > answer.length)){
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

            // 타수기록
            archive.recordData.push(wordSpeed);

            // 평균타수
            let sumSpeed = 0;
            archive.recordData.forEach((data) => {
                sumSpeed += Number(data);
            })
            archive.averageSpeed = Math.floor(sumSpeed / archive.recordData.length);

            wave.addWave(successPoint, archive); 
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
            liveGrammarCheck(typingValue);
        }, 60);

        // 실시간 타수 체크
        setInterval(() => {
            let passData = getCorrectContents();
            liveTypingSpeed(passData);
        }, 150);
    }
    
    /**
     * 실시간 체킹 Stop
     */
    const stopLiveCheck = () => {
        clearInterval();
    }


    /**
     * 
     * 실시간 타이핑 문장 체크
     * 감점계산과 스타일을 변경한다.
     * @param {타이핑한 모든 문자열} typingValue 
     * @returns 
     */
    const liveGrammarCheck = async(typingValue) => {
        const displayContents = document.querySelectorAll("#tempContents");
        const contents = tempContent.contents;
        for(let i = 0; i < typingValue.length; i++){
            if(typingValue.length <= contents.length){
                // 일치하지않는 문자가 빈값일때
                if(contents.charAt(i) == " " && typingValue.charAt(i) != " " && displayContents[i].className != "wrong"){ 
                    displayContents[i].innerHTML = "_"; 
                    displayContents[i].className = "wrong";
                }
                
                // 일치한 문자가 빈값일때
                if(contents.charAt(i) == " " && typingValue.charAt(i) == " "){ 
                    displayContents[i].innerHTML = " "; 
                    displayContents[i].className = "correct";
                }

                if(contents.charAt(i) == typingValue.charAt(i)){   // 문자가 일치하면
                    displayContents[i].className = "correct";
                }
                else if(typingValue.length == i+1){               // 현재 타이핑중인 문자라면
                    displayContents[i].className = "normal";
                }
                else if(displayContents[i].className != "wrong"){      
                    displayContents[i].className = "wrong";
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
    }

    /**
     * 실시간 타수계산
     * 맞힌 문자로만 계산한다.
     * @param {맞힌 값} correctValue 
     * @returns 
     */
    const liveTypingSpeed = (correctValue) => {
        let typingCount = vowerUtil.getConstantVowelCount(correctValue);

        let endTime = new Date();   // 종료시간 가져오기
        let resultTime = (endTime.getTime() - startTime.getTime()) / 1000; // 분당시간 
        let resultSpeed = parseInt((typingCount - missScore) / (resultTime / 60)); // 입력한 글자 - 틀린글자 / 분당시간
        
        missScore = 0;

        if(resultSpeed < 0){
            typingSpeed.innerHTML = 0;
        }else{
            typingSpeed.innerHTML = resultSpeed;
        }
    }

    /**
     * 입력한 글자 체크 
     * 흔들림이벤트, 감점
     */
    const typingEventCheck = () => {
        const displayContents = document.querySelectorAll("#tempContents");
        const contents = tempContent.contents;
        const inputText = inputTyping.value;
        if(vowerUtil.isCompareChar(contents.charAt(inputText.length-1), inputText.charAt(inputText.length-1))){
            mainhead.classList.remove('shake');
            mainhead.classList.add("shake")
            setTimeout(function() {
                mainhead.classList.remove('shake');
            }, 50);
            missScore++;
            console.log(missScore)
        }
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
     const initTypingSetting = async(point) => {
        successPoint = point;                  // 성공시 퍼센트게이지
        tempContent = typingCreate.initTypingCreateTemp();
        wave.setWave(0);
    }


    /**
     * 이벤트 설정
     */
    const initEventListeners = () => {
        inputTyping.addEventListener(EVENT_TYPE.KEY_UP, onTypingHandler);
    }


    this.init = (model) => {
        initTypingSetting(model);
        initEventListeners();
    }
}