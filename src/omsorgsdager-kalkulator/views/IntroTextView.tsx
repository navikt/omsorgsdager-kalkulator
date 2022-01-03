import * as React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import FormBlock from '../components/form-block/FormBlock';
import { FormattedMessage } from 'react-intl';

const IntroTextView = ({ nBarn }: { nBarn: number }) => (
    <>
        {nBarn === 0 && (
            <FormBlock>
                <Normaltekst>
                    <p>
                        <FormattedMessage id={'oms-calc.intro-2022-tekst'} />
                    </p>
                    <p>
                        <FormattedMessage id={'oms-calc.intro-tekst'} />
                    </p>
                </Normaltekst>
            </FormBlock>
        )}
    </>
);

export default IntroTextView;
