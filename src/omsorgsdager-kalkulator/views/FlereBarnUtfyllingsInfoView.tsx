import * as React from 'react';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import FormBlock from '../components/form-block/FormBlock';

const FlereBarnUtfyllingsInfoView = ({ nBarn }: { nBarn: number }) => (
    <>
        {nBarn > 1 && (
            <FormBlock>
                <AlertStripeInfo>Legg inn opplysninger for ett barn om gangen.</AlertStripeInfo>
            </FormBlock>
        )}
    </>
);

export default FlereBarnUtfyllingsInfoView;
