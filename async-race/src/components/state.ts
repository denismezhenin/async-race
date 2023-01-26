interface Obj {
    stop: {
        [index: string]: string;
    };
    page: number;
    winnerPage: number;
    totalCars: number;
    carsPerPage: number;
    totalWinners: number;
    winnersPerPage: number;
    currentPage: 'garage' | 'winners';
    sort: 'wins' | 'time';
    order: 'ASC' | 'DESC';
}

export const state: Obj = {
    stop: {},
    page: 1,
    winnerPage: 1,
    totalCars: 0,
    carsPerPage: 7,
    totalWinners: 0,
    winnersPerPage: 10,
    currentPage: 'garage',
    sort: 'wins',
    order: 'DESC',
};

export const stopCarsArray: Array<string> = [];
