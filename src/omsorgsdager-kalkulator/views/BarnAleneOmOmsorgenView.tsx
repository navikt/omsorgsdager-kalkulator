import * as React from 'react';
import { BarnInfo } from '../utils/types';
import { shouldViewAleneOmOmsorgenQuestion, toRadioValue, yesOrNoRadios, YesOrNoToBool } from '../utils/viewUtils';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import { valueToFeilProps } from '../utils/componentUtils';
import { validateAleneOmOmsorgen } from '../utils/validationUtils';
import { isYesOrNo } from '../utils/typeguards';
import { Action, setAleneOmOmsorgen } from '../utils/actions';
import { Dispatch } from 'react';
import { State } from '../utils/state';
import ExpandableInfo from "../components/expandable-content/ExpandableInfo";
import FormBlock from "../components/form-block/FormBlock";
import Box from "../components/box/Box";

interface Props {
    state: State;
    dispatch: Dispatch<Action>;
    barnInfo: BarnInfo;
}

const BarnAleneOmOmsorgenView = ({ state, dispatch, barnInfo }: Props) => (
    <>
        {shouldViewAleneOmOmsorgenQuestion(barnInfo) && (
            <FormBlock>
                <RadioPanelGruppe
                    name={`radio-panel-gruppe-name-${barnInfo.aleneOmOmsorgen.id}`}
                    legend={
                        <div>
                            <Element>Er du alene om omsorgen med barnet?</Element>
                            <ExpandableInfo title="Hva betyr det å være alene om omsorgen?">
                                <Box>
                                    Når det gjelder omsorgspenger, er du regnet som alene om omsorgen hvis du ikke bor
                                    sammen med den andre forelderen, og barnet bor fast bare hos deg. Dette gjelder også
                                    hvis du får ny samboer eller ektefelle.
                                </Box>
                                <Box padBottom={'l'}>
                                    Hvis du og den andre forelderen har en avtale om delt bosted, hvor barnet bor fast
                                    hos dere begge, vil ingen av dere bli regnet som alene om omsorgen.
                                </Box>
                                <Box>
                                    <Lenke
                                        href={
                                            'https://www.regjeringen.no/no/tema/familie-og-barn/innsiktsartikler/bosted-og-samvar/samvar/id749587/'
                                        }
                                        target={'_blank'}
                                        rel={'noopener noreferer'}>
                                        Les mer om fast bosted og samvær
                                    </Lenke>
                                </Box>
                            </ExpandableInfo>
                        </div>
                    }
                    feil={valueToFeilProps(barnInfo.aleneOmOmsorgen, state.resultViewData, validateAleneOmOmsorgen)}
                    onChange={(evt, value) => {
                        if (isYesOrNo(value)) {
                            dispatch(setAleneOmOmsorgen(YesOrNoToBool(value), barnInfo.id));
                        }
                    }}
                    checked={toRadioValue(barnInfo.aleneOmOmsorgen.value)}
                    radios={yesOrNoRadios(barnInfo.aleneOmOmsorgen.id)}
                    className={'twoColumnPanelGruppe'}
                />
            </FormBlock>
        )}
    </>
);

export default BarnAleneOmOmsorgenView;
