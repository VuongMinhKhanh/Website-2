$(document).ready(function(){ 
    $(document).click(function(e) {  
        if ($(e.target).closest($("input[type=text]")).length || $(e.target).closest($("i.fa-solid.fa-magnifying-glass")).length) {
            $("input[type=text]").addClass("show")
        }//closest(selector) là lấy những element tính từ selector trở vào trong
        else 
            $("input[type=text]").removeClass("show")
            $("input[type=text]").addClass("hide")
        
            
    })
})