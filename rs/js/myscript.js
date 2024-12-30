Reveal.initialize({
    controls: true,
    progress: true,
    center: false,
    hash: true,
    width: 1000,
    margin: 0,
    padding: 0,
    disableLayout: true,
    slideNumber: "c/t",
    plugins: [RevealNotes, RevealSearch, RevealHighlight, RevealMarkdown],
});

function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById("realtimeclock").innerHTML = h + ":" + m + ":" + s;
    setTimeout(startTime, 1000);
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    } // add zero in front of numbers < 10
    return i;
}

function toggleAllAvatars() {
    const video1 = document.getElementById("Avatar1");
    const video2 = document.getElementById("Avatar2");
    const video3 = document.getElementById("Avatar3");
    const video4 = document.getElementById("Avatar4");

    if (video1.paused || video2.paused || video3.paused || video4.paused) {
        video1.play();
        video2.play();
        video3.play();
        video4.play();
    } else {
        video1.pause();
        video2.pause();
        video3.pause();
        video4.pause();
    }
}

function toggleVideos() {
    const video1 = document.getElementById("video1");
    const video2 = document.getElementById("video2");
    const video3 = document.getElementById("video3");

    if (video1.paused || video2.paused || video3.paused) {
        video1.play();
        video2.play();
        video3.play();
    } else {
        video1.pause();
        video2.pause();
        video3.pause();
    }
}

function myFunction1() {
    var popup1 = document.getElementById("myPopup1");
    popup1.classList.toggle("show");
}
function myFunction2() {
    var popup2 = document.getElementById("myPopup2");
    popup2.classList.toggle("show");
}
function myFunction3() {
    var popup3 = document.getElementById("myPopup3");
    popup3.classList.toggle("show");
}
function myFunction4() {
    var popup4 = document.getElementById("myPopup4");
    popup4.classList.toggle("show");
}
function myFunction5() {
    var popup5 = document.getElementById("myPopup5");
    popup5.classList.toggle("show");
}
function myFunction6() {
    var popup6 = document.getElementById("myPopup6");
    popup6.classList.toggle("show");
}
function myFunction7() {
    var popup7 = document.getElementById("myPopup7");
    popup7.classList.toggle("show");
}
