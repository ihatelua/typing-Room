/**
 * 유틸리티 함수 모음
 */
class Util {
    /**
     * 현재 날짜를 YYYY-MM-DD 형식으로 반환
     * @returns {string} 형식화된 날짜 문자열
     */
    static getDate() {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    /**
     * 숫자를 콤마 형식으로 변환
     * @param {number} number - 변환할 숫자
     * @returns {string} 콤마 형식의 문자열
     */
    static formatNumber(number) {
        return number.toLocaleString();
    }

    /**
     * 배열의 랜덤 요소 반환
     * @param {array} array - 배열
     * @returns {*} 랜덤 요소
     */
    static getRandomElement(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    /**
     * 요소에 지연 후 클래스 추가
     * @param {HTMLElement} element - 요소
     * @param {string} className - 클래스명
     * @param {number} delay - 지연 시간 (ms)
     */
    static addClassWithDelay(element, className, delay) {
        setTimeout(() => {
            element.classList.add(className);
        }, delay);
    }

    /**
     * 디바운스 함수
     * @param {Function} func - 실행할 함수
     * @param {number} wait - 대기 시간 (ms)
     * @returns {Function} 디바운스된 함수
     */
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

export default Util;
