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

export const createInitialBarnInformasjon = (ekspanderbartPanelErÅpent: boolean): BarnInfo => ({
    id: uuidv4(),
    panelErÅpent: ekspanderbartPanelErÅpent,
    årFødt: initializeValue(none),
    kroniskSykt: initializeValue(none),
    borSammen: initializeValue(none),
    aleneOmOmsorgen: initializeValue(none),
});

export const initializeNBarn = (n: number) =>
    Array.from({ length: n }, (_, index: number) => createInitialBarnInformasjon(index === 0));
