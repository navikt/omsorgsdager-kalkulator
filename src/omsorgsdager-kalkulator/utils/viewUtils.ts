import {
    barnetErOverAtten,
    barnetErOverTolvOgIkkeKroniskSykt,
    borIkkeSammen, erOverAttenOgForbiDetAttendeKalenderår,
    validateBarnInfoAndMapToBarnApi,
} from './utils';
import { BarnInfo, YesOrNo } from './types';
import { isRight } from 'fp-ts/lib/Either';
import { fold as foldOption, isSome, Option } from 'fp-ts/lib/Option';
import { ISODateString } from 'nav-datovelger';
import moment from "moment";

export const isNotLastChild = (index: number, listLength: number) => index + 1 < listLength;

export const erFerdigUtfylt = (barnInfo: BarnInfo): boolean => isRight(validateBarnInfoAndMapToBarnApi(barnInfo));

export const skalViseGåTilNesteBarnKnapp = (barnInfo: BarnInfo, index: number, listLength: number): boolean =>
    erFerdigUtfylt(barnInfo) && isNotLastChild(index, listLength);

export type RadioValue = YesOrNo | undefined;

export const YesOrNoToBool = (yesOrNo: YesOrNo): boolean => yesOrNo === YesOrNo.Yes;

export const yesOrNoRadios = (id: string) => [
    { label: 'Ja', id: `${id}`, name: `radio-name-ja-${id}`, value: YesOrNo.Yes, autoComplete: 'off' },
    { label: 'Nei', id: `nei-${id}`, name: `radio-name-nei-${id}`, value: YesOrNo.No, autoComplete: 'off' },
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
    isSome(barnInfo.fodselsdato.value) && !erOverAttenOgForbiDetAttendeKalenderår(barnInfo.fodselsdato.value.value, moment());

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
