import {FIRST_CONSONANT as FIRST, MIDDLE_VOWER as MIDDLE, LAST_CONSONANT as LAST, SPECIAL_VOWER as SPECIAL} from '../utils/constants.js';

export default function VowerUtil() {
    /**
     * 문지열 타수 계산
     * @param {문자열} kor 
     * @returns 
     */
    const getConstantVowelCount = (str) => {
        const ga = 44032;
        let size = 0;

        for(let i = 0; i < str.length; i++){
            let uni = str.charCodeAt(i);

            uni = uni - ga;
    
            let f = parseInt(uni / 588);
            let m = parseInt((uni - (f * 588)) / 28);
            let l = parseInt(uni % 28);
            
            // 초성 계산
            if(FIRST[f] != ""){
                size += 1;
            }

            // 중성 계산
            if(SPECIAL.indexOf(MIDDLE[m]) != -1){ // 특별한 문자라면 'ㅙ, ㅢ, ㄶ, ㅄ ... '
                size += 2;
            }else{
                size += 1;
            }

            // 종성 계산
            if(LAST[l] != ""){
                size += 1;
            }
        }

        return size;
    }


    /**
     * 문자의 '초성', '종성', '종성'을 가지고 온다.
     * @param {문자열} kor 
     * @returns 
     */
    //  const getConstantVowel = (char) => {
    //     const ga = 44032;
    //     let uni = str.charCodeAt(0);

    //     uni = uni - ga;

    //     let f = parseInt(uni / 588);
    //     let m = parseInt((uni - (f * 588)) / 28);
    //     let l = parseInt(uni % 28);
        

    //     return {
    //         first: FIRST[f],
    //         middle: MIDDLE[m],
    //         last: LAST[l]
    //     };
    // }

    return{
        getConstantVowelCount
    }
}
