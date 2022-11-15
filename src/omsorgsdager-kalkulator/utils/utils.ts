import { beregnOmsorgsdager } from '@navikt/kalkuler-omsorgsdager/lib/kalkulerOmsorgsdager';
import Barn, { AlderType } from '@navikt/kalkuler-omsorgsdager/lib/types/Barn';
import Omsorgsprinsipper from '@navikt/kalkuler-omsorgsdager/lib/types/Omsorgsprinsipper';
import { separate, sequence } from 'fp-ts/lib/Array';
import { chain as andThen, either, Either, fold, left, map, right } from 'fp-ts/lib/Either';
import { isSome, some } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import { none } from 'fp-ts/Option';
import moment, { Moment } from 'moment';
import { IntlShape } from 'react-intl';
import { intlHelper } from '../i18n/utils';
import {
    beregnButton,
    beregnButtonAndErrorSummary,
    caseResultViewOf,
    empty,
    noValidChildrenOrange,
    resultBox,
    ResultView,
} from '../types/ResultView';
import { getYear } from './dateUtils';
import { initializeValue } from './initializers';
import { BarnFeiloppsummeringFeil, BarnInfo, BarnInput } from './types';
import {
    kroniskSyktIsValid,
    validateAleneOmOmsorgen,
    validateBorSammen,
    validateKroniskSykt,
    validateÅrFødt,
    årFødtIsValid,
} from './validationUtils';

export function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0,
            v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

export const toBarnInfo = (barnInput: BarnInput, index: number): BarnInfo => ({
    id: uuidv4(),
    index,
    panelErÅpent: index === 0,
    årFødt: initializeValue(barnInput.årFødt ? some(barnInput.årFødt) : none),
    kroniskSykt: initializeValue(barnInput.kroniskSykt !== undefined ? some(barnInput.kroniskSykt) : none),
    borSammen: initializeValue(barnInput.borSammen !== undefined ? some(barnInput.borSammen) : none),
    aleneOmOmsorgen: initializeValue(barnInput.aleneOmOmsorgen !== undefined ? some(barnInput.aleneOmOmsorgen) : none),
});

export const maybeBarnInputListToBarnInfoList = (maybeBarnInputListe?: BarnInput[]): BarnInfo[] => {
    return maybeBarnInputListe ? maybeBarnInputListe.map((barn, index) => toBarnInfo(barn, index)) : [];
};

export const erForbiDetTolvteKalenderår = (årFødt: number, now: Moment): boolean => now.year() - årFødt > 12;

export const erForbiDetAttendeKalenderår = (årFødt: number, now: Moment): boolean => now.year() - årFødt > 18;

export const årFødtToAlderType = (årFødt: number): AlderType =>
    erForbiDetTolvteKalenderår(årFødt, moment()) ? AlderType.OVER12 : AlderType.UNDER12;

export const barnetErForbiDetAttendeKalenderår = (barnInfo: BarnInfo): boolean =>
    isSome(barnInfo.årFødt.value) && erForbiDetAttendeKalenderår(barnInfo.årFødt.value.value, moment());

export const barnetErForbiDetTolvteKalenderårOgIkkeKroniskSykt = (barnInfo: BarnInfo): boolean =>
    isSome(barnInfo.årFødt.value) &&
    erForbiDetTolvteKalenderår(barnInfo.årFødt.value.value, moment()) &&
    isSome(barnInfo.kroniskSykt.value) &&
    !barnInfo.kroniskSykt.value.value;

export const borSammen = (barnInfo: BarnInfo): boolean =>
    isSome(barnInfo.borSammen.value) && barnInfo.borSammen.value.value;

export const borIkkeSammen = (barnInfo: BarnInfo): boolean =>
    isSome(barnInfo.borSammen.value) && !barnInfo.borSammen.value.value;

export const isVisibleAndBorIkkeSammen = (barnInfo: BarnInfo): boolean =>
    årFødtIsValid(barnInfo.årFødt, barnInfo.index, 0) &&
    kroniskSyktIsValid(barnInfo.kroniskSykt, barnInfo.index, 0) &&
    borIkkeSammen(barnInfo);

export const toBarnFeiloppsummeringsFeil = (
    id: string,
    error: string,
    barnIndex: number,
    antallBarn: number
): BarnFeiloppsummeringFeil => ({
    skjemaelementId: id,
    feilmelding: error,
    antallBarn,
    barnIndex,
});

export const skalKoronadagerInkluderes = () => getYear() === 2022;

export const excludeChild = (barnInfo: BarnInfo): boolean =>
    barnetErForbiDetAttendeKalenderår(barnInfo) ||
    barnetErForbiDetTolvteKalenderårOgIkkeKroniskSykt(barnInfo) ||
    isVisibleAndBorIkkeSammen(barnInfo);

export const includeChild = (barnInfo: BarnInfo): boolean => !excludeChild(barnInfo);

export const summerAntallOmsorgsdager = (result: Omsorgsprinsipper): number => {
    const { grunnrett, kroniskSykt, aleneomsorg, aleneomsorgKroniskSyke } = result;
    return (
        grunnrett.normaldager +
        kroniskSykt.normaldager +
        aleneomsorg.normaldager +
        aleneomsorgKroniskSyke.normaldager +
        grunnrett.koronadager +
        kroniskSykt.koronadager +
        aleneomsorg.koronadager +
        aleneomsorgKroniskSyke.koronadager
    );
};

export const validateBarnInfoAndMapToBarn = (
    barnInfo: BarnInfo,
    antallBarn: number
): Either<BarnFeiloppsummeringFeil, Barn> => {
    const { id, årFødt, kroniskSykt, borSammen, aleneOmOmsorgen }: BarnInfo = barnInfo;
    const årFødtOrError: Either<BarnFeiloppsummeringFeil, number> = validateÅrFødt(årFødt, barnInfo.index, antallBarn);
    const kroniskSyktOrError: Either<BarnFeiloppsummeringFeil, boolean> = validateKroniskSykt(
        kroniskSykt,
        barnInfo.index,
        antallBarn
    );
    const borSammenOrError: Either<BarnFeiloppsummeringFeil, boolean> = validateBorSammen(
        borSammen,
        barnInfo.index,
        antallBarn
    );
    const aleneOrError: Either<BarnFeiloppsummeringFeil, boolean> = validateAleneOmOmsorgen(
        aleneOmOmsorgen,
        barnInfo.index,
        antallBarn
    );

    // TODO: Returnere en liste av FeiloppsummeringFeil, istede for kun den første som oppdages
    return pipe(
        årFødtOrError,
        map((årFødt: number) => ({ alder: årFødtToAlderType(årFødt) })),
        andThen((partial) => map((kroniskSykt: boolean) => ({ ...partial, kroniskSykt }))(kroniskSyktOrError)),
        andThen((partial) => map((borSammen: boolean) => ({ ...partial, borSammen }))(borSammenOrError)),
        andThen((partial) => map((alene: boolean) => ({ ...partial, søkerHarAleneomsorgFor: alene }))(aleneOrError)),
        andThen((partial) => map((id: string) => ({ ...partial, id }))(right(id)))
    );
};

export const extractEitherFromList = (
    list: Either<BarnFeiloppsummeringFeil, Barn>[]
): Either<BarnFeiloppsummeringFeil[], Barn[]> =>
    pipe(
        sequence(either)(list),
        fold(
            () => left(separate(list).left),
            (r) => right(r)
        )
    );

export const updateResultView = (
    listeAvBarnInfo: BarnInfo[],
    previousResultView: ResultView<BarnFeiloppsummeringFeil[], Omsorgsprinsipper>,
    didClickBeregn: boolean
): ResultView<BarnFeiloppsummeringFeil[], Omsorgsprinsipper> => {
    const listeAvBarnUtenInvalids: BarnInfo[] = listeAvBarnInfo.filter(includeChild);
    const antallBarn = listeAvBarnInfo.length;
    const listOfEitherErrorOrBarn: Either<BarnFeiloppsummeringFeil, Barn>[] = listeAvBarnUtenInvalids.map((info) =>
        validateBarnInfoAndMapToBarn(info, antallBarn)
    );
    const validationResult: Either<BarnFeiloppsummeringFeil[], Barn[]> = extractEitherFromList(listOfEitherErrorOrBarn);

    const updatedResultView: ResultView<BarnFeiloppsummeringFeil[], Omsorgsprinsipper> = fold<
        BarnFeiloppsummeringFeil[],
        Barn[],
        ResultView<BarnFeiloppsummeringFeil[], Omsorgsprinsipper>
    >(
        (errors: BarnFeiloppsummeringFeil[]) => beregnButtonAndErrorSummary<BarnFeiloppsummeringFeil[]>(errors),
        (barnListe: Barn[]) => {
            if (barnListe.length === 0) {
                return noValidChildrenOrange;
            }
            const inkluderKoronadager = skalKoronadagerInkluderes();
            const omsorgsprinsipper: Omsorgsprinsipper = beregnOmsorgsdager(barnListe, inkluderKoronadager);
            return resultBox<Omsorgsprinsipper>(omsorgsprinsipper);
        }
    )(validationResult);

    return caseResultViewOf(
        () => empty,
        () => (didClickBeregn ? updatedResultView : beregnButton),
        () => (didClickBeregn ? updatedResultView : beregnButton),
        () => beregnButton,
        () => (didClickBeregn ? updatedResultView : beregnButton)
    )(previousResultView);
};

export const getBarnNavn = (intl: IntlShape, barnIndex: number, antallBarn: number) =>
    antallBarn === 1
        ? intlHelper(intl, 'barn.ettBarn.navn')
        : intlHelper(intl, 'barn.flereBarn.navn', { index: barnIndex + 1 });
