import { state } from '../components/state';
import { createCar } from '../utils/api';
import { changeCounts } from './changePages';
import { renderGarage } from './renderGarage';

const getRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

const carMake = [
    'Ford',
    'BMW',
    'Audi',
    'VW',
    'Renaut',
    'Volvo',
    'Tayota',
    'Mercedes',
    'Kia',
    'Peugeot',
    'Astin martin',
    'Cadillac',
    'Chevrolet',
    'Citroën',
    'Porsche',
    'Tesla',
    'Mazda',
    'Fiat',
    'Honda',
];
const carModels = [
    'focus',
    'z4',
    'A6',
    'polo',
    'clio',
    'xc90',
    'prado',
    'GLE',
    'Sportage',
    '308',
    'DB9',
    'XCD',
    'Corvette',
    'c5',
    '911',
    'S',
    'cx-9',
    'punto',
    'civic',
];
export const generateRandomCars = (count: number) => {
    const arr = Array(count).fill(1);
    return arr.map(() => ({
        name: `${carMake[Math.floor(Math.random() * carMake.length)]} ${
            carModels[Math.floor(Math.random() * carModels.length)]
        }`,
        color: getRandomColor(),
    }));
};

export const addRandomCarsToGarage = async () => {
    const newCars = generateRandomCars(100);
    newCars.forEach(async (el) => {
        await createCar(el);
    });
    await renderGarage(state.page);
    changeCounts();
};
