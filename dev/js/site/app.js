window.onload = setupDom;
window.onresize = resizeDom;

function changeAllTheSources(){
    var graphics = document.getElementsByClassName('graphic');
    
    for(var i = 0; i < graphics.length; i++) {
        var url = graphics[i].getAttribute('data');
        
        if(Modernizr.mq('(max-width: 650px)')) {
            if(url.includes('mobile')) return;
            else {
                graphics[i].setAttribute('data', 'mobile-' + url);
            }
        }
        else {
            if(!url.includes('mobile')) return;
            else {
                graphics[i].setAttribute('data', url.replace('mobile-', ''));
            }
        }
    }
}

function setupDom() {
    changeAllTheSources();
}

function resizeDom() {
    changeAllTheSources();
}