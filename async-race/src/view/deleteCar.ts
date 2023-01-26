import { state } from '../components/state';
import { deleteCar, deleteWinner } from '../utils/api';
import { changeCounts } from './changePages';
import { renderGarage } from './renderGarage';

export const removeCar = async (target: HTMLElement) => {
    const li = target.closest('.item');
    if (!li) return;
    await deleteWinner(li.id);
    await deleteCar(li.id);
    await renderGarage(state.page);
    changeCounts();
};
