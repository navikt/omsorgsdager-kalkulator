import moment from 'moment';
import { IntlShape } from 'react-intl';
import { intlHelper } from '../i18n/utils';

export const getStartDate = (intl: IntlShape): string => {
    const year = moment().year();
    if (year === 2020) {
        return intlHelper(intl, 'oms-calc.resultat-area.orange.2.2.a');
    }
    return intlHelper(intl, 'oms-calc.resultat-area.orange.2.2.b');
};
export const getYear = (): number => moment().year();
