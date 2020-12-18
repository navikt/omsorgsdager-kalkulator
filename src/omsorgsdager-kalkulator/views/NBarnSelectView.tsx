import React, { Dispatch } from 'react';
import { FormattedMessage } from 'react-intl';
import { Select } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';
import ExpandableInfo from '../components/expandable-content/ExpandableInfo';
import FormBlock from '../components/form-block/FormBlock';
import { Action, setNBarn, setNBarnInvalid } from '../utils/actions';
import bemUtils from '../utils/bemUtils';
import { isNumber } from '../utils/typeguards';
import { ValueWithId } from '../utils/types';

const bem = bemUtils('omsorgsdagerkalkulator');

interface Props {
    nBarn: ValueWithId<number>;
    dispatch: Dispatch<Action>;
    nBarnMaks: number;
}

const NbarnSelectView = ({ nBarn, dispatch, nBarnMaks }: Props) => {
    const [antall, setAntall] = React.useState<string>('');
    const [feil, setFeil] = React.useState<string | undefined>();

    React.useEffect(() => {
        setAntall(`${nBarn.value}`);
    }, [nBarn]);

    const velgBarn = (antall: string) => {
        const maybeNumber: number = parseInt(antall, 10);
        if (isNumber(maybeNumber) && maybeNumber > 0) {
            setFeil(undefined);
            dispatch(setNBarn(maybeNumber));
        } else {
            setFeil('Du må velge antall barn');
            dispatch(setNBarnInvalid());
        }
    };

    return (
        <div className={bem.element('align-content-centre')}>
            <FormBlock>
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
                    value={antall}
                    bredde={'xs'}
                    feil={feil}
                    autoComplete={'off'}
                    onChange={(event) => {
                        velgBarn(event.target.value);
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
};
export default NbarnSelectView;
