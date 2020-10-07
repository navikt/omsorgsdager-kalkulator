import { Option } from 'fp-ts/Option';

export enum ActionType {
    SetNBarn = 'SetNBarn',
    SetNBarnInvalid = 'SetNBarnInvalid',
    SetÅrFødtForBarnInfo = 'SetÅrFødtForBarnInfo',
    SetKroniskSykt = 'SetKroniskSykt',
    SetBorSammen = 'SetBorSammen',
    SetAleneOmOmsorgen = 'SetAleneOmOmsorgen',
    Beregn = 'Beregn',
    SetPanelErÅpent = 'SetPanelErÅpent',
    SetPanelErÅpentOgGiFokus = 'SetPanelErÅpentOgGiFokus',
}

export interface SetNBarn {
    type: ActionType.SetNBarn;
    nBarn: number;
}
export const setNBarn = (nBarn: number): SetNBarn => ({
    type: ActionType.SetNBarn,
    nBarn,
});
export interface SetNBarnInvalid {
    type: ActionType.SetNBarnInvalid;
}
export const setNBarnInvalid = (): SetNBarnInvalid => ({
    type: ActionType.SetNBarnInvalid,
});

export interface SetÅrFødtForBarnInfo {
    type: ActionType.SetÅrFødtForBarnInfo;
    barnId: string;
    årFødt: Option<number>;
}
export const setÅrFødtForBarnInfo = (årFødt: Option<number>, barnId: string): SetÅrFødtForBarnInfo => ({
    type: ActionType.SetÅrFødtForBarnInfo,
    årFødt,
    barnId,
});

export interface SetKroniskSykt {
    type: ActionType.SetKroniskSykt;
    value: boolean;
    barnId: string;
}
export const setKroniskSykt = (value: boolean, barnId: string): SetKroniskSykt => ({
    type: ActionType.SetKroniskSykt,
    value,
    barnId,
});
export interface SetBorSammen {
    type: ActionType.SetBorSammen;
    value: boolean;
    barnId: string;
}
export const setBorSammen = (value: boolean, barnId: string): SetBorSammen => ({
    type: ActionType.SetBorSammen,
    value,
    barnId,
});
export interface SetAleneOmOmsorgen {
    type: ActionType.SetAleneOmOmsorgen;
    value: boolean;
    barnId: string;
}
export const setAleneOmOmsorgen = (value: boolean, barnId: string): SetAleneOmOmsorgen => ({
    type: ActionType.SetAleneOmOmsorgen,
    value,
    barnId,
});

export interface Beregn {
    type: ActionType.Beregn;
}
export const beregn: Beregn = {
    type: ActionType.Beregn,
};

export interface SetPanelErÅpent {
    type: ActionType.SetPanelErÅpent;
    barnId: string;
    erÅpent: boolean;
}
export const setPanelErÅpent = (barnId: string, erÅpent: boolean): SetPanelErÅpent => ({
    type: ActionType.SetPanelErÅpent,
    barnId,
    erÅpent,
});

export interface SetPanelErÅpentOgGiFokus {
    type: ActionType.SetPanelErÅpentOgGiFokus;
    barnId: string;
}
export const setPanelErÅpentOgGiFokus = (barnId: string): SetPanelErÅpentOgGiFokus => ({
    type: ActionType.SetPanelErÅpentOgGiFokus,
    barnId,
});

export type Action =
    | SetNBarn
    | SetNBarnInvalid
    | SetÅrFødtForBarnInfo
    | SetKroniskSykt
    | SetBorSammen
    | SetAleneOmOmsorgen
    | Beregn
    | SetPanelErÅpent
    | SetPanelErÅpentOgGiFokus;
