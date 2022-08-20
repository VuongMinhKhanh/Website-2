var i = 0;
var isPause = false;
var autoSlide;
var slideTime = 3000;
var revealPoint = 100;
$(document).ready(function(){ 
    // Click magnifier glass to open search bar, click outside to close it
    $(document).click(function(e) {  
        if ($(e.target).closest($("input[type=text]")).length || $(e.target).closest($("i.fa-solid.fa-magnifying-glass")).length) {
            $("input[type=text]").removeClass("hide")
            $("input[type=text]").addClass("show")
        }//closest(selector) là lấy những element tính từ selector trở vào trong
        else 
            $("input[type=text]").removeClass("show")
            $("input[type=text]").addClass("hide")
    })

    /* 
    //Another method to return an index of the button
    var btn = document.querySelectorAll(".button")
    for( var i = 0; i < btn.length; i++){
        btn[i].setAttribute('data-index', i); //gán số i của "button" vào data-index
        btn[i].addEventListener('click', function(){
            //alert(this.getAttribute('data-index'));
        });
    }*/

    // Make slideshow gallery
    
    autoSlide = setInterval(function(){
        if (!isPause)
        {
            $(".slideShow div:first-child div:first-child").css('margin-left',`${-100*i}%`)
            let lim = $(".button").length;
            i++;
            if (i == lim) i = 0;
        }
    }, slideTime)

    // Hover on picture to pause the slideshow (intended to use preventDefault())
    $(".slideShow div:first-child, .slideShow h3").hover(function() {
        isPause = true;
    }, function() {
        isPause = false;
    })

    // Manually choose the picture in the gallery
    $(".button").click(function() {
       var index = $(".button").index(this);
       var marLeft = -100*index;
       $(".slideShow div:first-child div:first-child").css('margin-left',`${marLeft}%`)
    })

    // Render elements when scrolling down
    $(window).scroll(function() {
        let pics = $(".Pics > div")
        for (let i of pics)
        {
            let window = $(this).innerHeight()
            let revealTop = $(i).getBoundingClientRect().top
            alert(revealTop)
            if (revealPoint < window - revealTop) alert("được hảo hán   ")
        }
    })

    // Reset setInterval when clicking ".button"
    // Press a keyword to find relevant books

})