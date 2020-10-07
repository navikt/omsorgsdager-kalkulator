import { Option } from 'fp-ts/lib/Option';

export enum YesOrNo {
    Yes = 'Yes',
    No = 'No',
}

export interface ValueWithId<T> {
    id: string;
    value: T;
}

export interface BarnInfo {
    id: string;
    panelErÅpent: boolean;
    årFødt: ValueWithId<Option<number>>;
    kroniskSykt: ValueWithId<Option<boolean>>;
    borSammen: ValueWithId<Option<boolean>>;
    aleneOmOmsorgen: ValueWithId<Option<boolean>>;
}

export interface BarnInput {
    årFødt?: number;
    kroniskSykt?: boolean;
    borSammen?: boolean;
    aleneOmOmsorgen?: boolean;
}
