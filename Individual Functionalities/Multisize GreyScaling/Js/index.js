var finput;
var can1;
var original_img;
var new_img;
isimg = 0;

function upload() {
  finput = document.getElementById("file1");
  original_img = new SimpleImage(finput);
  var fname = finput.value;
  alert("File at location " + fname + " has been chosen.");
  can1 = document.getElementById("c1");
  original_img.drawTo(can1);
  isimg = 1;
}

class C {
  constructor() {
    this.flag = 1;
  }
}
obj1 = new C();
obj2 = new C();
obj3 = new C();
obj4 = new C();
obj6 = new C(); //to avoid confusion in naming, obj6 is created instead of obj5

function make_grey(v,a, b, btn) {
  var ctx = can1.getContext("2d");
  ctx.clearRect(0, 0, ctx.width, ctx.height);
  if (isimg === 0) {
    alert("Image not found!");
    return;
  }
  switch (btn) {
    case "but1":
      var choice = confirm(
        "This might take some time depending on image size."
      );
      if (choice == true) {
        doGrey(v,original_img.getWidth(), original_img.getHeight(), btn, obj1);
      }
      break;
    case "but2":
      doGrey(v,a, b, btn, obj2);
      break;
    case "but3":
      doGrey(v,a, b, btn, obj3);
      break;
    case "but4":
      doGrey(v,a, b, btn, obj4);
      break;
    case "but5":
      var el = document.getElementsByClassName("hide");
      for (var i = 0; i < el.length; i++) {
        el[i].style.display = "block";
      }
      break;
    case "but6":
      var w = document.getElementById("tel1");
      var h = document.getElementById("tel2");
      if (w.value == "" || h.value == "") {
        alert("Field not specified!");
      } else {
        doGrey(v,w.value, h.value, btn, obj6);
      }
      break;
  }
}

//function to change image pixels to grey
function doGrey(v,a, b, btn, obj) {
  new_img = new SimpleImage(
    original_img.getWidth(),
    original_img.getHeight()
  );
  for(var pi of original_img.values()){
    new_img.setPixel(pi.getX(),pi.getY(),original_img.getPixel(pi.getX(),pi.getY()));
  }
  new_img.setSize(a, b);
  if (obj.flag == 1) {
    for (var pi of new_img.values()) {
      var avg = (pi.getRed() + pi.getGreen() + pi.getBlue()) / 3;
      pi.setRed(avg);
      pi.setGreen(avg);
      pi.setBlue(avg);
    }
    new_img.drawTo(can1);
    document.getElementById(btn).value = "Restore";
    obj.flag = 0;
  } else {
    original_img.drawTo(can1);
    document.getElementById(btn).value = v;
    obj.flag = 1;
  }
}
