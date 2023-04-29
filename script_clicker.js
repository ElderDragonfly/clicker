"use strict";

const centralFigue = document.querySelector('#central'),
      corners = document.querySelectorAll('.corner'),
      lose = document.querySelector('.lose'),
      win = document.querySelector('.win'),
      gameOver = document.querySelectorAll('.gameover'),
      main = document.querySelector('.main'),
      score = document.querySelector('.score');
let newSquad = document.querySelector('.newSquad'),
    stats = document.querySelector('.stats'),
    hitPoint = document.querySelector('.hitPoint');

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

// массив с координатами блока статистики
let arrayStatsWidth = [];
for (let i = stats.getBoundingClientRect().x - 15; i < stats.getBoundingClientRect().x + stats.getBoundingClientRect().width + 15; i++) {
    arrayStatsWidth.push(Math.round(i));
}
let arrayStatsHeight = [];
for (let i = stats.getBoundingClientRect().y - 15; i < stats.getBoundingClientRect().y + stats.getBoundingClientRect().height + 15; i++) {
    arrayStatsHeight.push(Math.round(i));
}

// создание массива с числами-координатами центра
let arrayCentralWidth = [];
for (let i = exceptCentralFigueWidthMin; i < exceptCentralFigueWidthMax; i++ ) {
    arrayCentralWidth.push(Math.round(i));
}
let arrayCentralHeight = [];
for (let i = exceptCentralFigueHightMin; i < exceptCentralFigueHightMax; i++ ) {
    arrayCentralHeight.push(Math.round(i));
}

// рандомайзер исключающий центр и блок статистики
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
    if (arrayStatsWidth.includes(randomNumberW) && arrayStatsHeight.includes(randomNumberH)) {
        return getRandomIntExeptCenter(arrW, arrH, width, Height);
    }
    return [randomNumberW, randomNumberH];
}

// функция на создание случайного нового квадрата
function createRandomSquare(someClass) {
    let randomDiv = document.createElement('div');
    main.append(randomDiv);
    randomDiv.classList.add('corner', 'newSquad', 'coordinats', someClass = 'standart');
    сoordinatsExeptCenter = getRandomIntExeptCenter(arrayCentralWidth, arrayCentralHeight, screenWidth, screenHeight);
    document.querySelector('.coordinats').style.top = `${сoordinatsExeptCenter[1]}px`;
    document.querySelector('.coordinats').style.left = `${сoordinatsExeptCenter[0]}px`;
    randomDiv.classList.remove('coordinats');
}

// изменение центрального числа и счёта
let centralNumber = 50;
let gameScore = 0;
function changeHpNumber(scorePlus = 1) {
    hitPoint.innerHTML = `${centralNumber += scorePlus}%`;
    score.innerHTML = `${gameScore += scorePlus}`;
    endGame();
}

// конец игры
function endGame() {
    if (centralNumber <= 0) {
        clearInterval(speedOfGame);
        lose.style.cssText = 'display: flex';
    }
    if (centralNumber >= 100) {
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
        secondLvlSquad();
        negativeSquad();
        console.log(currentSquadNumber++);
    }
}
const squadeCreateTimer = setInterval(checkNumbersOfSquad, 10);

// скорость игры
let speed = 3000;
function decreaseСentralNumber() {
    hitPoint.innerHTML = `${centralNumber--}%`;
    nextLevelStage();
    endGame();
}
let speedOfGame = setInterval(decreaseСentralNumber, speed);

// увеличение количества квадратов и скорости игры
function nextLevelStage() {
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

// добавление квадратов 2го уровня
function secondLvlSquad() {
    let chanceOfSpawn = getRandomIntInclusive(1, 10);
    if (chanceOfSpawn == 10) {
        createRandomSquare('betterSquad');
    }
    // можно дописать функцию удаления квадрата через время
}

// добавлени квадрата на уменьшение счёта
function negativeSquad() {
    let chanceOfSpawn = getRandomIntInclusive(1, 10);
    if (chanceOfSpawn == 10) {
        createRandomSquare('negativeSquade');
    }
    // можно дописать функцию удаления квадрата через время
}

// Основное событие
main.addEventListener('click', (event) => {
    let target = event.target;

    if (target && target.matches('div.newSquad')) {
        target.classList.add('moveToCenter');
        target.classList.remove('newSquad');

        currentSquadNumber--;

        setTimeout (() => {
            if (target && target.matches('div.betterSquad')) {
                changeHpNumber(10);
            } else if (target && target.matches('div.negativeSquade')) {
                changeHpNumber(-10);
            } else {
                changeHpNumber();
            }
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

let numberOfSeconds = 0,
    numberOfMinutes = 0,
    numberOfOurs = 0;

function increaseSeconds() {
    numberOfSeconds++;
    if (numberOfSeconds > 59) {
        increaseMinutes();
        numberOfSeconds = 0;
    }
    if (numberOfSeconds < 10) {
        seconds.innerHTML = `0${numberOfSeconds}`;
    } else {
        seconds.innerHTML = `${numberOfSeconds}`;
    }
}
let secondsTimer = setInterval(increaseSeconds, 1000);

function increaseMinutes() {
    numberOfMinutes++;
    if (numberOfMinutes > 59) {
        numberOfMinutes = 0;
        increaseOurs();
    }
    if (numberOfMinutes < 10) {
        minutes.innerHTML = `0${numberOfMinutes}`;
    } else {
        minutes.innerHTML= `${numberOfMinutes}`;
    }
}

function increaseOurs() {
    if (numberOfOurs > 59) {
        numberOfOurs = 0;
    }
    if (numberOfOurs < 10) {
        ours.innerHTML = `0${numberOfOurs++}`;
    } else {
        ours.innerHTML= `${numberOfOurs++}`;
    }
}


// перезагрузка страницы после окончания игры
gameOver.forEach(element => {
    element.addEventListener('click', () => {
        window.location.reload();
    });
});