import './styles/style.scss';
import { state } from './components/state';
import { renderGarage } from './view/renderGarage';
import { renderWinnerList } from './view/renderWinners';
import { changeCounts } from './view/changePages';
import { Sort } from './components/constants';
import { setListeners } from './view/listeners';
import { updateCarFromForm } from './view/updateCar';
import { createCarFromForm } from './view/createCar';
import { addHTML } from './view/addHtml';

const renderPage = async () => {
    addHTML();
    setListeners();
    createCarFromForm();
    updateCarFromForm();
    await renderGarage(state.page);
    await renderWinnerList(Sort.wins, Sort.descending, state.winnerPage);
    changeCounts();
};

window.addEventListener('load', renderPage);
