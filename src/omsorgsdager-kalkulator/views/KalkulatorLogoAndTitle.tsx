import * as React from 'react';
import SvgCalculatorLogo from '../svgs/SvgCalculatorLogo';
import { Sidetittel } from 'nav-frontend-typografi';
import SvgHeaderUnderline from '../svgs/SvgHeaderUnderline';
import bemUtils from '../utils/bemUtils';
import FormBlock from '../components/form-block/FormBlock';
import { FormattedMessage } from 'react-intl';

const bem = bemUtils('omsorgsdagerkalkulator');

const KalkulatorLogoAndTitle = () => {
    return (
        <div className={bem.element('align-content-centre')}>
            <SvgCalculatorLogo />
            <FormBlock paddingBottom={'l'}>
                <Sidetittel>
                    <FormattedMessage id={'oms-calc.tittel'} />
                </Sidetittel>
                <div role="presentation" aria-hidden={true}>
                    <SvgHeaderUnderline />
                </div>
            </FormBlock>
        </div>
    );
};

export default KalkulatorLogoAndTitle;
