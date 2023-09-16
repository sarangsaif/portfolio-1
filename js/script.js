

const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});


function firstPageAnim() {
    var tl = gsap.timeline();

    tl.from("#nav", {
        y: '-10',
        delay:6,
        duration: 2,
        opacity: 0,
        ease: Expo.easeInOut
    })

        .to(".bounding-elem", {
            y: '0',
            duration: 3,
            stagger: .3,
        delay: -1,
            ease: Expo.easeInOut
        })

        .from("#herofooter", {
            y: '-10',
            duration: 1.5,
            opacity: 0,
            delay: -1.4,
            ease: Expo.easeInOut
        })

}


var timeOut;
function circleSqueeze() {
    var xScale = 1;
    var yScale = 1;

    var xAxisPreviousMouseLocation = 0;
    var yAxisPreviousMouseLocation = 0;

    window.addEventListener("mousemove", function (dets) {
        clearTimeout(timeOut);
        xScale = gsap.utils.clamp(1, 2, dets.clientX - xAxisPreviousMouseLocation);
        yScale = gsap.utils.clamp(1, 2, dets.clientY - yAxisPreviousMouseLocation);


        xAxisPreviousMouseLocation = dets.clientX;
        yAxisPreviousMouseLocation = dets.clientY;
        circleMouseFollower(xScale, yScale)

        setTimeout(function () {
            document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`

        }, 100)

    })
}



function circleMouseFollower(xScale, yScale) {
    window.addEventListener("mousemove", function (details) {

        document.querySelector("#minicircle").style.transform = `translate(${details.clientX}px, ${details.clientY}px) scale(${xScale}, ${yScale})`

    })
}

document.querySelectorAll('.elem').forEach(function (elem) {
    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener("mouseleave", function (details) {


        var img = elem.querySelector("img");

        var x = details.clientX - elem.getBoundingClientRect().left - img.width / 2;
        var y = details.clientY - elem.getBoundingClientRect().top - img.height / 2;


        gsap.to(img, {
            opacity: 0,
            ease: Power3,
            duration: .5,
          
        });
    });


    elem.addEventListener("mousemove", function (details) {


        var img = elem.querySelector("img");

        var x = details.clientX - elem.getBoundingClientRect().left - img.width / 2;
        var y = details.clientY - elem.getBoundingClientRect().top - img.height / 2;

        diffrot = details.clientY - rotate;
        rotate = details.clientX;

        gsap.to(img, {
            opacity: 1,
            ease: Power3,
            x: x,
            y: y,
            rotate: gsap.utils.clamp(-10, 10, diffrot),
        });
    });
});








circleMouseFollower()
firstPageAnim()
circleSqueeze()


// Get the button element
const fullscreenButton = document.getElementById('fullscreenButton');

// Function to enter full screen
function enterFullscreen() {
    const element = document.documentElement; // Get the document's root element

    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) { // For Firefox
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) { // For Chrome, Safari, and Opera
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { // For Internet Explorer
        element.msRequestFullscreen();
    }
}

// Function to exit full screen
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { // For Firefox
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { // For Chrome, Safari, and Opera
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // For Internet Explorer
        document.msExitFullscreen();
    }
}

// Toggle full screen when the button is clicked
fullscreenButton.addEventListener('click', () => {
    if (document.fullscreenElement || 
        document.mozFullScreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement) {
        // If already in full screen, exit
        exitFullscreen();
    } else {
        // If not in full screen, enter full screen
        enterFullscreen();
    }
});


