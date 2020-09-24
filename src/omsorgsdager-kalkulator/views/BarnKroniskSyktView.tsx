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
import { barnetErOverTolvOgIkkeKroniskSykt } from '../utils/utils';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import FormBlock from '../components/form-block/FormBlock';
import ExpandableInfo from '../components/expandable-content/ExpandableInfo';

interface Props {
    barnInfo: BarnInfo;
    state: State;
    dispatch: Dispatch<Action>;
}

const BarnKroniskSyktView = ({ dispatch, barnInfo, state }: Props) => (
    <>
        {shouldViewKroniskSyktQuestion(barnInfo) && (
            <FormBlock>
                <RadioPanelGruppe
                    name={`radio-panel-gruppe-name-${barnInfo.kroniskSykt.id}`}
                    legend={
                        <Element>
                            Har du fått ekstra omsorgsdager fordi barnet har en kronisk sykdom eller en
                            funksjonshemning?
                        </Element>
                    }
                    description={
                        <ExpandableInfo title="Hva betyr dette?">
                            Hvis barnet har en kronisk sykdom eller en funksjonshemning kan du ha rett på ekstra
                            omsorgsdager. Du kan svare ja på dette spørsmålet dersom du har søkt og fått svar fra NAV om
                            at du har fått ekstra omsorgsdager.
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

        {barnetErOverTolvOgIkkeKroniskSykt(barnInfo) && (
            <FormBlock>
                <AlertStripeAdvarsel>
                    For å få omsorgsdager for barn som er 13 år eller eldre, må du ha søkt og fått innvilget ekstra
                    omsorgsdager fra NAV fordi barnet har en kronisk sykdom eller en funksjonshemning.
                </AlertStripeAdvarsel>
            </FormBlock>
        )}
    </>
);

export default BarnKroniskSyktView;
