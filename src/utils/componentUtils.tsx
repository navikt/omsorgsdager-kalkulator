import * as React from 'react';
import { isBeregnButtonAndErrorSummary, ResultView } from '../types/ResultView';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { Either, isLeft } from 'fp-ts/lib/Either';
import { ValueWithId } from './types';
import { Option } from 'fp-ts/lib/Option';
import Omsorgsprinsipper from "../calculator/types/Omsorgsprinsipper";

export function valueToFeilProps<T>(
    value: ValueWithId<Option<T>>,
    resultView: ResultView<FeiloppsummeringFeil[], Omsorgsprinsipper>,
    validationFunc: (value: ValueWithId<Option<T>>) => Either<FeiloppsummeringFeil, T>
): React.ReactNode | boolean {
    const ma = validationFunc(value);
    return isBeregnButtonAndErrorSummary(resultView) && isLeft(ma) ? <span>{ma.left.feilmelding}</span> : undefined;
}
