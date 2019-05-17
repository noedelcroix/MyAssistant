$(document).ready(()=>{
    $("#submit").on("click", ()=>{
        $("body").append("<div class=\"data>\">"+$("#request").val()+"</div>");
    })
})