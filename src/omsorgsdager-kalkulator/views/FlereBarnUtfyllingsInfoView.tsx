import * as React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import FormBlock from '../components/form-block/FormBlock';

const FlereBarnUtfyllingsInfoView = ({ nBarn }: { nBarn: number }) => (
    <>
        {nBarn > 1 && (
            <FormBlock>
                <Undertittel tag="h2">Opplysninger om barna</Undertittel>
            </FormBlock>
        )}
        {nBarn === 1 && (
            <FormBlock>
                <Undertittel tag="h2">Opplysninger om barnet</Undertittel>
            </FormBlock>
        )}
    </>
);

export default FlereBarnUtfyllingsInfoView;
