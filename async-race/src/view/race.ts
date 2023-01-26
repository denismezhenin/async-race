import { CarStatus, raceResponsePromise } from '../components/constants';
import { tsQuerySelector, tsQuerySelectorAll } from '../components/helpers';
import { changeCarStatus, createWinner, getCar, getWinner, updateWinner } from '../utils/api';
import { animate } from './carAnimation';

const showModal = async (id: string, time: number) => {
    const message = tsQuerySelector(document, '.show-modal');
    const winner = await getCar(id);
    message.textContent = `${winner.name} went first (${time}s)`;
    message.classList.add('show-modal__active');
};

export const getSuccessPromise = async (arr: Array<raceResponsePromise>, arrID: string[]) => {
    const { success, id, time }: { success: boolean; id: string; time: number } = await Promise.race(arr);
    if (!success) {
        const index = arrID.findIndex((i) => i === id);
        const newId = [...arrID.slice(0, index), ...arrID.slice(index + 1, arrID.length)];
        const newPromises = [...arr.slice(0, index), ...arr.slice(index + 1, arr.length)];
        getSuccessPromise(newPromises, newId);
        return;
    }

    const res = await getWinner(id);
    if (!res) {
        await createWinner({ id, wins: 1, time });
        await showModal(id, time);
        return;
    }
    const body = {
        wins: res.wins + 1,
        time: time < res.time ? time : res.time,
    };
    await updateWinner(id, body);
    await showModal(id, time);
};

export const startRace = async () => {
    const carArray = Array.from(tsQuerySelectorAll(document, '.car-list__item'));
    const carIDArray: string[] = carArray.map((el) => el.id);
    const requestsToStart = carIDArray.map((el) => changeCarStatus({ id: el, status: CarStatus.started }));
    const startedResponse = await Promise.all(requestsToStart);
    const promiseArr: Array<raceResponsePromise> = [];
    startedResponse.forEach(async (el, index) => {
        const duration = el.distance / el.velocity;
        promiseArr.push(animate(duration, carArray[index]));
    });
    await getSuccessPromise(promiseArr, carIDArray);
};
