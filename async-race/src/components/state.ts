interface Obj {
    stop: {
        [index: string]: string;
    };
    page: number
}

export const state: Obj = {
    stop: {},
    page: 0,
};

export const stopCarsArray: Array<string> = [];
