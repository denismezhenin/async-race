import { CarStatus } from '../components/constants';
import { tsQuerySelector, tsQuerySelectorAll } from '../components/helpers';
import { state } from '../components/state';
import { changeCarStatus } from '../utils/api';

export const resetCar = async (target: HTMLElement) => {
    const li = target.closest('.item');
    if (!li) return;
    state.stop[li.id] = li.id;
    await changeCarStatus({ id: li.id, status: CarStatus.stopped });
    delete state.stop[li.id];
    const car = tsQuerySelector(li, '.item__car-wrapper-car');
    car.style.transform = `translate3d(0px, 20px, 0)`;
};

export const resetAllCars = async () => {
    const carArray = Array.from(tsQuerySelectorAll(document, '.car-list__item'));
    carArray.forEach(async (el) => {
        state.stop[el.id] = el.id;
        await changeCarStatus({ id: el.id, status: CarStatus.stopped });
        delete state.stop[el.id];
        const car = tsQuerySelector(el, '.item__car-wrapper-car');
        car.style.transform = `translate3d(0px, 20px, 0)`;
    });
};
