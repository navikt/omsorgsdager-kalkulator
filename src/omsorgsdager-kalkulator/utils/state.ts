import Omsorgsprinsipper from '../components/kalkulerOmsorgsdager/types/Omsorgsprinsipper';
import { beregnButton, empty, ResultView } from '../types/ResultView';
import { initializeValue } from './initializers';
import { BarnFeiloppsummeringFeil, BarnInfo, ValueWithId } from './types';

export interface State {
    readonly nBarnMaks: number;
    nBarn: ValueWithId<number>;
    barn: BarnInfo[];
    resultViewData: ResultView<BarnFeiloppsummeringFeil[], Omsorgsprinsipper>;
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
