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

const bem = bemUtils('omsorgsdagerkalkulator');

interface Props {
    resultView: ResultView<FeiloppsummeringFeil[], Omsorgsprinsipper>;
    dispatch: Dispatch<Action>;
}

const ResultatArea: React.FC<Props> = ({ resultView, dispatch }: Props) =>
    caseResultViewOf(
        () => null,
        () => (
            <Box margin={'xxl'} className={bem.element('flex-center')}>
                <Hovedknapp id={'beregn-knapp'} onClick={() => dispatch(beregn)}>
                    Beregn
                </Hovedknapp>
            </Box>
        ),
        (errors: FeiloppsummeringFeil[]) => (
            <FormBlock margin={'xxl'}>
                <Box margin={'xl'} className={bem.element('flex-center')}>
                    <Hovedknapp id={'beregn-knapp'} onClick={() => dispatch(beregn)}>
                        Beregn
                    </Hovedknapp>
                </Box>
                <FormBlock>
                    <ValidationSummary title={'Feil i skjema'} errorMessages={errors} />
                </FormBlock>
            </FormBlock>
        ),
        () => (
            <ResultBox type={'WARNING'}>
                <FormBlock margin={'none'}>
                    Beregningen baserer seg på svarene du har lagt inn i kalkulatoren. Det betyr at resultatet er
                    avhengig av at du har gitt riktige opplysninger. Ut fra opplysningene du har gitt, har du
                </FormBlock>
                <FormBlock>
                    <Normaltekst className={bem.element('large-normal-tekst')}>
                        0 omsorgsdager fra {getStartDate()} {getYear()} – 31. desember {getYear()}
                    </Normaltekst>
                </FormBlock>
                <FormBlock>Opplysningene du har gitt om din situasjon gir ikke rett til omsorgsdager.</FormBlock>
            </ResultBox>
        ),
        (result: Omsorgsprinsipper) => {
            const { grunnrett, kroniskSykt, aleneomsorg, aleneomsorgKroniskSyke } = result;
            const sumDager: number =
                grunnrett.normaldager +
                kroniskSykt.normaldager +
                aleneomsorg.normaldager +
                aleneomsorgKroniskSyke.normaldager;

            return (
                <ResultBox type={'SUCCESS'}>
                    <FormBlock margin={'none'}>
                        Beregningen baserer seg på svarene du har lagt inn i kalkulatoren. Det betyr at resultatet er
                        avhengig av at du har gitt riktige opplysninger. Ut fra opplysningene du har gitt, har du
                    </FormBlock>
                    <FormBlock>
                        <Normaltekst className={bem.element('large-normal-tekst')}>
                            {sumDager} omsorgsdager fra {getStartDate()} 2020 – 31. desember {getYear()}
                        </Normaltekst>
                    </FormBlock>
                    <FormBlock>
                        Hvis du etter {getStartDate()} {getYear()} har brukt omsorgsdager, eller delt dager med en
                        annen, må du trekke fra disse dagene selv.
                    </FormBlock>
                </ResultBox>
            );
        }
    )(resultView);

export default ResultatArea;
