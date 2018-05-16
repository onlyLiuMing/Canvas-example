/**
 * 
 */

function Circle(x, y) {
    this.x = x; //小球圆心的坐标x
    this.y = y; //小球圆心的坐标y
    this.r = Math.random() * 14 + 1; //小球的半径r
    this._mx = Math.random() * 2 - 1;
    this._my = Math.random() * 2 - 1;
};

/**画出一个小球 */
Circle.prototype.drawCircle = function(ctx) {
    ctx.beginPath(); //起始条路径
    ctx.arc(this.x, this.y, this.r, 0, 360); //创建一个圆形（中心x，中心y，半径，起始角度，结束角度）
    ctx.closePath(); //创建从当前点，到起始点的路径
    ctx.fillStyle = "rgba(204,204,204,0.2)"; //填充的颜色
    ctx.fill(); //填充当前路径
}

/**画出小球之间的连线 */
Circle.prototype.drawLine = function(ctx, _circle) {
    var dx = this.x - _circle.x;
    var dy = this.y - _circle.y;
    var d = Math.sqrt(dx * dx + dy * dy); //返回一个平方根
    if (d < 130) {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y); //起点
        ctx.lineTo(_circle.x, _circle.y); //终点
        ctx.closePath();
        ctx.strokeStyle = "rgba(204,204,204,0.1)"; //小球连线的颜色
        ctx.stroke();
    }
}

/**控制小球运动在屏幕之内 */
Circle.prototype.move = function(w, h) {
    this._mx = (this.x < w && this.h > 0) ? this._mx : (-this._mx);
    this._my = (this.y < h && this.y > 0) ? this._my : (-this._my);
    this.x += this._mx / 2;
    this.y += this._my / 2;
    // console.log(this._mx + " " + this._my);
}

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var screenW = canvas.width = canvas.offsetWidth;
var screenH = canvas.height = canvas.offsetHeight;
var _arr_circle = [];

var a = null;
/**public function */
/**绘制每个小球 */
function draw() {
    ctx.clearRect(0, 0, screenW, screenH); //每次重绘都清除整个画布
    for (var i = 0; i < _arr_circle.length; i++) {
        _arr_circle[i].move(screenW, screenH);
        _arr_circle[i].drawCircle(ctx);
        if (i == 10) {
            console.log(_arr_circle[i].x);
        }
        for (var j = 0; j < _arr_circle.length; j++) {
            _arr_circle[i].drawLine(ctx, _arr_circle[j]);
        }
    }
    clearInterval(a);
    // requestAnimationFrame(draw);
    a = setInterval(draw, 20);
}

/**init函数 */
function init(num) {
    for (var i = 0; i < num; i++) {
        _arr_circle.push(new Circle(Math.random() * screenW + 1, Math.random() * screenH + 1));
    }
    draw();
}

/**添加事件 */
window.onload = function() {
    init(30);
}