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

//function to convert image pixels according to filter chosen
function convert(btn, v) {
    document.getElementById("download_btn").setAttribute('download', img_name + "_" + v);
    if (original_img == null) {
        alert("Image not found!");
        return;
    }
    if (!original_img.complete()) {
        alert("Image loading!");
        return;
    }
    new_img = new SimpleImage(original_img.getWidth(), original_img.getHeight());
    for (var p of original_img.values()) {
        new_img.setPixel(p.getX(), p.getY(), p);
    }

    if (btn == "but5") {
        var colorinput = document.getElementById("but5");
        var hex = colorinput.value.replace("#", "");
        var bigint = parseInt(hex, 16);
        var r = (bigint >> 16) & 255;
        var g = (bigint >> 8) & 255;
        var b = bigint & 255;
        document.getElementById("download_btn").setAttribute('download', img_name + "_" + colorinput.value);
    }

    if (btn == "but7") {
        new_img.setSize(new_img.getWidth() / 3, new_img.getHeight() / 3);
    } else if (btn == "but8") {
        for (var i of original_img.values()) {
            new_img.setPixel(new_img.getWidth() - 1 - i.getX(), i.getY(), i);
        }
    } else {
        for (var pi of new_img.values()) {
            var avg = (pi.getRed() + pi.getGreen() + pi.getBlue()) / 3;
            switch (btn) {
                
                case "but2":
                    doRed(pi, avg);
                    break;
                case "but3":
                    doGreen(pi, avg);
                    break;
                case "but4":
                    doBlue(pi, avg);
                    break;
                case "but5":
                    pi.setRed(color(r, avg));
                    pi.setGreen(color(g, avg));
                    pi.setBlue(color(b, avg));
                    break;
                case "but6":
                    doRainBow(pi, avg, new_img.getHeight());
                    break;
            }
        }
    }
    document.getElementById("p2").style.visibility = "hidden";
    new_img.drawTo(can2);
}

function doGrey(pix, avg) {
    pix.setRed(avg);
    pix.setGreen(avg);
    pix.setBlue(avg);
}

function doRed(pix, avg) {
    pix.setRed(avg);
    pix.setGreen(0);
    pix.setBlue(0);
}

function doGreen(pix, avg) {
    pix.setRed(0);
    pix.setGreen(avg);
    pix.setBlue(0);
}

function doBlue(pix, avg) {
    pix.setRed(0);
    pix.setGreen(0);
    pix.setBlue(avg);
}

function doRainBow(pix, avg, h) {
    var y = pix.getY();
    if (y < h / 7) {
        pix.setRed(color(255, avg));
        pix.setGreen(color(0, avg));
        pix.setBlue(color(0, avg));
    } else if (y < (2 * h) / 7) {
        pix.setRed(color(255, avg));
        pix.setGreen(color(127, avg));
        pix.setBlue(color(0, avg));
    } else if (y < (3 * h) / 7) {
        pix.setRed(color(255, avg));
        pix.setGreen(color(255, avg));
        pix.setBlue(color(0, avg));
    } else if (y < (4 * h) / 7) {
        pix.setRed(color(0, avg));
        pix.setGreen(color(255, avg));
        pix.setBlue(color(0, avg));
    } else if (y < (5 * h) / 7) {
        pix.setRed(color(0, avg));
        pix.setGreen(color(0, avg));
        pix.setBlue(color(255, avg));
    } else if (y < (6 * h) / 7) {
        pix.setRed(color(46, avg));
        pix.setGreen(color(43, avg));
        pix.setBlue(color(95, avg));
    } else {
        pix.setRed(color(139, avg));
        pix.setGreen(color(0, avg));
        pix.setBlue(color(255, avg));
    }
}
