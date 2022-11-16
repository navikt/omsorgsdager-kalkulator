import { isSome, Option } from 'fp-ts/lib/Option';
import { BarnFeiloppsummeringFeil, ValueWithId } from './types';
import { toBarnFeiloppsummeringsFeil } from './utils';
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
    errorKey: FieldError,
    barnIndex: number,
    antallBarn: number
): Either<BarnFeiloppsummeringFeil, boolean> =>
    isSome(value)
        ? right(value.value)
        : left(toBarnFeiloppsummeringsFeil(id, errorKey || errorNotAnswered, barnIndex, antallBarn));

export const isValidYear = (input: any): boolean => input && isNumber(input);

export const validateÅrFødt = (
    { id, value }: ValueWithId<Option<number>>,
    barnIndex: number,
    antallBarn: number
): Either<BarnFeiloppsummeringFeil, number> => {
    if (isSome(value)) {
        return isValidYear(value.value)
            ? right(value.value)
            : left(toBarnFeiloppsummeringsFeil(id, FieldError.årstall_ugyldig, barnIndex, antallBarn));
    }
    return left(toBarnFeiloppsummeringsFeil(id, FieldError.årstall, barnIndex, antallBarn));
};
export const årFødtIsValid = (value: ValueWithId<Option<number>>, barnIndex: number, antallBarn: number): boolean =>
    isRight(validateÅrFødt(value, barnIndex, antallBarn));

export const validateKroniskSykt = (
    value: ValueWithId<Option<boolean>>,
    barnIndex: number,
    antallBarn: number
): Either<BarnFeiloppsummeringFeil, boolean> =>
    validateMaybeBooleanValueWithId(value, FieldError.kronisk_sykt, barnIndex, antallBarn);

export const kroniskSyktIsValid = (value: ValueWithId<Option<boolean>>, barnIndex: number, antallBarn: number) =>
    isRight(validateKroniskSykt(value, barnIndex, antallBarn));

export const validateBorSammen = (
    value: ValueWithId<Option<boolean>>,
    barnIndex: number,
    antallBarn: number
): Either<BarnFeiloppsummeringFeil, boolean> =>
    validateMaybeBooleanValueWithId(value, FieldError.bor_fast, barnIndex, antallBarn);

export const borSammenIsValid = (value: ValueWithId<Option<boolean>>, barnIndex: number, antallBarn: number) =>
    isRight(validateBorSammen(value, barnIndex, antallBarn));

export const validateAleneOmOmsorgen = (
    value: ValueWithId<Option<boolean>>,
    barnIndex: number,
    antallBarn: number
): Either<BarnFeiloppsummeringFeil, boolean> =>
    validateMaybeBooleanValueWithId(value, FieldError.aleneomsorg, barnIndex, antallBarn);

export const aleneOmOmsorgenIsValid = (value: ValueWithId<Option<boolean>>, barnIndex: number, antallBarn: number) =>
    isRight(validateAleneOmOmsorgen(value, barnIndex, antallBarn));
