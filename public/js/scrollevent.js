window.onscroll = function() {scroller()};

function scroller() {
    if (document.body.scrollTop > 1 || document.documentElement.scrollTop > 1) {
        document.getElementById("header").style.justifyContent = "left"
        document.getElementById("header").style.paddingLeft = "20px"
        document.getElementById("header").style.zoom = "35%"
    } else {
        document.getElementById("header").style.justifyContent = "center"
        document.getElementById("header").style.paddingLeft = "0"
        document.getElementById("header").style.zoom = "75%"
    }
}