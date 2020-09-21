import * as React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import FormBlock from "../components/form-block/FormBlock";

const IntroTextView = ({ nBarn }: { nBarn: number }) => (
    <>
        {nBarn === 0 && (
            <FormBlock>
                <Normaltekst>
                    Kalkulatoren beregner hvor mange omsorgsdager du har ut fra svarene du oppgir. Det betyr at riktig
                    resultat er avhengig av at du gir riktige opplysninger. Kalkulatoren er ment som et hjelpeverktøy
                    for deg, det er ikke et vedtak eller en bekreftelse fra NAV.
                </Normaltekst>
            </FormBlock>
        )}
    </>
);

export default IntroTextView;
