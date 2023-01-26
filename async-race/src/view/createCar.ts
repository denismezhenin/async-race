import { FormsData } from '../components/constants';
import { tsQuerySelector } from '../components/helpers';
import { state } from '../components/state';
import { createCar } from '../utils/api';
import { changeCounts } from './changePages';
import { renderGarage } from './renderGarage';

export const createCarFromForm = () => {
    const createCarForm = tsQuerySelector<HTMLFormElement>(document, '.create-car__form');
    createCarForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(createCarForm);
        const carName = String(formData.get(FormsData.name));
        const carColor = String(formData.get(FormsData.color));
        if (!carColor || !carName) return;
        await createCar({ name: carName, color: carColor });
        tsQuerySelector(document, '.garage__car-list').innerHTML = '';
        renderGarage(state.page);
        changeCounts();
    });
};
