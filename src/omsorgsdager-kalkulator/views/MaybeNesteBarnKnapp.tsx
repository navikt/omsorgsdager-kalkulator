import * as React from 'react';
import { BarnInfo } from '../utils/types';
import { skalViseGåTilNesteBarnKnapp } from '../utils/viewUtils';
import { Knapp } from 'nav-frontend-knapper';
import { Action, setAktivtBarnPanel } from '../utils/actions';
import { Dispatch } from 'react';
import FormBlock from "../components/form-block/FormBlock";

interface Props {
    barnInfo: BarnInfo;
    index: number;
    listeAvBarn: BarnInfo[];
    dispatch: Dispatch<Action>;
}

const MaybeNesteBarnKnapp = ({ dispatch, index, listeAvBarn, barnInfo }: Props) => (
    <>
        {skalViseGåTilNesteBarnKnapp(barnInfo, index, listeAvBarn.length) && (
            <FormBlock>
                <Knapp
                    onClick={() => {
                        const maybeNesteBarnInfo: BarnInfo | undefined = listeAvBarn[index + 1];
                        if (maybeNesteBarnInfo) {
                            dispatch(setAktivtBarnPanel(maybeNesteBarnInfo.id));
                        }
                    }}>
                    Neste barn
                </Knapp>
            </FormBlock>
        )}
    </>
);

export default MaybeNesteBarnKnapp;