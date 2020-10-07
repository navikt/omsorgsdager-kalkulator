import * as React from 'react';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import FormBlock from '../components/form-block/FormBlock';
import { FormattedMessage } from 'react-intl';

const FlereBarnUtfyllingsInfoView = ({ nBarn }: { nBarn: number }) => (
    <>
        {nBarn > 1 && (
            <FormBlock>
                <AlertStripeInfo>
                    <FormattedMessage id={'oms-calc.info-flere-barn'} />
                </AlertStripeInfo>
            </FormBlock>
        )}
    </>
);

export default FlereBarnUtfyllingsInfoView;
