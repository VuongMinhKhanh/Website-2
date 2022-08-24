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

function oneByOne (selector, Class, time) {
    //time : sum time to run parallelly with other animations
    var delay = 0;
    for (let s of selector) 
    {
        let aniDelay = delay * time / selector.length
        s.setAttribute("style",`animation-delay: ${aniDelay}ms;`)
        s.classList.add(`${Class}`)
        delay++
    }
}

function slowRenderNav (products, display, slideDown) {
    $this = products
    if ($this.children("ul").hasClass(`${display}`))
    {
        $this.children("ul").addClass(`${slideDown}`)
        setTimeout(function() {
            $this.children("ul").removeClass(`${display}`)
            //trong setTimeout ko sử dụng được this => gọi trực tiếp hoặc gán vào 1 biến $this = $(this)
        }, 0)
        // sử dụng setTimeout để tách 2 class addClass("slideDownProduct") và removeClass("displayProduct") để cả 2 chạy riêng biệt 
    }
    else 
        $this.children("ul").removeClass(`${slideDown}`).addClass(`${display}`)
}

$(document).ready(function(){ 
    // Render respectively .product > li
    $(".subNavMobile .products > a").click(function() {
        let product = $(".subNavMobile .product > li")
        oneByOne(product, "slideUpProduct", 500)
        $(this).children("i").toggleClass("arrowRotate")
    })

    $(".navPC .products > a").hover(function() {
        let product = $(".navPC .product > li")
        oneByOne(product, "slideUpProduct", 500)
        $(this).children("i").toggleClass("arrowRotate")
    })

    // Click magnifier glass to open search bar, click outside to close it
    $(document).click(function(e) {  
        if ($(e.target).closest($(".search")).length || $(e.target).closest($("i.fa-solid.fa-magnifying-glass")).length) {
            $(".search").removeClass("hide")
            $(".search").addClass("show")
        }//closest(selector) là lấy những element tính từ selector trở vào trong
        else 
            $(".search").removeClass("show")
            $(".search").addClass("hide")
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
    $(".slideFrame").hover(function() {
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

    // News appears respectively 
    var content = $(".content")
    oneByOne(content, "pushIn", 1500)
    
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
                // Counter up statistics (JS)
                setTimeout(function() {
                    startCounting();
                }, 1500)
            }
            /*else
                pic.classList.remove("activate")*/
        }
    })

    // Counter up statistics (jQ) https://codepen.io/Creasium/pen/KKdZoja?editors=1000 (ko hiểu lun)
    
    // return error when entering email without @gmail.com
    var btn = $("table input[type=button]"), text = $("table input[type=text]"), gmail = "@gmail.com"
    var message
    text.click(function() {
        message = ""
        $(this).removeClass("error")
        $(".errorMess").text(message)
    })
    btn.on("click", function() {
        message = `Gmail is not valid without ${gmail}. Please try again`
        if(text.val().indexOf("@gmail.com") <= 0) // index <= 0 => text = gmail => false
        {
            setTimeout(function() {
                $(text).addClass("error")
                $(".errorMess").text(message)//
                /*.after(`<div class='errorMess'>${}</div>`)*/
                
            }, 100)
        }
        else {
            let split = text.val().split("@")
            alert(`Hi ${split[0]}!
Your gmail has registered our newsletter thread. 
Check out everyday for more exclusive news.`)
        }
        /*text.keyup(function() {
            $(this).css("border-color","none")
        })*/
    })
    
    // Open responsive menu
    $(".burger").click(function() {
        $(this).toggleClass("clickBurger")
        $(".topBun").toggleClass("rollTopBun")
        $(".patty").toggleClass("rollPatty")
        $(".bottomBun").toggleClass("rollBottomBun")
        $(".expandBun").toggleClass("clickExpandBun")
        //$(this).children("div").toggleClass("clickBurger")
        $(".subNavMobile").toggleClass("show")
    })

    // Toggle .product
    $(".navMobile .products").click(function() {
        $this = $(".navMobile .products")
       slowRenderNav($this, "displayProduct", "slideDownProduct")
    })

    $(".navPC .products").hover(function() {
        $this = $(".navPC .products")
        slowRenderNav($this, "displayProduct", "slideDownProduct")
    })

    // Reset setInterval when clicking ".button"
    // Press a keyword to find relevant books
    // Increase countering time when getting close to the data
    /*if (counter >= countLimit * 80 / 100)
        delay += times //still wrong*/
})