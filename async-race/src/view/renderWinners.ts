
import { tsQuerySelector } from "../components/helpers";
import { getCar, getWinners } from "../utils/utils";
import { renderCar } from "./renderCar";

export const renderWinner = async (id: string, wins: string, time: string, index: number) => {
    const li = document.createElement('li');
    const winnerCar = document.createElement('div');
    const winnerName = document.createElement('span')
    const winnerIndexNumber = document.createElement('span')
    const winnerNumberOfWins = document.createElement('span')
    const winnerBestTime = document.createElement('span')
    winnerBestTime.textContent = time;
    winnerNumberOfWins.textContent = wins;
    winnerIndexNumber.textContent = String(index);
    const car = await getCar(id)
    winnerName.textContent = car.name
    winnerCar.innerHTML = renderCar(car.color);
    winnerCar.classList.add('winners-list__item-car');
    li.append(winnerIndexNumber, winnerCar, winnerName, winnerNumberOfWins, winnerBestTime);
    li.classList.add('winners-list__item');
    return li;
}

export const renderWinnerList = async (sort: 'wins'|'time', order : 'ASC'|'DESC') => {
    const winersList = tsQuerySelector(document, '.winners-list')
    const winnerArr =  await getWinners(sort, order)
    winnerArr.forEach(async (element, index: number) => {
        const winner = await renderWinner(element.id, element.wins, element.time, index)
        winersList.append(winner)
    });
}

export const sortWinners = (sort: 'wins'|'time', target: HTMLElement) => {
    if (target.classList.contains('desc')) {
        renderWinnerList('time', 'DESC')
    }
    renderWinnerList('time', 'ASC')
    target.classList.toggle('desc')
    target.classList.toggle('asc')
}