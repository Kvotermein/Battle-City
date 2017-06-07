////////////////////////menu
var mainMenu=document.getElementById('menu');
    animMenu=0;
    gameField=document.getElementById('PP');
    menuField=document.getElementById('menu');
    recordsField=document.getElementById('records');
    viewTankEmount=document.getElementById('viewTankEmount');
    anim=requestAnimationFrame(tickMenu);
    Level='ok';
    lvl=0;
    WidthField=600;
    heightField=600;
    squareBlock=20;

    function tickMenu() {
        animMenu=animMenu+0.5;
        mainMenu.style.top = (100-animMenu)+'vh';
        anim=requestAnimationFrame(tickMenu);
        if (mainMenu.style.top==='35vh') {
        cancelAnimationFrame(anim)
        }
    }

function defaultMenu() {
    alert('Defeat')
    DeleteObjects ()
    update=prompt('Enter your name', '***');
    StoreInfo();
    dificult=5000; 
    tanksonField=3;
    defaulFiedRenstruct()
    Level='Defeat';
    FiedArray=deepCopy(map_1)
    fieldFPS ()
    mytank.X=200;
    mytank.Y=580;
    requestAnimationFrame(tickMenu)
    animMenu=0;
    lvl=0;
    menuField.style.display='block';
    viewTankEmount.style.display='none';
    menuField.style.top='35vh';
}
function NextLevel () {
    defaulFiedRenstruct()
    if (lvl===1) {FiedArray=deepCopy(map_2); tankEmount=50;};
    if (lvl===2) {FiedArray=deepCopy(map_3); tankEmount=Infinity;};
    fieldFPS ()
    mytank.X=200;
    mytank.Y=580;
    if (lvl===3) {defaultMenu()};
}

function Back() {
    DeleteObjects ()
    dificult=5000; 
    tanksonField=3;
    defaulFiedRenstruct()
    Level='Defeat';
    FiedArray=deepCopy(map_1)
    fieldFPS ()
    mytank.X=200;
    mytank.Y=580;
    requestAnimationFrame(tickMenu)
    animMenu=0;
    lvl=0;
    menuField.style.display='block';
    viewTankEmount.style.display='none';
    menuField.style.top='35vh';
}
////////////////////////menu

////предзагрузка изображений
  var PreloadedImagesH={};
    function PreloadImage(FN)
    {
        // если такое изображение уже предзагружалось - ничего не делаем
        if ( FN in PreloadedImagesH )
            return;
        // предзагружаем - создаём невидимое изображение
        var Img=new Image();
        Img.src=FN;
        // запоминаем, что изображение уже предзагружалось
        PreloadedImagesH[FN]=true;
    }
    var Aimages=['images/1.png','images/2.png','images/3.png','images/4.png','images/5.png','images/6.png','images/7.png','images/8.png',
                 'images/9.png','images/10.png','images/11.png','images/12.png','images/13.png','images/14.png','images/15.png','images/16.png']

    function PreloadImg(V,I,A) {
        PreloadImage(V)
    }
    Aimages.forEach(PreloadImg)

////предзагрузка изображений

var svgNS = "http://www.w3.org/2000/svg";

function block(X,Y,color) {
        var brick=document.createElementNS(svgNS,'rect');
        brick.setAttributeNS(null,"x",X);
        brick.setAttributeNS(null,"y",Y);
        brick.setAttributeNS(null,"width",20);
        brick.setAttributeNS(null,"height",20);
        brick.setAttributeNS(null,"fill",color);
        field.appendChild(brick);
}

function blockEagle(X,Y,img) {
        var brick=document.createElementNS(svgNS,'image');
        brick.setAttributeNS(null,"x",X);
        brick.setAttributeNS(null,"y",Y);
        brick.setAttributeNS(null,"width",20);
        brick.setAttributeNS(null,"height",20);
        brick.setAttributeNS('http://www.w3.org/1999/xlink',"xlink:href",img);
        field.appendChild(brick);
}
////копирование массива
function deepCopy(a){
    if (a===null) {return a}
    if (Array.isArray(a)===true) {
        var y = [];
        for (var i = 0; i < a.length; i++) {
           y.push(deepCopy(a[i])) 
        }
        return y;
    }
    if (typeof(a)==='object') {
        var y={}
        for (var key in a) {
            y[key]=deepCopy(a[key])
        }
        return y;
    }
    return a;
};
var FiedArray=deepCopy(map_1);

function fieldFPS () {
        function FF (V,I,A) {
            for (var i = 0; i < V.length; i++) {
                if (V[i]===1) {blockEagle(i*20,I*20,'images/brick.png')};
                if (V[i]===4) {blockEagle(i*20,I*20,'images/Base.png')}
            };
        
        }
        FiedArray.forEach(FF)
}
// fieldFPS ()

function fieldFPSBlack () {
        function FF (V,I,A) {
            for (var i = 0; i < V.length; i++) {
                if (V[i]===3) {block(i*20,I*20,'black')};
                if (V[i]===3) {FiedArray[I][i]=0;}
            };
        
        }
        FiedArray.forEach(FF)
}
function defaulFiedRenstruct () {
    var asd=document.getElementById('field');
    while(asd.firstChild) asd.removeChild(asd.firstChild);
}


////////////////////////////////////////// класс танков ботов
 function TTankAI(X,Y,D) {
    var exist=true
     this.X=X;
     this.Y=Y;
     this.SpeedY=0;
     this.SpeedX=0;
     if (D===false) {this.Image='images/myTankUp.png';} else this.Image='images/tankU.png';
     this.speedBylletY= 0;
     this.speedBylletX= 0;
     this.speedBylletYbeforeStart=0;
     this.speedBylletXbeforeStart=0;
     this.bullIscreate=false;
     this.explosionhit=false;
     this.bullX=this.X;
     this.bullY=this.Y;
     this.brick=document.createElementNS(svgNS,'null');
     this.Tank=document.createElementNS(svgNS,'image');
     this.R=1;
     this.expImg=null;

     this.blockTank = function () {
        if (this.Y > heightField-squareBlock) {this.Y=heightField-squareBlock} 
        if (this.Y < 0) {this.Y=0;}
        if (this.X > WidthField-squareBlock) {this.X=WidthField-squareBlock}
        if (this.X < 0) {this.X=0}     
    }
    this.blockBullet = function () {
        var TankLineY =  Math.round(this.Y/squareBlock);    
        var TankLineX =  Math.round(this.X/squareBlock);
// есть ли препятсвие слева
        for (var i = 0; i <= TankLineX; i++) {
                var blockY=FiedArray[TankLineY][i]
                if (blockY === 1) {if (this.X < (i+1)*squareBlock) {this.X=(i+1)*squareBlock} }

        };
// есть ли препятсвие справа
        for (var i = TankLineX; i <= FiedArray[TankLineY].length; i++) {
                var blockY=FiedArray[TankLineY][i+1]
                if (blockY === 1) {if (this.X > (i)*squareBlock) {this.X=(i)*squareBlock} }

        };   
// есть ли препятсвие снизу
        for (var i = 0; i <= TankLineY; i++) {
                var blockY=FiedArray[i][TankLineX]
                if (blockY === 1) {if (this.Y < (i+1)*squareBlock) {this.Y=(i+1)*squareBlock} }

        };
//есть ли препятсвие сверху
         for (var i = TankLineY; i < FiedArray.length; i++) {
                var blockY=FiedArray[i][TankLineX]
                if (blockY === 1) {if (this.Y > (i-1)*squareBlock) {this.Y=(i-1)*squareBlock} }

        }
    }

     this.setTank = function () {
        
        if (exist===true) {
            this.Tank.setAttributeNS(null,"y",this.Y);
            this.Tank.setAttributeNS(null,"x",this.X);
            this.Tank.setAttributeNS(null,"width",20);
            this.Tank.setAttributeNS(null,"height",20);
            this.Tank.setAttributeNS('http://www.w3.org/1999/xlink',"xlink:href",this.Image);
            this.Y+=this.SpeedY
            this.X+=this.SpeedX
            PP.appendChild(this.Tank);
            this.blockTank()
            this.blockBullet()
            this.setBullet()
            this.setexp()
        }

     }

     this.BulletHitWall = function () {
                if (this.bullY > heightField-squareBlock &&  this.speedBylletY!==0) {
                    this.hit()
                }
                if (this.bullY < 0 &&  this.speedBylletY!==0) {
                    this.hit()
                }
                if (this.bullX > WidthField-squareBlock &&  this.speedBylletX!==0) {
                    this.hit()
                }
                if (this.bullX < 0 &&  this.speedBylletX!==0) {
                    this.hit()
                } 
     }

     this.BulletHitBrick = function () {
                var TankLineY =  Math.round(this.bullY/squareBlock);
                var TankLineX =  Math.round(this.bullX/squareBlock);
                // есть ли препятсвие слева
                        for (var i = 0; i <= TankLineX; i++) {
                                var blockY=FiedArray[TankLineY][i]
                                if (blockY === 1||blockY === 4) {if (this.bullX < (i+1)*squareBlock && this.speedBylletX!==0) {
                                    this.hit()
                                    FiedArray[TankLineY][i]=3;
                                    fieldFPSBlack ()
                                    if (blockY===4) {
                                        setTimeout(defaultMenu,2000);
                                    }
                                   
                                } 
                            }
                        };
                // есть ли препятсвие справа
                        for (var i = TankLineX; i <= FiedArray[TankLineY].length; i++) {
                                var blockY=FiedArray[TankLineY][i+1]
                                if (blockY === 1||blockY === 4) {if (this.bullX > (i)*squareBlock && this.speedBylletX!==0) {
                                    this.hit()
                                    FiedArray[TankLineY][i+1]=3;
                                    fieldFPSBlack ()
                                    if (blockY===4) {
                                        setTimeout(defaultMenu,2000);
                                    }

                                } 
                            }
                        };   
                // есть ли препятсвие снизу
                        for (var i = 0; i <= TankLineY; i++) {
                                var blockY=FiedArray[i][TankLineX]
                                if (blockY === 1||blockY === 4) {if (TankLineY < (i+1) && this.speedBylletY!==0) {
                                    this.hit()
                                    FiedArray[i][TankLineX]=3;
                                    fieldFPSBlack ()
                                    if (blockY===4) {
                                        setTimeout(defaultMenu,2000);
                                    }

                                } 
                            }

                        };
                //есть ли препятсвие сверху
                         for (var i = TankLineY; i < FiedArray.length; i++) {
                                var blockY=FiedArray[i][TankLineX]
                                if (blockY === 1||blockY === 4) {if (this.bullY > (i-1)*squareBlock && this.speedBylletY!==0) {
                                    this.hit()
                                    FiedArray[i][TankLineX]=3;
                                    fieldFPSBlack ()
                                    if (blockY===4) {           
                                        setTimeout(defaultMenu,2000);
                                    }

                                } 
                            }
                        };
     }

     this.setBullet = function () {
            this.brick.setAttributeNS(null,"x",this.bullX+8);
            this.brick.setAttributeNS(null,"y",this.bullY+8);
            this.brick.setAttributeNS(null,"width",5);
            this.brick.setAttributeNS(null,"height",5);
            this.brick.setAttributeNS(null,"fill","orange");
            this.bullX+=this.speedBylletX
            this.bullY+=this.speedBylletY
            this.BulletHitWall();
            this.BulletHitBrick(); 
     }

     this.startBullet = function () {
        if (this.bullIscreate===false && this.explosionhit===false){
        if (D===false) {                            
            Start();
            ClickSound();
            }
        this.bullIscreate=true;
        this.bullX=this.X;
        this.bullY=this.Y;
        this.speedBylletY=this.speedBylletYbeforeStart;
        this.speedBylletX=this.speedBylletXbeforeStart;
        this.brick=document.createElementNS(svgNS,'rect')
        PP.appendChild(this.brick);        
        }
     }

     this.hit = function () {
        if (D===false) {                            
        Start1();
        ClickSound1();
        }
                this.bullIscreate=false;
                PP.removeChild(this.brick);
                this.speedBylletY=0;
                this.speedBylletX=0;
                this.expl()
                this.explosionhit=true;
                this.bullX=this.X;
                this.bullY=this.Y;
    }

     this.expl = function () {
            this.expImg=document.createElementNS(svgNS,'image')
            PP.appendChild(this.expImg);
            this.expImg.setAttributeNS(null,"y",this.bullY-10);
            this.expImg.setAttributeNS(null,"x",this.bullX-10);
            this.expImg.setAttributeNS(null,"width",40);
            this.expImg.setAttributeNS(null,"height",40);
     }

     this.setexp =  function() {
        if (this.bullIscreate===false) {
            if (this.explosionhit===true) {
            this.expImg.setAttributeNS('http://www.w3.org/1999/xlink',"xlink:href",'images/'+this.R+'.png');
            if (this.R<16) {this.R++} else {this.R=1; this.explosionhit=false;PP.removeChild(this.expImg)} ;
         }
        }
     } 

    this.down = function () {
                    if (D) {this.SpeedY=1;}else this.SpeedY=2;
                    this.SpeedX=0;
                    this.speedBylletYbeforeStart=5;
                    this.speedBylletXbeforeStart=0;
                    if(D) {this.startBullet();}
                    if (D===false) {this.Image='images/myTankDown.png';} else this.Image='images/tankD.png'
    }
    this.up = function () {
                    if (D) {this.SpeedY=-1;}else this.SpeedY=-2;
                    this.SpeedX=0;
                    this.speedBylletYbeforeStart=-5;
                    this.speedBylletXbeforeStart=0;
                    if(D) {this.startBullet();}
                    if (D===false) {this.Image='images/myTankUp.png';} else this.Image='images/tankU.png'
    }
    this.right = function() {
                    this.SpeedY=0;
                    if (D) {this.SpeedX=1;}else this.SpeedX=2;
                    this.speedBylletYbeforeStart=0;
                    this.speedBylletXbeforeStart=5;
                    if(D) {this.startBullet();}
                    if (D===false) {this.Image='images/myTankRight.png';} else this.Image='images/tankR.png'        
    }
    this.left = function () {
                    this.SpeedY=0;
                    if (D) {this.SpeedX=-1;}else this.SpeedX=-2;
                    this.speedBylletYbeforeStart=0;
                    this.speedBylletXbeforeStart=-5;
                    if(D) {this.startBullet();}
                    if (D===false) {this.Image='images/myTankLeft.png';} else this.Image='images/tankL.png'
    }
    this.stopY = function () {
                    this.SpeedY=0;
    }
    this.stopX = function () {
                    this.SpeedX=0;
    }


    if (D) {
            function AISpeed(a) {
                    function RandomDiap(N,M) {
                        return Math.floor(
                            Math.random()*(M-N+1)
                            )+N;
                    }
                    var  b=RandomDiap(1,4)
                    var  time=RandomDiap(500,3000)
                    if (b===2){
                        a.down()
                    };
                    if (b===1){
                        a.up()
                    }
                    if (b===4){
                        a.left()
                    }
                    if (b===3){
                        a.right()
                    }
                    var t = setTimeout(AISpeed,time,a) 
            }
        AISpeed(this)
    }

}
////////////////////////////////////////// класс танков ботов
////////////////////////////////////////// управление собственным танком
    window.onkeydown = LL;
    window.onkeyup = UU;
    function LL (EO) {
        EO=EO||window.event
        // EO.preventDefault();
        switch  (EO.keyCode)
        {
            case 40:
                    mytank.down()
                 break;
            case 38:    
                    mytank.up()
                 break;
            case 39:
                    mytank.right()
                 break;
            case 37:
                    mytank.left() 
                 break;
            case 32:
                 mytank.startBullet();
                 mytank.setBullet();
                 break;
        }

    }
    function UU (EO) {
        EO=EO||window.event
        switch  (EO.keyCode)
        {
            case 40:
                 mytank.stopY()
                 break;
            case 38:    
                 mytank.stopY()
                 break;
            case 39:
                 mytank.stopX()
                 break;
            case 37:
                 mytank.stopX() 
                 break;
        }        
    }

//////////////////////////////////////
//////////////////////////////////////Создание танков и их отображение на поле
var tankEmount=40;
var Scores=0;
var dificult=5000;
var TankObjArray=[];
var tanksonField=3;
function goTOBattle(V,I,A) {
    V.setTank()
}
    var a=0
var nameplayer;
function GenerateTanks() {
    if (TankObjArray.length<tanksonField) {
    if (TankObjArray.length===0 && tankEmount===0) {
            lvl++
            if (lvl<4) {NextLevel()};
        }
    if (tankEmount>0) { 
        TankObjArray.push(new TTankAI(a,0,true))
        tankEmount--
        document.getElementById('enterTankEmount').innerHTML=tankEmount;
     }
     if (Scores===10) {dificult=2000; tanksonField=6;}
     if (Scores===20) {dificult=1500; tanksonField=9;}
     if (Scores===30) {dificult=1000; tanksonField=12;}
     if (Scores===80) {dificult=1000; tanksonField=20;}
     if (Scores===100) {dificult=500; tanksonField=35;}  
        a=a+300
        if (a===900) {a=0}   
            
    }
    var genTimeTanks=setTimeout(GenerateTanks,dificult);
}
var mytank= new TTankAI(200,580,false)

function DeleteObjects () {
    for (var i = 0; i < TankObjArray.length; i++) {
        PP.removeChild(TankObjArray[i].Tank)
        if (TankObjArray[i].bullIscreate) {PP.removeChild(TankObjArray[i].brick);}
        if (TankObjArray[i].explosionhit===true) {PP.removeChild(TankObjArray[i].expImg);}; 
    };
    TankObjArray.splice(0,TankObjArray.length)
}

////////////////vibration//////////////
    function Vibro(LongFlag)
    {
        if ( navigator.vibrate ) // есть поддержка Vibration API?
        {
            if ( !LongFlag )
                window.navigator.vibrate(300); // вибрация 300мс
            else
                window.navigator.vibrate([100,50,100,50,100]); // вибрация 3 раза по 100мс с паузами 50мс
        }
    }
//////////////////vibration//////////////    

//////////////////////////////////////////////// Тач управление танком///////////
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchstart', doubletap, false);
document.addEventListener('touchmove', handleTouchMove, false);
document.addEventListener('touchend', handleTouchend, false);

var xDown = null;                                                        
var yDown = null;                                                        
var mylatesttap;

function handleTouchStart(evt) {
    xDown = evt.touches[0].clientX;                                      
    yDown = evt.touches[0].clientY;

};
function handleTouchend(evt) {
        mytank.stopY()
        mytank.stopX()                                    
};      

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
        if ( xDiff > 0 ) {
                    mytank.left()
        } else {
                    mytank.right()            
        }                       
    } else {      
        if ( yDiff > 0 ) {
            mytank.up()            
            
        } else { 
            mytank.down()
        }                                                                 
    }
    
    xDown = null;
    yDown = null;                                             
};
function doubletap() {

   var now = new Date().getTime();
   var timesince = now - mylatesttap;
   if((timesince < 600) && (timesince > 0)){
        mytank.startBullet();
        mytank.setBullet();

   }else{
           
         }

   mylatesttap = new Date().getTime();

}
///////////////////////////////////////////////тач управление танком//////////////
/////////////////////////////////////////////// S4et4ik//////////////////////////////////////////////////////

function Lrocket() {

TankObjArray.forEach(goTOBattle)

        mytank.setTank()
    var Checkhit = function () {
                    for (var i = 0; i < TankObjArray.length; i++) {
                        var TankLineY =  Math.round(mytank.bullY/20);
                        var TankLineX =  Math.round(mytank.bullX/20);
                        var TankLineYAI =  Math.round(TankObjArray[i].Y/20);
                        var TankLineXAI =  Math.round(TankObjArray[i].X/20);
                            if (TankLineY>TankLineYAI-1 && TankLineY<TankLineYAI+1 && TankLineX>TankLineXAI-1 && TankLineX<TankLineXAI+1) {
                            PP.removeChild(TankObjArray[i].Tank);
                            if (TankObjArray[i].bullIscreate) {PP.removeChild(TankObjArray[i].brick);}
                            if (TankObjArray[i].explosionhit===true) {PP.removeChild(TankObjArray[i].expImg);}; 
                            TankObjArray[i].Tank=document.createElementNS(svgNS,'null');
                            exist=false;
                            if(mytank.bullIscreate===true){mytank.hit()};
                            Vibro(false);
                            TankObjArray.splice(i,1)
                            console.log(TankObjArray)
                            Scores++
                            document.getElementById('enterScore').innerHTML=Scores;
                            console.log(Scores)  
                        }                       
                    }
    }
Checkhit()

    Animation =  requestAnimationFrame(Lrocket);
    if (Level==='Defeat') {cancelAnimationFrame(Animation)};
}
///////////////////////////////////////////////\\\\\ S4et4ik\\\\\\//////////////////////////////////////////////////////