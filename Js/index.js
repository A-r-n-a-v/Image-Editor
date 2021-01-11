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

function unfocuscanvas(e, c) {
    if (load == false) {
        e.style.backgroundColor = "#f5f5ff";
        clear_canvas(e);
    }
}

function clear_canvas(canvas) {
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
}

function upload() {
    clear_canvas(can1);
    new_img = null;
    clear_canvas(can2);
    finput = document.getElementById("input1");
    var temp = finput.value.replace(/\134/g, '/');
    var arr1 = temp.split("/");
    img_name = arr1[arr1.length - 1].split(".")[0];
    original_img = new SimpleImage(finput);
    original_img.drawTo(can1);
    original_img.drawTo(can2);
    load = true;
}
