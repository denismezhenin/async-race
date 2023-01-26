export enum UTILS {
    baseUrl = 'http://localhost:3000',
    carPath = '/garage',
    engine = '/engine',
    winners = '/winners',
}

export type raceResponsePromise = Promise<{ success: boolean; id: string; time: number }>;
export type raceResponse = { success: boolean; id: string; time: number };

export type sortType = 'wins' | 'time';
export type orderType = 'ASC' | 'DESC';

export interface ICar {
    name: string;
    color: string;
    id: number;
}

export interface IWinners {
    id: number;
    wins: number;
    time: number;
}

export enum FormsData {
    color = 'color',
    name = 'name',
}

export enum Sort {
    ascending = 'ASC',
    descending = 'DESC',
    wins = 'wins',
    time = 'time',
}

export enum CarStatus {
    started = 'started',
    stopped = 'stopped',
}

export enum Pages {
    garage = 'garage',
    winners = 'winners',
}
