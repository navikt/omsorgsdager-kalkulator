import * as React from 'react';
import SvgCalculatorLogo from '../svgs/SvgCalculatorLogo';
import { Sidetittel } from 'nav-frontend-typografi';
import SvgHeaderUnderline from '../svgs/SvgHeaderUnderline';
import bemUtils from '../utils/bemUtils';
import FormBlock from '../components/form-block/FormBlock';

const bem = bemUtils('omsorgsdagerkalkulator');

const KalkulatorLogoAndTitle = () => {
    return (
        <div className={bem.element('align-content-centre')}>
            <SvgCalculatorLogo />
            <FormBlock paddingBottom={'l'}>
                <Sidetittel>Omsorgsdager kalkulator</Sidetittel>
                <SvgHeaderUnderline />
            </FormBlock>
        </div>
    );
};

export default KalkulatorLogoAndTitle;
