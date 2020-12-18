import * as React from 'react';
import { Dispatch } from 'react';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import ResultBox from './ResultBox';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Action, beregn } from '../utils/actions';
import { caseResultViewOf, ResultView } from '../types/ResultView';
import { Normaltekst } from 'nav-frontend-typografi';
import Omsorgsprinsipper from '@navikt/kalkuler-omsorgsdager/lib/types/Omsorgsprinsipper';
import bemUtils from '../utils/bemUtils';
import FormBlock from '../components/form-block/FormBlock';
import { getStartDate, getYear } from '../utils/dateUtils';
import Box from '../components/box/Box';
import ValidationSummary from '../components/validation-summary/ValidationSummary';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import Lenke from 'nav-frontend-lenker';
import { intlHelper } from '../i18n/utils';
import { summerAntallOmsorgsdager } from '../utils/utils';

const bem = bemUtils('omsorgsdagerkalkulator');

const errorkeyToText = (intl: IntlShape) => (error: FeiloppsummeringFeil): FeiloppsummeringFeil => ({
    ...error,
    feilmelding: intlHelper(intl, error.feilmelding),
});

interface Props {
    resultView: ResultView<FeiloppsummeringFeil[], Omsorgsprinsipper>;
    dispatch: Dispatch<Action>;
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
                <FormBlock margin={'none'}>
                    <FormattedMessage id={'oms-calc.resultat-area.orange.1'} />
                </FormBlock>
                <FormBlock>
                    <Normaltekst className={bem.element('large-normal-tekst')}>
                        0 <FormattedMessage id={'oms-calc.resultat-area.orange.2.1.a'} />{' '}
                    </Normaltekst>
                    <Normaltekst>
                        <FormattedMessage id={'oms-calc.resultat-area.orange.2.1.b'} /> {getStartDate(intl)} {getYear()}{' '}
                        – 31. <FormattedMessage id={'oms-calc.resultat-area.orange.2.3'} /> {getYear()}
                    </Normaltekst>
                </FormBlock>
                <FormBlock>
                    <FormattedMessage id={'oms-calc.resultat-area.orange.3'} />
                </FormBlock>
                <FormBlock>
                    <Lenke
                        href={
                            'https://www.nav.no/familie/sykdom-i-familien/nb/omsorgspenger#Hvor-mange-omsorgsdager-har-du'
                        }>
                        <FormattedMessage id={'oms-calc.tilbake-til-omsorgspenger'} />
                    </Lenke>
                </FormBlock>
            </ResultBox>
        ),
        (result: Omsorgsprinsipper) => {
            const sumDager: number = summerAntallOmsorgsdager(result);
            return (
                <ResultBox type={'SUCCESS'}>
                    <FormBlock margin={'none'}>
                        <FormattedMessage id={'oms-calc.resultat-area.green.1'} />
                    </FormBlock>
                    <FormBlock>
                        <Normaltekst className={bem.element('large-normal-tekst')}>
                            {sumDager} <FormattedMessage id={'oms-calc.resultat-area.green.2.1.a'} />
                        </Normaltekst>
                        <Normaltekst>
                            <FormattedMessage id={'oms-calc.resultat-area.green.2.1.b'} /> {getStartDate(intl)}{' '}
                            {getYear()} – 31. <FormattedMessage id={'oms-calc.resultat-area.green.2.2'} /> {getYear()}
                        </Normaltekst>
                    </FormBlock>
                    <FormBlock>
                        <FormattedMessage id={'oms-calc.resultat-area.3.1'} /> {getStartDate(intl)} {getYear()}{' '}
                        <FormattedMessage id={'oms-calc.resultat-area.3.2'} />
                    </FormBlock>
                    <FormBlock>
                        <Lenke
                            href={
                                'https://www.nav.no/familie/sykdom-i-familien/nb/omsorgspenger#Hvor-mange-omsorgsdager-har-du'
                            }>
                            <FormattedMessage id={'oms-calc.tilbake-til-omsorgspenger'} />
                        </Lenke>
                    </FormBlock>
                </ResultBox>
            );
        }
    )(resultView);
};

export default ResultatArea;
