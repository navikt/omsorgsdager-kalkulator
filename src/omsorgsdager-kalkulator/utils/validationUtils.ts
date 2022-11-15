import { isSome, Option } from 'fp-ts/lib/Option';
import { ValueWithId } from './types';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { toFeiloppsummeringsFeil } from './utils';
import { Either, isRight, left, right } from 'fp-ts/lib/Either';
import { isNumber } from './typeguards';

export enum FieldError {
    'årstall' = 'oms-calc.error.årstall.notAnswered',
    'årstall_ugyldig' = 'oms-calc.error.årstall.ugyldigÅrstall',
    'kronisk_sykt' = 'oms-calc.error.kronisk_sykt.notAnswered',
    'bor_fast' = 'oms-calc.error.bor_fast.notAnswered',
    'aleneomsorg' = 'oms-calc.error.aleneomsorg.notAnswered',
}

export const errorNotAnswered = 'oms-calc.error.not-answered';

export const validateMaybeBooleanValueWithId = (
    { id, value }: ValueWithId<Option<boolean>>,
    errorKey?: FieldError
): Either<FeiloppsummeringFeil, boolean> =>
    isSome(value) ? right(value.value) : left(toFeiloppsummeringsFeil(id, errorKey || errorNotAnswered));

export const isValidYear = (input: any): boolean => input && isNumber(input);

export const validateÅrFødt = ({ id, value }: ValueWithId<Option<number>>): Either<FeiloppsummeringFeil, number> => {
    if (isSome(value)) {
        return isValidYear(value.value)
            ? right(value.value)
            : left(toFeiloppsummeringsFeil(id, FieldError.årstall_ugyldig));
    }
    return left(toFeiloppsummeringsFeil(id, FieldError.årstall));
};
export const årFødtIsValid = (value: ValueWithId<Option<number>>): boolean => isRight(validateÅrFødt(value));

export const validateKroniskSykt = (value: ValueWithId<Option<boolean>>): Either<FeiloppsummeringFeil, boolean> =>
    validateMaybeBooleanValueWithId(value, FieldError.kronisk_sykt);

export const kroniskSyktIsValid = (value: ValueWithId<Option<boolean>>) => isRight(validateKroniskSykt(value));

export const validateBorSammen = (value: ValueWithId<Option<boolean>>): Either<FeiloppsummeringFeil, boolean> =>
    validateMaybeBooleanValueWithId(value, FieldError.bor_fast);

export const borSammenIsValid = (value: ValueWithId<Option<boolean>>) => isRight(validateBorSammen(value));

export const validateAleneOmOmsorgen = (value: ValueWithId<Option<boolean>>): Either<FeiloppsummeringFeil, boolean> =>
    validateMaybeBooleanValueWithId(value, FieldError.aleneomsorg);

export const aleneOmOmsorgenIsValid = (value: ValueWithId<Option<boolean>>) => isRight(validateAleneOmOmsorgen(value));
