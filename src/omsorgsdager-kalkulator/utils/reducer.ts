import { createInitialState, State } from './state';
import { Action, ActionType } from './actions';
import { initializeNBarn } from './initializers';
import { BarnInfo } from './types';
import { updateResultView } from './utils';
import {
    setAleneOmOmsorgen,
    setBorSammenAndMaybeWipeValues,
    setKroniskSyktAndMaybeWipeValues,
    setÅrFødtAndMaybeWipeValues,
} from './reducerUtils';
import { beregnButton, isBeregnButtonAndErrorSummary, ResultView } from '../types/ResultView';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import Omsorgsprinsipper from '@navikt/kalkuler-omsorgsdager/lib/types/Omsorgsprinsipper';

export type KalkulatorReducer = (state: State, action: Action) => State;

export const reducer: KalkulatorReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case ActionType.SetNBarn: {
            const initializedBarnListe = initializeNBarn(action.nBarn);
            return {
                ...state,
                nBarn: { ...state.nBarn, value: action.nBarn },
                barn: initializedBarnListe,
                resultViewData: beregnButton,
            };
        }
        case ActionType.SetNBarnInvalid: {
            return createInitialState([]);
        }
        case ActionType.SetÅrFødtForBarnInfo: {
            const listeAvBarnUpdated: BarnInfo[] = state.barn.map((barn: BarnInfo) =>
                barn.id === action.barnId ? setÅrFødtAndMaybeWipeValues(action.årFødt, barn) : barn
            );
            return {
                ...state,
                barn: listeAvBarnUpdated,
                resultViewData: updateResultView(listeAvBarnUpdated, state.resultViewData, false),
            };
        }
        case ActionType.SetKroniskSykt: {
            const listeAvBarnUpdated: BarnInfo[] = state.barn.map((barn: BarnInfo) =>
                barn.id === action.barnId ? setKroniskSyktAndMaybeWipeValues(action.value, barn) : barn
            );
            return {
                ...state,
                barn: listeAvBarnUpdated,
                resultViewData: updateResultView(listeAvBarnUpdated, state.resultViewData, false),
            };
        }
        case ActionType.SetBorSammen: {
            const listeAvBarnUpdated: BarnInfo[] = state.barn.map((barn: BarnInfo) =>
                barn.id === action.barnId ? setBorSammenAndMaybeWipeValues(action.value, barn) : barn
            );
            return {
                ...state,
                barn: listeAvBarnUpdated,
                resultViewData: updateResultView(listeAvBarnUpdated, state.resultViewData, false),
            };
        }
        case ActionType.SetAleneOmOmsorgen: {
            const listeAvBarnUpdated: BarnInfo[] = state.barn.map((barn: BarnInfo) =>
                barn.id === action.barnId ? setAleneOmOmsorgen(action.value, barn) : barn
            );
            return {
                ...state,
                barn: listeAvBarnUpdated,
                resultViewData: updateResultView(listeAvBarnUpdated, state.resultViewData, false),
            };
        }

        case ActionType.Beregn: {
            const updatedResultViewData: ResultView<FeiloppsummeringFeil[], Omsorgsprinsipper> = updateResultView(
                state.barn,
                state.resultViewData,
                true
            );

            if (isBeregnButtonAndErrorSummary(updatedResultViewData)) {
                return {
                    ...state,
                    barn: state.barn.map((barnInfo: BarnInfo) => ({ ...barnInfo, panelErÅpent: true })),
                    resultViewData: updatedResultViewData,
                };
            }
            return {
                ...state,
                resultViewData: updatedResultViewData,
            };
        }

        case ActionType.SetPanelErÅpent: {
            const listeAvBarnUpdated: BarnInfo[] = state.barn.map((barnInfo: BarnInfo) =>
                barnInfo.id === action.barnId ? { ...barnInfo, panelErÅpent: action.erÅpent } : barnInfo
            );
            return {
                ...state,
                barn: listeAvBarnUpdated,
            };
        }
        default:
            return state;
    }
};
