import * as React from 'react';
import { BarnInfo } from '../utils/types';
import { Dispatch } from 'react';
import { Action, fjernFodselsdatoForBarnInfo, setFodselsdatoForBarnInfo } from '../utils/actions';
import { State } from '../utils/state';
import { Element } from 'nav-frontend-typografi';
import { Datovelger } from 'nav-datovelger';
import { toFodselsdatoOrUndefined } from '../utils/viewUtils';
import { isISODateString } from 'nav-datovelger/lib/types/typeGuards';
import { isNone } from 'fp-ts/lib/Option';
import { isBeregnButtonAndErrorSummary } from '../types/ResultView';
import { barnetErOverAtten } from '../utils/utils';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import FormBlock from "../components/form-block/FormBlock";
import ExpandableInfo from "../components/expandable-content/ExpandableInfo";

interface Props {
    barnInfo: BarnInfo;
    dispatch: Dispatch<Action>;
    state: State;
}

const BarnFodselsdatoView = ({ barnInfo, dispatch, state }: Props) => (
    <>
        <FormBlock>
            <Element>Når er barnet født?</Element>
            <ExpandableInfo title="Hvorfor spør vi om det?">
                Omsorgsdager gjelder i utgangspunktet ut kalenderåret barnet er 12 år. Hvis barnet ditt er 13 år eller
                eldre må du ha søkt og fått vedtak fra NAV om at du får omsorgsdager fordi barnet har en kronisk sykdom
                eller en funksjonshemning.
            </ExpandableInfo>
            <Datovelger
                id={barnInfo.fodselsdato.id}
                valgtDato={toFodselsdatoOrUndefined(barnInfo.fodselsdato.value)}
                onChange={(maybeISODateString: string | undefined) => {
                    if (isISODateString(maybeISODateString)) {
                        dispatch(setFodselsdatoForBarnInfo(maybeISODateString, barnInfo.id));
                    } else {
                        dispatch(fjernFodselsdatoForBarnInfo(barnInfo.id));
                    }
                }}
                kanVelgeUgyldigDato={true}
                datoErGyldig={
                    !(isNone(barnInfo.fodselsdato.value) && isBeregnButtonAndErrorSummary(state.resultViewData))
                }
                visÅrVelger={true}
                input={{
                    placeholder: 'dd.mm.åååå',
                }}
            />
        </FormBlock>
        {barnetErOverAtten(barnInfo) && (
            <FormBlock>
                <AlertStripeAdvarsel>Du kan kun ha omsorgsdager ut kalenderåret barnet er 18 år.</AlertStripeAdvarsel>
            </FormBlock>
        )}
    </>
);

export default BarnFodselsdatoView;
