function Rect(options){
	this._init(options);
};
Rect.prototype = {
	constructor:Rect,
	_init:function(options){
		options = options || {};
		this.x = options.x || 0;
		this.y = options.y || 0;
		this.width = options.width || 0;
		this.height = options.height || 0;
		this.fillStyle = options.fillStyle || "#000";
		this.strokeStyle = options.strokeStyle || "#000";

	},
	render:function(ctx){
		ctx.beginPath();
		ctx.fillStyle = this.fillStyle;
		ctx.strokeStyle = this.strokeStyle;
		ctx.strokeRect(this.x,this.y,this.width,this.height);
		ctx.fillRect(this.x,this.y,this.width,this.height);
	}	
}