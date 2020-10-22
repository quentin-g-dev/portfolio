/////////////////////////////////showSkillDetails

function showSkillDetails() {
    for (let i = 0; i < document.querySelectorAll(".profile-content .skill").length; i++) {
        let skill = document.querySelector('.skill[data-skill="' + i + '"]');
        let skillHTML = document.querySelector('.skill[data-skill="' + i + '"]').innerHTML;

        function showDetails() {
            if (skill.style.flexDirection !== "column") {
                skill.innerHTML = document.querySelector('.skill-details[data-skill="' + i + '"]').innerHTML;
                skill.style.flexDirection = "column";
            } else {
                skill.innerHTML = skillHTML;
                skill.style.flexDirection = "column-reverse";
            }
        }
        skill.addEventListener("click", showDetails);
    }
}

////////////////////////////////showExpDetails

function showOutput(item) {
    let text = document.querySelector('p[data-id="' + item + '"]').innerHTML;
    let img = document.querySelector('img[data-id="' + item + '"]').outerHTML;
    document.querySelector('.text-output').innerHTML = text;
    document.querySelector('.text-output').style.textAlign = "justify";
    document.querySelector('.img-output').innerHTML = img;
}

function activeItem(item) {
    let itemElements = document.querySelectorAll('li[data-id="' + item + '"]>*');
    let items = document.querySelectorAll('li[data-id]');
    for (let i = 0; i < itemElements.length; i++) {
        itemElements[i].classList.add("active");
    }
    for (let i = 0; i < items.length; i++) {
        if (i !== item) {
            let inactiveElements = document.querySelectorAll('li[data-id="' + i + '"] >*');
            for (let j = 0; j < inactiveElements.length; j++) {
                if (inactiveElements[j].classList.contains("active")) {
                    console.log(i + " " + j + " contains active")
                    inactiveElements[j].classList.remove("active");
                }
            }
        }
    }
}

function showExpDetails() {
    let items = document.querySelectorAll('li[data-id]');
    for (let i = 0; i < items.length; i++) {
        items[i].addEventListener("click", function () {
            showOutput(i);
            activeItem(i);
        });
    }
}

////////////////////////////////copyMail

function copyMailMsgBack() {
    document.querySelector(".email-note ").innerHTML = '(Cliquez sur l\'e-mail pour le copier)';
    document.querySelector(".email-note").style.backgroundColor = "transparent";
    document.querySelector(".email-note").style.color = "#f2f2f2";
    document.querySelector(".email-note").style.fontWeight = "normal";
}

function copyMailConfirm() {
    document.querySelector(".email-note").innerHTML = "Copié dans votre presse-papiers !";
    document.querySelector(".email-note").style.backgroundColor = "#959595";
    document.querySelector(".email-note").style.color = "#000";
    document.querySelector(".email-note").style.fontWeight = "bold";
    setTimeout(copyMailMsgBack, 2200);
}

function copyMail() {
    navigator.clipboard.writeText("qgermain@gmail.com").then(copyMailConfirm);
}

//////////////////////////////////////responsiveHeader

function toggleDesktopHeader() {
    let header = document.querySelector("#header");
    let nav = document.querySelector("nav");
    if (window.scrollY > 811) {
        header.style.display = "flex";
        header.style.position = "fixed";
        header.style.top = "0%";
        header.style.width = "100vw";
        nav.style.position = "fixed";
        nav.style.top = "8%";
        nav.style.opacity = "20%";
        nav.style.width = "100vw";
        nav.addEventListener("mouseenter", function () {
            nav.style.opacity = "100%";
        });
        nav.addEventListener("mouseleave", function () {
            nav.style.opacity = "20%";
        });
    }
    if (window.scrollY < 811) {
        header.style.visibility = "hidden";
        nav.style.visibility = "hidden";
    } else {
        header.style.visibility = "visible";
        nav.style.visibility = "visible";
    }
}

function toggleMobileHeader() {
    let header = document.querySelector("#header");
    let nav = document.querySelector("nav");
    if (window.scrollY > 635) {
        if (nav.className === "") {
            header.style.display = "flex";
            header.style.position = "fixed";
            header.style.top = "0%";
            header.style.width = "100vw";
            document.querySelector(".hamburger").addEventListener("click", mobileMenu);
        }
    } else {
        if (nav.className === "") {

            header.style.display = "none";
        }
    }
}

function mobileMenu() {
    if (window.innerWidth < 1300) {
        let nav = document.querySelector("nav");
        let sections = document.querySelectorAll('section');
        if (nav.className === "") {
            nav.className += "show-me";
            for (let i = 0; i < sections.length; i++) {
                sections[i].style.display = "none";
            }
            document.querySelector('#header').style.display = "flex !important";
        } else {
            nav.className = "";
            for (let i = 0; i < sections.length; i++) {
                sections[i].style.display = "flex";
            }
            window.scrollTo(0, 100);
        }
    }
}

function responsiveHeader() {
    let nav = document.querySelector("nav");
    if (window.innerWidth > 1300) {
        document.addEventListener("scroll", toggleDesktopHeader);
    } else {
        document.addEventListener("scroll", toggleMobileHeader);
        nav.addEventListener("click", mobileMenu);
    }
}

//////////////////////////////animatePortfolio

function animatePortfolio() {
    responsiveHeader();
    showSkillDetails();
    showExpDetails();
    document.querySelector(".email-box").addEventListener("click", copyMail);
    document.querySelector(".email-box").addEventListener("touchstart", copyMail);
}

////////////////////////////EXECUTION

animatePortfolio();
