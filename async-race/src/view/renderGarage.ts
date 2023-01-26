import { ICar } from '../components/constants';
import { tsQuerySelector } from '../components/helpers';
import { getCars } from '../utils/api';
import { renderCarField } from './carField';

export const renderGarage = async (page: number) => {
    const carArray = await getCars(page);
    tsQuerySelector(document, '.garage__car-list').innerHTML = '';
    if (carArray.length === 0) return;
    carArray.forEach((element: ICar) => {
        const car = renderCarField(element.id, element.color, element.name);
        tsQuerySelector(document, '.garage__car-list').append(car);
    });
};
