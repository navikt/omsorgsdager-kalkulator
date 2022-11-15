import * as React from 'react';
import { Systemtittel } from 'nav-frontend-typografi';
import FormBlock from '../components/form-block/FormBlock';

const FlereBarnUtfyllingsInfoView = ({ nBarn }: { nBarn: number }) => (
    <>
        {nBarn > 1 && (
            <FormBlock>
                <Systemtittel tag="h2">Opplysninger om barna</Systemtittel>
            </FormBlock>
        )}
        {nBarn === 1 && (
            <FormBlock>
                <Systemtittel tag="h2">Opplysninger om barnet</Systemtittel>
            </FormBlock>
        )}
    </>
);

export default FlereBarnUtfyllingsInfoView;
