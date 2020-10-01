import { BarnInfo } from '../utils/types';
import * as React from 'react';
import { Dispatch } from 'react';
import { Action, setÅrFødtForBarnInfo } from '../utils/actions';
import { State } from '../utils/state';
import { Element } from 'nav-frontend-typografi';
import { isSome, none, some } from 'fp-ts/lib/Option';
import { barnetErForbiDetAttendeKalenderår } from '../utils/utils';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import FormBlock from '../components/form-block/FormBlock';
import ExpandableInfo from '../components/expandable-content/ExpandableInfo';
import { isNumber } from '../utils/typeguards';
import { Select } from 'nav-frontend-skjema';
import { valueToFeilProps } from '../utils/componentUtils';
import { validateÅrFødt } from '../utils/validationUtils';
import moment from 'moment';

interface Props {
    barnInfo: BarnInfo;
    dispatch: Dispatch<Action>;
    state: State;
}

const BarnÅrFødtView = ({ barnInfo, dispatch, state }: Props) => (
    <>
        <FormBlock margin={'none'}>
            <Select
                label={<Element>Hvilket årstall er barnet født?</Element>}
                description={
                    <ExpandableInfo title="Hvorfor spør vi om det?">
                        Omsorgsdager gjelder i utgangspunktet ut kalenderåret barnet er 12 år. Hvis barnet ditt er 13 år
                        eller eldre har du ikke rett til omsorgsdager for dette barnet med mindre du har søkt om og fått
                        ekstra omsorgsdager fordi barnet har en kronisk sykdom eller funksjonshemning.
                    </ExpandableInfo>
                }
                id={barnInfo.årFødt.id}
                value={isSome(barnInfo.årFødt.value) ? barnInfo.årFødt.value.value : undefined}
                bredde={'xs'}
                feil={valueToFeilProps(barnInfo.årFødt, state.resultViewData, validateÅrFødt)}
                autoComplete={'off'}
                onChange={(event) => {
                    const maybeNumber: number = parseInt(event.target.value, 10);
                    if (isNumber(maybeNumber)) {
                        dispatch(setÅrFødtForBarnInfo(some(maybeNumber), barnInfo.id));
                    } else {
                        dispatch(setÅrFødtForBarnInfo(none, barnInfo.id));
                    }
                }}>
                {[
                    <option id={`aar-fodt-ikke-valgt`} value={undefined} key={0}>
                        {' '}
                    </option>,
                    ...Array.from({ length: 21 }, (_, i) => i).map((value: number) => {
                        const currentYear = moment().year();
                        const year = currentYear - value;
                        return (
                            <option id={`aar-fodt-${year}`} value={year} key={year}>
                                {year}
                            </option>
                        );
                    }),
                ]}
            </Select>
        </FormBlock>
        {barnetErForbiDetAttendeKalenderår(barnInfo) && (
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

export default BarnÅrFødtView;
