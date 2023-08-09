import * as React from 'react';
import { IntlShape } from 'react-intl';
import Omsorgsprinsipper from '../components/kalkulerOmsorgsdager/types/Omsorgsprinsipper';
import { Either, isLeft } from 'fp-ts/lib/Either';
import { Option } from 'fp-ts/lib/Option';
import { intlHelper } from '../i18n/utils';
import { isBeregnButtonAndErrorSummary, ResultView } from '../types/ResultView';
import { BarnFeiloppsummeringFeil, ValueWithId } from './types';

export function valueToFeilProps<T>(
    value: ValueWithId<Option<T>>,
    resultView: ResultView<BarnFeiloppsummeringFeil[], Omsorgsprinsipper>,
    validationFunc: (value: ValueWithId<Option<T>>) => Either<BarnFeiloppsummeringFeil, T>,
    intl: IntlShape,
    intlValues: {
        barn: string;
    }
): React.ReactNode | boolean {
    const ma = validationFunc(value);
    return isBeregnButtonAndErrorSummary(resultView) && isLeft(ma) ? (
        <span>{intlHelper(intl, ma.left.feilmelding, intlValues)}</span>
    ) : undefined;
}
