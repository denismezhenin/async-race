import { FormsData } from '../components/constants';
import { tsQuerySelector } from '../components/helpers';
import { state } from '../components/state';
import { updateCar } from '../utils/api';
import { renderGarage } from './renderGarage';

export const updateCarFromForm = async () => {
    const updateCarForm = tsQuerySelector<HTMLFormElement>(document, '.update-car__form');
    updateCarForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(updateCarForm);
        const carName = String(formData.get(FormsData.name));
        const carColor = String(formData.get(FormsData.color));
        const { id } = updateCarForm.dataset;
        if (!id || !carName || !carColor) return;
        await updateCar(id, { name: carName, color: carColor });
        renderGarage(state.page);
    });
};
export const selectCar = (target: HTMLElement) => {
    const li = target.closest('.item');
    if (!li) return;
    const updateCarForm = tsQuerySelector<HTMLFormElement>(document, '.update-car__form');
    const inputs: HTMLFormControlsCollection = updateCarForm.elements;
    const inputColor = inputs.namedItem('color') as HTMLInputElement;
    const inputName = inputs.namedItem('name') as HTMLInputElement;
    inputName.disabled = false;
    inputColor.disabled = false;
    const carName = tsQuerySelector(li, '.car-name').textContent;
    if (!(li instanceof HTMLElement)) return;
    const carColor = li.dataset.color;
    if (!carName || !carColor) return;
    inputName.value = carName;
    inputColor.value = carColor;
    updateCarForm.dataset.id = li.id;
};
