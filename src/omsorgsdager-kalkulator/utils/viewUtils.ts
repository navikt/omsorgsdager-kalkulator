import {
    barnetErForbiDetAttendeKalenderår,
    barnetErForbiDetTolvteKalenderårOgIkkeKroniskSykt,
    borIkkeSammen,
    erForbiDetAttendeKalenderår,
    validateBarnInfoAndMapToBarn,
} from './utils';
import { BarnInfo, YesOrNo } from './types';
import { isRight } from 'fp-ts/lib/Either';
import { fold as foldOption, isSome, Option } from 'fp-ts/lib/Option';
import moment from 'moment';
import { IntlShape } from 'react-intl';
import { intlHelper } from '../i18n/utils';

export const isNotLastChild = (index: number, listLength: number) => index + 1 < listLength;

export const erFerdigUtfylt = (barnInfo: BarnInfo, antallBarn: number): boolean =>
    isRight(validateBarnInfoAndMapToBarn(barnInfo, antallBarn));

export const skalViseGåTilNesteBarnKnapp = (barnInfo: BarnInfo, index: number, antallBarn: number): boolean =>
    erFerdigUtfylt(barnInfo, antallBarn) && isNotLastChild(index, antallBarn);

export type RadioValue = YesOrNo | undefined;

export const YesOrNoToBool = (yesOrNo: YesOrNo): boolean => yesOrNo === YesOrNo.Yes;

export const yesOrNoRadios = (id: string, intl: IntlShape) => [
    {
        label: intlHelper(intl, 'oms-calc.yes'),
        id: `${id}`,
        name: `radio-name-ja-${id}`,
        value: YesOrNo.Yes,
        autoComplete: 'off',
        'aria-invalid': false,
    },
    {
        label: intlHelper(intl, 'oms-calc.no'),
        id: `nei-${id}`,
        name: `radio-name-nei-${id}`,
        value: YesOrNo.No,
        autoComplete: 'off',
        'aria-invalid': false,
    },
];

export const toRadioValue = (optionValue: Option<boolean>): RadioValue =>
    foldOption(
        () => undefined,
        (justValue: boolean) => (justValue ? YesOrNo.Yes : YesOrNo.No)
    )(optionValue);

export const shouldViewKroniskSyktQuestion = (barnInfo: BarnInfo): boolean =>
    isSome(barnInfo.årFødt.value) && !erForbiDetAttendeKalenderår(barnInfo.årFødt.value.value, moment());

export const shouldViewBorSammenQuestion = (barnInfo: BarnInfo): boolean =>
    !barnetErForbiDetAttendeKalenderår(barnInfo) &&
    !barnetErForbiDetTolvteKalenderårOgIkkeKroniskSykt(barnInfo) &&
    shouldViewKroniskSyktQuestion(barnInfo) &&
    isSome(barnInfo.kroniskSykt.value);

export const shouldViewAleneOmOmsorgenQuestion = (barnInfo: BarnInfo): boolean =>
    !barnetErForbiDetAttendeKalenderår(barnInfo) &&
    !barnetErForbiDetTolvteKalenderårOgIkkeKroniskSykt(barnInfo) &&
    !borIkkeSammen(barnInfo) &&
    shouldViewBorSammenQuestion(barnInfo) &&
    isSome(barnInfo.borSammen.value);
