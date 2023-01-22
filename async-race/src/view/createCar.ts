import { tsQuerySelector } from '../components/helpers';
import { createCar } from '../utils/utils';

const createCarForm = tsQuerySelector<HTMLFormElement>(document, 'create-car__form');

createCarForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(createCarForm);
    const carName = formData.get('name');
    const carColor = formData.get('color');
    if (typeof carName !== 'string' || typeof carColor !== 'string') return;
    if (!carColor || !carName) return;
    createCar({ name: carName, color: carColor });
});
