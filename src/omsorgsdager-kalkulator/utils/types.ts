import { Option } from 'fp-ts/lib/Option';
import Barn from '@navikt/kalkuler-omsorgsdager/lib/types/Barn';

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

export type BarnApi = Barn;
