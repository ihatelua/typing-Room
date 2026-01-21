/**
 * 요청 및 파라미터 처리 유틸리티
 */
class Request {
    /**
     * URL 파라미터에서 특정 값 추출
     * @param {string} name - 파라미터명
     * @returns {string} 파라미터 값
     */
    static getParameter(name) {
        const url = new URL(window.location.href);
        return url.searchParams.get(name) || '';
    }

    /**
     * 모든 URL 파라미터를 객체로 반환
     * @returns {Object} 파라미터 객체
     */
    static getAllParameters() {
        const url = new URL(window.location.href);
        const params = {};

        url.searchParams.forEach((value, key) => {
            params[key] = value;
        });

        return params;
    }

    /**
     * URL 파라미터 설정
     * @param {string} name - 파라미터명
     * @param {string} value - 파라미터 값
     */
    static setParameter(name, value) {
        const url = new URL(window.location.href);
        url.searchParams.set(name, value);
        window.history.pushState({}, '', url);
    }

    /**
     * GET 요청 (Promise 기반)
     * @param {string} url - 요청 URL
     * @returns {Promise} 응답 데이터
     */
    static async get(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('GET request failed:', error);
            throw error;
        }
    }

    /**
     * POST 요청 (Promise 기반)
     * @param {string} url - 요청 URL
     * @param {Object} data - 전송 데이터
     * @returns {Promise} 응답 데이터
     */
    static async post(url, data) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('POST request failed:', error);
            throw error;
        }
    }
}

export default Request;