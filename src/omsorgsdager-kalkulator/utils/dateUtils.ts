import moment from 'moment';
import { IntlShape } from 'react-intl';
import { intlHelper } from '../i18n/utils';

export const getYear = (): number => moment().year();

export const getStartDate = (intl: IntlShape): string => {
    const year = getYear();
    if (year === 2020) {
        return intlHelper(intl, 'oms-calc.resultat-area.orange.2.2.a');
    }
    return intlHelper(intl, 'oms-calc.resultat-area.orange.2.2.b');
};
