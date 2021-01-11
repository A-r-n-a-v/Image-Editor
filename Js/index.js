var finput;
var img_name;
var can1 = document.getElementById("c1");
var can2 = document.getElementById("c2");
var original_img = null;
var new_img = null;
var load = false;

function focuscanvas(e, c) {
    if (load == false) {
        e.style.backgroundColor = "#dfdfed";
        var ctx = document.getElementById(c).getContext("2d");
        e.width = e.clientWidth;
        e.height = e.clientHeight;
        ctx.fillStyle = "#52efbe";
        if (c == "c1") {
            ctx.font = "200% arial";
        } else {
            ctx.font = "500% arial";
        }
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.shadowColor = "#6a116a";
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 20;
        ctx.fillText("+", e.width / 2, e.height / 2);
    }
}