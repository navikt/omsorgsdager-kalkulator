import * as React from 'react';
import { isBeregnButtonAndErrorSummary, ResultView } from '../types/ResultView';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { Either, isLeft } from 'fp-ts/lib/Either';
import { ValueWithId } from './types';
import { Option } from 'fp-ts/lib/Option';
import Omsorgsprinsipper from '@navikt/kalkuler-omsorgsdager/lib/types/Omsorgsprinsipper';
import { IntlShape } from 'react-intl';
import { intlHelper } from '../i18n/utils';

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
