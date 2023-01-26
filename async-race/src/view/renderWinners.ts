import { IWinners, orderType, Sort, sortType } from '../components/constants';
import { tsQuerySelector } from '../components/helpers';
import { state } from '../components/state';
import { getCar, getWinners } from '../utils/api';
import { renderCar } from './renderCar';

export const renderWinner = async (id: number, wins: number, time: number, index: number) => {
    const li = document.createElement('li');
    const winnerCar = document.createElement('div');
    const winnerName = document.createElement('span');
    const winnerIndexNumber = document.createElement('span');
    const winnerNumberOfWins = document.createElement('span');
    const winnerBestTime = document.createElement('span');
    winnerBestTime.textContent = String(time);
    winnerNumberOfWins.textContent = String(wins);
    winnerIndexNumber.textContent = String(state.winnerPage * 10 + index - 9);
    const car = await getCar(`${id}`);
    winnerName.textContent = car.name;
    winnerCar.innerHTML = renderCar(car.color);
    winnerCar.classList.add('winners-list__item-car');
    li.append(winnerIndexNumber, winnerCar, winnerName, winnerNumberOfWins, winnerBestTime);
    li.classList.add('winners-list__item');
    return li;
};

export const renderWinnerList = async (sort: sortType, order: orderType, page: number) => {
    const winnerArr = await getWinners(sort, order, page);
    const winnersList = tsQuerySelector(document, '.winners-list');
    winnersList.innerHTML = '';
    winnerArr.forEach(async (element: IWinners, index: number) => {
        const winner = await renderWinner(element.id, element.wins, element.time, index);
        winnersList.append(winner);
    });
};

export const sortWinners = (sort: sortType, target: HTMLElement) => {
    if (target.classList.contains('desc')) {
        target.classList.toggle('desc');
        target.classList.toggle('asc');
        state.sort = sort;
        state.order = Sort.descending;
        return renderWinnerList(state.sort, state.order, state.winnerPage);
    }
    target.classList.toggle('desc');
    target.classList.toggle('asc');
    state.sort = sort;
    state.order = Sort.ascending;
    return renderWinnerList(state.sort, state.order, state.winnerPage);
};
