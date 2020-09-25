import { BarnInfo, ValueWithId } from './types';
import { none } from 'fp-ts/lib/Option';
import { uuidv4 } from './utils';

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

export const initializeNBarn = (n: number) => Array.from({ length: n }, () => createInitialBarnInformasjon());
