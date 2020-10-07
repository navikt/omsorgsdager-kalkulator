import { isSome, Option } from 'fp-ts/lib/Option';
import { ValueWithId } from './types';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { toFeiloppsummeringsFeil } from './utils';
import { Either, isRight, left, right } from 'fp-ts/lib/Either';
import { isNumber } from './typeguards';

export const errorNotAnswered = 'oms-calc.error.not-answered';

export const validateMaybeBooleanValueWithId = ({
    id,
    value,
}: ValueWithId<Option<boolean>>): Either<FeiloppsummeringFeil, boolean> =>
    isSome(value) ? right(value.value) : left(toFeiloppsummeringsFeil(id, errorNotAnswered));

export const isValidYear = (input: any): boolean => input && isNumber(input);
export const validateÅrFødt = ({ id, value }: ValueWithId<Option<number>>): Either<FeiloppsummeringFeil, number> =>
    isSome(value) && isValidYear(value.value)
        ? right(value.value)
        : left(toFeiloppsummeringsFeil(id, errorNotAnswered));
export const årFødtIsValid = (value: ValueWithId<Option<number>>): boolean => isRight(validateÅrFødt(value));

export const validateKroniskSykt = (value: ValueWithId<Option<boolean>>): Either<FeiloppsummeringFeil, boolean> =>
    validateMaybeBooleanValueWithId(value);
export const kroniskSyktIsValid = (value: ValueWithId<Option<boolean>>) => isRight(validateKroniskSykt(value));

export const validateBorSammen = (value: ValueWithId<Option<boolean>>): Either<FeiloppsummeringFeil, boolean> =>
    validateMaybeBooleanValueWithId(value);
export const borSammenIsValid = (value: ValueWithId<Option<boolean>>) => isRight(validateBorSammen(value));

export const validateAleneOmOmsorgen = (value: ValueWithId<Option<boolean>>): Either<FeiloppsummeringFeil, boolean> =>
    validateMaybeBooleanValueWithId(value);
export const aleneOmOmsorgenIsValid = (value: ValueWithId<Option<boolean>>) => isRight(validateAleneOmOmsorgen(value));
