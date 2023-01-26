import { CarStatus, raceResponse } from '../components/constants';
import { tsQuerySelector } from '../components/helpers';
import { state } from '../components/state';
import { changeCarStatus, switchCarToDrive } from '../utils/api';

const quad = (timeFraction: number) => timeFraction ** 2;

const draw = (progress: number, li: Element) => {
    const car = tsQuerySelector(li, '.item__car-wrapper-car');
    const distance = li.getBoundingClientRect().width;
    car.style.transform = `translate3d(${progress * distance * 0.78}px, 20px, 0)`;
};

export const animate = async (duration: number, li: Element) => {
    const start = performance.now();
    requestAnimationFrame(async function animateCar(time) {
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;

        const progress = quad(timeFraction);

        draw(progress, li);
        const stopCar = state.stop[li.id] === li.id;

        if (!stopCar && timeFraction < 1) {
            requestAnimationFrame(animateCar);
        }
        delete state.stop[li.id];
    });
    const carResponseStatus = await switchCarToDrive({ id: li.id });
    const time = Number((duration / 1000).toFixed(2));
    if (carResponseStatus === false) {
        state.stop[li.id] = li.id;
        setTimeout(() => {
            delete state.stop[li.id];
        }, 1000);
    }
    const result: raceResponse = {
        success: carResponseStatus,
        id: li.id,
        time,
    };
    return result;
};

export const startOneCarAnimation = async (target: HTMLElement) => {
    const li = target.closest('.item');
    if (!li) return;
    const carInformation = await changeCarStatus({ id: li.id, status: CarStatus.started });
    const duration = carInformation.distance / carInformation.velocity;
    animate(duration, li);
};
