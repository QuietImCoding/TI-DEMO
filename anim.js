var ns = "http://www.w3.org/2000/svg";
var screen;
var page;
var height;
var width;
var pheight;
var pwidth;
var vx = 1;
var vy = 1;
var r = 10;
var circle;
var buttons = [];

var anim = function() {
    var x = parseInt(circle.getAttribute("cx"));
    var y = parseInt(circle.getAttribute("cy"));
    circle.setAttribute("cx", x + vx);
    circle.setAttribute("cy", y + vy);
    if (x + r + vx >= width || x - r + vx<= 0) {
	vx = -vx;
    }
    if (y + r + vy>= height || y - r + vy<= 0) {
	vy = -vy;
    }
    window.requestAnimationFrame(anim);
};

var makeCircle = function(x, y, r, svg) {
    circle = document.createElementNS(ns, "circle");
    circle.setAttribute("style", "fill:#000F00");
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", r);
    svg.appendChild(circle);
    return circle;
}

var makeRect = function(x, y, w, h, svg) {
    rect = document.createElementNS(ns, "rect");
    rect.setAttribute("style", "fill:#FF0000;fill-opacity:0.3");
    rect.setAttribute("x", x);
    rect.setAttribute("y", y);
    rect.setAttribute("height", h);
    rect.setAttribute("width", w);
    svg.appendChild(rect);
    return rect;
}

var makeButton = function(title, x, y, func) {
    var rectangle = makeRect(x, y, 40, 20, page);
    buttons.push({name:title, box:rectangle});
    rectangle.addEventListener("mouseenter", function(e) {
	page.style.cursor = "pointer";
    });
    rectangle.addEventListener("mouseleave", function(e) {
	page.style.cursor = "default";
    });
    if (func != undefined) {
	rectangle.addEventListener("click", func);
    }
    return rectangle;
}

var alpha = function(e) {
    pressed("ALPHA");
}

var second = function(e) {
    pressed("2ND");
}

var pressed = function(string) {
    alert("YOU PRESSED " + string + "!!1!!1!");
}


var resize = function(e) {
    bbbox = page.getBBox();
    screen.width = .17 * bbbox.width;
    screen.height = .21 * bbbox.height;
    bbox = screen.getBBox();
    height = bbox.height;
    width = bbox.width;
}

var setup = function() {
    page = document.getElementById("page");
    page.setAttribute("width", window.innerWidth);
    page.setAttribute("height", window.innerHeight);
    pheight = window.innerHeight;
    pwidth = window.innerWidth;
    screen = document.getElementById("screen");
    resize();
    window.onresize = resize;

    makeCircle(30, 40, 10, screen);
    makeButton("2ND", pwidth/2.36, pheight/2.43, second);
    makeButton("ALPHA", pwidth/2.36, pheight/2.17, alpha);
    console.log(buttons);
    //makeRect(720, 405, 40, 20, page);
    console.log("HEIGHT: " + height + ", WIDTH: " + width);
    anim();
}

window.onload = setup;
