//import eCanvas from "../maze/as.js";
// ********************************************************************************************************
//													Constans
// ********************************************************************************************************
const sqrt=Math.sqrt;
const PI=Math.PI; 
const round=Math.round;
const pow=Math.pow;

const CENTER="center";

const DEGREES=1;
const RADIANS=0;

const POINTMODE=1;
const ANGLEMODE=0;

// ********************************************************************************************************
//													AS
// ********************************************************************************************************

const sin=function(angle){
    if(angleMode) angle=convert_toRadians(angle);
    return Math.sin(angle);
}

const cos=function(angle){
    if(angleMode) angle=convert_toRadians(angle);
    return Math.cos(angle);
}


class domElements {
    
    constructor(result,id,parent,str,_class){
        this.parent = document.body;
        result.id=id;
        this.id=id;
		if(parent) this.parent=document.getElementById(parent);
		this.parent.appendChild(result);
        this.element=document.getElementById(this.id);
        if(_class) this.add_class(_class);
        if(str) this.inner(str);
    }
    
    
    add_class(_class){
        let attribute = document.createAttribute("class");
        attribute.value=_class;
        this.element.setAttributeNode(attribute);
    }
    
    add_event(type,fv){
		this.element.addEventListener(type,fv);		
	}
	
	add_style(style,values,overwrite){
        if(!overwrite) overwrite=false;
        let styles="";
        if(this.element.style.length!=0 && !overwrite){
            styles = this.element.getAttribute("style");
        }
        let attribute = document.createAttribute("style");
        if(style instanceof Array){
            for(let i=0;i<style.length;i++){
                attribute.value += style[i]+": "+values[i]+"; ";
            }
        }else{
            attribute.value = style+":"+values;
        }
        if(styles!="") attribute.value+="; "+styles;
		this.element.setAttributeNode(attribute);
	}
    
    add_attribute(_attribute,values){
        if(_attribute instanceof Array){
            for(let i=0;i<_attribute.length;i++){
                let attribute = document.createAttribute(_attribute[i]);
                attribute.value = values[i];
                this.element.setAttributeNode(attribute);
            }
        }else{
            let attribute = document.createAttribute(_attribute);
            attribute.value = values;
            this.element.setAttributeNode(attribute);
        }
    }
    
    remove_event(type,fv){
        this.element.removeEventListener(type,fv);
    }
    
    remove_style(style){
        this.element.style.removeProperty(style);
        if(this.element.style.length==0) this.element.removeAttribute("style");
    }
    
    remove_class(){
        this.element.removeAttribute("class");    
    }
    
    delete_element(){
		this.parent.removeChild(document.getElementById(this.id));
	}

    inner(str,add){
        if(!add){this.element.innerHTML+=str;}else{this.element.innerHTML=str;}
    }
    
    resize(width,height){
        this.element.width=width;
        this.element.height=height;
        this.width=width;
        this.height=height;
    }
    
    hide(){
        let d="display";
        if(this.element.style.length==0){
            this.add_style("display","none");
        }else{
            this.element.style.display="none";
        }   
    }
    
    show(){
        //display: block; display: none;
        if(this.element.style.length==0){
            this.add_style("display","block");
        }else{
            this.element.style.display="block";
        }   
    }
    
    
      
}

// ******************************************* Dom elements
// ************************************************************************************************************************
class eDiv extends domElements{
    
    constructor(id,parent,str,_class){
        let result=document.createElement('div');
        super(result,id,parent,str,_class);
    }
    
    

}

class eButton extends domElements {
    
    constructor(id,parent,str,_class,fv){
        let result=document.createElement('button');
        super(result,id,parent,str,_class);
        if(fv) this.add_event("click",fv);
    }
    
    click(fv){
        this.add_event("click",fv);
    }
}

class eText extends domElements {
    
    constructor(id,parent,str,_class,type,fv){
        let result=document.createElement('Input');
        result.setAttribute("type", "text");
        super(result,id,parent,str,_class);
        if(type && fv) this.add_event(type,fv);
    }
    
}

class eSlider extends domElements {

    constructor(id,parent,str,_class,fv){
        let result=document.createElement('Input');
        result.setAttribute("type", "range");
        super(result,id,parent,str,_class);
        if(fv) this.add_event("click",fv);
    }
}

// ******************************************* Canvas
// ************************************************************************************************************************
class eCanvas extends domElements {

    constructor(id,parent,str,_class,width,height){
        let result=document.createElement('canvas');
        super(result,id,parent,str,_class);
        this.ctx=this.element.getContext("2d");
        width ? this.width=width : this.width=100;
        height ? this.height=height : this.height=100;
        this.resize(this.width,this.height);
        this.persistent=[];
    }
    
    background(color){
        if(color)this.ctx.fillStyle = color;
        this.ctx.fillRect(0,0,this.width,this.height);
    }
    
    clear(){
        this.ctx.clearRect(0,0,this.width,this.height);
    }
    
    redraw(){
        
    }
    
    make_grid_byAmount(amountRow,amountColumn){
        if(!amountRow)throw new Error("Not enough paramaters to run!");
        if(!amountColumn) amountColumn=amountRow;
        if(this.width%amountRow!=0 || this.height%amountColumn!=0)throw new Error("Amount can't be divided equally!");
        let rowSize=this.width/amountRow; let columnSize=this.height/amountColumn;
        if(this.cells) this.cells=[];
        this.cells=this.make_grid(amountRow,amountColumn,rowSize,columnSize);
    } 
    
    make_grid_bySize(sizeRow,sizeColumn){
        if(!sizeRow)throw new Error("Not enough paramaters to run!");
        if(!sizeColumn) sizeColumn=sizeRow;
        if(this.width%sizeRow!=0 || this.height%sizeColumn!=0)throw new Error("Size can't be divided equally!");
        let row=this.width/sizeRow; let column=this.height/sizeColumn;
        if(this.cells) this.cells=[];
        this.cells=this.make_grid(row,column,sizeRow,sizeColumn);
    }
    
    make_grid(row,column,sizeX,sizeY){
        let result=[];
        for(let i=0;i<row;i++){
            for(let j=0;j<column;j++){                
                var cell = { 
                id: (i*column)+j,
                gridX: i,
                gridY: j,
                posX: i*sizeX,
                posY: j*sizeY,
                sizeX: sizeX,
                sizeY: sizeY
                };
                result.push(cell);
            }
        }
        return result;
    }
    
    translate(x,y){
        this.ctx.translate(x,y);
    }

    rotate(angle){
        if(angleMode) angle=convert_toRadians(angle);
        this.ctx.rotate(angle);
    }

    stroke(color){
        this.ctx.strokeStyle=color; 
    }

    lineWidth(thickness){
        this.ctx.lineWidth=thickness;
    }

    fill(color){
        this.ctx.fillStyle = color;
    }

    alpha(amount){
        if(amount>1 || amount<0)throw new Error("Alpha amount must be between 0 and 1 ! Received: "+amount);
        this.ctx.globalAlpha=amount;
    }
    
    LinearGradient(x1,x2,x3,x4){
        this.gradient=this.ctx.createLinearGradient(x1,x2,x3,x4);
        console.log(this.gradient);
    }
    
    gradient_addColorStop(offset,color){
        if(offset>1 || offset<0)throw new Error("Gradient offset must be between 0 and 1 ! Received "+offset);
        this.gradient.addColorStop(offset,color);
    }
    
    draw_grid(lineWidth){
        this.clear();
        if(!lineWidth) lineWidth=3;
        for (let i = 0; i < this.cells.length; i++){
            this.ctx.beginPath();
            this.ctx.rect(this.cells[i].posX,this.cells[i].posY,this.cells[i].sizeX,this.cells[i].sizeY);
            if(lineWidth)this.ctx.lineWidth=lineWidth;
            this.#draw();
        }
    }

    beginPath(x,y){ 
        this.ctx.beginPath();
        this.ctx.moveTo(x,y);
    }
    addPoint_toPath(x,y){ this.ctx.lineTo(x,y); }
    closePath(){ this.#draw(); }
    
    line(fromX,fromY,toX,toY,lineWidth,color){
        if(fromX==undefined || fromY==undefined || toX==undefined || toY==undefined) throw new Error("Not enough paramaters to run!");
        this.ctx.beginPath();
		this.ctx.moveTo(fromX,fromY);
		this.ctx.lineTo(toX,toY);
        if(color)this.ctx.strokeStyle = color;
        if(lineWidth)this.ctx.lineWidth=lineWidth;
		this.#draw();
    }

    rectangle(x,y,width,height){
        if(x==undefined || y==undefined || width==undefined || height==undefined) throw new Error("Not enough paramaters to run!");
        this.ctx.beginPath();
        if(color)this.ctx.strokeStyle = color;
        if(lineWidth)this.ctx.lineWidth=lineWidth;
        this.ctx.rect(x,y,width,height);
		this.#draw();
    }

    circle(x,y,radius,lineWidth,startAngle,endAngle,color){
        if(x==undefined || y==undefined || radius==undefined) throw new Error("Not enough paramaters to run!");
        if(!startAngle) startAngle=0;
        if(!endAngle) endAngle=360;
        if(startAngle && angleMode) startAngle=convert_toRadians(startAngle);
        if(endAngle && angleMode) endAngle=convert_toRadians(endAngle);
        this.ctx.beginPath();
        this.ctx.ellipse(x,y,radius,radius,0,startAngle,endAngle);  
        if(lineWidth)this.ctx.lineWidth=lineWidth;
        if(color)this.ctx.strokeStyle = color;
        this.#draw();
    }

    ellipse(x,y,radiusX,radiusY,rotation,lineWidth,color,startAngle,endAngle){
        if(x==undefined || y==undefined || radiusX==undefined || radiusY==undefined) throw new Error("Not enough paramaters to run!");
        if(!startAngle) startAngle=0;
        if(!endAngle) endAngle=360;
        if(!rotation) rotation=0;
        if(rotation && angleMode) rotation=convert_toDegrees(rotation);
        this.ctx.beginPath();
        this.ctx.ellipse(x,y,radiusX,radiusY,rotation,startAngle,endAngle);  
        if(lineWidth)this.ctx.lineWidth=lineWidth;
        if(color)this.ctx.strokeStyle = color;
        this.#draw();
    }

    triangle(x1,y1,x2,y2,x3,y3,lineWidth,color){
        if(arguments.length<6) throw new Error("Not enough paramaters to run!");
        this.ctx.moveTo(x1,y1);
        this.ctx.beginPath();
        this.ctx.lineTo(x1,y1);
        this.ctx.lineTo(x2,y2);
        this.ctx.lineTo(x3,y3);
        this.ctx.lineTo(x1,y1);
        if(lineWidth)this.ctx.lineWidth=lineWidth;
        if(color)this.ctx.strokeStyle = color;
        this.#draw();
    }

    #draw(){
        if(_stroke) this.ctx.stroke();
        if(_fill) this.ctx.fill();
        this.ctx.closePath();
    }
    
}

// ******************************************* Point
// ************************************************************************************************************************
class Point{
    
    constructor(x,y){
        if(x==undefined && y==undefined) throw new Error("Not enough paramaters to create Point!");
        this.x=x;
        this.y=y;
    }   
}

// ******************************************* Vector
// ************************************************************************************************************************
class Vector2{

    constructor(a,b,c,d){
        if(arguments.length<2) throw new Error("Not enough paramaters to create Vector2! Minimum two required.");
        if(arguments.length>4) throw new Error("Too many paramaters to create Vector2! Maximum 4 is allowed.");
        if(vector_mode=="points" && 
           arguments.length==2 && 
           !(a instanceof Point) && 
           !(b instanceof Point) ) throw new Error("Incorrect paramaters received to create Vector2!");
        // Origin point regardless of mode
        if(a instanceof Point){
            this.origin=a;
        }else if(arguments.length==2){
            throw new Error("Incorrect paramaters received to create Vector2!");
        }else{
            this.origin=new Point(a,b);
        }
        //Endpoint if the mode is points
        if(vectorMode=="points"){
            if(b instanceof Point){
                this.endpoint=b;
            }else if(arguments.length==3){
                throw new Error("Incorrect paramaters received to create Vector2!");
            }else{
                this.endpoint=new Point(c,d);
            }
            this.get_angle();
            this.get_magnitude();
        }
        //Angle mode
        if(vectorMode=="angle"){
            if(b instanceof Point){
                throw new Error("Incorrect Vector mode!");
            }else if(arguments.length>3){
                throw new Error("Too many paramaters to create Vector2! Maximum 3 is allowed in Angle mode.");
            }else{
                if(arguments.length==2){
                    this.angle=b;
                }else{
                    this.angle=c;
                }
                this.magnitude=1;
            }
            this.get_endpointByAngle();
        }
        //Magnitude mode
        if(vectorMode=="magnitude"){
            if(b instanceof Point){
                throw new Error("Incorrect Vector mode!");
            }else if(arguments.length>3){
                throw new Error("Too many paramaters to create Vector2! Maximum 3 is allowed in Angle mode.");
            }else{
                if(arguments.length==2){
                    this.magnitude=b;
                }else{
                    this.magnitude=c;
                }
                this.angle=0;
            }
            this.get_endpointByMagnitude();
        }       
    }
    
    get_angle(){
        this.angle=Math.atan2(this.endpoint.y-this.origin.y, this.endpoint.x-this.origin.x);
        if(angleMode){
            this.angle=convert_toDegrees(this.angle);
            if(this.endpoint.y<0) this.angle+=360;
        }
        this.angle=round(this.angle * 100) / 100;
    }
    
    get_magnitude(){
        this.magnitude=sqrt(pow(this.endpoint.x-this.origin.x,2)+pow(this.endpoint.y-this.origin.y,2));
        this.magnitude=round(this.magnitude * 100) / 100;
    }
    
    get_endpointByAngle(){
        let x,y;
        x=this.magnitude*cos(this.angle);
        y=this.magnitude*sin(this.angle);
        this.endpoint=new Point(this.origin.x+x,this.origin.y+y);
    }
    
    get_endpointByMagnitude(){
        this.endpoint= new Point(this.origin.x+this.magnitude,this.origin.y);
    }
    
    draw(){
        fill(green);
        canvases[0].circle(this.origin.x,this.origin.y,1.5);
        canvases[0].line(this.origin.x,this.origin.y,this.endpoint.x,this.endpoint.y);
        fill(red);
        canvases[0].circle(this.endpoint.x,this.endpoint.y,3);
        fill(blue);
        let p1=Vector.rotate_vector(this.endpoint.x+this.origin.x,this.endpoint.y+this.origin.y,90);
        let v1=new Vector2(this.origin,p1);
        log(v1);
        canvases[0].circle(p1.x,p1.y,5);
        log(p1);
        p1=Vector.rotate_vector(this.endpoint.x,this.endpoint.y,-90);
        v1=new Vector2(this.origin,p1);
        log(v1);
        log(p1);
        canvases[0].circle(p1.x,p1.y,5);
        noFill();
    }

}

class Vector{
    
    static get_magnitudeFromOrigin(x,y){
        let magnitude=sqrt(pow(x,2)+pow(y,2));
        magnitude=round(magnitude * 100) / 100;
        return magnitude;
    }
    
    static get_magnitudeFromTwoPoints(x1,y1,x2,y2){
        let magnitude=sqrt(pow(x2-x1,2)+pow(y2-y1,2));
        magnitude=round(magnitude * 100) / 100;
        return magnitude;
    }
    
    static rotate_vector(x1,y1,angle){
        if(angleMode) angle=convert_toDegrees(angle);
        return new Point(cos(angle)*x1,sin(angle)*y1);
    }

    static get_endpointByMagnitude(x,y,magnitude){
        return new Point(x+magnitude,y);
    }
    
}

// ******************************************* Other
// ************************************************************************************************************************
class seeded_random{
    constructor(str){
        this.seed=str * 16807 % 2147483647;
    }

    nextInt(){
        return this.seed=this.seed * 16807 % 2147483647;
    }

    nextFloat(range){
        if(!range)range=1;
       return ((this.nextInt() - 1) / 2147483646) * range;
    }

    nextRange(min,max){
        if(!min)min=0; if(!max)max=1;
        let result=round(this.nextFloat()*max);
        return result>min ? result : min;
    }
}

const get_RandomInt=function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

const convert_toDegrees=function(angle){
    return angle*180/PI;
}

const convert_toRadians=function(angle){
    return angle*PI/180;
}


























// ************************************************************************************************************************
//									     	        Engine + calls
// ************************************************************************************************************************


class asEngine{
    

   constructor(width,height,id,reset){
        if(!id && setup_ran && !reset) throw new Error("Setup already ran! You need to assign an id or use reset to delete!");
        if(setup_ran){ document.getElementById("canvasHolder").innerHTML="";
        }else{
            let canvasHolder=new eDiv("canvasHolder");
        }
        !width ? this.width=1280 : this.width=width;
        !height ? this.height=720 : this.height=height;
        this.parent=canvasHolder.id;
        let result=[];
        if(!id){
            result[0]=new eCanvas("foreground",this.parent,"","canvas_foreground",this.width,this.height);
            this.foreground=result[0];
            result[1]=new eCanvas("background",this.parent,"","canvas_background",this.width,this.height);
            this.background=result[1];
        }else{
            result[0]=new eCanvas(id,this.parent,"","canvas_foreground",this.width,this.height);
            this.foreground= result[0];
        }
        loop=false;
        this.framerate=30;   
    }  
    
    get_framerate(amount){
        this.framerate=round(1000/amount);
        this.stop();
        this.start();
    }

    start(){
        loop=setInterval(this.#get_draw, this.framerate);
    }

    stop(){
        clearInterval(loop);
        loop=null;
    }
    
    #get_draw(){
        if(window.draw && typeof window.draw != 'function') throw new Error("Draw function does not exist!");
        toDraw=window["draw"];
        toDraw();
    }

    mouse_position(e){
        let rect = e.target.getBoundingClientRect();
        mouseX = round(e.clientX - rect.left);
        mouseY = round(e.clientY - rect.top);
    }


}

var engine;
var canvases=[];
var setup_ran=false;
var vectorMode="points";
var angleMode=DEGREES;
var _stroke=true;
var _fill=false;
var loop;
var toDraw;
var mouseX;
var mouseY;

const setup = function(width,height,id,reset) {
    engine=new asEngine(width,height,id,reset);
    canvases[0]=engine.foreground;
    if(!id)canvases[1]=engine.background; 
    setup_ran=true; 
    add_event('mousemove',engine.mouse_position);
}

const start=function(){
    engine.start();
}

const stop=function(){
    engine.stop();
}

const framerate=function(fr){
    engine.get_framerate(fr);
}

const clear = function(id){
    if(!id) id=0;
    if(id=="background") id=1;
    canvases[id].clear();  
}

const translate=function(x,y,id){
    if(!id) id=0;
    if(id=="background") id=1;
    if(x=="center"){
        canvases[id].translate(canvases[id].width/2,canvases[id].height/2);
    }else{ 
        canvases[id].translate(x,y); 
    }
}

const rotate=function(angle,id){
    if(!id) id=0;
    if(id=="background") id=1;
    canvases[id].rotate(angle); 
}

const beginPath=function(x,y,id){ 
    if(!id) id=0;
    if(id=="background") id=1;
    canvases[id].beginPath(x,y)
}
const addPoint_toPath=function(x,y,id){ 
    if(!id) id=0;
    if(id=="background") id=1;
    canvases[id].addPoint_toPath(x,y);
}
const closePath=function(id){
    if(!id) id=0;
    if(id=="background") id=1;
    canvases[id].closePath();
}

/**
 * Draw a line on the canvas.
 * @param {Number} fromX - Starting X position
 * @param {Number} fromY - Starting Y position
 * @param {Number} toX - End X position
 * @param {Number} toY - End Y position
 * @param {Number} lineWidth - [optional] Linewidth for stroke 
 * @param {string} color - [optional] color for the line
 * @param {Number} id - [optional] id of the canvas
 */
const line = function(fromX,fromY,toX,toY,lineWidth,color,id){
    if(!id) id=0;
    if(id=="background") id=1;
    canvases[id].line(fromX,fromY,toX,toY,lineWidth,color);
}

const circle= function(x,y,radius,lineWidth,startAngle,endAngle,color,id){
    if(!id) id=0;
    if(id=="background") id=1;
    canvases[id].circle(x,y,radius,lineWidth,startAngle,endAngle,color);  
}

const ellipse = function(x,y,radiusX,radiusY,rotation,lineWidth,color,startAngle,endAngle,id){
    if(!id) id=0;
    if(id=="background") id=1;
    canvases[id].circle(x,y,radiusX,radiusY,rotation,lineWidth,color,startAngle,endAngle); 
}

const rectangle = function(x,y,width,height){
    if(!id) id=0;
    if(id=="background") id=1;
    canvases[id].rectangle(x,y,width,height); 
}

const triangle=function(x1,y1,x2,y2,x3,y3,lineWidth,color,id){
    if(!id) id=0;
    if(id=="background") id=1;
    canvases[id].triangle(x1,y1,x2,y2,x3,y3,lineWidth,color);
}

const background= function(color,id){
    if(!id) id=0;
    if(id=="background") id=1;
    canvases[id].background(color);  
}

const stroke= function(color,id){
    if(!id) id=0;
    if(id=="background") id=1;
    _stroke=true;
    canvases[id].stroke(color);  
}

const noStroke= function(){
    _stroke=false;
}

const fill= function(color,id){
    if(!id) id=0;
    if(id=="background") id=1;
    _fill=true;
    canvases[id].fill(color);  
}

const noFill=function(){
    _fill=false;
}

const lineWidth= function(thickness,id){
    if(!id) id=0;
    if(id=="background") id=1;
    canvases[id].lineWidth(thickness);
}

const linearGradient=function(x1,y1,x2,y2,id){
    if(!id) id=0;
    if(id=="background") id=1;
    canvases[id].LinearGradient(x1,y1,x2,y2); 
}

const add_colorStop=function(offset,color,id){
    if(!id) id=0;
    if(id=="background") id=1;
    canvases[id].gradient_addColorStop(offset,color); 
}

const alpha=function(amount,id){
    if(!id) id=0;
    if(id=="background") id=1;
    canvases[id].alpha(amount); 
}




const resizeCanvas = function(x,y,id){
    if(!id) id=0;
    if(id=="background") id=1;
    canvases[id].resize(x,y);  
}

const add_event = function(type,fv,id){
    if(!id) id=0;
    if(id=="background") id=1;
    canvases[id].add_event(type,fv);  
}

const vector_mode = function(_mode){
    let mode=_mode.toLowerCase();
    if(mode!="points" && mode!="point" && mode!="angle" && mode!="magnitude" ) {throw new Error("Incorrent Vector2 mode!");}
    if(mode=="point") mode="points";
    vectorMode=mode;
}

/**
 * Angle mode defines if calculations will happen in degrees or radians. 
 * Use keywords DEGREE or RADIANS to set. Default is degress.
 * @param {string} _mode 
 */
const angle_mode= function(_mode){
    let mode=_mode.toLowerCase();
    if(mode!="degrees" && mode!="degree" && mode!="radian" && mode!="radians" ) {throw new Error("Incorrent angle mode!");}
    if(mode=="degree") mode="degrees";
    if(mode=="radian") mode="radians";
    angleMode=mode;
}

const log=function(str){
    console.log(str);
}

// ********************************************************************************************************
//									     	        Colors
// ********************************************************************************************************

const AliceBlue="#F0F8FF";
const Amaranth="#E52B50";
const Amber="#FFBF00";
const Amethyst="#9966CC";
const AppleGreen="#8DB600";
const AppleRed="#BE0032";
const Apricot="#FBCEB1";
const Aquamarine="#7FFFD4";
const Azure="#007FFF";
const BabyBlue="#89CFF0";
const Beige="#F5F5DC";
const BrickRed="#CB4154";
const Black="#000000";
const Blue="#0000FF";
const BlueGreen="#0095B6";
const BlueViolet="#8A2BE2";
const Blush="#DE5D83";
const Bronze="#CD7F32";
const Brown="#993300";
const Burgundy="#800020";
const Byzantium="#702963";
const Carmine="#960018";
const Cerise="#DE3163";
const Cerulean="#007BA7";
const Champagne="#F7E7CE";
const ChartreuseGreen="#7FFF00";
const Chocolate="#7B3F00";
const CobaltBlue="#0047AB";
const Coffee="#6F4E37";
const Copper="#B87333";
const Coral="#FF7F50";
const Crimson="#DC143C";
const Cyan="#00FFFF";
const DesertSand="#EDC9AF";
const ElectricBlue="#7DF9FF";
const Emerald="#50C878";
const Erin="#00FF3F";
const Gold="#FFD700";
const Gray="#BEBEBE";
const Green="#008001";
const Harlequin="#3FFF00";
const Indigo="#4B0082";
const Ivory="#FFFFF0";
const Jade="#00A86B";
const JungleGreen="#29AB87";
const Lavender="#B57EDC";
const Lemon="#FFF700";
const Lilac="#C8A2C8";
const Lime="#BFFF00";
const Magenta="#FF00FF";
const MagentaRose="#FF00AF";
const Maroon="#800000";
const Mauve="#E0B0FF";
const NavyBlue="#000080";
const Ochre="#CC7722";
const Olive="#808000";
const Orange="#FF6600";
const OrangeRed="#FF4500";
const Orchid="#DA70D6";
const Peach="#FFE5B4";
const Pear="#D1E231";
const Periwinkle="#C3CDE6";
const PersianBlue="#1C39BB";
const Pink="#FFC0CB";
const Plum="#8E4585";
const PrussianBlue="#003153";
const Puce="#CC8899";
const Purple="#6A0DAD";
const Raspberry="#E30B5C";
const Red="#FF0000";
const RedViolet="#C71585";
const Rose="#FF007F";
const Ruby="#E0115F";
const Salmon="#FA8072";
const Sangria="#92000A";
const Sapphire="#0F52BA";
const Scarlet="#FF2400";
const Silver="#C0C0C0";
const SlateGray="#708090";
const SpringBud="#A7FC00";
const SpringGreen="#00FF7F";
const Tan="#D2B48C";
const Taupe="#483C32";
const Teal="#008080";
const Turquoise="#40E0D0";
const Ultramarine="#3F00FF";
const Violet="#8000FF";
const Viridian="#40826D";
const White="#FFFFFF";
const Yellow="#FFFF00";































