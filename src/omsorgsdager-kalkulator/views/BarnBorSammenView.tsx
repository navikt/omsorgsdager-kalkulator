import { BarnInfo } from '../utils/types';
import { State } from '../utils/state';
import * as React from 'react';
import { Dispatch } from 'react';
import { Action, setBorSammen } from '../utils/actions';
import { shouldViewBorSammenQuestion, toRadioValue, yesOrNoRadios, YesOrNoToBool } from '../utils/viewUtils';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';
import { valueToFeilProps } from '../utils/componentUtils';
import { validateBorSammen } from '../utils/validationUtils';
import { isYesOrNo } from '../utils/typeguards';
import { isVisibleAndBorIkkeSammen } from '../utils/utils';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import ExpandableInfo from '../components/expandable-content/ExpandableInfo';
import FormBlock from '../components/form-block/FormBlock';
import { FormattedMessage, useIntl } from 'react-intl';
import { intlHelper } from '../i18n/utils';

interface Props {
    state: State;
    dispatch: Dispatch<Action>;
    barnInfo: BarnInfo;
}

const BarnBorSammenView = ({ state, dispatch, barnInfo }: Props) => {
    const intl = useIntl();
    return (
        <>
            {shouldViewBorSammenQuestion(barnInfo) && (
                <FormBlock>
                    <RadioPanelGruppe
                        name={`radio-panel-gruppe-name-${barnInfo.borSammen.id}`}
                        legend={
                            <Element>
                                <FormattedMessage id={'oms-calc.bor-sammen.legend'} />
                            </Element>
                        }
                        description={
                            <ExpandableInfo title={intlHelper(intl, 'oms-calc.bor-sammen.description.title')}>
                                <FormattedMessage id={'oms-calc.bor-sammen.description.content'} />
                            </ExpandableInfo>
                        }
                        feil={valueToFeilProps(barnInfo.borSammen, state.resultViewData, validateBorSammen)}
                        onChange={(evt, value) => {
                            if (isYesOrNo(value)) {
                                dispatch(setBorSammen(YesOrNoToBool(value), barnInfo.id));
                            }
                        }}
                        checked={toRadioValue(barnInfo.borSammen.value)}
                        radios={yesOrNoRadios(barnInfo.borSammen.id)}
                        className={'twoColumnsPanelGroup'}
                    />
                </FormBlock>
            )}

            {isVisibleAndBorIkkeSammen(barnInfo) && (
                <FormBlock>
                    <AlertStripeAdvarsel>
                        {state.barn.length === 1
                            ? intlHelper(intl, 'oms-calc.bor-sammen.advarsel.ett-barn')
                            : intlHelper(intl, 'oms-calc.bor-sammen.advarsel.flere-barn')}
                    </AlertStripeAdvarsel>
                </FormBlock>
            )}
        </>
    );
};

export default BarnBorSammenView;
