import React, { useEffect, useRef } from 'react';
import { Feiloppsummering, FeiloppsummeringFeil } from 'nav-frontend-skjema';
import ValidationErrorLink from './ValidationErrorLink';

interface Props {
    title?: string;
    errorMessages: FeiloppsummeringFeil[];
    focusOnMount?: boolean;
}

const ValidationSummary = ({ title, errorMessages }: Props) => {
    const summaryEl = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const { current } = summaryEl;
        if (current !== null) {
            current.focus();
        }
    }, []);
    return (
        <Feiloppsummering
            innerRef={summaryEl}
            tittel={title || 'Feil i skjema'}
            feil={errorMessages}
            customFeilRender={(feil) => (
                <ValidationErrorLink
                    className={'lenke'}
                    onClick={() => {
                        const elementById = document.getElementById(feil.skjemaelementId);
                        const elementByName = document.getElementsByName(feil.skjemaelementId)[0];
                        if (elementById) {
                            elementById.focus();
                        } else if (elementByName) {
                            elementByName.focus();
                        }
                    }}>
                    {feil.feilmelding}
                </ValidationErrorLink>
            )}
        />
    );
};
export default ValidationSummary;
