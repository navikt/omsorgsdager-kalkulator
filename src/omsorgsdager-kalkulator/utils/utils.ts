import { BarnApi, BarnInfo } from './types';
import { chain as andThen, either, Either, fold, left, map, right } from 'fp-ts/lib/Either';
import { separate, sequence } from 'fp-ts/lib/Array';
import { ISODateString } from 'nav-datovelger';
import moment, {Moment} from 'moment';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { pipe } from 'fp-ts/lib/pipeable';
import { isSome } from 'fp-ts/lib/Option';
import {
    beregnButton,
    beregnButtonAndErrorSummary,
    caseResultViewOf,
    empty,
    noValidChildrenOrange,
    resultBox,
    ResultView,
} from '../types/ResultView';
import {
    fodselsdatoIsValid,
    kroniskSyktIsValid,
    validateAleneOmOmsorgen,
    validateBorSammen,
    validateFodselsdato,
    validateKroniskSykt,
} from './validationUtils';
import { AlderType } from '@navikt/kalkuler-omsorgsdager/lib/types/Barn';
import Omsorgsprinsipper from '@navikt/kalkuler-omsorgsdager/lib/types/Omsorgsprinsipper';
import { beregnOmsorgsdager } from '@navikt/kalkuler-omsorgsdager/lib/kalkulerOmsorgsdager';

export function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0,
            v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}


export const erOverTolvOgForbiDetTolvteKalenderår = (fodselsdato: ISODateString, now: Moment): boolean => {

    const alder: number = now.diff(fodselsdato, 'year');
    if (alder >= 13) {
        return true;
    }
    if (alder < 12) {
        return false;
    }
    // Age is 12
    const yearBorn = moment(fodselsdato).year();
    const currentYear = now.year();

    if (currentYear - yearBorn === 12) {
        return false
    }
    return true
};

export const erOverAttenOgForbiDetAttendeKalenderår = (fodselsdato: ISODateString, now: Moment): boolean => {

    const alder: number = now.diff(fodselsdato, 'year');
    if (alder >= 19) {
        return true;
    }
    if (alder < 18) {
        return false;
    }
    // Age is 18
    const yearBorn = moment(fodselsdato).year();
    const currentYear = now.year();

    if (currentYear - yearBorn === 18) {
        return false
    }
    return true
};

export const fodselsdatoToAlderType = (isoDateStringFodselsdato: ISODateString): AlderType =>
    erOverTolvOgForbiDetTolvteKalenderår(isoDateStringFodselsdato, moment()) ? AlderType.OVER12 : AlderType.UNDER12;

export const barnetErOverAtten = (barnInfo: BarnInfo): boolean =>
    isSome(barnInfo.fodselsdato.value) && erOverAttenOgForbiDetAttendeKalenderår(barnInfo.fodselsdato.value.value, moment());

export const barnetErOverTolvOgIkkeKroniskSykt = (barnInfo: BarnInfo): boolean =>
    isSome(barnInfo.fodselsdato.value) &&
    erOverTolvOgForbiDetTolvteKalenderår(barnInfo.fodselsdato.value.value, moment()) &&
    isSome(barnInfo.kroniskSykt.value) &&
    !barnInfo.kroniskSykt.value.value;

export const borSammen = (barnInfo: BarnInfo): boolean =>
    isSome(barnInfo.borSammen.value) && barnInfo.borSammen.value.value;

export const borIkkeSammen = (barnInfo: BarnInfo): boolean =>
    isSome(barnInfo.borSammen.value) && !barnInfo.borSammen.value.value;

export const isVisibleAndBorIkkeSammen = (barnInfo: BarnInfo): boolean =>
    fodselsdatoIsValid(barnInfo.fodselsdato) && kroniskSyktIsValid(barnInfo.kroniskSykt) && borIkkeSammen(barnInfo);

export const toFeiloppsummeringsFeil = (id: string, error: string): FeiloppsummeringFeil => ({
    skjemaelementId: id,
    feilmelding: error,
});

export const excludeChild = (barnInfo: BarnInfo): boolean =>
    barnetErOverAtten(barnInfo) || barnetErOverTolvOgIkkeKroniskSykt(barnInfo) || isVisibleAndBorIkkeSammen(barnInfo);

export const includeChild = (barnInfo: BarnInfo): boolean => !excludeChild(barnInfo);

export const validateBarnInfoAndMapToBarnApi = (barnInfo: BarnInfo): Either<FeiloppsummeringFeil, BarnApi> => {
    const { id, fodselsdato, kroniskSykt, borSammen, aleneOmOmsorgen }: BarnInfo = barnInfo;
    const fodselsdatoOrError: Either<FeiloppsummeringFeil, ISODateString> = validateFodselsdato(fodselsdato);
    const kroniskSyktOrError: Either<FeiloppsummeringFeil, boolean> = validateKroniskSykt(kroniskSykt);
    const borSammenOrError: Either<FeiloppsummeringFeil, boolean> = validateBorSammen(borSammen);
    const aleneOrError: Either<FeiloppsummeringFeil, boolean> = validateAleneOmOmsorgen(aleneOmOmsorgen);

    return pipe(
        fodselsdatoOrError,
        map((fodselsdato: string) => ({ alder: fodselsdatoToAlderType(fodselsdato) })),
        andThen((partial) => map((kroniskSykt: boolean) => ({ ...partial, kroniskSykt }))(kroniskSyktOrError)),
        andThen((partial) => map((borSammen: boolean) => ({ ...partial, borSammen }))(borSammenOrError)),
        andThen((partial) => map((alene: boolean) => ({ ...partial, søkerHarAleneomsorgFor: alene }))(aleneOrError)),
        andThen((partial) => map((id: string) => ({ ...partial, id }))(right(id)))
    );
};

export const extractEitherFromList = (
    list: Either<FeiloppsummeringFeil, BarnApi>[]
): Either<FeiloppsummeringFeil[], BarnApi[]> =>
    pipe(
        sequence(either)(list),
        fold(
            () => left(separate(list).left),
            (r) => right(r)
        )
    );

export const updateResultView = (
    listeAvBarnInfo: BarnInfo[],
    previousResultView: ResultView<FeiloppsummeringFeil[], Omsorgsprinsipper>,
    didClickBeregn: boolean
): ResultView<FeiloppsummeringFeil[], Omsorgsprinsipper> => {
    const listeAvBarnUtenInvalids: BarnInfo[] = listeAvBarnInfo.filter(includeChild);
    const listOfEitherErrorOrBarnApi: Either<FeiloppsummeringFeil, BarnApi>[] = listeAvBarnUtenInvalids.map(
        validateBarnInfoAndMapToBarnApi
    );
    const validationResult: Either<FeiloppsummeringFeil[], BarnApi[]> = extractEitherFromList(
        listOfEitherErrorOrBarnApi
    );

    const updatedResultView: ResultView<FeiloppsummeringFeil[], Omsorgsprinsipper> = fold<
        FeiloppsummeringFeil[],
        BarnApi[],
        ResultView<FeiloppsummeringFeil[], Omsorgsprinsipper>
    >(
        (errors: FeiloppsummeringFeil[]) => beregnButtonAndErrorSummary<FeiloppsummeringFeil[]>(errors),
        (barnApiListe: BarnApi[]) => {
            if (barnApiListe.length === 0) {
                return noValidChildrenOrange;
            }
            const omsorgsprinsipper: Omsorgsprinsipper = beregnOmsorgsdager(barnApiListe, false);
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
