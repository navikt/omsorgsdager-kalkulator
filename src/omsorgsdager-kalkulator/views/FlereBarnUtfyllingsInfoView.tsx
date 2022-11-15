import * as React from 'react';
import { Systemtittel } from 'nav-frontend-typografi';
import FormBlock from '../components/form-block/FormBlock';
import { FormattedMessage } from 'react-intl';

const FlereBarnUtfyllingsInfoView = ({ nBarn }: { nBarn: number }) => (
    <>
        {nBarn > 1 && (
            <FormBlock>
                <Systemtittel tag="h2">
                    <FormattedMessage id="oms-calc.barnSection.flereBarn.tittel" />
                </Systemtittel>
            </FormBlock>
        )}
        {nBarn === 1 && (
            <FormBlock>
                <Systemtittel tag="h2">
                    <FormattedMessage id="oms-calc.barnSection.ettBarn.tittel" />
                </Systemtittel>
            </FormBlock>
        )}
    </>
);

export default FlereBarnUtfyllingsInfoView;
