import { BarnInfo } from '../utils/types';
import * as React from 'react';
import { Dispatch } from 'react';
import { Action, setÅrFødtForBarnInfo } from '../utils/actions';
import { State } from '../utils/state';
import { Element } from 'nav-frontend-typografi';
import { isSome, none, some } from 'fp-ts/lib/Option';
import { barnetErForbiDetAttendeKalenderår, getBarnNavn } from '../utils/utils';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import FormBlock from '../components/form-block/FormBlock';
import ExpandableInfo from '../components/expandable-content/ExpandableInfo';
import { isNumber } from '../utils/typeguards';
import { Select } from 'nav-frontend-skjema';
import { valueToFeilProps } from '../utils/componentUtils';
import { validateÅrFødt } from '../utils/validationUtils';
import { FormattedMessage, useIntl } from 'react-intl';
import { intlHelper } from '../i18n/utils';
import { getYear } from '../utils/dateUtils';

interface Props {
    barnInfo: BarnInfo;
    dispatch: Dispatch<Action>;
    state: State;
}

const BarnÅrFødtView = ({ barnInfo, dispatch, state }: Props) => {
    const intl = useIntl();
    return (
        <>
            <FormBlock margin={'none'}>
                <Select
                    label={
                        <Element>
                            <FormattedMessage id={'oms-calc.aar-fodt.label'} />
                        </Element>
                    }
                    description={
                        <ExpandableInfo title={intlHelper(intl, 'oms-calc.aar-fodt.description.title')}>
                            <FormattedMessage id={'oms-calc.aar-fodt.description.content'} />
                        </ExpandableInfo>
                    }
                    id={barnInfo.årFødt.id}
                    value={isSome(barnInfo.årFødt.value) ? barnInfo.årFødt.value.value : undefined}
                    bredde={'xs'}
                    feil={valueToFeilProps(
                        barnInfo.årFødt,
                        state.resultViewData,
                        (value) => validateÅrFødt(value, barnInfo.index, state.nBarn.value),
                        intl,
                        { barn: getBarnNavn(intl, barnInfo.index, state.nBarn.value) }
                    )}
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
                        <option id={`${barnInfo.index}.aar-fodt-ikke-valgt`} value={undefined} key={0}>
                            {' '}
                        </option>,
                        ...Array.from({ length: 21 }, (_, i) => i).map((value: number) => {
                            const currentYear = getYear();
                            const year = currentYear - value;
                            return (
                                <option value={year} key={year}>
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
                        <FormattedMessage id={'oms-calc.aar-fodt.advarsel'} />
                    </AlertStripeAdvarsel>
                </FormBlock>
            )}
        </>
    );
};

export default BarnÅrFødtView;
