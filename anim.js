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
	rectangle.addEventListener("click", function(e) {
	    func(title);
	});
    }
    return rectangle;
}

var pressed = function(string) {
    alert("YOU PRESSED " + string + "!!1!!1!");
}

var alpha = function(thing) { pressed(thing); }

var resize = function(e) {
    bbbox = page.getBBox();
    screen.width = .17 * bbbox.width;
    screen.height = .21 * bbbox.height;
    bbox = screen.getBBox();
    height = bbox.height;
    width = bbox.width;
}

var mapButtons = function() {
    makeButton("2ND", pwidth/2.34, pheight/2.43, alpha);
    makeButton("ALPHA", pwidth/2.34, pheight/2.17, alpha);
    makeButton("MATH", pwidth/2.32, pheight/1.99, alpha);
    makeButton("x^-1", pwidth/2.32, pheight/1.81, alpha);
    makeButton("x^2", pwidth/2.32, pheight/1.66, alpha);
    makeButton("LOG", pwidth/2.32, pheight/1.54, alpha);
    makeButton("LN", pwidth/2.32, pheight/1.43, alpha);
    makeButton("STO", pwidth/2.32, pheight/1.33, alpha);
    makeButton("ON", pwidth/2.31, pheight/1.24, alpha);
    makeButton("MODE", pwidth/2, pheight/2.43, alpha);
    makeButton("X,T,O,n", pwidth/2.34, pheight/2.17, alpha);
    makeButton("APPS", pwidth/2.32, pheight/1.99, alpha);
    makeButton("SIN", pwidth/2.32, pheight/1.81, alpha);
    makeButton(",", pwidth/2.32, pheight/1.66, alpha);
    makeButton("7", pwidth/2.32, pheight/1.54, alpha);
    makeButton("4", pwidth/2.32, pheight/1.43, alpha);
    makeButton("1", pwidth/2.32, pheight/1.33, alpha);
    makeButton("0", pwidth/2.31, pheight/1.24, alpha); 
}

var setup = function() {
    page = document.getElementById("page");
    page.setAttribute("width", window.innerWidth);
    page.setAttribute("height", window.innerHeight);
    pheight = window.innerHeight;
    pwidth = window.innerWidth;
    screen = document.getElementById("screen");
    resize();
    //window.onresize = resize;

    makeCircle(30, 40, 10, screen);
mapButtons();
    console.log(buttons);
    //makeRect(720, 405, 40, 20, page);
    console.log("HEIGHT: " + height + ", WIDTH: " + width);
    anim();
}

window.onload = setup;

