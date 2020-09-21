import {
    barnetErOverAtten,
    barnetErOverTolvOgIkkeKroniskSykt,
    borIkkeSammen,
    erOverAtten,
    excludeChild,
    validateBarnInfo,
} from './utils';
import { BarnApi, BarnInfo, YesOrNo } from './types';
import { Either, isLeft, isRight } from 'fp-ts/lib/Either';
import { fold as foldOption, isSome, Option } from 'fp-ts/lib/Option';
import { ISODateString } from 'nav-datovelger';
import { State } from './state';
import { isBeregnButtonAndErrorSummary } from '../types/ResultView';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';

export const isNotLastChild = (index: number, listLength: number) => index + 1 < listLength;

export const erFerdigUtfylt = (barnInfo: BarnInfo): boolean => isRight(validateBarnInfo(barnInfo));

export const skalViseGåTilNesteBarnKnapp = (barnInfo: BarnInfo, index: number, listLength: number): boolean =>
    erFerdigUtfylt(barnInfo) && isNotLastChild(index, listLength);

export type RadioValue = YesOrNo | undefined;

export const YesOrNoToBool = (yesOrNo: YesOrNo): boolean => yesOrNo === YesOrNo.Yes;

export const yesOrNoRadios = (id: string) => [
    { label: 'Ja', id: `${id}`, name: `radio-name-ja-${id}`, value: YesOrNo.Yes },
    { label: 'Nei', id: `${id}`, name: `radio-name-nei-${id}`, value: YesOrNo.No },
];

export const toFodselsdatoOrUndefined = (maybeISODate: Option<ISODateString>): ISODateString | undefined =>
    foldOption(
        () => undefined,
        (isoDateString: ISODateString) => isoDateString
    )(maybeISODate);

export const toRadioValue = (optionValue: Option<boolean>): RadioValue =>
    foldOption(
        () => undefined,
        (justValue: boolean) => (justValue ? YesOrNo.Yes : YesOrNo.No)
    )(optionValue);

export const shouldViewKroniskSyktQuestion = (barnInfo: BarnInfo): boolean =>
    isSome(barnInfo.fodselsdato.value) && !erOverAtten(barnInfo.fodselsdato.value.value);

export const shouldViewBorSammenQuestion = (barnInfo: BarnInfo): boolean =>
    !barnetErOverAtten(barnInfo) &&
    !barnetErOverTolvOgIkkeKroniskSykt(barnInfo) &&
    shouldViewKroniskSyktQuestion(barnInfo) &&
    isSome(barnInfo.kroniskSykt.value);

export const shouldViewAleneOmOmsorgenQuestion = (barnInfo: BarnInfo): boolean =>
    !barnetErOverAtten(barnInfo) &&
    !barnetErOverTolvOgIkkeKroniskSykt(barnInfo) &&
    !borIkkeSammen(barnInfo) &&
    shouldViewBorSammenQuestion(barnInfo) &&
    isSome(barnInfo.borSammen.value);

export const panelSkalVæreÅpent = (barnInfo: BarnInfo, state: State): boolean => {
    if (barnInfo.id === state.aktivtBarnPanel) {
        return true;
    }
    if (excludeChild(barnInfo)) {
        return false;
    }
    const validBarnOrError: Either<FeiloppsummeringFeil, BarnApi> = validateBarnInfo(barnInfo);
    return isLeft(validBarnOrError) && isBeregnButtonAndErrorSummary(state.resultViewData);
};
