import { BarnInfo, ValueWithId } from './types';
import { none } from 'fp-ts/lib/Option';

export function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0,
            v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

export function initializeValue<T>(value: T): ValueWithId<T> {
    const uuid = uuidv4();
    return {
        id: uuid,
        value,
    };
}

export const createInitialBarnInformasjon = (): BarnInfo => ({
    id: uuidv4(),
    fodselsdato: initializeValue(none),
    kroniskSykt: initializeValue(none),
    borSammen: initializeValue(none),
    aleneOmOmsorgen: initializeValue(none),
});

export const initializeNBarn = (n: number) => Array.from({ length: n }, (_, i) => createInitialBarnInformasjon());
