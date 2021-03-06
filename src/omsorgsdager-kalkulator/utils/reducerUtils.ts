import { BarnInfo } from './types';
import { none, Option, some } from 'fp-ts/lib/Option';
import {
    shouldViewAleneOmOmsorgenQuestion,
    shouldViewBorSammenQuestion,
    shouldViewKroniskSyktQuestion,
} from './viewUtils';

export enum ValueCheckAction {
    CHECK_KRONISKT_SYK = 'CHECK_KRONISKT_SYK',
    CHECK_BOR_SAMMEN = 'CHECK_BOR_SAMMEN',
    CHECK_ALENE_OM_OMSORGEN = 'CHECK_ALENE_OM_OMSORGEN',
}

export const evaluateDependantValues = (barnInfo: BarnInfo, nextValueToCheck: ValueCheckAction): BarnInfo => {
    const { kroniskSykt, borSammen, aleneOmOmsorgen } = barnInfo;
    switch (nextValueToCheck) {
        case ValueCheckAction.CHECK_KRONISKT_SYK: {
            const kroniskSyktEvaluated = {
                ...barnInfo,
                kroniskSykt: shouldViewKroniskSyktQuestion(barnInfo) ? kroniskSykt : { ...kroniskSykt, value: none },
            };
            return evaluateDependantValues(kroniskSyktEvaluated, ValueCheckAction.CHECK_BOR_SAMMEN);
        }
        case ValueCheckAction.CHECK_BOR_SAMMEN: {
            const updatedWithMaybeWipedBorSammen = {
                ...barnInfo,
                borSammen: shouldViewBorSammenQuestion(barnInfo) ? borSammen : { ...borSammen, value: none },
            };
            return evaluateDependantValues(updatedWithMaybeWipedBorSammen, ValueCheckAction.CHECK_ALENE_OM_OMSORGEN);
        }
        case ValueCheckAction.CHECK_ALENE_OM_OMSORGEN: {
            const updatedWithMaybeWipedAleneOmOmsorgen = {
                ...barnInfo,
                aleneOmOmsorgen: shouldViewAleneOmOmsorgenQuestion(barnInfo)
                    ? aleneOmOmsorgen
                    : { ...aleneOmOmsorgen, value: none },
            };
            return updatedWithMaybeWipedAleneOmOmsorgen;
        }
    }
};

export const setÅrFødtAndMaybeWipeValues = (newÅrFødt: Option<number>, barnInfo: BarnInfo): BarnInfo => {
    const { årFødt } = barnInfo;
    const årFødtUpdated: BarnInfo = {
        ...barnInfo,
        årFødt: {
            ...årFødt,
            value: newÅrFødt,
        },
    };
    return evaluateDependantValues(årFødtUpdated, ValueCheckAction.CHECK_KRONISKT_SYK);
};

export const setKroniskSyktAndMaybeWipeValues = (value: boolean, barnInfo: BarnInfo): BarnInfo => {
    const { kroniskSykt } = barnInfo;
    const updatedKroniskSykt = { ...barnInfo, kroniskSykt: { ...kroniskSykt, value: some(value) } };
    return evaluateDependantValues(updatedKroniskSykt, ValueCheckAction.CHECK_BOR_SAMMEN);
};

export const setBorSammenAndMaybeWipeValues = (value: boolean, barnInfo: BarnInfo): BarnInfo => {
    const { borSammen } = barnInfo;
    const updatedWithBorSammen = { ...barnInfo, borSammen: { ...borSammen, value: some(value) } };
    return evaluateDependantValues(updatedWithBorSammen, ValueCheckAction.CHECK_ALENE_OM_OMSORGEN);
};

export const setAleneOmOmsorgen = (value: boolean, barn: BarnInfo): BarnInfo => {
    const { aleneOmOmsorgen } = barn;
    return {
        ...barn,
        aleneOmOmsorgen: { ...aleneOmOmsorgen, value: some(value) },
    };
};
