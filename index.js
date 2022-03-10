// met le menu en couleur ou non selons si il est au top 
window.onscroll = () => {
    const navbar = document.getElementById('menu');
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
        navbar.classList.add("nav-colored");
        navbar.classList.remove("nav-transparent");
    } 
    else {
        navbar.classList.add("nav-transparent");
        navbar.classList.remove("nav-colored");
    }
};

let show =false;
let lastElem;
//si on clique sur un autre dropdown
function focused(){
    if(lastElem !== document.activeElement)
        show=false;
}
//lorsqu'on clique sur un dropdown on l'affiche ou sinon fait disparaitre le dropdown
function clicked(){
    console.log(show);
    if (show){  
        document.activeElement.blur();
        show=false;
    }
    else{
        show=true;
        lastElem=document.activeElement;
    }
}
// au focus de l'input de la search bar
function highlight(){
    const searchlogo = document.getElementById("search");
    searchlogo.classList.add("navfocus")
}
// au blur de l'input de la search bar
function dehighlight(){
    const searchlogo = document.getElementById("search");
    searchlogo.classList.remove("navfocus")
}


const scrollMax = window.innerHeight-60;
let menuMax;
let scrollPos,sideNavActive=false;
//gestion du click de la side nav
function showsidenav(){
    const menu = document.getElementById("menu");
    const navleft = document.getElementById("navleft");
    if(window.getComputedStyle(navleft).display === "none"){ 
        sideNavActive=true;
        menu.style.position="sticky";
        scrollPos=window.scrollY;
        window.scrollTo(0,scrollMax);
        navleft.style.display="block";
        menuMax=navleft.offsetHeight+60;
        setTimeout(()=>{
            navleft.style.opacity=1;
        });
    }else{
        menu.style.position="fixed";
        sideNavActive=false;
        // document.body.style.overflow="auto";
        window.scrollTo(0,scrollPos);
        navleft.style.display="none";
        setTimeout(()=>{
            navleft.style.opacity=0;
        });
    }
}

window.addEventListener('resize',()=>{
    sideNavActive=false;
    menu.style.position="fixed";
    if(window.innerWidth>1200){
        const navleft = document.getElementById("navleft");
        navleft.style.opacity=1;
        navleft.style.display="flex";
    }else{
        navleft.style.display="none";
    }

});


window.addEventListener('scroll',()=>{
    console.log(menuMax);
    if(sideNavActive && window.scrollY<scrollMax){
        window.scrollTo(0,scrollMax);
    }
    if(sideNavActive && window.scrollY>document.getElementById("navleft").clientHeight+80){
        window.scrollTo(0,document.getElementById("navleft").clientHeight+80);
    }
    scrollTop = document.getElementById("scrollTop");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollTop.style.display = "block";
      } else {
        scrollTop.style.display = "none";
      }
});


function topFunction(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// Carousel
var slideIndex,slides,dots,captionText;
function initGallery(){
    slideIndex = 0;
    slides=document.getElementsByClassName("imageHolder");
    slides[slideIndex].style.opacity=1;

    captionText=document.querySelector(".captionTextHolder .captionText");
    captionText.innerText=slides[slideIndex].querySelector(".captionText").innerText;

    //disable nextPrevBtn if slide count is one
    if(slides.length<2){
        var nextPrevBtns=document.querySelector(".leftArrow,.rightArrow");
        nextPrevBtns.style.display="none";
        for (i = 0; i < nextPrevBtn.length; i++) {
            nextPrevBtn[i].style.display="none";
        }
    }

    //add dots
    dots=[];
    var dotsContainer=document.getElementById("dotsContainer"),i;
    for (i = 0; i < slides.length; i++) {
        var dot=document.createElement("span");
        dot.classList.add("dots");
        dotsContainer.append(dot);
        dot.setAttribute("onclick","moveSlide("+i+")");
        dots.push(dot);
    }
    dots[slideIndex].classList.add("active");
}
initGallery();
function plusSlides(n) {
    moveSlide(slideIndex+n);
}
function moveSlide(n){
    var i;
    var current,next;
    var moveSlideAnimClass={
          forCurrent:"",
          forNext:""
    };
    var slideTextAnimClass;
    if(n>slideIndex) {
        if(n >= slides.length){n=0;}
        moveSlideAnimClass.forCurrent="moveLeftCurrentSlide";
        moveSlideAnimClass.forNext="moveLeftNextSlide";
        slideTextAnimClass="slideTextFromTop";
    }else if(n<slideIndex){
        if(n<0){n=slides.length-1;}
        moveSlideAnimClass.forCurrent="moveRightCurrentSlide";
        moveSlideAnimClass.forNext="moveRightPrevSlide";
        slideTextAnimClass="slideTextFromBottom";
    }

    if(n!=slideIndex){
        next = slides[n];
        current=slides[slideIndex];
        for (i = 0; i < slides.length; i++) {
            slides[i].className = "imageHolder";
            slides[i].style.opacity=0;
            dots[i].classList.remove("active");
        }
        current.classList.add(moveSlideAnimClass.forCurrent);
        next.classList.add(moveSlideAnimClass.forNext);
        dots[n].classList.add("active");
        slideIndex=n;
        captionText.style.display="none";
        captionText.className="captionText "+slideTextAnimClass;
        captionText.innerText=slides[n].querySelector(".captionText").innerText;
        captionText.style.display="block";
    }

}
var timer=null;
function setTimer(){
    timer=setInterval(function () {
        plusSlides(1) ;
    },3000);
}
setTimer();



// Modal

const span = document.getElementsByClassName("close")[0];
const btn = document.getElementById("myBtn");
const modalcontent =document.getElementById('myModalContent');
const modal = document.getElementById('myModal');

function showModal() {
    const modalcontent =document.getElementById('myModalContent');
    const modal = document.getElementById('myModal');
    modal.style.display="block";
    modal.style.animation = "fadeIn .50s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards";
    modalcontent.style.animation="scaleUp .5s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards";
    modal.style.zIndex="100";
    modal.style.transform="scale(1)";
}

function closeModal() {
    const modalcontent =document.getElementById('myModalContent');
    const modal = document.getElementById('myModal');
    modal.style.animation="quickScaleDown 0s .50s linear forwards";
    modalcontent.style.animation="scaleDown .5s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.animation="quickScaleDown 0s .50s linear forwards";
        modalcontent.style.animation="scaleDown .5s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards";
    }
}
