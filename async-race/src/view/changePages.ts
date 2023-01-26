import { Pages } from '../components/constants';
import { tsQuerySelector } from '../components/helpers';
import { state } from '../components/state';
import { renderGarage } from './renderGarage';
import { renderWinnerList } from './renderWinners';

export const prevPage = async () => {
    if (state.currentPage === Pages.garage) {
        if (state.page === 1) return;
        state.page -= 1;
        await renderGarage(state.page);
    } else if (state.currentPage === Pages.winners) {
        if (state.winnerPage === 1) return;
        state.winnerPage -= 1;
        await renderWinnerList(state.sort, state.order, state.winnerPage);
    }
};

export const nextPage = async () => {
    if (state.currentPage === Pages.garage) {
        const maxPage = Math.ceil(state.totalCars / state.carsPerPage);
        if (state.page === maxPage) return;
        state.page += 1;
        await renderGarage(state.page);
    } else if (state.currentPage === Pages.winners) {
        const maxPage = Math.ceil(state.totalWinners / state.winnersPerPage);
        if (state.winnerPage === maxPage) return;
        state.winnerPage += 1;
        await renderWinnerList(state.sort, state.order, state.winnerPage);
    }
};

export const changeCounts = () => {
    if (state.currentPage === Pages.garage) {
        tsQuerySelector(document, '.garage__title-cars-count').textContent = String(state.totalCars);
        tsQuerySelector(document, '.garage__page-number').textContent = `Page #${state.page}`;
    } else if (state.currentPage === Pages.winners) {
        tsQuerySelector(document, '.garage__title-cars-count').textContent = String(state.totalWinners);
        tsQuerySelector(document, '.garage__page-number').textContent = `Page #${state.winnerPage}`;
    }
};
