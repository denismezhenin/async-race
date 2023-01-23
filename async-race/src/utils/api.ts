import { UTILS } from '../components/constants';

export const getCars = async (page: number, limit = '7') => {
    const response = await fetch(`${UTILS.baseUrl}${UTILS.carPath}?_page=${page}&_limit=${limit}`);
    // response.headers
    const data = await response.json();
    // console.log(data)
    return data;
};

export const getCar = async (id: string) => {
    const response = await fetch(`${UTILS.baseUrl}${UTILS.carPath}/${id}`);
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

export const updateCar = async (id: string, body: { name: string; color: string }) => {
    const response = await fetch(`${UTILS.baseUrl}${UTILS.carPath}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    const car = await response.json();
    return car;
};

export const deleteCar = async (id: string) => {
    const response = await fetch(`${UTILS.baseUrl}${UTILS.carPath}/${id}`, {
        method: 'DELETE',
    });
    const car = await response.json();
    return car;
};

export const changeCarStatus = async (body: { id: string; status: string }) => {
    const response = await fetch(`${UTILS.baseUrl}${UTILS.engine}?id=${body.id}&status=${body.status}`, {
        method: 'PATCH',
        body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
};

export const switchCarToDrive = async (body: { id: string }) => {
    const response = await fetch(`${UTILS.baseUrl}${UTILS.engine}?id=${body.id}&status=drive`, {method: 'PATCH'}).catch();
    return response.status !== 200 ? false : { ...(await response.json()) };
};

export const getWinner = async (id: string) => {
    const response = await fetch(`${UTILS.baseUrl}${UTILS.winners}/${id}`);
    return response.status !== 200 ? false : { ...(await response.json()) };
};

export const getWinners = async (sort: 'wins' | 'time', order: 'ASC' | 'DESC', page = '0', limit = '10') => {
    const response = await fetch(
        `${UTILS.baseUrl}${UTILS.winners}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`
    );
    const data = await response.json();
    // console.log(data)
    return data;
};

export const createWinner = async (body: { id: string; wins: number; time: number }) => {
    const response = await fetch(`${UTILS.baseUrl}${UTILS.winners}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    const winner = await response.json();
    return winner;
};

export const deleteWinner = async (id: string) => {
    const response = await fetch(`${UTILS.baseUrl}${UTILS.winners}/${id}`, {
        method: 'DELETE',
    });
    const winner = await response.json();
    return winner;
};

export const updateWinner = async (id: string, body: { wins: number; time: number }) => {
    const response = await fetch(`${UTILS.baseUrl}${UTILS.winners}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    const winner = await response.json();
    return winner;
};
