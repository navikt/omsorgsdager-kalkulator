import { BarnInfo } from '../utils/types';
import { State } from '../utils/state';
import * as React from 'react';
import { Dispatch } from 'react';
import { Action, setKroniskSykt } from '../utils/actions';
import { shouldViewKroniskSyktQuestion, toRadioValue, yesOrNoRadios, YesOrNoToBool } from '../utils/viewUtils';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';
import { valueToFeilProps } from '../utils/componentUtils';
import { validateKroniskSykt } from '../utils/validationUtils';
import { isYesOrNo } from '../utils/typeguards';
import { barnetErForbiDetTolvteKalenderårOgIkkeKroniskSykt } from '../utils/utils';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import FormBlock from '../components/form-block/FormBlock';
import ExpandableInfo from '../components/expandable-content/ExpandableInfo';
import { FormattedMessage, useIntl } from 'react-intl';
import { intlHelper } from '../i18n/utils';

interface Props {
    barnInfo: BarnInfo;
    state: State;
    dispatch: Dispatch<Action>;
}

const BarnKroniskSyktView = ({ dispatch, barnInfo, state }: Props) => {
    const intl = useIntl();
    return (
        <>
            {shouldViewKroniskSyktQuestion(barnInfo) && (
                <FormBlock>
                    <RadioPanelGruppe
                        name={`radio-panel-gruppe-name-${barnInfo.kroniskSykt.id}`}
                        legend={
                            <Element>
                                <FormattedMessage id={'oms-calc.kronisk-sykt.legend'} />
                            </Element>
                        }
                        description={
                            <ExpandableInfo title={intlHelper(intl, 'oms-calc.kronisk-sykt.description.title')}>
                                <FormattedMessage id={'oms-calc.kronisk-sykt.description.content'} />
                            </ExpandableInfo>
                        }
                        feil={valueToFeilProps(barnInfo.kroniskSykt, state.resultViewData, validateKroniskSykt)}
                        onChange={(evt, value) => {
                            if (isYesOrNo(value)) {
                                dispatch(setKroniskSykt(YesOrNoToBool(value), barnInfo.id));
                            }
                        }}
                        checked={toRadioValue(barnInfo.kroniskSykt.value)}
                        radios={yesOrNoRadios(barnInfo.kroniskSykt.id)}
                        className={'twoColumnsPanelGroup'}
                    />
                </FormBlock>
            )}

            {barnetErForbiDetTolvteKalenderårOgIkkeKroniskSykt(barnInfo) && (
                <FormBlock>
                    <AlertStripeAdvarsel>
                        <FormattedMessage id={'oms-calc.kronisk-sykt.advarsel'} />
                    </AlertStripeAdvarsel>
                </FormBlock>
            )}
        </>
    );
};

export default BarnKroniskSyktView;
