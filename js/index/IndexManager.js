import { initIndexSlideTemp } from '../utils/templates.js';

/**
 * 인덱스 페이지 관리 모듈
 */
class IndexManager {
    constructor() {
        this.gnbElement = document.getElementsByClassName("gnb")[0];
        this.scrollElements = document.getElementsByClassName("scroll");
        this.autoSlideCounter = 2;
        this.autoSlideInterval = null;

        this.init();
    }

    /**
     * 모듈 초기화
     */
    init() {
        this.setupModules();
        this.setupEventListeners();
    }

    /**
     * 모듈 및 템플릿 설정
     */
    setupModules() {
        const slideData = [
            {
                red: '50',
                green: '214',
                blue: '200',
                starArr: ['star', 'star', 'half-star', 'blank-star', 'blank-star'],
                level: '5',
                funitureCnt: '54',
                question: 'RANDOM'
            },
            {},
            {},
            {}
        ];

        initIndexSlideTemp('slider', slideData);
    }

    /**
     * 이벤트 리스너 설정
     */
    setupEventListeners() {
        this.setupMenuClickEvent();
        this.setupScrollEvent();
        this.setupAutoSlideEvent();
    }

    /**
     * 메뉴 클릭 이벤트 설정
     */
    setupMenuClickEvent() {
        for (let i = 0; i < this.gnbElement.children.length; i++) {
            const link = this.gnbElement.children[i].firstChild;
            link.addEventListener('click', (event) => this.handleMenuClick(event, i));
        }
    }

    /**
     * 메뉴 클릭 핸들러
     */
    handleMenuClick(event, index) {
        event.preventDefault();
        
        this.updateSelectedMenu(index);

        const target = event.target;
        const sectionId = target.attributes.href.value.substr(1);
        this.scrollToSection(sectionId);
    }

    /**
     * 선택된 메뉴 업데이트
     */
    updateSelectedMenu(index) {
        const selectedElement = document.getElementsByClassName("selected")[0];
        if (selectedElement) {
            selectedElement.className = "";
        }
        this.gnbElement.children[index].firstChild.className = "selected";
    }

    /**
     * 섹션으로 스크롤
     */
    scrollToSection(sectionId) {
        const section = document.getElementsByClassName(sectionId)[0];
        if (section) {
            const offset = section.offsetTop - 100;
            window.scrollTo({ top: offset, behavior: 'smooth' });
        }
    }

    /**
     * 스크롤 이벤트 설정
     */
    setupScrollEvent() {
        window.addEventListener("scroll", () => this.handleScroll());
    }

    /**
     * 스크롤 핸들러
     */
    handleScroll() {
        const scrollY = window.scrollY;

        for (let i = 0; i < this.scrollElements.length; i++) {
            const offsetTop = this.scrollElements[i].offsetTop;

            if (offsetTop - 150 <= scrollY) {
                this.updateSelectedMenu(i);
            }
        }
    }

    /**
     * 자동 슬라이드 이벤트 설정
     */
    setupAutoSlideEvent() {
        this.autoSlideInterval = setInterval(() => {
            document.getElementById(`radio${this.autoSlideCounter}`).checked = true;
            this.autoSlideCounter++;

            if (this.autoSlideCounter > 4) {
                this.autoSlideCounter = 1;
            }
        }, 5000);
    }

    /**
     * 정리
     */
    destroy() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
        }
    }
}

// 페이지 로드 시 초기화
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new IndexManager();
    });
} else {
    new IndexManager();
}