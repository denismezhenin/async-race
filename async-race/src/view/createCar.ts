import { tsQuerySelector } from '../components/helpers';
import { createCar } from '../utils/api';

const createCarForm = tsQuerySelector<HTMLFormElement>(document, 'create-car__form');

createCarForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(createCarForm);
    const carName = formData.get('name');
    const carColor = formData.get('color');
    if (typeof carName !== 'string' || typeof carColor !== 'string') return;
    if (!carColor || !carName) return;
    await createCar({ name: carName, color: carColor });
});
