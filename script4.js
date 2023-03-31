"use strict";
const modal = document.querySelector(".modal");//storing
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
// console.log(btnsOpenModal);

//To avaoid DRY principle--
//openModal function and closeModal function--
const openModal = function (e) {
    e.preventDefault();
    console.log("button clicked!");
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");

}
const closeModal = function () {
    console.log("close button is pressed!");
    modal.classList.add("hidden");
    overlay.classList.add("hidden");

}
btnsOpenModal.forEach(btn => btn.addEventListener("click", openModal
));

//window display on buttons click--
// for(let i=0;i<btnsOpenModal.length;i++){
//     btnsOpenModal[i].addEventListener("click",openModal
//     );
// }


// window close when press on button--
// btnCloseModal.addEventListener("click",function(){
//     console.log("close button is pressed!")
// modal.classList.add("hidden");
// overlay.classList.add("hidden");
// });

//window closes when click ouside the window--
// overlay.addEventListener("click",function(){
//     console.log("click outside of window to close it");
//     modal.classList.add("hidden");
//     overlay.classList.add("hidden");
// })
//OR
/////DRY---
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);//closeModal() not used 

///////////
//if you want to use  same function in multiple event listeners then we need to specify that function as an argument in multiple event listners methods. 

///ESC key method--//global(Keyboard event)--

// (keypress- pressing key continuously,keydown-pressing,keyup-removing from pressed key)
document.addEventListener("keydown", function (e) {
    console.log("A key was pressed");//for anypress--
    //here we r not calling function we r just defining it
    console.log(e.key);
    if (e.key === "Escape") {
        // console.log("Esc was presswd.")
        if (!modal.classList.contains("hidden")) {
            closeModal();
        }
    }

});
// close only for escape--
//as soon as any key is pressed a "keydown" event is generated and our listner function or (handler function ) is waiting for that event to happen and event happens  than javascript in fact generate an Object that contain all the information about event itself and we can access that object in the event handler function as an argument.
// How to know which key is pressed--
// lets give this function a parameter "e" and call it a event 
//when that keydown event happen call this function and pass the eventobject as an argument

//scrolling---------
const btnScrollto = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
btnScrollto.addEventListener('click', function (e) {
    console.log(e);
    const s1cords = section1.getBoundingClientRect();
    console.log(s1cords);
    console.log(e.target.getBoundingClientRect());
    ///general info--
    //how much we have scrolled
    console.log('currentscroll(X/Y)', window.pageXOffset, window.pageYOffset);
    //height and width of viewport
    console.log('height/width of viewport',
        document.documentElement.clientHeight,
        document.documentElement.clientWidth);

    //scrolling
    //    window.scrollTo(
    //     s1cords.left+window.pageXOffset,
    //     s1cords.top+window.pageYOffset);

    //new way by creating object
    // window.scrollTo({
    //     left:s1cords.left+window.pageXOffset,
    //     top:s1cords.top+window.pageYOffset,
    //     behavior:'smooth',
    // });

    //more modern way--
    section1.scrollIntoView({ behavior: 'smooth' });

});
////////////////////////////////////////
// PageNavigation(event delegation on each element)
// console.log(document.querySelectorAll('.nav__link'));//it will write nodelist
document.querySelectorAll('.nav__link').forEach(function (el) {
    el.addEventListener('click', function (e) {
        //to avoid default behavior of move to section will stop that
        e.preventDefault();
        //now to move the section smoothly we need id 
        const id = this.getAttribute('href');
        console.log(id);
        document.querySelector(id).scrollIntoView({ behavior: 'smooth' });

        // console.log('link');//to check  
    });

});

//in event delegation -events bubble up so instead of applying the event to all the elements we apply to there common parent 
// we will put eventlistner to their common parent and when user click the link that is elements ,as we all know that event is generated and bubbling happen so we can handle that event here bcz we also know where our event was happen 

// event delegation on there common parent
// 1. add event listner to common parent element 
//2. determine what element originated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
    console.log(e.target);
    e.preventDefault();

    //Matching stragey
    if (e.target.classList.contains('nav__link')) {
        console.log('link');
        const id = e.target.getAttribute('href');
        console.log(id);
        document.querySelector(id).scrollIntoView({ behavior: 'smooth' });

    }
});/*
////////////////////////////////////////DoMTraversing/////////////////////
//goingUpward ,Downward and sideways
const h1 =document.querySelector('h1');
//going downwards///selecting childnode
//here we have selected all the highlight class, which is child node of h1 and it will return nodelist
console.log(h1.querySelectorAll('.highlight'));//nodelist
console.log(h1.childNodes);//all kinds of children//nodelist
console.log(h1.children);//html collection
h1.firstElementChild.style.color ='white';
h1.lastElementChild.style.color ='white';

//going upward--selecting parentnode
console.log(h1.parentNode);
console.log(h1.parentElement);
h1.closest ('.header').style.background ='var(--gradient-primary)';
// closest method find parent but querselector find children.

//going sideways
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);
//when we want sibling moveup to parent and write all child 
console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function(el){
    if(el!==h1){
        el.style.transform ='scale(0.5)';
    };
});
*/
////////////////////////////////Tabbed Component////////////////

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
// tabs.forEach(t=>t.addEventListener('click',()=>
// console.log('TAB')));
//applying event on all tabs will make system slow so we apply on common parent
tabsContainer.addEventListener('click', function (e) {
    // const clicked=e.target.parentElement;//but we gwt parent of button also
    const clicked = e.target.closest('.operations__tab');
    console.log(clicked);
    if (!clicked) return;//clicked=false so its true
    // if we click inside the parent element but not on target then it will give null

    //remove active class for both tab and tabcontent
    tabs.forEach(t => t.classList.remove('operations__tab--active'));
    tabsContent.forEach(c => c.classList.remove('operations__content--active'));

    //activate tab
    clicked.classList.add('operations__tab--active');

    //activate content
    console.log(clicked.dataset.tab);
    document
        .querySelector(`.operations__content--${clicked.dataset.tab}`)
        .classList.add('operations__content--active');


});

///////////////////////////Passing arguments to EventHandler///////
//Menu Fade event//////////////
const nav = document.querySelector('.nav');
// mouseover event-- it bubbles up that means if the event happen in child it works on parent as well.ita opposite is mouseout 
//mouseenter event -- it will not propogate it will happen only on one element and its opposite is mouseleave

//DRY
const handleHover = function (e, opacity) {
    if (e.target.classList.contains('nav__link')) {
        const link = e.target;
        console.log(link);
        const sibling = link.closest('.nav').querySelectorAll('.nav__link');
        const logo = link.closest('.nav').querySelector('img');//we can select logo by its class name manually but what if there are many img
        sibling.forEach(el => {
            if (el !== link) el.style.opacity = opacity;
        });
        logo.style.opacity = opacity;

    }
};


//old way
// nav.addEventListener('mouseover', function (e) {
//     if (e.target.classList.contains('nav__link')) {
//         const link = e.target;
//         console.log(link);
//         const sibling = link.closest('.nav').querySelectorAll('.nav__link');
//         const logo = link.closest('.nav').querySelector('img');//we can select logo by its class name manually but what if there are many img
//         sibling.forEach(el => {
//             if (el !== link) el.style.opacity = 0.5;
//         });
//         logo.style.opacity = 0.5;

//     }
// });
// nav.addEventListener('mouseout', function (e) {
//     if (e.target.classList.contains('nav__link')) {
//         const link = e.target;

//         const sibling = link.closest('.nav').querySelectorAll('.nav__link');
//         const logo = link.closest('.nav').querySelector('img');//we can select logo by its class name manually but what if there are many img
//         sibling.forEach(el => {
//             if (el !== link) el.style.opacity = 1;
//         });
//         logo.style.opacity = 1;

//     }
// });

//newway
nav.addEventListener('mouseover', function (e) {
    //here js expect the function not the function with valuesor parameter
    handleHover(e, 0.5);
});

nav.addEventListener('mouseout', function (e) {
    handleHover(e, 1);
});

//bind method creats a copy  of the function that its called on and it will set this keyword in this function call to whatever value that we pass into bind

//more precise way
//passing an argument into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));
/*
//Implement sticky navigation/////////////////////
const initialCords = section1.getBoundingClientRect();
console.log(initialCords.top);

window.addEventListener('scroll', function () {
    console.log(window.scrollY);
    if (window.scrollY > initialCords.top) nav.classList.add('sticky');
    else nav.classList.remove('sticky');
});
*/

//Intersection Observer API//////////////////////////////////////
//we need intesection observer API for fancy scroll base animation ,lazy loading, infinite scrolling
// Its better than doing setinterval() or adding event for scroll.
// it will happen when our section is intersecting or leaving the page.

// API allow to  observe changes that certain target element intersect another element or viewport
const obsCallback = function (entries, observer) {
    entries.forEach(entry => {
        console.log(entry.target);
    });
    //callback function will get called when our target element is intersecting with root element we set

};
const obsOptions = {
    root: null,//root is element which our target(section1) element intersects. here null means viewport
    threshold: [0, 0.5],//threshold is percentage of intersection at which our observer callback is called 
    rootMargin: '',
};//object
const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1);//observe method is call on observer (which contain intersectionobserver API) section 1 is target element

//we are observing header after header we want sticky nav bar
const header = document.querySelector('.header');
const navheight = nav.getBoundingClientRect().height;
console.log(navheight);
const stickyNav = function (entries) {
    const [entry] = entries;
    console.log(entry.isIntersecting);
    if (entry.isIntersecting) {
        nav.classList.remove('sticky');
    }
    else {
        nav.classList.add('sticky');
    }

};
const headObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navheight}px`
});
headObserver.observe(header);

//Revealing elements //////////////////
// here revealing of all the section when certain portion of section is visible in on viewport and then it will be visible and slitely move upward
const allSections = document.querySelectorAll('.section');//multiple sections
const revealSection = function (entries, observer) {//callbackfunction
    const [entry] = entries;
    console.log(entry);
    //for first entry it will always be isInersecting is false bcz header is on viewport not section so isIntersecting will be false.
    // so when its intersecting we want to remove the hidden class 
    // guard clause
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    //then observer to unobserve the things bcz we want entries once on scroll not everytime and also we dont want entries after visibility.
    observer.unobserve(entry.target);//
}
const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
});
//multiple section so apply foreach method and then apply observer to observe on each section
allSections.forEach(function (section) {
    sectionObserver.observe(section);
    // section.classList.add('section--hidden');
});

/////////////Lazy Loading//////////////////////
const imgtarget = document.querySelectorAll('img[data-src]');//Nodelist of 3
// console.log(imgtarget);
const loadImg = function (entries, observer) {
    const [entry] = entries;//here only one threshold so one entry
    console.log(entry);
    if (!entry.isIntersecting) { return };
    //reeplace src with data-src
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load', function () {
        entry.target.classList.remove('lazy-img');
    });
    observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
    root: null,
    threshold: 0.2,
    rootMargin: '-200px',
});
// imgTarget is nodelist so need to loop through each by ForEach
imgtarget.forEach((img) => { imgObserver.observe(img) });

//////////////////Slider Component/////////////////

const slides = document.querySelectorAll('.slide');//all slides from another element 
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
let curSlide = 0;
const maxSlide = slides.length;
//to reduce size and check
// const slider = document.querySelector('.slider');
// slider.style.transform = 'scale(0.4)translateX(-800px)';
// slider.style.overflow = 'visible';
const goToSlide = function (slide) {
    slides.forEach((s, i) => s.style.transform = `translateX(${(i - slide) * 100}%)`);
};
goToSlide(0);
//DRY
// slides.forEach((s, i) => s.style.transform = `translateX(${i * 100}%)`);
//0%,100%,200%,300%

const nexSlide = function () {
    if (curSlide === maxSlide - 1) {
        curSlide = 0;
    }
    else {
        curSlide++
    };
    goToSlide(curSlide);
    activateDot(curSlide);
    //DRY
    // slides.forEach((s, i) => s.style.transform = `translateX(${(i - curSlide) * 100}%)`);
    //curSlide =1:-100%,0%,100%,200%
};

//Next slide
btnRight.addEventListener('click', nexSlide);
// nexSlide function 
// function () {
//     if (curSlide === maxSlide - 1) {
//         curSlide = 0;
//     }
//     else {
//         curSlide++
//     };
//     goToSlide(curSlide);
//     //DRY
//     // slides.forEach((s, i) => s.style.transform = `translateX(${(i - curSlide) * 100}%)`);
//     //curSlide =1:-100%,0%,100%,200%
// };

const prevSlide = function () {
    if (curSlide === 0) {
        curSlide = maxSlide - 1;
    } else {
        curSlide--
    };
    goToSlide(curSlide);
    activateDot(curSlide);
}
btnLeft.addEventListener('click', prevSlide);//prevslide is above

//adding keyboard event sliding event using keyboard
document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nexSlide();
});

//adding the dots
const dotContainer = document.querySelector('.dots');
const createDots = function () {
    slides.forEach((s, i) => {
        dotContainer.insertAdjacentHTML('beforeend', `<button class ='dots__dot' data-slide ="${i}"</button>`);

    });
};
createDots();
//now adding event to dots we created and we want it to slide when dot is selected
dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
        const { slide } = e.target.dataset;
        goToSlide(slide);
        activateDot(slide)
    }
});
//activate Dot-background color change by using adding/removing active class
const activateDot = function (slide) {
    //removed
    document.querySelectorAll('.dots__dot')
        .forEach((dot) => dot.classList.remove('dots__dot--active'));
    //adding
    document.querySelector(`.dots__dot[data-slide='${slide}']`).classList.add('dots__dot--active');

};
activateDot(0);
/////////////////////////////////















//////////////////////////
//DOM//DOM is an interface between javascript and browser and more specifically the html document that randered in browser.
//we can write javaScript code to modify elements like deleting adding event for click event ,set styles,classes and attributes and respond to the events.
// DOM tree is generated from HTML document .
// DOM is a very complex API that contains lots of methods and properties to interact with DOM tree like querySelectors(),addEventListner(),querSelectorAll(),.innerHTML(),.textContent(),
//DOM has many different types of nodes like HTML element  ,text ,comment, documents
///////////////////////////////
// how DOM API is organized behind the scene
// every single node in dom tree is of the type node and each node is represented by javascript object and this node gets access to certain node properties .textContent,childNode,parentNode,cloneNode
// and nodes can be of 4 types element type ,text type,comment type, document type.
// so for text inside tag it has its own node.
// element (html element)node has tons of properties like .innerHTML(), .classList(),.querySelector(),and so on
// each element node can have unique properties like image element has src property and anchor element has href properties
// Inheritance  means all child type node has access to the properties and methods of their parent type
// document node is also a node in a dom tree which has methods like querSelector(),getElementBYId()....
// to allow every element in Dom to listen an event so its method of  addEventListner() will be applicable to all .there is parent node of node and window node which is EventTarget which has this method


/*
//////////Selecting ,creating and deleting elements---
console.log(document.documentElement);//selecting entire body
console.log(document.head);//selecting head
console.log(document.body);//selecting body
const header = document.querySelector('.header');//selecting the  first element having class header
const allSelection = document.querySelectorAll('.section');//selecting all elements having class as section//stores in nodelist
console.log(allSelection);
document.getElementById('section--1');//dont need '#'
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);//selecting all the elements having tag name button here we are creating HTMLCollection .Its like live collection and it get updated if any changes like deleting element
console.log(document.getElementsByClassName('btn'));
*/
/*
////////////creating and inserting element/////////////////////
// .insertAdjacentHTML
const msg = document.createElement('div');//create new element
msg.classList.add('cookie-message');//inserting class
msg.textContent = 'We use cookies for improved functionality and analytics ';
msg.innerHTML = 'We use cookies for improved functionality and analytics"<button class ="btn btn--close-cookies">Got it</button>"';
// header.prepend(msg);//add element into header as first child
header.append(msg);//add element into header as last child
//here this element can be only in one position but it is at last child position that means it is moved .
//what if want to add copies of the same element then
// header.append(msg.cloneNode(true));//now its at both places
// header.before(msg);//header sibling like before header element
// header.after(msg);//after header element

*/
/*
////////////////////////////////Deleting ///////////////////////////
// delete or remove this element when click  the button
document.querySelector('.btn--close-cookies').addEventListener('click', function () {
    // msg.remove();
    // old way
    //  msg.parentElement.removeChild(msg);
});
*/
/*

/////////////////////////////////////Styles,Attributes and Classes////

//Styles
//In jS the styles properties use camelCase notation
msg.style.backgroundColor = '#37383d';
msg.style.width = '120%';
console.log(msg.style.backgroundColor);//rgb(55,56,61);
console.log(msg.style.color);//here it wont show color bcz its not defined inline
console.log(getComputedStyle(msg).color);
console.log(getComputedStyle(msg).height);
msg.style.height = Number.parseFloat(getComputedStyle(msg).height, 10) + 40 + 'px';
console.log(getComputedStyle(msg).height);
// by simple changing values in css property we can change it everywhere-
document.documentElement.style.setProperty('--color-primary', 'orangered');


//Attributes///////
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);//Bankist logo
console.log(logo.src);//....
console.log(logo.className);//nav__logo
//these all attributes are default standard attribute and if we create new attribute it wont show us
console.log(logo.designer);//undefined
console.log(logo.getAttribute('designer'));//Namrata
//set attribute
logo.alt = 'Beautiful minimalist logo';//set the alt
logo.setAttribute('company', 'Bankist');
console.log(logo.getAttribute('company'));
//get link
console.log(logo.getAttribute('src'));//relative link
const link = document.querySelector('.twitter-link');
console.log(link.href);
console.log(link.getAttribute('href'));//same link we kept
//data attributes are the attributes that strat with data name and are stored in dataset object can access from there
console.log(logo.dataset.versionNumber);

///classes
logo.classList.add('c', 'j')//added class
logo.classList.remove('c')//removed class
logo.classList.toggle('c')//toggled class
logo.classList.contains('c')

*/


/*
////////////////////////////////////////////////
Implementing smooth scrolling----
const btnScrollto = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
btnScrollto.addEventListener('click', function (e) {
    console.log(e);
    const s1cords = section1.getBoundingClientRect();
    console.log(s1cords);
    console.log(e.target.getBoundingClientRect());
    ///general info--
    //how much we have scrolled
    console.log('currentscroll(X/Y)', window.pageXOffset, window.pageYOffset);
    //height and width of viewport
    console.log('height/width of viewport',
        document.documentElement.clientHeight,
        document.documentElement.clientWidth);

    //scrolling
    //    window.scrollTo(
    //     s1cords.left+window.pageXOffset,
    //     s1cords.top+window.pageYOffset);

    //new way by creating object
    // window.scrollTo({
    //     left:s1cords.left+window.pageXOffset,
    //     top:s1cords.top+window.pageYOffset,
    //     behavior:'smooth',
    // });

    //more modern way--
    section1.scrollIntoView({ behavior: 'smooth' });

});
*/


/*
/////////////////////////////Events and Eventhandler/////////////////
// event is basically a signal which is generated by some dom  node by clicking or keypress
const h1 = document.querySelector('h1');
// h1.addEventListener('mouseenter',function(e){
//    alert('addEventListner:You are reading the heading:D');
// });
// //directly on element
// h1.onmouseenter = function(e){
//     alert('You are reading the heading');
// };
//1.addEventListner is better bcz we can use multiple eventlistners to the same event
//2.we can remove eventhandler if we dont need anymore--
const alertH1 = function (e) {
    alert('addEventListner:You are reading the heading:D');
    // h1.removeEventListener('mouseenter',alertH1);
};
h1.addEventListener('mouseenter', alertH1);
setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);


///////////////////////////////////////////Bubbling and Capturing//////

// when a click happen on a target the event happen on it but this event actually happen on its root element and also happens on all its parent node as well and it travels to the target event-----Capturing phase
// when it reaches target target phase begins that is addEventlistner function happens which calls callback function and execute it.
// after function execution or event execution the event travells up to the root element---Bubbling phase
//significance -----if the same event is applied to one of its parent element then we handled samw event twice .
// events propogating from one to another is bubbling and capturing

//Example --
//rgb(255,255,255);color representation
const randomInt = (min, max) =>
 Math.floor(Math.random() * (max - min + 1) + min);//min-max included
//random color generator function
const randomColor = () => `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
// console.log(randomColor(0,255));

document.querySelector('.nav__link').addEventListener('click', function (e) {
    // console.log('link');//to check
    // change the background color randomly
    this.style.backgroundColor =randomColor();
    console.log('link',e.target,e.currentTarget);
    console.log(e.currentTarget===this);
    //stop propogation
    // e.stopPropagation();//event not propagation
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
    // console.log('link');//to check
    this.style.backgroundColor =randomColor();
    console.log('Container',e.target,e.currentTarget);
});

document.querySelector('.nav').addEventListener('click', function (e) {
    // console.log('link');//to check
    this.style.backgroundColor =randomColor();
    console.log('Nav',e.target,e.currentTarget);
});


//addEventlistner is only listening the event here in bubbling phase not in capturing phase
//bubbling phase is very useful for event delegation
// if we want to catch event in capturing phase we can get it by giving the third parameter as true
*/

////////////////////////////Event delegation/////

/////////////////////
//Events that happen in the DOM during webpages life cycle
//1. this event is fired as soon as the html parsed that html must be downloaded and converted into tree 
document.addEventListener('DOMContentLoaded',function(e){
    // this event doesnot wait for other elements like images 
    console.log('HTML parsed and DOM tree is built',e);
});
// actually we need our code to be start executing after DOM  is available . for that we dont need to wrap our code into this addevent listner bcz we have our script tag to be at last before closing body tag 
// 2. load event-is fired after all HTML document is parsed as well as external files like CSS is also downloaded
window.addEventListener('load',function(e){
    console.log('page is fully loaded',e);
});
// 3. unload -this event happen right before the leavingthe page 
document.addEventListener('beforeunload',function(e){
    e.preventDefault();
    console.log(e);
    
});
/////////////////////////////////////////////
// ways of including script file  into HTML THAT INFLUENCE THE WAY js is fetch and downloaded.
// <script src ="script.js"></script>
// <script async src ="script.js"></script>
// <script defer src ="script.js"></script>
// we can write the script tag in the document head, or usually at the end of the body.
// 1.when we include a script without any attribute in the head,
// user loads the page and receives the HTML, the HTML code will start to be parsed by the browser and parsing the HTML is basically building the DOM tree from the HTML elements.Then at a certain point,it will find or a script tag, start to fetch the script,and then execute it.Now, during all this time,the HTML parsing will actually stop.So it will be waiting for the script to get fetched and executed.Only after that, the rest of the HTML can be parsed.And at the end of that parsing,the DOM content loaded event will finally get fired and  the script will actually be executed before the DOM is ready.
// that's why we usually always put the script tag at the end of the body, so that all the HTML is already parsed, when it finally reaches the script tag.
///2.when we include a script with async attribute in the head
//  the difference is that the scrip is loaded at the same time as the HTML is parsed So in an asynchronous way so that's already an advantage However, the HTML parsing still stop for the script execution the script is actually downloaded asynchronously But then it's executed right away in a synchronous way And so the HTML code has to wait for being parsed.

// 3.when we include a script with defer attribute in the head
// script is still loaded asynchronously. But the execution of the script is deferred until the end of the HTML parsing. So in practice, loading time is similar to the async attribute, but with the key difference that would defer the HTML parsing is never interrupted, because the script is only executed at the end.