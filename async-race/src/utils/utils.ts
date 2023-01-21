import { UTILS } from '../components/constants';

// import { UTILS }

export const getCars = async () => {
    const response = await fetch(`${UTILS.baseUrl}${UTILS.carPath}`);
    const data = await response.json();
    return data;
};

export const getCar = async (id: number) => {
    const response = await fetch(`${UTILS.baseUrl}${UTILS.carPath}/:${id}`);
    const data = await response.json();
    return data;
};

export const createCar = async (body: { name: string; color: string }) => {
    const response = await fetch(`${UTILS.baseUrl}${UTILS.carPath}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    const car = await response.json();
    return car;
};

export const updateCar = async (id: number, body: { name: string; color: string }) => {
    const response = await fetch(`${UTILS.baseUrl}${UTILS.carPath}/:${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    const car = await response.json();
    return car;
};

export const deleteCar = async (id: number) => {
    const response = await fetch(`${UTILS.baseUrl}${UTILS.carPath}/:${id}`, {
        method: 'DELETE',
    });
    const car = await response.json();
    return car;
};
