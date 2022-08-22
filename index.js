var i = 0, isPause = false;

var autoSlide, slideTime = 3000;

var revealPoint = 150;

var count = 0, delay = 50, times = 1000;
function counter(s) {
    let countLimit = s.getAttribute("data")
    if (count <= countLimit)
    {
        s.innerHTML = count.toString() + s.getAttribute("data-unit")
        count++
        //delay = 100000 / count
        setTimeout(function() {
            counter(s)
        }, delay)
    }
    return;
}

function startCounting() {
    if ($("section.stat").hasClass("activate"))
        for (let s of $(".number"))
            counter(s)
}

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
    $(window).on("scroll", function() {
        var pics = $(".reveal")
        for (let pic of pics)//let pic of pics ko gắn chung method của jQ
        {
            let window = $(this).innerHeight()
            let revealTop = pic.getBoundingClientRect().top
            
            let active = revealPoint < window - revealTop
            if (active)
            {
                pic.classList.add("activate")
                setTimeout(function() {
                    startCounting();
                }, 2000)
            }
            /*else
                pic.classList.remove("activate")*/
        }
    })

    
    // Counter up statistics (jQ) https://codepen.io/Creasium/pen/KKdZoja?editors=1000 (ko hiểu lun)
    // Counter up statistics (JS)
    
    
        

    // Reset setInterval when clicking ".button"
    // Press a keyword to find relevant books
            /*if (counter >= countLimit * 80 / 100)
                delay += times*/
})