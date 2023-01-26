import { tsQuerySelector } from '../components/helpers';
import { state } from '../components/state';
import { changeCounts } from './changePages';
import { renderWinnerList } from './renderWinners';

export const toWinners = async () => {
    tsQuerySelector(document, '.main__winners').style.display = '';
    tsQuerySelector(document, '.main__garage').style.display = 'none';
    tsQuerySelector(document, '.main__game-controls').style.display = 'none';
    await renderWinnerList(state.sort, state.order, state.winnerPage);
    state.currentPage = 'winners';
    changeCounts();
};
export const toGarage = () => {
    tsQuerySelector(document, '.main__winners').style.display = 'none';
    tsQuerySelector(document, '.main__garage').style.display = '';
    tsQuerySelector(document, '.main__game-controls').style.display = '';
    state.currentPage = 'garage';
    changeCounts();
};
