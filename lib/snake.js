function Snake(options){
	this._init(options);
};
Snake.prototype = {
	constructor:Snake,
	_init:function(options){
		options = options || {};
		this.len = options.len||4;
		this.wh = options.wh||20;
		this.fillStyle = options.fillStyle || "#000";
		this.strokeStyle = options.strokeStyle || "#000";
		this.isDir = options.isDir || true;
		this.isGameOver = false;
		this.dir = options.dir||39;
		this.fps = options.fps || 10;
		this.score = 0;
		// 保存所有的rect对象
		this.snakeBody = [];
		// 创建rect
		for(var i=0;i<this.len;i++){
			var rect = new Rect({
				x : i * this.wh,
				y : 0,
				width : this.wh,
				height : this.wh,
				fillStyle : this.fillStyle,
				strokeStyle: this.strokeStyle
			});
			this.snakeBody.splice(0,0,rect);
		}
		this.head = this.snakeBody[0];
		this.head.fillStyle = "orange";
		// 食物
		this.creatFood();

	},
	creatFood:function(){
		var maxX = parseInt(canvas.width/this.wh);
		var maxY = parseInt(canvas.height/this.wh);
		var isCover = true;
		while(isCover){
			isCover = false;
			var foodX = parseInt(Math.random()*maxX)*this.wh;
			var foodY = parseInt(Math.random()*maxY)*this.wh;
			// 判断是否吃到食物
			for(var i in this.snakeBody){
				var obj = this.snakeBody[i];
				if (obj.x == foodX && obj.y == foodY) {
					isCover = true;
					break;
				}
			}	
		}
		function randomColor(){
			var arr = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];
			var color = "#";
			for (var i = 0; i < 6; i++) {
				var index = parseInt(Math.random()*16);
				color += arr[index];
			}
			return color;
		}
		this.food = new Rect({
			x:foodX,
			y:foodY,
			width:this.wh,
			height:this.wh,
			fillStyle : randomColor(),
			strokeStyle: "blue",
		});
	},
	start:function(ctx,canvas){
		canvas.width = canvas.width;
		canvas.height = canvas.height;
		for(var i in this.snakeBody){
			this.snakeBody[i].render(ctx);
		};
		this.food.render(ctx);
	},
	run:function(ctx,canvas){
		var that = this;
		this.timer = setInterval(function(){
			var x = that.head.x;
			var y = that.head.y;

			var rect = new Rect({
				x:x,
				y:y,
				width:that.head.width,
				height:that.head.height,
				fillStyle : that.snakeBody[1].fillStyle,
				strokeStyle: that.head.strokeStyle,
			});
			that.snakeBody.splice(1,0,rect);					
				// 左
			if (that.dir == 37) {
				that.head.x -= that.head.width;			
				// 上
			}else if(that.dir == 38){
				that.head.y -= that.head.width;							
				// 右
			}else if(that.dir == 39){
				that.head.x += that.head.width;						
				// 下
			}else if(that.dir == 40){
				that.head.y += that.head.width;			
			}
			if (!(that.head.x == that.food.x 
				&& that.head.y == that.food.y)
			){
				
				that.snakeBody.pop();
			}else{
				that.score++;
				// 控制速度
				if (that.score % 5 == 0) {
					that.fps+=5;
					clearInterval(that.timer);
					that.run(ctx,canvas);
				};				
				that.creatFood();
			}
			that.start(ctx,canvas);
			that.gameOver();
			if (that.gameOver()) {
				clearInterval(that.timer);
				// alert("Game over!!!");
				if(confirm("Game over!!!" + "   your score：	" + that.score + "      Do you want to continue?")){
					location.reload(); 
				}
			}
			that.isDir = true;
		},1000/this.fps);

	},
	changeDir:function(dir){
		if(
			(this.dir == 39 && dir == 37)
			||(this.dir == 37 && dir == 39) 
			||(this.dir == 38 && dir == 40)	
			||(this.dir == 40 && dir == 38)
		){
			return;
		}
		else if(!(dir == 37 || dir == 38 || dir == 39 || dir == 40)){
			return;
		}
		if (this.isDir) {
			this.dir = dir;
			this.isDir = false;
		}
	},
	gameOver:function(){
		if(this.head.x<0 
			|| this.head.y<0 
			|| this.head.x >=canvas.width 
			|| this.head.y>=canvas.height
		){
			return true;
		}
		for(var i = 1; i < this.snakeBody.length; i++){
			if (this.head.x == this.snakeBody[i].x
				&& this.head.y == this.snakeBody[i].y
			) {
				return true
			}
		}
	}

}


