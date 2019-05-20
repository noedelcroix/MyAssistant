let sendMessage = (message, from)=>{
    if(from == "request"){
        $("body").append("<div class=\"flex request\"><div class=\"data request\">" + message + "</div></div>");
    }else{
        $("body").append("<div class=\"flex response\"><div class=\"data response\">" + message +"</div></div>");
    }
}
let traiterRequest = () => {
    let request = $("#request").val();
    if (request === "") { return false; }
    sendMessage(request, "request");
    request = request.split(" ");
    $("#request").val("");

    if (request.indexOf("ouvrir") != -1) {
        sendMessage("ouvrir", "response");
    } else if (request.indexOf("dire") != -1) {
        sendMessage("dire", "response");
    }
}

$(document).ready(() => {
    $("#submit").on("click", () => {
        traiterRequest();
    });

    $(document).on("keydown", (event) => {
        if(event.key === "Enter"){
            traiterRequest();
        }
    });
});