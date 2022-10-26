import * as React from 'react';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import Omsorgsprinsipper from '@navikt/kalkuler-omsorgsdager/lib/types/Omsorgsprinsipper';
import { Hovedknapp } from 'nav-frontend-knapper';
import Lenke from 'nav-frontend-lenker';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { Normaltekst } from 'nav-frontend-typografi';
import Box from '../components/box/Box';
import FormBlock from '../components/form-block/FormBlock';
import ValidationSummary from '../components/validation-summary/ValidationSummary';
import { intlHelper } from '../i18n/utils';
import { caseResultViewOf, ResultView } from '../types/ResultView';
import { Action, beregn } from '../utils/actions';
import bemUtils from '../utils/bemUtils';
import { getStartDate, getYear } from '../utils/dateUtils';
import { summerAntallOmsorgsdager } from '../utils/utils';
import ResultBox from './ResultBox';

const bem = bemUtils('omsorgsdagerkalkulator');

const errorkeyToText =
    (intl: IntlShape) =>
    (error: FeiloppsummeringFeil): FeiloppsummeringFeil => ({
        ...error,
        feilmelding: intlHelper(intl, error.feilmelding),
    });

interface Props {
    resultView: ResultView<FeiloppsummeringFeil[], Omsorgsprinsipper>;
    dispatch: React.Dispatch<Action>;
}

const ResultatArea: React.FC<Props> = ({ resultView, dispatch }: Props) => {
    const intl = useIntl();
    return caseResultViewOf(
        () => null,
        () => (
            <Box margin={'xxl'} className={bem.element('flex-center')}>
                <Hovedknapp id={'beregn-knapp'} onClick={() => dispatch(beregn)}>
                    <FormattedMessage id={'oms-calc.resultat-area.beregn-knapp'} />
                </Hovedknapp>
            </Box>
        ),
        (errors: FeiloppsummeringFeil[]) => (
            <FormBlock margin={'xxl'}>
                <Box margin={'xl'} className={bem.element('flex-center')}>
                    <Hovedknapp id={'beregn-knapp'} onClick={() => dispatch(beregn)}>
                        <FormattedMessage id={'oms-calc.resultat-area.beregn-knapp'} />
                    </Hovedknapp>
                </Box>
                <FormBlock>
                    <ValidationSummary title={'Feil i skjema'} errorMessages={errors.map(errorkeyToText(intl))} />
                </FormBlock>
            </FormBlock>
        ),
        () => (
            <ResultBox type={'WARNING'}>
                <p style={{ marginTop: 0 }}>
                    <FormattedMessage id={'oms-calc.resultat-area.orange.1'} />
                </p>
                <p>
                    <Normaltekst className={bem.element('large-normal-tekst')}>
                        0 <FormattedMessage id={'oms-calc.resultat-area.orange.2.1.a'} />{' '}
                    </Normaltekst>
                    <Normaltekst>
                        <FormattedMessage id={'oms-calc.resultat-area.orange.2.1.b'} /> {getStartDate(intl)} {getYear()}{' '}
                        til 31. <FormattedMessage id={'oms-calc.resultat-area.orange.2.3'} /> {getYear()}
                    </Normaltekst>
                </p>
                <p>
                    <FormattedMessage id={'oms-calc.resultat-area.orange.3'} />
                </p>
                <p>
                    <Lenke
                        href={
                            'https://www.nav.no/familie/sykdom-i-familien/nb/omsorgspenger#Hvor-mange-omsorgsdager-har-du'
                        }>
                        <FormattedMessage id={'oms-calc.tilbake-til-omsorgspenger'} />
                    </Lenke>
                </p>
            </ResultBox>
        ),
        (result: Omsorgsprinsipper) => {
            const sumDager: number = summerAntallOmsorgsdager(result);
            return (
                <>
                    <ResultBox type={'SUCCESS'}>
                        <p style={{ marginTop: 0 }}>
                            <FormattedMessage id={'oms-calc.resultat-area.green.1'} />
                        </p>

                        <Normaltekst className={bem.element('large-normal-tekst')}>
                            {sumDager} <FormattedMessage id={'oms-calc.resultat-area.green.2.1.a'} />
                        </Normaltekst>
                        <Normaltekst>
                            <FormattedMessage id={'oms-calc.resultat-area.green.2.1.b'} /> {getStartDate(intl)}{' '}
                            {getYear()} til 31. <FormattedMessage id={'oms-calc.resultat-area.green.2.2'} /> {getYear()}
                        </Normaltekst>

                        <p>
                            <FormattedMessage id={'oms-calc.resultat-area.3.1'} /> {getStartDate(intl)} {getYear()}{' '}
                            <FormattedMessage id={'oms-calc.resultat-area.3.2'} />
                        </p>
                        <p>
                            <Lenke
                                href={
                                    'https://www.nav.no/familie/sykdom-i-familien/nb/omsorgspenger#Hvor-mange-omsorgsdager-har-du'
                                }>
                                <FormattedMessage id={'oms-calc.tilbake-til-omsorgspenger'} />
                            </Lenke>
                        </p>
                    </ResultBox>
                </>
            );
        }
    )(resultView);
};

export default ResultatArea;
