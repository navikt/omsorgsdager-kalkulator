import * as React from 'react';
import { FormattedMessage, IntlProvider, useIntl } from 'react-intl';
import { Undertittel } from 'nav-frontend-typografi';
import Box from './components/box/Box';
import ExpandableInfo from './components/expandable-content/ExpandableInfo';
import FormBlock from './components/form-block/FormBlock';
import Knappelenke from './components/knappelenke/Knappelenke';
import { applicationIntlMessages } from './i18n/applicationMessages';
import { Locale } from './i18n/types';
import { intlHelper } from './i18n/utils';
import bemUtils from './utils/bemUtils';
import { getStartDate, getYear } from './utils/dateUtils';
import KalkulatorLogoAndTitle from './views/KalkulatorLogoAndTitle';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import './OmsorgsdagerKalkulator.less';

const bem = bemUtils('omsorgsdagerkalkulator');

interface Props {
    kalkulatorHref: string;
    includeHeader?: boolean;
    locale?: Locale;
}

const Content: React.FunctionComponent<Props> = ({ kalkulatorHref, includeHeader = true }: Props) => {
    const intl = useIntl();
    return (
        <Box className={bem.element('wrapper')}>
            {includeHeader && <KalkulatorLogoAndTitle />}
            <Box margin="m" padBottom="xl">
                <AlertStripeInfo>
                    <FormattedMessage id={'oms-calc.infoside.2022-tekst'} />
                </AlertStripeInfo>
            </Box>
            <p>
                <Undertittel>
                    <FormattedMessage id={'oms-calc.infoside.undertittel.1'} /> {getStartDate(intl)} {getYear()} til{' '}
                    <FormattedMessage id={'oms-calc.infoside.undertittel.2'} /> {getYear()}
                </Undertittel>
            </p>
            {getYear() === 2020 && (
                <p>
                    <strong>
                        <FormattedMessage id={'oms-calc.infoside.nb.1'} />
                    </strong>{' '}
                    <FormattedMessage id={'oms-calc.infoside.nb.2'} />{' '}
                    <strong>
                        <FormattedMessage id={'oms-calc.infoside.nb.3'} />
                    </strong>{' '}
                    <FormattedMessage id={'oms-calc.infoside.nb.4'} />
                </p>
            )}
            <p>
                <FormattedMessage id={'oms-calc.infoside.paragraph.1'} />
            </p>
            <FormBlock margin="m">
                <ExpandableInfo title={intlHelper(intl, 'oms-calc.infoside.expandableinfo.title')}>
                    <Box padBottom={'l'}>
                        <FormattedMessage id={'oms-calc.infoside.expandableinfo.content.1'} />
                    </Box>
                    <FormattedMessage id={'oms-calc.infoside.expandableinfo.content.2'} />
                </ExpandableInfo>
            </FormBlock>
            <FormBlock margin={'xxl'}>
                <div className={bem.element('flex-center')}>
                    <Knappelenke type={'hoved'} href={kalkulatorHref}>
                        Start kalkulator
                    </Knappelenke>
                </div>
            </FormBlock>
        </Box>
    );
};

const OmsorgsdagerKalkulatorInfo = (props: Props) => {
    const { locale } = props;
    const i18n =
        locale && applicationIntlMessages[locale]
            ? { locale: locale, messages: applicationIntlMessages[locale] }
            : { locale: 'nb', messages: applicationIntlMessages['nb'] };
    return (
        <IntlProvider locale={i18n.locale} messages={i18n.messages}>
            <Content {...props} />
        </IntlProvider>
    );
};

export default OmsorgsdagerKalkulatorInfo;
