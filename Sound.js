///////////////////////звук
var ClickAudio=new Audio("Shoot.mp3");
var ClickAudio1= new Audio("Hit.mp3");
var ClickAudio2= new Audio("loop.mp3")
function ShootSound() {
    ClickAudio.play(); // запускаем звук
    ClickAudio.pause(); // и сразу останавливаем
}
function Start() {
        ShootSound(); // важно "запустить" звук по событию, т.е. нажатию кнопки
}
function ClickSound() {
        ClickAudio.currentTime=0; // в секундах
        ClickAudio.play();
}

function ShootSound1() {
    ClickAudio1.play(); // запускаем звук
    ClickAudio1.pause(); // и сразу останавливаем
}
function Start1() {
        ShootSound1(); // важно "запустить" звук по событию, т.е. нажатию кнопки
}
function ClickSound1() {
        ClickAudio1.currentTime=0; // в секундах
        ClickAudio1.play();
}
function ShootSound2() {
    ClickAudio2.play(); // запускаем звук
    ClickAudio2.pause(); // и сразу останавливаем
}
function Start2() {
        ShootSound2(); // важно "запустить" звук по событию, т.е. нажатию кнопки
}
function ClickSound2() {
        ClickAudio2.currentTime=0; // в секундах
        ClickAudio2.play();
}
///////Звук