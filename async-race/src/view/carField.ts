// import { page } from '../app';
import { tsQuerySelector, tsQuerySelectorAll } from '../components/helpers';
import { state, stopCarsArray } from '../components/state';
import {
    changeCarStatus,
    checkCarStatus,
    createCar,
    deleteCar,
    getCar,
    getCars,
    switchCarToDrive,
} from '../utils/api';
import { renderCar } from './renderCar';
import { renderGarage } from './renderGarage';
import { renderWinnerList, sortWinners } from './renderWinners';
import { UTILS } from '../components/constants';
import { getSuccess, getSuccessPromise } from './race';

export const renderCarField = (id: string, color: string, name: string) => {
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
    li.id = id;
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

// let animationStart
// let requestId
// function startAnimation() {
//   requestId = window.requestAnimationFrame(animate)

//   // animationButton.style.opacity = 0
//  }

//  function animate(timestamp) {
//   const animationBox = tsQuerySelector(document, '.item__car-wrapper-car')
//   if (!animationStart) {
//     animationStart = timestamp
//   }

//   const progress = timestamp - animationStart

//   animationBox.style.transform = `translateX(${progress / 5}px)`

//   const x = animationBox.getBoundingClientRect().x + 100

//   // 6px - scrollbar width
//   if (x <= window.innerWidth - 6) {
//     window.requestAnimationFrame(animate)
//   } else {
//     window.cancelAnimationFrame(requestId)
//   }
//  }

const quad = (timeFraction: number) => timeFraction ** 2;

const draw = (progress: number, li: Element) => {
    const car = tsQuerySelector(li, '.item__car-wrapper-car');
    const distance = li.getBoundingClientRect().width;
    // const carWidth =  car.getBoundingClientRect().width
    car.style.transform = `translate3d(${progress * distance * 0.85}px, 20px, 0)`;
};

const animate = async (timing: Function, draw: Function, duration: number, li: Element) => {
    const start = performance.now();
    // let carResponseStatus: Error | { status: string };
    requestAnimationFrame(async function animateCar(time) {
        // timeFraction изменяется от 0 до 1
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;

        // вычисление текущего состояния анимации
        const progress = timing(timeFraction);

        draw(progress, li); // отрисовать её
        const stopCar = state.stop[li.id] === li.id;
        // if (carResponseStatus instanceof Error) console.log(li.id)
        // console.log(carResponseStatus instanceof Error);
        if (!stopCar && timeFraction < 1) {
            requestAnimationFrame(animateCar);
        }
        delete state.stop[li.id];
    });
    const carResponseStatus = await switchCarToDrive({ id: li.id });
    if (carResponseStatus.success === false) {
        state.stop[li.id] = li.id;
        setTimeout(() => {
            delete state.stop[li.id];
        }, 1000);
    }
    return {
        success: carResponseStatus,
        id: li.id,
        time: duration,
    };
    // console.log(carResponseStatus)
};

document.addEventListener('click', async (e) => {
    if (!(e.target instanceof HTMLElement)) return;
    const { target } = e;
    if (target.classList.contains('start')) {
        const li = target.closest('.item');
        if (!li) return;
        const carInformation = await changeCarStatus({ id: li.id, status: 'started' });
        const duration = carInformation.distance / carInformation.velocity;
        animate(quad, draw, duration, li);

        // console.log(carResponseStatus);
    }
    if (target.classList.contains('select')) {
        const li = target.closest('.item');
        if (!li) return;
        const updateCarForm = tsQuerySelector<HTMLFormElement>(document, '.update-car__form');
        const inputs: HTMLFormControlsCollection = updateCarForm.elements;
        if (!inputs) return;
        if (!(inputs.namedItem('color') instanceof HTMLInputElement)) return;
        if (inputs.namedItem('color') == null) return;
        if (!inputs.namedItem('color')) return;
        // (inputs.namedItem('name') as HTMLInputElement).disabled = false;
        // (inputs.namedItem('color') as HTMLInputElement).disabled = false;
        // inputs['color'].disabled = false;
        const inputColor = inputs.namedItem('color') as HTMLInputElement;
        const inputName = inputs.namedItem('name') as HTMLInputElement;
        inputName.disabled = false;
        inputColor.disabled = false;
        const carName = tsQuerySelector(li, '.car-name').textContent;
        if (!(li instanceof HTMLElement)) return;
        const carColor = li.dataset.color;
        if (!carName || !carColor) return;
        inputName.value = carName;
        inputColor.value = carColor;
        updateCarForm.dataset.id = li.id;
    }
    if (target.classList.contains('remove')) {
        const li = target.closest('.item');
        if (!li) return;
        console.log('click');
        await deleteCar(li.id);
        console.log('click2');
        renderGarage(state.page);
    }
    if (target.classList.contains('reset')) {
        const li = target.closest('.item');
        if (!li) return;
        state.stop[li.id] = li.id;
        await changeCarStatus({ id: li.id, status: 'stopped' });
        delete state.stop[li.id];
        const car = tsQuerySelector(li, '.item__car-wrapper-car');
        car.style.transform = `translate3d(0px, 20px, 0)`;
        // const status = await getCar(li.id);
        // console.log(status);
        // console.log(state.stop);
        // // setTimeout(() => {

        // //     console.log(car.style.transform);
        // // }, 10);

        // console.log(car.style.transform);
    }
    if (target.classList.contains('prev')) {
        if (state.page === 0) return;
        state.page -= 1;
        renderGarage(state.page);
    }
    if (target.classList.contains('next')) {
        // if (state.page === 0) return;
        state.page += 1;
        console.log(state.page);
        renderGarage(state.page);
    }

    if (target.classList.contains('wins')) {
        sortWinners('wins', target);
    }

    if (target.classList.contains('time')) {
        sortWinners('time', target);
    }
    if (target.classList.contains('game-controls__race')) {
        const carArray = Array.from(tsQuerySelectorAll(document, '.car-list__item'));
        const carIDArray = carArray.map((el) => el.id);
        // console.log(carArray)
        // console.log(carIDArray)
        const requestsToStart = carIDArray.map((el) => {
            // return fetch(`${UTILS.baseUrl}${UTILS.engine}?id=${el}&status=started`)
        
            return changeCarStatus({ id: el, status: 'started' })
        });
        // console.log(requestsToStart)
        const startedResponse = await Promise.all(requestsToStart);
        // const requestsToDrive = carIDArray.map(id => Promise.resolve(fetch(`${UTILS.baseUrl}${UTILS.engine}?id=${id}&status=drive`, {
        //     method: 'PATCH',
        // })));
        // console.log(requestsToDrive)
        // console.log(startedResponse);
        const promiseArr = []
        // const startedArray = await startedResponse.json()
        startedResponse.forEach(async (el, index) => {
            // console.log(el)
            // const resp = await el.json();
            const duration = el.distance / el.velocity;
            promiseArr.push(animate(quad, draw, duration, carArray[index]));
        });
        // console.log(promiseArr)
        const drive = await getSuccessPromise(promiseArr, carIDArray);
        // const drive2 = await Promise.allSettled(promiseArr)
        // console.log(drive)
        //    console.log(drive2)
        //    console.log(promiseArr)
    }
    if (target.classList.contains('game-controls__reset')) {
        const carArray = Array.from(tsQuerySelectorAll(document, '.car-list__item'));
        carArray.forEach(async (el) => {
            state.stop[el.id] = el.id;
            await changeCarStatus({ id: el.id, status: 'stopped' });
            delete state.stop[el.id];
            const car = tsQuerySelector(el, '.item__car-wrapper-car');
            car.style.transform = `translate3d(0px, 20px, 0)`;
        });
    }

    if (target.classList.contains('garage-button')) {
        tsQuerySelector(document, '.main__winners').style.display = 'none';
        tsQuerySelector(document, '.main__garage').style.display = '';
    }
    if (target.classList.contains('winners-button')) {
        tsQuerySelector(document, '.main__winners').style.display = '';
        tsQuerySelector(document, '.main__garage').style.display = 'none';
    }
});



// createCar({name: 'BMW', color: '#FFF'})

// getCars();
