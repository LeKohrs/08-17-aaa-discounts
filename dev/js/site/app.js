window.onload = setupDom;
window.onresize = resizeDom;

function changeAllTheSources(){
    var graphics = document.getElementsByClassName('graphic');

    for(var i = 0; i < graphics.length; i++) {
        var url = graphics[i].getAttribute('data');

        if(Modernizr.mq('(max-width: 713px)')) {
            if(url.includes('mobile')) return;
            else {
                graphics[i].setAttribute('data', url.replace('.svg', '-mobile.svg'));
            }
        }
        else {
            if(!url.includes('mobile')) return;
            else {
                graphics[i].setAttribute('data', url.replace('-mobile', ''));
            }
        }
    }
}
function setupDom() {
    changeAllTheSources();
    // Get all elements that need animation
    var elements = document.querySelectorAll('.membership-type'),
    // This is a holder for each element object.
        element = {};

    // Loop through NodeList elements and add each element to an object, figure out how far from top of document
    // and add to elements array
    for(var i = 0, len = elements.length; i < len; i++) {
        element = {
            element: elements[i],
            top: getDistanceFromTop(elements[i])
        }
        animations.elements.push(element);
    }

    // Run doOnScroll once in case some elements are in viewport onload
    setTimeout(function() { doOnScroll(); }, 1000);
}

function resizeDom() {
    changeAllTheSources();
    // Refigure offsets when window is resized
    animations.elements.forEach(function(element, index, array) {
        element.top = getDistanceFromTop(element.element);
    });
}

// **********************************************
// Move progress bars based on scroll
// **********************************************
function doOnScroll() {
    animations.testScroll();
}

var animations = {
    iconOffset: 0,
    elements: [],
    testScroll: function () {
        // Determine how far the user has scrolled
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

        // Add window height to it, and minus how far from bottom of viewport an element must be
        // before the animation begins
        scrollTop = scrollTop + window.innerHeight - 200;

        // Loop through array of elements and test each one to see if it's within viewport
        // If so, animate
        this.elements.forEach(function(element, index, array) {
            if(element.top < scrollTop) {
                var graphic = element.element.getElementsByClassName('graphic')[0];
                console.log(carGroup);
                var contentDoc = graphic.contentDocument;
                console.log(carGroup);
                
                if(graphic.hasClass('graphic--aaa')) {
                    var arm = contentDoc.getElementById('arm');
                    var carGroup = contentDoc.getElementById('car-group');
                    console.log(carGroup);
                    var car = contentDoc.getElementById('car');
                    var exhaust = contentDoc.getElementById('exhaust');
                    
                    // arm aniamtion
                    TweenMax.from(arm, 1, {transformOrigin: '100% 100%', rotation: -45});
                    TweenMax.to(arm, .5, {transformOrigin: '50% 50%', scale: 1.2, delay: .9});
    
                    // car group animation
                    TweenMax.from(carGroup, 1, {x: 200});
    
                    // car exhaust
                    var tl = new TimelineMax({repeat: 5});
    
                    tl.to(exhaust, .3, {transformOrigin: '50% 50%', scale: 1.3, ease: Power0.easeNone})
                    .to(exhaust, .6, {scale: .8, ease: Power0.easeNone})
                    .to(exhaust,.3, {scale: 1, ease: Power0.easeNone});
                }
                
                if(graphic.hasClass('graphic--military')) {
                    var soldier = contentDoc.querySelectorAll('#soldier');
                    
                    //soldier animation 
                    var tl = new TimelineMax({repeat: 5});
                    tl.to(soldier, .01, {opacity: 1})
                    .staggerFrom(soldier, .7, {y:200}, .4);
                }
                
                 // Remove animated element from array, so not tested after it's been animated once
                array.splice(index, 1);
            }
        });
    }
};

//Loops through all parent nodes of an element to get it's distance from the top of the document
function getDistanceFromTop(element) {
    var yPos = 0;

    while(element) {
        yPos += (element.offsetTop);
        element = element.offsetParent;
    }

    return yPos;
}

Element.prototype.hasClass = function(className) {
    var rx = new RegExp('(\\s|^)' + className + '(\\s|$)');

    if(this.className.match(rx)) {
        return true;
    }

    return false;
}
