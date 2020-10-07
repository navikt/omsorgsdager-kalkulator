import * as React from 'react';
import { Dispatch } from 'react';
import { Action, setNBarn, setNBarnInvalid } from '../utils/actions';
import { Select } from 'nav-frontend-skjema';
import { isNumber } from '../utils/typeguards';
import bemUtils from '../utils/bemUtils';
import FormBlock from '../components/form-block/FormBlock';
import ExpandableInfo from '../components/expandable-content/ExpandableInfo';
import { Element } from 'nav-frontend-typografi';
import { ValueWithId } from '../utils/types';
import { FormattedMessage } from 'react-intl';

const bem = bemUtils('omsorgsdagerkalkulator');

interface Props {
    nBarn: ValueWithId<number>;
    dispatch: Dispatch<Action>;
    nBarnMaks: number;
}

const NbarnSelectView = ({ nBarn, dispatch, nBarnMaks }: Props) => (
    <div className={bem.element('align-content-centre')}>
        <FormBlock paddingBottom={'l'}>
            <Select
                label={
                    <Element>
                        <FormattedMessage id={'oms-calc.n-barn-select-label'} />
                    </Element>
                }
                description={
                    <ExpandableInfo title="Hva menes med egne barn?">
                        <div className={bem.element('text-align-left')}>
                            <FormattedMessage id={'oms-calc.n-barn-select-description'} />
                        </div>
                    </ExpandableInfo>
                }
                id={nBarn.id}
                value={nBarn.value}
                bredde={'xs'}
                feil={undefined}
                autoComplete={'off'}
                onChange={(event) => {
                    const maybeNumber: number = parseInt(event.target.value, 10);
                    if (isNumber(maybeNumber) && maybeNumber > 0) {
                        dispatch(setNBarn(maybeNumber));
                    } else {
                        dispatch(setNBarnInvalid());
                    }
                }}>
                {Array.from({ length: nBarnMaks }, (_, i) => i).map((value: number) => {
                    return (
                        <option id={`n_barn_i_husstanden${value}`} value={value} key={value}>
                            {value}
                        </option>
                    );
                })}
            </Select>
        </FormBlock>
    </div>
);

export default NbarnSelectView;
