import { Sort } from '../components/constants';
import { state } from '../components/state';
import { startOneCarAnimation } from './carAnimation';
import { changeCounts, nextPage, prevPage } from './changePages';
import { addRandomCarsToGarage } from './createRandomCars';
import { removeCar } from './deleteCar';
import { startRace } from './race';
import { sortWinners } from './renderWinners';
import { resetAllCars, resetCar } from './resetCars';
import { selectCar } from './updateCar';
import { toGarage, toWinners } from './view';

export const setListeners = () => {
    document.addEventListener('click', async (e) => {
        if (!(e.target instanceof HTMLElement)) return;
        const { target } = e;
        if (target.classList.contains('start')) {
            startOneCarAnimation(target);
        }
        if (target.classList.contains('select')) {
            selectCar(target);
        }
        if (target.classList.contains('remove')) {
            removeCar(target);
        }
        if (target.classList.contains('reset')) {
            resetCar(target);
        }
        if (target.classList.contains('prev')) {
            await prevPage();
            changeCounts();
        }
        if (target.classList.contains('next')) {
            await nextPage();
            changeCounts();
        }
        if (target.classList.contains('wins')) {
            await sortWinners(Sort.wins, target);
            state.sort = Sort.wins;
        }
        if (target.classList.contains('time')) {
            await sortWinners(Sort.time, target);
            state.sort = Sort.time;
        }
        if (target.classList.contains('game-controls__race')) {
            startRace();
        }
        if (target.classList.contains('game-controls__reset')) {
            resetAllCars();
        }

        if (target.classList.contains('garage-button')) {
            toGarage();
        }
        if (target.classList.contains('winners-button')) {
            toWinners();
        }
        if (target.classList.contains('game-controls__generate')) {
            addRandomCarsToGarage();
        }
        if (target.classList.contains('show-modal')) {
            target.classList.remove('show-modal__active');
        }
    });
};
