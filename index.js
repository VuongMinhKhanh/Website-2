$(document).ready(function(){ 
    $(document).click(function(e) {  
        if ($(e.target).closest($("input[type=text]")).length || $(e.target).closest($("i.fa-solid.fa-magnifying-glass")).length) {
            $("input[type=text]").removeClass("hide")
            $("input[type=text]").addClass("show")
        }//closest(selector) là lấy những element tính từ selector trở vào trong
        else 
            $("input[type=text]").removeClass("show")
            $("input[type=text]").addClass("hide")
    })
    /*var btn = document.querySelectorAll(".button")
    for( var i = 0; i < btn.length; i++){
        btn[i].setAttribute('data-index', i); //gán số i của "button" vào data-index
        btn[i].addEventListener('click', function(){
            //alert(this.getAttribute('data-index'));
        });
    }*/
    /*var i = 1;
    setInterval(function(){
        $(".slideShow div img:first-child").css('margin-left',`${-100*i}%`)
        let lim = $(".button").length;
        i++;
        if (i == lim) i = 0;
    },2000)*/
    $(".button").click(function() {
       var index = $(".button").index(this);
       var marLeft = -100*index;
       $(".slideShow div img:first-child").css('margin-left',`${marLeft}%`)
    })
})