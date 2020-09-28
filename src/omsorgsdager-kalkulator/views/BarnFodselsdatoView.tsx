import { BarnInfo } from '../utils/types';
import * as React from 'react';
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
import FormBlock from '../components/form-block/FormBlock';
import ExpandableInfo from '../components/expandable-content/ExpandableInfo';

interface Props {
    barnInfo: BarnInfo;
    dispatch: Dispatch<Action>;
    state: State;
}

const BarnFodselsdatoView = ({ barnInfo, dispatch, state }: Props) => (
    <>
        <FormBlock margin={'none'}>
            <Element>Når er barnet født?</Element>
            <ExpandableInfo title="Hvorfor spør vi om det?">
                Omsorgsdager gjelder i utgangspunktet ut kalenderåret barnet er 12 år. Hvis barnet ditt er 13 år eller
                eldre har du ikke rett til omsorgsdager for dette barnet med mindre du har søkt om og fått ekstra
                omsorgsdager fordi barnet har en kronisk sykdom eller funksjonshemning.
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
                <AlertStripeAdvarsel>
                    Du har ikke rett på omsorgsdager for barn som er 19 år eller eldre. Omsorgsdager gjelder i
                    utgangspunktet ut kalenderåret barnet er 12 år. I noen tilfeller kan du få omsorgsdager ut
                    kalenderåret barnet er 18 år.
                </AlertStripeAdvarsel>
            </FormBlock>
        )}
    </>
);

export default BarnFodselsdatoView;
