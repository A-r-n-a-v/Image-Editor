var fg, bg;
var can1 = document.getElementById("c1");
var can2 = document.getElementById("c2");
var can3 = document.getElementById("c3");
var fg_img = null,
  bg_img = null;
var out_img = null;

function fgupload() {
  clear_canvas(can1);
  clear_canvas(can3);
  fg = document.getElementById("fgchoose");
  fg_img = new SimpleImage(fg);
  fg_img.drawTo(can1);
  document.getElementById("p1").style.visibility = "hidden";
  if (out_img != null) {
    document.getElementById("p3").style.visibility = "visible";
  }
}

function bgupload() {
  clear_canvas(can2);
  clear_canvas(can3);
  bg = document.getElementById("bgchoose");
  bg_img = new SimpleImage(bg);
  bg_img.drawTo(can2);
  document.getElementById("p2").style.visibility = "hidden";
  if (out_img != null) {
    document.getElementById("p3").style.visibility = "visible";
  }
}

function combine() {
  if (fg_img == null) {
    alert("Foreground Image not found!");
    return;
  }
  if (!fg_img.complete()) {
    alert("Foreground Image loading!");
    return;
  }
  if (bg_img == null) {
    alert("Background Image not found!");
    return;
  }
  if (!fg_img.complete()) {
    alert("Background Image loading!");
    return;
  }
  var flag1=0,flag2=0;
  var w, h;
  if (fg_img.getWidth() > bg_img.getWidth()) {
    flag1=1;
    w = bg_img.getWidth();
    if (fg_img.getHeight() > bg_img.getHeight()) {
      h = bg_img.getHeight();
      fg_img.setSize(w, h);
    }
  }
  if (fg_img.getWidth() < bg_img.getWidth()) {
    flag2=1;
    w = fg_img.getWidth();
    if (fg_img.getHeight() < bg_img.getHeight()) {
      h = fg_img.getHeight();
      bg_img.setSize(w, h);
    }
  }

  out_img = new SimpleImage(fg_img.getWidth(), fg_img.getHeight());
  for (var pi of fg_img.values()) {
    if (pi.getGreen() > pi.getRed() + pi.getBlue()) {
      out_img.setPixel(
        pi.getX(),
        pi.getY(),
        bg_img.getPixel(pi.getX(), pi.getY())
      );
    } else {
      out_img.setPixel(
        pi.getX(),
        pi.getY(),
        fg_img.getPixel(pi.getX(), pi.getY())); //this pixel is basically gonna be 'p', we can also use 'pi' at the place of 'fg_img.getPixel(pi.getX(), pi.getY()'
    }
  }
  out_img.drawTo(can3);
  document.getElementById("p3").style.visibility = "hidden";
  if(flag1==1){
    fg_img = new SimpleImage(fg);
  }
  if(flag2==1){
    bg_img = new SimpleImage(fg);
  }
}

function clear_canvas(canvas) {
  var context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
}
