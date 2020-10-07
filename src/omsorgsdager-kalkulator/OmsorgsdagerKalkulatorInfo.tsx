import KalkulatorLogoAndTitle from './views/KalkulatorLogoAndTitle';
import { Undertittel } from 'nav-frontend-typografi';
import * as React from 'react';
import FormBlock from './components/form-block/FormBlock';
import ExpandableInfo from './components/expandable-content/ExpandableInfo';
import Box from './components/box/Box';
import Knappelenke from './components/knappelenke/Knappelenke';
import bemUtils from './utils/bemUtils';
import { getStartDate, getYear } from './utils/dateUtils';
import './OmsorgsdagerKalkulator.less';
import { IntlProvider, useIntl } from 'react-intl';
import { applicationIntlMessages } from './i18n/applicationMessages';
import { Locale } from './i18n/types';

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
            <FormBlock margin={'l'}>
                <Undertittel>
                    Her kan du regne ut hvor mange omsorgsdager du kan ha rett på fra {getStartDate(intl)} {getYear()} –
                    31. desember {getYear()}
                </Undertittel>
            </FormBlock>
            <FormBlock>
                <strong>NB!</strong> Kalkulatoren tar <strong>ikke</strong> hensyn til midlertidige omsorgsdager du
                eventuelt har fått på grunn av koronasituasjonen.
            </FormBlock>
            <FormBlock>
                Kalkulatoren er for deg som barnet bor fast hos. Det vil si der barnet har folkeregistrert adresse. Hvis
                foreldrene ikke bor sammen, men har en avtale om delt bosted, bor barnet fast hos begge.
            </FormBlock>
            <FormBlock>
                <ExpandableInfo title="Er du samværsforelder?">
                    <Box padBottom={'l'}>
                        Hvis du er samværsforelder som har fått omsorgsdager fra den andre forelderen og i tillegg har
                        egne barn som bor fast hos deg, beregner kalkulatoren hvor mange omsorgsdager du har for de egne
                        barna som bor fast hos deg. Du plusser selv på antall omsorgsdager du har fått fra den andre
                        forelderen.
                    </Box>
                    Kalkulatoren vil ikke fungere for deg som er samværsforelder og ikke har egne barn som bor fast hos
                    deg.
                </ExpandableInfo>
            </FormBlock>
            <FormBlock margin={'xxxl'}>
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
