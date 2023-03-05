"use strict";

const centralFigue = document.querySelector('#central');
const corners = document.querySelectorAll('.corner');
const gameOver = document.querySelector('.gameover');
const main = document.querySelector('.main');
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


// создание и стили хп в центре
let hitPoint = 100;
let sizeOfCenterNumber = 50;
let widthCentralFigue = centralFigue.offsetWidth;
let heightCentralFigue = centralFigue.offsetHeight;
centralFigue.innerHTML = `<p class= "centralText">${hitPoint}%</p>`;
centralFigue.style.cssText = `display: flex; justify-content: center; align-items: center; font-size: ${sizeOfCenterNumber}px; width: 100px; height: 100px`;

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

// проверка количества хп для окончания игры
function checkGameover() {
    if(hitPoint == 0) {
        centralFigue.style.fontSize = `0px`;
        centralFigue.style.width = `0px`;
        centralFigue.style.height = `0px`;

        gameOver.style.cssText = 'display: flex';
    } else {
        centralFigue.style.fontSize = `${sizeOfCenterNumber += 10}px`;
        centralFigue.style.width = `${widthCentralFigue += 10}px`;
        centralFigue.style.height = `${heightCentralFigue += 10}px`;
    }
    return hitPoint;
}

// изменение числа хп
function changeHpNumber() {
        centralFigue.innerHTML = `<p class= "centralText">${hitPoint -= 25}%</p>`;
        checkGameover();
}

// Основное событие
createRandomSquare();
main.addEventListener('click', (event) => {
    if (event.target && event.target.matches('div.newSquad')) {
        event.target.classList.add('moveToCenter');
        event.target.classList.remove('newSquad');

        createRandomSquare();

        setTimeout (() => {
            changeHpNumber();
            event.target.remove();
        },2500);
    }
});

// перезагрузка страницы после окончания игры
gameOver.addEventListener('click', () => {
    window.location.reload();
});