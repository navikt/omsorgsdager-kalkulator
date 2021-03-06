import { BarnInfo, ValueWithId } from './types';
import { initializeValue } from './initializers';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { beregnButton, empty, ResultView } from '../types/ResultView';
import Omsorgsprinsipper from '@navikt/kalkuler-omsorgsdager/lib/types/Omsorgsprinsipper';

export interface State {
    readonly nBarnMaks: number;
    nBarn: ValueWithId<number>;
    barn: BarnInfo[];
    resultViewData: ResultView<FeiloppsummeringFeil[], Omsorgsprinsipper>;
}

export const createInitialState = (listeAvBarnInfo: BarnInfo[]): State => {
    const listeAvBarnLength = listeAvBarnInfo?.length;
    const nBarnInitially: ValueWithId<number> =
        listeAvBarnLength && listeAvBarnLength > 0
            ? initializeValue<number>(listeAvBarnLength)
            : initializeValue<number>(0);
    return {
        nBarnMaks: 20,
        nBarn: nBarnInitially,
        barn: listeAvBarnInfo || [],
        resultViewData: listeAvBarnInfo && listeAvBarnInfo.length > 0 ? beregnButton : empty,
    };
};
