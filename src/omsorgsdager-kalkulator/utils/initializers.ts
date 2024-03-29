import { BarnInfo, ValueWithId } from './types';
import { none } from 'fp-ts/lib/Option';
import { v4 as uuidv4 } from 'uuid';

export function initializeValue<T>(value: T): ValueWithId<T> {
    const uuid = uuidv4();
    return {
        id: uuid,
        value,
    };
}

export const createInitialBarnInformasjon = (ekspanderbartPanelErÅpent: boolean, index: number): BarnInfo => ({
    id: uuidv4(),
    index,
    panelErÅpent: ekspanderbartPanelErÅpent,
    årFødt: initializeValue(none),
    kroniskSykt: initializeValue(none),
    borSammen: initializeValue(none),
    aleneOmOmsorgen: initializeValue(none),
});

export const initializeNBarn = (n: number) =>
    Array.from({ length: n }, (_, index: number) => createInitialBarnInformasjon(index === 0, index));
