import { tsQuerySelector } from "../components/helpers";
import { getCars } from "../utils/utils";
import { renderCarField } from "./carField";

export const renderGarage = async (page: number) => {
    const carArray = await getCars(page);
    if (carArray.length === 0) return;
    // console.log(carArray)
    console.log(carArray);
    tsQuerySelector(document, '.garage__car-list').innerHTML = '';
    carArray.forEach((element) => {
        const car = renderCarField(element.id, element.color, element.name);
        tsQuerySelector(document, '.garage__car-list').append(car);
    });
};
