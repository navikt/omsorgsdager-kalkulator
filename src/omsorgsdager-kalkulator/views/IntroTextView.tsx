import * as React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import FormBlock from '../components/form-block/FormBlock';
import { FormattedMessage } from 'react-intl';

const IntroTextView = ({ nBarn }: { nBarn: number }) => (
    <>
        {nBarn === 0 && (
            <FormBlock>
                <Normaltekst tag="div">
                    <p>
                        <FormattedMessage id={'oms-calc.intro-tekst.1'} />
                    </p>
                    <p>
                        <FormattedMessage id={'oms-calc.intro-tekst.2'} />
                    </p>
                </Normaltekst>
            </FormBlock>
        )}
    </>
);

export default IntroTextView;
