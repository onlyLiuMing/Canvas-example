   class Circle{

            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.r = Math.random() * 14 + 1;
                this._mx = Math.random() * 2 - 1;
                this._my = Math.random() * 2 - 1;
            }

            drawCircle(ctx) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r, 0, 360);
                ctx.closePath();
                ctx.fillStyle = 'rgba(204, 204, 204, 0.2)';
                ctx.fill();
            }

            drawLine(ctx, _circle) {
                let dx = this.x - _circle.x;
                let dy = this.y - _circle.y;
                let d = Math.sqrt(dx * dx + dy * dy);
                if(d < 150) {
                    ctx.beginPath();
                    ctx.moveTo(this.x, this.y);//起始点
                    ctx.lineTo(_circle.x, _circle.y);//终点
                    ctx.closePath();
                    ctx.strokeStyle = 'rgba(204, 204, 204, 0.1)';
                    ctx.stroke();
                }
            }

            move(w, h) {
                this._mx = (this.x < w && this.x > 0) ? this._mx: ( - this._mx);//将x位置限制在canvas的width之内
                this._my = (this.y < h && this.y > 0) ? this._my: ( - this._my);//将y位置显示在canvas的height之内
                this.x += this._mx/2;
                this.y += this._my/2;
            }
        }


        class currentCircle extends Circle {
            constructor(x, y) {
                super(x, y);
            }
            drawCircle(ctx) {
                ctx.beginPath();
                this.r = (this.r < 14 && this.r > 1)? this.r + (Math.random() * 2 - 1): 2;
                this.r = 8;
                ctx.arc(this.x, this.y, this.r, 0, 360);
                ctx.closePath();
//                ctx.fillStyle = 'rgba(45, 120, 244, ' + (parseInt(Math.random()*100)/100) + ')';
                ctx.fillStyle = 'rgba(204, 204, 204,0.6)';
                ctx.fill();
            }
        }



        window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
        let canvas = document.querySelector("#canvas");
        let ctx = canvas.getContext("2d");
        let w = canvas.width =  canvas.offsetWidth; //canvas 的宽度
        let h = canvas.height = canvas.offsetHeight;	//canvas 的高度
        let circles = [];	//circle 小圆圈的数目
        let current_circle  = new currentCircle(0, 0); //当前圆圈(貌似是鼠标位置)


        //draw函数
        let draw = function(){
            ctx.clearRect(0, 0, w, h);
            for(let i = 0; i < circles.length; i++) {
                circles[i].move(w, h);
                circles[i].drawCircle(ctx);
                for(j = i + 1; j < circles.length; j++) {
                    circles[i].drawLine(ctx, circles[j])
                }
            }
            if(current_circle.x){
                current_circle.drawCircle(ctx);
                for(var k = 1; k < circles.length; k++) {
                    current_circle.drawLine(ctx, circles[k]);
                }
            }
            requestAnimationFrame(draw);
        }

        //init函数
        let init = function(num){
            for(var i = 0; i < num; i ++){
                circles.push(new Circle(Math.random() * w, Math.random() * h));
            }
            draw();
        }

        window.addEventListener('load', init(80));
        canvas.onmousemove = function(e) {
            e = e || window.event;
            current_circle.x = e.offsetX;
            current_circle.y = e.offsetY;
            console.log(e);
        }, window.onmouseout = function() {
            current_circle.x = null;
            current_circle.y = null;
        };