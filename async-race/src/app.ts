import './styles/style.scss';
import { headerHTML } from './view/header';
import { mainPageHTML } from './view/mainPage';
import { tsQuerySelector } from './components/helpers';
import { renderCarField } from './view/carField';
import { changeCarStatus, createCar, getCars, updateCar } from './utils/api';
import { state } from './components/state';
import { renderGarage } from './view/renderGarage';
import { renderWinnerList } from './view/renderWinners';

const renderPage = async () => {
    tsQuerySelector(document, '.header').innerHTML = headerHTML;
    tsQuerySelector(document, '.main').innerHTML = mainPageHTML;
    // const car = renderCarField();
    renderGarage(state.page);

    const createCarForm = tsQuerySelector<HTMLFormElement>(document, '.create-car__form');

    createCarForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(createCarForm);
        const carName = formData.get('name');
        const carColor = formData.get('color');
        if (typeof carName !== 'string' || typeof carColor !== 'string') return;
        if (!carColor || !carName) return;
        await createCar({ name: carName, color: carColor });
        tsQuerySelector(document, '.garage__car-list').innerHTML = '';
        renderGarage(state.page);
    });
    const updateCarForm = tsQuerySelector<HTMLFormElement>(document, '.update-car__form');

    updateCarForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(updateCarForm);
        const carName = formData.get('name');
        const carColor = formData.get('color');
        // if (typeof carName !== 'string' || typeof carColor !== 'string' || typeof updateCarForm.dataset !== 'string') {
        //     return;
        // }

        // console.log('yes');
        // if (typeof updateCarForm.dataset !== 'string') return;
        const { id } = updateCarForm.dataset;
        await updateCar(id, { name: carName, color: carColor });
        renderGarage(state.page);

    });
    renderWinnerList('wins', 'DESC')
    // getCars()
};

window.addEventListener('load', renderPage);
