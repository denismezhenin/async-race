import { renderCar } from './renderCar';

export const renderCarField = (id: number, color: string, name: string) => {
    const li = document.createElement('li');
    const selectButton = document.createElement('button');
    const removeButton = document.createElement('button');
    const firstButtonRowWrapper = document.createElement('div');
    const secondButtonRowWrapper = document.createElement('div');
    const startButton = document.createElement('button');
    const resetButton = document.createElement('button');
    const carName = document.createElement('span');
    const flagImg = document.createElement('img');
    const carSvg = document.createElement('div');
    const carTrackWrapper = document.createElement('div');
    li.id = `${id}`;
    li.dataset.color = color;
    selectButton.textContent = 'select';
    resetButton.textContent = 'B';
    startButton.textContent = 'A';
    removeButton.textContent = 'remove';
    carName.textContent = name;
    carName.classList.add('car-name');
    startButton.classList.add('start');
    selectButton.classList.add('select');
    removeButton.classList.add('remove');
    resetButton.classList.add('reset');
    firstButtonRowWrapper.append(selectButton, removeButton, carName);
    secondButtonRowWrapper.append(startButton, resetButton);
    carSvg.innerHTML = renderCar(color);
    flagImg.src = 'flag.svg';
    carTrackWrapper.append(carSvg, flagImg);
    carTrackWrapper.classList.add('item__car-wrapper');
    carSvg.classList.add('item__car-wrapper-car');
    flagImg.classList.add('item__car-wrapper-flag');
    li.append(firstButtonRowWrapper, secondButtonRowWrapper, carTrackWrapper);
    li.classList.add('car-list__item', 'item');
    return li;
};
