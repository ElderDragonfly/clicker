"use strict";

const centralFigue = document.querySelector('#central'),
      corners = document.querySelectorAll('.corner'),
      lose = document.querySelector('.lose'),
      win = document.querySelector('.win'),
      gameOver = document.querySelectorAll('.gameover'),
      main = document.querySelector('.main'),
      score = document.querySelector('.score');
let newSquad = document.querySelector('.newSquad');

// рандомайзер
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

// координаты случайных точек на экране
const screenWidth = document.body.clientWidth;
const screenHeight = document.body.clientHeight;

// получение размеров центрального блока
let centralWidth = centralFigue.offsetWidth;
let centralHeight = centralFigue.offsetHeight;
let exceptCentralFigueWidthMin =  screenWidth / 2  - centralWidth / 2 - 15;
let exceptCentralFigueWidthMax =  screenWidth / 2  + centralWidth / 2 + 15;
let exceptCentralFigueHightMin =  screenHeight / 2  - centralHeight / 2 - 15;
let exceptCentralFigueHightMax =  screenHeight / 2  + centralHeight / 2 + 15;

// создание массива с числами-координатами центра
let arrayCentralWidth = [];
for (let i = exceptCentralFigueWidthMin; i < exceptCentralFigueWidthMax; i++ ) {
    arrayCentralWidth.push(Math.round(i));
}
let arrayCentralHeight = [];
for (let i = exceptCentralFigueHightMin; i < exceptCentralFigueHightMax; i++ ) {
    arrayCentralHeight.push(Math.round(i));
}

// рандомайзер исключающий центр
let сoordinatsExeptCenter;
function getRandomIntExeptCenter(arrW, arrH, width, Height) {
    let randomNumberW = getRandomIntInclusive(0, width - 30);
    let randomNumberH = getRandomIntInclusive(0, Height - 30);
    for (let i = 0; i < arrW.length; i++) {
        for (let j = 0; j < arrH.length; j++) {
            if (arrW[i] === randomNumberW && arrH[j] === randomNumberH) {
                return getRandomIntExeptCenter(arrW, arrH, width, Height);
            }
        }
    }
    return [randomNumberW, randomNumberH];
}

// функция на создание случайного нового квадрата
function createRandomSquare() {
    let randomDiv = document.createElement('div');
    main.append(randomDiv);
    randomDiv.classList.add('corner', 'newSquad', 'coordinats');
    сoordinatsExeptCenter = getRandomIntExeptCenter(arrayCentralWidth, arrayCentralHeight, screenWidth, screenHeight);
    document.querySelector('.coordinats').style.top = `${сoordinatsExeptCenter[1]}px`;
    document.querySelector('.coordinats').style.left = `${сoordinatsExeptCenter[0]}px`;
    randomDiv.classList.remove('coordinats');
}

// изменение центрального числа
let centralNumber = 50;
function changeHpNumber() {
    centralFigue.innerHTML = `<p class= "centralText">${centralNumber++}%</p>`;
    score.innerHTML++;
    endGame();
}

// конец игры
function endGame() {
    if (centralNumber == 0) {
        clearInterval(speedOfGame);
        lose.style.cssText = 'display: flex';
    }
    if (centralNumber == 100) {
        clearInterval(speedOfGame);
        win.style.cssText = 'display: flex';
    }
}

// проверка на количество активных квадратов
let currentMaxSquad = 1;
let currentSquadNumber = 0;
function checkNumbersOfSquad() {
    if (currentSquadNumber < currentMaxSquad) {
        createRandomSquare();
        console.log(currentSquadNumber++);
    }
}
const squadeCreateTimer = setInterval(checkNumbersOfSquad, 10);

// скорость игры
let speed = 3000;
function decreaseСentralNumber() {
    centralFigue.innerHTML = `<p class= "centralText">${centralNumber--}%</p>`;
    nextLevelStageOne();
    endGame();
}
let speedOfGame = setInterval(decreaseСentralNumber, speed);

// увеличение количества квадратов
function nextLevelStageOne() {
    if (centralNumber > 70) {
        currentMaxSquad = 2;
        clearInterval(speedOfGame);
        speed = 2000;
        speedOfGame = setInterval(decreaseСentralNumber, speed);
    }
    if (centralNumber > 85) {
        currentMaxSquad = 3;
        clearInterval(speedOfGame);
        speed = 1000;
        speedOfGame = setInterval(decreaseСentralNumber, speed);
    }
}
// setInterval(nextLevelStageOne, 10);

// Основное событие
main.addEventListener('click', (event) => {
    let target = event.target;

    if (target && target.matches('div.newSquad')) {
        target.classList.add('moveToCenter');
        target.classList.remove('newSquad');

        currentSquadNumber--;

        setTimeout (() => {
            changeHpNumber();
            target.remove();
        },2500);
    }
});

// переключение в блоке статистики
let tabs = document.querySelectorAll('.stats_item'),
    tabParent = document.querySelector('.stats');

function hideTabContant() {
    tabs.forEach(element => {
        element.classList.add('hide');
        element.classList.remove('show');
    });
}

function showTabContant(i = 0) {
    tabs[i].classList.remove('hide');
    tabs[i].classList.add('show');
}

hideTabContant();
showTabContant();

let numberOfTabs =0;
tabParent.addEventListener('click', (event) => {
    const target = event.target;

    if (target && target.classList.contains('rightArrow__img')) {
        numberOfTabs++;
        if(numberOfTabs > 2) {
            numberOfTabs = 0;
        }
        hideTabContant();
        showTabContant(numberOfTabs);
    }

    if (target && target.classList.contains('leftArrow__img')) {
        numberOfTabs--;
        if(numberOfTabs < 0) {
            numberOfTabs = 2;
        }
        hideTabContant();
        showTabContant(numberOfTabs);
    }
});

// таймер
let seconds = document.querySelector('.seconds'),
    minutes = document.querySelector('.minutes'),
    ours = document.querySelector('.ours');

let numberOfSeconds = 0;
function increaseSeconds() {
    if (numberOfSeconds > 2) {
        numberOfSeconds = 0;
    }
    if (numberOfSeconds < 10) {
        seconds.innerHTML = `0${numberOfSeconds++}`;
        return;
    }
    seconds.innerHTML = `${numberOfSeconds++}`;
}
let secondsTimer = setInterval(increaseSeconds, 1000);

let numberOfMinutes = 0;
function increaseMinutes() {
    if (numberOfMinutes > 59) {
        numberOfMinutes = 0;
    }
    if (numberOfMinutes < 10) {
        minutes.innerHTML = `0${numberOfMinutes++}`;
        return;
    }
    minutes.innerHTML= `${numberOfMinutes++}`;
}
let minutesTimer = setInterval(increaseMinutes, 2000);

let numberOfOurs = 0;
function increaseOurs() {
    if (numberOfOurs > 59) {
        numberOfOurs = 0;
    }
    if (numberOfOurs < 10) {
        ours.innerHTML = `0${numberOfOurs++}`;
        return;
    }
    ours.innerHTML= `${numberOfOurs++}`;
}
let oursTimer = setInterval(increaseOurs, 1000*60*60);


// перезагрузка страницы после окончания игры
gameOver.forEach(element => {
    element.addEventListener('click', () => {
        window.location.reload();
    });
});