import { isSome, Option } from 'fp-ts/lib/Option';
import { ISODateString } from 'nav-datovelger';
import { ValueWithId } from './types';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { toFeiloppsummeringsFeil } from './utils';
import { Either, isRight, left, right } from 'fp-ts/lib/Either';
import { isISODateString } from 'nav-datovelger/lib/types/typeGuards';

export const errorNotAnswered = 'Feltet er påkrevd';

export const validateMaybeBooleanValueWithId = ({
    id,
    value,
}: ValueWithId<Option<boolean>>): Either<FeiloppsummeringFeil, boolean> =>
    isSome(value) ? right(value.value) : left(toFeiloppsummeringsFeil(id, errorNotAnswered));

export const validateFodselsdato = ({
    id,
    value,
}: ValueWithId<Option<ISODateString>>): Either<FeiloppsummeringFeil, ISODateString> =>
    isSome(value) && isISODateString(value.value)
        ? right(value.value)
        : left(toFeiloppsummeringsFeil(id, errorNotAnswered));
export const fodselsdatoIsValid = (value: ValueWithId<Option<ISODateString>>): boolean =>
    isRight(validateFodselsdato(value));

export const validateKroniskSykt = (value: ValueWithId<Option<boolean>>): Either<FeiloppsummeringFeil, boolean> =>
    validateMaybeBooleanValueWithId(value);
export const kroniskSyktIsValid = (value: ValueWithId<Option<boolean>>) => isRight(validateKroniskSykt(value));

export const validateBorSammen = (value: ValueWithId<Option<boolean>>): Either<FeiloppsummeringFeil, boolean> =>
    validateMaybeBooleanValueWithId(value);
export const borSammenIsValid = (value: ValueWithId<Option<boolean>>) => isRight(validateBorSammen(value));

export const validateAleneOmOmsorgen = (value: ValueWithId<Option<boolean>>): Either<FeiloppsummeringFeil, boolean> =>
    validateMaybeBooleanValueWithId(value);
export const aleneOmOmsorgenIsValid = (value: ValueWithId<Option<boolean>>) => isRight(validateAleneOmOmsorgen(value));
