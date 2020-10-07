import { BarnInfo } from '../utils/types';
import { shouldViewAleneOmOmsorgenQuestion, toRadioValue, yesOrNoRadios, YesOrNoToBool } from '../utils/viewUtils';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import { valueToFeilProps } from '../utils/componentUtils';
import { validateAleneOmOmsorgen } from '../utils/validationUtils';
import { isYesOrNo } from '../utils/typeguards';
import { Action, setAleneOmOmsorgen } from '../utils/actions';
import * as React from 'react';
import { Dispatch } from 'react';
import { State } from '../utils/state';
import FormBlock from '../components/form-block/FormBlock';
import ExpandableInfo from '../components/expandable-content/ExpandableInfo';
import Box from '../components/box/Box';
import { FormattedMessage, useIntl } from 'react-intl';
import { intlHelper } from '../i18n/utils';

interface Props {
    state: State;
    dispatch: Dispatch<Action>;
    barnInfo: BarnInfo;
}

const BarnAleneOmOmsorgenView = ({ state, dispatch, barnInfo }: Props) => {
    const intl = useIntl();
    return (
        <>
            {shouldViewAleneOmOmsorgenQuestion(barnInfo) && (
                <FormBlock>
                    <RadioPanelGruppe
                        name={`radio-panel-gruppe-name-${barnInfo.aleneOmOmsorgen.id}`}
                        legend={
                            <Element>
                                <FormattedMessage id={'oms-calc.alene-om-omsorgen.legend'} />
                            </Element>
                        }
                        description={
                            <ExpandableInfo title={intlHelper(intl, 'oms-calc.alene-om-omsorgen.description.title')}>
                                <Box padBottom={'l'}>
                                    <FormattedMessage id={'oms-calc.alene-om-omsorgen.description.content.1'} />
                                </Box>
                                <Box padBottom={'l'}>
                                    <FormattedMessage id={'oms-calc.alene-om-omsorgen.description.content.2'} />
                                </Box>
                                <Box>
                                    <Lenke
                                        href={
                                            'https://www.regjeringen.no/no/tema/familie-og-barn/innsiktsartikler/bosted-og-samvar/samvar/id749587/'
                                        }
                                        target={'_blank'}
                                        rel={'noopener noreferer'}>
                                        <FormattedMessage id={'oms-calc.alene-om-omsorgen.description.content.3'} />
                                    </Lenke>
                                </Box>
                            </ExpandableInfo>
                        }
                        feil={valueToFeilProps(barnInfo.aleneOmOmsorgen, state.resultViewData, validateAleneOmOmsorgen)}
                        onChange={(evt, value) => {
                            if (isYesOrNo(value)) {
                                dispatch(setAleneOmOmsorgen(YesOrNoToBool(value), barnInfo.id));
                            }
                        }}
                        checked={toRadioValue(barnInfo.aleneOmOmsorgen.value)}
                        radios={yesOrNoRadios(barnInfo.aleneOmOmsorgen.id)}
                        className={'twoColumnsPanelGroup'}
                    />
                </FormBlock>
            )}
        </>
    );
};

export default BarnAleneOmOmsorgenView;
