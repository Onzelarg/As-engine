//import eCanvas from "../maze/as.js";
// ********************************************************************************************************
//													Constants
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

/**
 * Math.sin code shortening
 * @param {Number} angle - the angle to calculate the sin of
 * @returns - returns the sin of the given angle
 */
const sin=function(angle){
    if(angleMode) angle=convert_toRadians(angle);
    return Math.sin(angle);
}

/**
 * Math.cos code shortening
 * @param {Number} angle - the angle to calculate the cos of
 * @returns - returns the cos of the given angle
 */
const cos=function(angle){
    if(angleMode) angle=convert_toRadians(angle);
    return Math.cos(angle);
}

/**
 * Document.getElementById code shortening
 * @param {string} str - the id to search for
 * @returns - returns the found element in the document.
 */
const getElementbyID=function(str){
    return document.getElementById(str);
}

/**
 * Document.querySelector code shortening
 * @param {string} str - the name to query
 * @returns - returns the first found element by the query
 */
const querySelect=function(str){
    return document.querySelector(str);
}

/**
 * Document.querySelectorAll code shortening
 * @param {string} str - the name to query
 * @returns - returns all found element by the query
 */
const querySelectAll=function(str){
    return document.querySelectorAll(str);
}

// ******************************************* Dom elements
// ************************************************************************************************************************

class domElements {
    
    constructor(result,id,parent,str,_class){
        this.parent = document.body;
        result.id=id;
        this.id=id;
		if(parent) this.parent=getElementbyID(parent);
		this.parent.appendChild(result);
        this.element=getElementbyID(this.id);
        if(_class) this.add_class(_class);
        if(str) this.innerhtml(str);
    }
    
    /**
     * Adds class to the element
     * @param {String} _class - name of the class
     * @param {boolean} overwrite - [optional] removes any other classes
     */
    add_class(_class,overwrite){
        if (overwrite) { this.remove_class("",true); }
        this.element.classList.add(_class);
    }
    
    /**
     * Adds event listener to the element
     * @param {string} type - type of event to add 
     * @param {Function} fv - the operation to do when the event fires
     */
    add_event(type,fv){
		this.element.addEventListener(type,fv);		
	}
	
    /**
     * Adds style to the element. Overwrite deletes all other stlye previously on the element.
     * @param {string} style - name of the style
     * @param {string} values - value of the style
     * @param {boolean} overwrite - [optional] remove all previous styles
     */
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
    
    /**
     * Adds attribute to the element. Eg. width
     * Use an array to set multiple attributes
     * @param {string} _attribute - name of the attribute
     * @param {string} values - value of the attribute
     */
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
    
    /**
     * Removes event listener from the element
     * @param {string} type - type of event to remove 
     * @param {string} fv - the operation to remove
     */
    remove_event(type,fv){
        this.element.removeEventListener(type,fv);
    }
    
    /**
     * Removes a style from the element
     * @param {string} style - name of the style element 
     */
    remove_style(style){
        this.element.style.removeProperty(style);
        if(this.element.style.length==0) this.element.removeAttribute("style");
    }
    
    /**
     * Removes class from the element. Set all to true to remove all classes
     * @param {string} _class - class name to remove
     * @param {boolean} all - [optional] - remove all classes
     */
    remove_class(_class,all){
        if(!all || all==null){
            this.element.classList.remove(_class);  
        }else{
            let classes=this.element.classList.entries();
            for (let i = 0; i < classes.length; i++) {
                this.element.classList.remove(classes[i]); 
            }
        }
    }
    
    /**
     * Removes the element from the parent
     */
    delete_element(){
		this.parent.removeChild(getElementbyID(this.id));
	}

    /**
     * Adds innerHTML to the element. Set add to false to overwrite existing text
     * @param {string} str - string to write 
     * @param {boolean} add - [optional] overwrite the existing text
     */
    innerhtml(str,add){
        if(add===true || add==null){this.element.innerHTML+=str;}else{this.element.innerHTML=str;}
    }

    /**
     * Adds innerText to the element. Set add to false to overwrite existing text
     * @param {*} str - string to write 
     * @param {*} add - [optional] overwrite the existing text
     */
    innertext(str,add){
        if(add===true || add==null){this.element.innerText+=str;}else{this.element.innerText=str;}
    }

    /**
     * Clears elements innerHTML
     */
    clearhtml(){ this.element.innerHTML=""; }
    /**
     * Clears elements innerText
     */
    cleartext(){ this.element.innerText=""; }
    
    resize(width,height){
        this.element.width=width;
        this.element.height=height;
        this.width=width;
        this.height=height;
    }
    
    /**
     * Hides the element
     */
    hide(){
        if(this.element.style.length==0){
            this.add_style("display","none");
        }else{
            this.element.style.display="none";
        }   
    }
    
    /**
     * Shows the element
     */
    show(){
        //display: block; display: none;
        if(this.element.style.length==0){
            this.add_style("display","block");
        }else{
            this.element.style.display="block";
        }   
    }
    
    
      
}


class eDiv extends domElements{
    
    /**
     * Creates a new div element
     * @param {string} id - id of the new div
     * @param {string} parent - [optional] parent of the div. Default is body
     * @param {string} str - [optional] innerHTML of the new div
     * @param {string} _class - [optional] class of the new div
     */
    constructor(id,parent,str,_class){
        let result=document.createElement('div');
        super(result,id,parent,str,_class);
    }

}

class eButton extends domElements {
    
    /**
     * Creates a new button
     * @param {*} id  - id of the new button
     * @param {*} parent - [optional] parent of the div. Default is body
     * @param {*} str - [optional] text of the new button
     * @param {*} _class - [optional] class of the new div
     * @param {*} fv - [optional] function to fire in click event
     */
    constructor(id,parent,str,_class,fv){
        let result=document.createElement('button');
        super(result,id,parent,str,_class);
        if(fv) this.add_event("click",fv);
    }
    
    /**
     * Adds onclick event to the button
     * @param {string} fv - function to fire
     */
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

    rectangle(x,y,width,height,lineWidth,color){
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
        if(setup_ran){ getElementbyID("canvasHolder").innerHTML="";
        }else{
            this.canvasHolder=new eDiv("canvasHolder","","","canvasHolder");
        }
        !width ? this.width=1280 : this.width=width;
        !height ? this.height=720 : this.height=height;
        cssRoot.style.setProperty("--canvasWidth",this.width+"px");
        cssRoot.style.setProperty("--canvasHeight",this.height+"px");
        this.parent=canvasHolder.id;
        let result=[];
        if(!id){
            result[0]=new eCanvas("foreground",this.parent,"","canvasForeground",this.width,this.height);
            this.foreground=result[0];
            result[1]=new eCanvas("background",this.parent,"","canvasBackground",this.width,this.height);
            this.background=result[1];
        }else{
            result[0]=new eCanvas(id,this.parent,"","canvasForeground",this.width,this.height);
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

var cssRoot=querySelect(':root');
var cssComputedStyle=getComputedStyle(cssRoot);

/**
 * Starts the engine. The engine will look for a draw function to run. 
 * @param {Number} width - width for the canvas to create
 * @param {Number} height - height for the canvas to create
 * @param {Number} id - [optional] id of the canvas
 * @param {Number} reset - [optional] deletes the current canvas and creates a new one
 */
const setup = function(width,height,id,reset) {
    engine=new asEngine(width,height,id,reset);
    canvases[0]=engine.foreground;
    if(!id)canvases[1]=engine.background; 
    setup_ran=true; 
    add_event('mousemove',engine.mouse_position);
}

/**
 * Starts the engine. The engine will look for a draw function to run. 
 */
const start=function(){
    engine.start();
}

/**
 * Stops the engine.
 */
const stop=function(){
    engine.stop();
}

/**
 * Sets the framerate for the engine. 
 * @param {Number} fr - amount for frame for seconds
 */
const framerate=function(fr){
    engine.get_framerate(fr);
}

/**
 * Clears the canvas
 * @param {Number} id - [optional] id of the canvas
 */
const clear = function(id){
    if(!id) id=0;
    if(id=="background") id=1;
    canvases[id].clear();  
}

/**
 * Translates (moves) the center of the canvas. Default 0,0 is the top right corner. 
 * @param {Number} x - amount to move horizontally
 * @param {Number} y - amount to move vertically
 * @param {Number} id - [optional] id of the canvas
 */
const translate=function(x,y,id){
    if(!id) id=0;
    if(id=="background") id=1;
    if(x=="center"){
        canvases[id].translate(canvases[id].width/2,canvases[id].height/2);
    }else{ 
        canvases[id].translate(x,y); 
    }
}

/**
 * Rotates the canvas
 * @param {Number} angle - angle to rotate the canvas
 * @param {Number} id - [optional] id of the canvas
 */
const rotate=function(angle,id){
    if(!id) id=0;
    if(id=="background") id=1;
    canvases[id].rotate(angle); 
}

/**
 * Begins a path to draw to the canvas. X and Y is the starting position. Nothing is drawn yet.
 * @param {Number} x - starting x position
 * @param {Number} y - starting y position
 * @param {Number} id - [optional] id of the canvas
 */
const beginPath=function(x,y,id){ 
    if(!id) id=0;
    if(id=="background") id=1;
    canvases[id].beginPath(x,y)
}
/**
 * Adds a new point to the path. It will also draw a line to it. 
 * @param {Number} x - next x position
 * @param {Number} y - next y position
 * @param {Number} id - [optional] id of the canvas
 */
const addPoint_toPath=function(x,y,id){ 
    if(!id) id=0;
    if(id=="background") id=1;
    canvases[id].addPoint_toPath(x,y);
}
/**
 * Ends the path 
 * @param {Number} id - [optional] id of the canvas
 */
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

/**
 * Draw a circle on the canvas.
 * @param {Number} x - Starting X position
 * @param {Number} y - Starting Y position
 * @param {Number} radius - Radius of the circle
 * @param {Number} lineWidth - [optional] Linewidth for stroke 
 * @param {Number} startAngle - [optional] starting angle for circle
 * @param {Number} endAngle - [optional] end angle for circle
 * @param {string} color - [optional] color for the line
 * @param {Number} id - [optional] id of the canvas
 */
const circle= function(x,y,radius,lineWidth,startAngle,endAngle,color,id){
    if(!id) id=0;
    if(id=="background") id=1;
    canvases[id].circle(x,y,radius,lineWidth,startAngle,endAngle,color);  
}

/**
 * Draw an ellipse on the canvas.
 * @param {Number} x - Starting X position
 * @param {Number} y - Starting Y position
 * @param {Number} radiusX - Radius X of the ellipse
 * @param {Number} radiusY - Radius Y of the ellipse
 * @param {Number} rotation - [optional] rotation around the center
 * @param {Number} lineWidth - [optional] Linewidth for stroke 
 * @param {string} color - [optional] color for the line
 * @param {Number} startAngle - [optional] starting angle for circle
 * @param {Number} endAngle - [optional] end angle for circle
 * @param {Number} id - [optional] id of the canvas
 */
const ellipse = function(x,y,radiusX,radiusY,rotation,lineWidth,color,startAngle,endAngle,id){
    if(!id) id=0;
    if(id=="background") id=1;
    canvases[id].circle(x,y,radiusX,radiusY,rotation,lineWidth,color,startAngle,endAngle); 
}

/**
 * Draw a rectangle on the canvas.
 * @param {Number} x - Starting X position
 * @param {Number} y - Starting Y position
 * @param {Number} width - Width of the rectangle
 * @param {Number} height - Height of the rectangle
 * @param {Number} lineWidth - [optional] Linewidth for stroke 
 * @param {string} color - [optional] color for the line
 * @param {Number} id - [optional] id of the canvas
 */
const rectangle = function(x,y,width,height,lineWidth,color,id){
    if(!id) id=0;
    if(id=="background") id=1;
    canvases[id].rectangle(x,y,width,height,lineWidth,color); 
}

/**
 * Draw a triangle on the canvas. Does not check if the triangle is correct.
 * @param {Number} x1 - Triangle X1 position
 * @param {Number} y1 - Triangle Y1 position
 * @param {Number} x2 - Triangle X2 position
 * @param {Number} y2 - Triangle Y2 position
 * @param {Number} x3 - Triangle X3 position
 * @param {Number} y3 - Triangle Y3 position
 * @param {Number} lineWidth - [optional] Linewidth for stroke 
 * @param {string} color - [optional] color for the line
 * @param {Number} id - [optional] id of the canvas
 */
const triangle=function(x1,y1,x2,y2,x3,y3,lineWidth,color,id){
    if(!id) id=0;
    if(id=="background") id=1;
    canvases[id].triangle(x1,y1,x2,y2,x3,y3,lineWidth,color);
}

/**
 * Sets the background color of the canvas 
 * @param {string} color - color to set
 * @param {Number} id - [optional] id of the canvas
 */
const background= function(color,id){
    if(!id) id=0;
    if(id=="background") id=1;
    canvases[id].background(color);  
}


/**
 * Sets the color for the stroke, also enables it
 * @param {string} color - color to set
 * @param {Number} id - [optional] id of the canvas
 */
const stroke= function(color,id){
    if(!id) id=0;
    if(id=="background") id=1;
    _stroke=true;
    canvases[id].stroke(color);  
}

/**
 * Disables stroke
 */
const noStroke= function(){
    _stroke=false;
}

/**
 * Sets the color for the fill, also enables it
 * @param {string} color - color to set
 * @param {Number} id - [optional] id of the canvas
 */
const fill= function(color,id){
    if(!id) id=0;
    if(id=="background") id=1;
    _fill=true;
    canvases[id].fill(color);  
}

/**
 * Disables fill
 */
const noFill=function(){
    _fill=false;
}

/**
 * Sets the linewidth (thickness)
 * @param {Number} thickness - linewidth to set
 * @param {Number} id - [optional] id of the canvas
 */
const lineWidth= function(thickness,id){
    if(!id) id=0;
    if(id=="background") id=1;
    canvases[id].lineWidth(thickness);
}

/**
 * Sets linear gradient between x1,y1 and x2,y2
 * @param {Number} x1 - start x position to set
 * @param {Number} y1 - start y position to set
 * @param {Number} x2 - end x position to set
 * @param {Number} y2 - end y position to set
 * @param {Number} id - [optional] id of the canvas
 */
const linearGradient=function(x1,y1,x2,y2,id){
    if(!id) id=0;
    if(id=="background") id=1;
    canvases[id].LinearGradient(x1,y1,x2,y2); 
}

/**
 * Sets color stop to the gradient
 * @param {Number} offset - The offset from the start between 0-1
 * @param {string} color - color for the stop
 * @param {Number} id - [optional] id of the canvas
 */
const add_colorStop=function(offset,color,id){
    if(!id) id=0;
    if(id=="background") id=1;
    canvases[id].gradient_addColorStop(offset,color); 
}

/**
 * Sets alpha for the canvas. Only applies for the operations afterwards. 
 * @param {Number} amount - The amount to set between 0-1
 * @param {Number} id - [optional] id of the canvas
 */
const alpha=function(amount,id){
    if(!id) id=0;
    if(id=="background") id=1;
    canvases[id].alpha(amount); 
}



/**
 * Resizes the canvas element. X and Y is in pixels
 * @param {Number} x - width to set the canvas 
 * @param {Number} x - height to set the canvas
 * @param {Number} id - [optional] id of the canvas
 */
const resizeCanvas = function(x,y,id){
    if(!id) id=0;
    if(id=="background") id=1;
    canvases[id].resize(x,y);  
}

/**
 * Adds an event listener to the canvas
 * @param {string} type - the type of the event to add
 * @param {string} fv - the function to fire in activation
 * @param {Number} id - [optional] id of the canvas
 */
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
 * @param {string} _mode - Mode to enter. DEGREE or RADIANS is accepted
 */
const angle_mode= function(_mode){
    let mode=_mode.toLowerCase();
    if(mode!="degrees" && mode!="degree" && mode!="radian" && mode!="radians" ) {throw new Error("Incorrent angle mode!");}
    if(mode=="degree") mode="degrees";
    if(mode=="radian") mode="radians";
    angleMode=mode;
}

/**
 * Console.log code shortening 
 * @param {string} str - string to console log 
 */
const log=function(str){
    console.log(str);
}

/**
 * Console.clear code shortening
 */
const cClear=function(){ console.clear(); }

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






























