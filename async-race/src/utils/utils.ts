import { UTILS } from '../components/constants';

// import { UTILS }

export const getCars = async (page: number, limit = '7') => {
    const response = await fetch(`${UTILS.baseUrl}${UTILS.carPath}?_page=${page}&_limit=${limit}`);
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
    try {
        const response = await fetch(`${UTILS.baseUrl}${UTILS.engine}?id=${body.id}&status=drive`, {
            method: 'PATCH',
            body: JSON.stringify(body),
        });
        const data = await response.json();
        return data;
    } catch (e: unknown) {
        if (e instanceof Error) {
            // console.log(e.name);
            // console.log(e.message);
            return e;
        }
    }
};
