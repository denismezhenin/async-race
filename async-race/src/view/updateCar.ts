import { tsQuerySelector } from '../components/helpers';
import { createCar, updateCar } from '../utils/utils';

const updateCarForm = tsQuerySelector<HTMLFormElement>(document, '.update-car__form');

updateCarForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(updateCarForm);
    const carName = formData.get('name');
    const carColor = formData.get('color');
    if (typeof carName !== 'string' || typeof carColor !== 'string' || typeof updateCarForm.dataset !== 'string')
        return;
    // if (typeof updateCarForm.dataset !== 'string') return;
    const { id } = updateCarForm.dataset;
    updateCar(id, { name: carName, color: carColor });
});
