/**
 * 한글 문자 분석 유틸리티
 * 초성, 중성, 종성을 분석하여 타이핑 검증
 */

import {
    FIRST_CONSONANT as FIRST,
    MIDDLE_VOWER as MIDDLE,
    LAST_CONSONANT as LAST,
    SPECIAL_VOWER as SPECIAL
} from '../utils/constants.js';

class CharacterUtil {
    static KOREAN_CODE_START = 44032;
    static KOREAN_CODE_END = 55203;
    static KOREAN_BASE = 44032;
    static FIRST_CONSONANT_COUNT = 588;
    static MIDDLE_VOWER_COUNT = 28;

    /**
     * 문자열의 한글 문자 개수 계산
     * 초성, 중성, 종성을 개별 카운트
     * @param {string} str - 입력 문자열
     * @returns {number} 계산된 문자 개수
     */
    getConstantVowelCount(str) {
        let count = 0;

        for (let i = 0; i < str.length; i++) {
            const charCode = str.charCodeAt(i);

            if (this.isKorean(charCode)) {
                count += this.countKoreanCharComponents(charCode);
            } else {
                count += 1;
            }
        }

        return count;
    }

    /**
     * 한글 문자인지 확인
     * @param {number} charCode - 문자 코드
     * @returns {boolean}
     */
    isKorean(charCode) {
        return charCode >= CharacterUtil.KOREAN_CODE_START && charCode <= CharacterUtil.KOREAN_CODE_END;
    }

    /**
     * 한글 문자의 구성 요소 개수 계산
     * @param {number} charCode - 문자 코드
     * @returns {number} 초성 + 중성 + 종성 카운트
     */
    countKoreanCharComponents(charCode) {
        const adjustedCode = charCode - CharacterUtil.KOREAN_BASE;

        const firstIndex = Math.floor(adjustedCode / CharacterUtil.FIRST_CONSONANT_COUNT);
        const middleIndex = Math.floor((adjustedCode % CharacterUtil.FIRST_CONSONANT_COUNT) / CharacterUtil.MIDDLE_VOWER_COUNT);
        const lastIndex = adjustedCode % CharacterUtil.MIDDLE_VOWER_COUNT;

        let count = 0;

        // 초성 계산
        if (FIRST[firstIndex] !== "") {
            count += 1;
        }

        // 중성 계산
        if (SPECIAL.includes(MIDDLE[middleIndex])) {
            count += 2;
        } else {
            count += 1;
        }

        // 종성 계산
        if (SPECIAL.includes(LAST[lastIndex])) {
            count += 2;
        } else {
            count += 1;
        }

        return count;
    }

    /**
     * 문자의 초성, 중성, 종성 추출
     * @param {string} char - 단일 문자
     * @returns {object} { first, middle, last } 객체
     */
    getCharacterComponents(char) {
        if (char.length === 0) return {};

        const charCode = char.charCodeAt(0);

        if (!this.isKorean(charCode)) {
            return {};
        }

        const adjustedCode = charCode - CharacterUtil.KOREAN_BASE;
        const firstIndex = Math.floor(adjustedCode / CharacterUtil.FIRST_CONSONANT_COUNT);
        const middleIndex = Math.floor((adjustedCode % CharacterUtil.FIRST_CONSONANT_COUNT) / CharacterUtil.MIDDLE_VOWER_COUNT);
        const lastIndex = adjustedCode % CharacterUtil.MIDDLE_VOWER_COUNT;

        const result = {};

        if (FIRST[firstIndex] && FIRST[firstIndex] !== '') {
            result.first = FIRST[firstIndex];
        }

        if (MIDDLE[middleIndex] && SPECIAL.indexOf(MIDDLE[middleIndex]) === -1) {
            result.middle = MIDDLE[middleIndex];
        }

        if (LAST[lastIndex] && SPECIAL.indexOf(LAST[lastIndex]) === -1) {
            result.last = LAST[lastIndex];
        }

        return result;
    }

    /**
     * 두 문자를 비교하여 다른지 확인
     * @param {string} char1 - 비교 문자1
     * @param {string} char2 - 비교 문자2
     * @returns {boolean} 다르면 true
     */
    isCompareChar(char1, char2) {
        const components1 = this.getCharacterComponents(char1);
        const components2 = this.getCharacterComponents(char2);

        const keys1 = Object.keys(components1);
        const keys2 = Object.keys(components2);

        // 더 작은 개수의 키 세트로 비교
        const minLength = Math.min(keys1.length, keys2.length);

        for (let i = 0; i < minLength; i++) {
            const key = keys1[i];
            if (components1[key] !== components2[key]) {
                return true;
            }
        }

        return false;
    }
}

export default CharacterUtil;
