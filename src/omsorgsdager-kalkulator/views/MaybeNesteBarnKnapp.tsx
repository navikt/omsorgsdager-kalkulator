import * as React from 'react';
import { Dispatch } from 'react';
import { BarnInfo } from '../utils/types';
import { skalViseGåTilNesteBarnKnapp } from '../utils/viewUtils';
import { Knapp } from 'nav-frontend-knapper';
import {Action, setPanelErÅpentOgGiFokus, setPanelErÅpent} from '../utils/actions';
import Box from '../components/box/Box';
import bemUtils from '../utils/bemUtils';

const bem = bemUtils('omsorgsdagerkalkulator');

interface Props {
    barnInfo: BarnInfo;
    index: number;
    listeAvBarn: BarnInfo[];
    dispatch: Dispatch<Action>;
}

const MaybeNesteBarnKnapp = ({ dispatch, index, listeAvBarn, barnInfo }: Props) => (
    <>
        {skalViseGåTilNesteBarnKnapp(barnInfo, index, listeAvBarn.length) && (
            <Box margin={'xl'} className={bem.element('flex-left')}>
                <Knapp
                    onClick={() => {
                        const maybeNesteBarnInfo: BarnInfo | undefined = listeAvBarn[index + 1];
                        if (maybeNesteBarnInfo) {
                            dispatch(setPanelErÅpent(barnInfo.id, false))
                            dispatch(setPanelErÅpentOgGiFokus(maybeNesteBarnInfo.id))
                        }
                    }}>
                    Neste barn
                </Knapp>
            </Box>
        )}
    </>
);

export default MaybeNesteBarnKnapp;
