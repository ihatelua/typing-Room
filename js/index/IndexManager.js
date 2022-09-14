function Admin() {
    /**
     * 메뉴선택시 스크롤 이벤트
     */
    const selectedMenuEvent = () => {
        let sections = document.getElementsByClassName("gnb")[0].children;
        for(let i = 0; i < sections.length; i++){
            let section = sections[i].firstChild;
            section.addEventListener('click', (e) => {
                let target = e.target;

                // selected 변경
                if(document.getElementsByClassName("selected")[0] != 'undefined'){
                    document.getElementsByClassName("selected")[0].className = ""
                }
                e.target.className = "selected"

                // 스크롤 이동
                let href = target.attributes.href.value.substr(1);
                let offset = document.getElementsByClassName(href)[0].offsetTop
                window.scrollTo({top: offset-100, behavior: 'smooth'});
            });
        }
    }
    
    /**
     * 스크롤시 메뉴선택 이벤트
     */
    const scrollMenuEvent = () => {
        let scrollY = window.scrollY;
        let scrolls = document.getElementsByClassName("scroll");
        let sections = document.getElementsByClassName("gnb")[0].children;
        for(let i = 0; i < scrolls.length; i++){
            let offsetTop = document.getElementsByClassName("scroll")[i].offsetTop;
            if(offsetTop-150 <= scrollY){
                if(document.getElementsByClassName("selected")[0] != 'undefined'){
                    document.getElementsByClassName("selected")[0].className = ""
                }
                sections[i].firstChild.className = "selected";
            }
        }
    }

    /**
     * section2 오토 슬라이드 이벤트
     */
    const autoSlidesEvent = () => {
        let counter = 2;
        setInterval(() => {
            document.getElementById("radio" + counter).checked = true;
            counter++;
            if(counter > 4){
                counter = 1;
            }
        }, 5000);
    }

    /**
     * 모듈 및 템플릿 세팅
     */
    const setModules = () => {

    }

    /**
     * 이벤트 세팅
     */
    const setEvent = () => {
        // 메뉴선택시 스크롤
        selectedMenuEvent();

        // 스크롤시 메뉴선택
        window.addEventListener("scroll", () => {
            scrollMenuEvent();
        });

        // section2 오토 슬라이드 이벤트
        autoSlidesEvent();
    }

    this.init = () => {
        setModules();
        setEvent();
    }
}