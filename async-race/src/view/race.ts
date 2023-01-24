import { raceResponsePromice } from '../components/constants';
import { createWinner, getWinner, getWinners, updateWinner } from '../utils/api';

export const getSuccessPromise = async (arr: Array<raceResponsePromice>, arrID: string[]) => {
    const { success, id, time }: { success: boolean | { success: true }; id: string; time: number } =
        await Promise.race(arr);
    if (!success) return;
    if (!success) {
        // console.log(arr)
        const index = arrID.findIndex((i) => i === id);
        const newPromices = [...arr.slice(0, index), ...arr.slice(index + 1, arr.length)];
        const newId = [...arrID.slice(0, index), ...arrID.slice(index + 1, arrID.length)];
        // console.log(newPromices)
        getSuccessPromise(newPromices, newId);
        return;
    }
    console.log(id);
    const res = await getWinner(id);
    if (!res) {
        createWinner({ id, wins: 1, time });
        return;
    }
    // const res2 = await getWinner(id);
    // console.log(res2.wins);
    const body = {
        wins: res.wins + 1,
        time: time < res.time ? time : res.time,
    };
    console.log(id, time);
    await updateWinner(id, body);
    const s = await getWinners('wins', 'DESC');
    console.log(s);

};
