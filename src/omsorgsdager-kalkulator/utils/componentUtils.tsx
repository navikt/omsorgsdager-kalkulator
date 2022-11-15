import * as React from 'react';
import { IntlShape } from 'react-intl';
import Omsorgsprinsipper from '@navikt/kalkuler-omsorgsdager/lib/types/Omsorgsprinsipper';
import { Either, isLeft } from 'fp-ts/lib/Either';
import { Option } from 'fp-ts/lib/Option';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { intlHelper } from '../i18n/utils';
import { isBeregnButtonAndErrorSummary, ResultView } from '../types/ResultView';
import { ValueWithId } from './types';

export function valueToFeilProps<T>(
    value: ValueWithId<Option<T>>,
    resultView: ResultView<FeiloppsummeringFeil[], Omsorgsprinsipper>,
    validationFunc: (value: ValueWithId<Option<T>>) => Either<FeiloppsummeringFeil, T>,
    intl: IntlShape
): React.ReactNode | boolean {
    const ma = validationFunc(value);
    return isBeregnButtonAndErrorSummary(resultView) && isLeft(ma) ? (
        <span>{intlHelper(intl, ma.left.feilmelding)}</span>
    ) : undefined;
}
