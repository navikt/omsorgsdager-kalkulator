import { createInitialState, State } from './state';
import { Action, ActionType } from './actions';
import { initializeNBarn } from './initializers';
import { BarnInfo } from './types';
import { updateResultView } from './utils';
import {
    fjernFodselsdatoAndWipeValues,
    setAleneOmOmsorgen,
    setBorSammenAndMaybeWipeValues,
    setFodselsdatoAndMaybeWipeValues,
    setKroniskSyktAndMaybeWipeValues,
} from './reducerUtils';
import { beregnButton } from '../types/ResultView';

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
                aktivtBarnPanel: initializedBarnListe[0].id,
            };
        }
        case ActionType.SetNBarnInvalid: {
            return createInitialState([]);
        }
        case ActionType.SetFodselsdatoForBarnInfo: {
            const listeAvBarnUpdated: BarnInfo[] = state.barn.map((barn: BarnInfo) =>
                barn.id === action.barnId ? setFodselsdatoAndMaybeWipeValues(action.fodselsdato, barn) : barn
            );
            return {
                ...state,
                barn: listeAvBarnUpdated,
                resultViewData: updateResultView(listeAvBarnUpdated, state.resultViewData, false),
            };
        }
        case ActionType.FjernFodselsdatoForBarnInfo: {
            const listeAvBarnUpdated: BarnInfo[] = state.barn.map((barn: BarnInfo) =>
                barn.id === action.barnId ? fjernFodselsdatoAndWipeValues(barn) : barn
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
            return {
                ...state,
                resultViewData: updateResultView(state.barn, state.resultViewData, true),
            };
        }

        case ActionType.SetAktivtBarnPanel: {
            return {
                ...state,
                aktivtBarnPanel: action.id,
            };
        }
        default:
            return state;
    }
};
