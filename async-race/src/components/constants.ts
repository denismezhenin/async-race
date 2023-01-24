export enum UTILS {
    baseUrl = 'http://localhost:3000',
    carPath = '/garage',
    engine = '/engine',
    winners = '/winners'
}

export type raceResponsePromice = Promise<{ success: boolean | { success: true; }; id: string; time: number; }>

export interface ICar {
        name: string,
        color: string,
        id: number,
}

export interface IWinners   {
    id: number,
    wins: number,
    time: number
  }
