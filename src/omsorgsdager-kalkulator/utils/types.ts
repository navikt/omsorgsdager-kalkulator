import { Option } from 'fp-ts/lib/Option';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';

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
    index: number;
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

export interface BarnFeiloppsummeringFeil extends FeiloppsummeringFeil {
    barnIndex: number;
    antallBarn: number;
}
