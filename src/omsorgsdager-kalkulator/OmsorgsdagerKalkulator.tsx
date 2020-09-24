import * as React from 'react';
import { useReducer } from 'react';
import { KalkulatorReducer, reducer } from './utils/reducer';
import { createInitialState, State } from './utils/state';
import { BarnInfo } from './utils/types';
import KalkulatorLogoAndTitle from './views/KalkulatorLogoAndTitle';
import ResultatArea from './views/ResultatArea';
import { panelSkalVæreÅpent } from './utils/viewUtils';
import BarnPanelView from './views/BarnPanelView';
import NbarnSelectView from './views/NBarnSelectView';
import IntroTextView from './views/IntroTextView';
import FlereBarnUtfyllingsInfoView from './views/FlereBarnUtfyllingsInfoView';
import BarnFodselsdatoView from './views/BarnFodselsdatoView';
import BarnKroniskSyktView from './views/BarnKroniskSyktView';
import BarnBorSammenView from './views/BarnBorSammenView';
import BarnAleneOmOmsorgenView from './views/BarnAleneOmOmsorgenView';
import MaybeNesteBarnKnapp from './views/MaybeNesteBarnKnapp';
import FormBlock from './components/form-block/FormBlock';
import './OmsorgsdagerKalkulator.less';
import bemUtils from './utils/bemUtils';
import Box from './components/box/Box';

const bem = bemUtils('omsorgsdagerkalkulator');

export interface Props {
    initialBarnListe?: BarnInfo[];
}

const OmsorgsdagerKalkulator = ({ initialBarnListe }: Props) => {
    const [state, dispatch] = useReducer<KalkulatorReducer>(reducer, createInitialState(initialBarnListe || []));
    const { nBarnMaks, barn }: State = state;

    return (
        <Box className={bem.element('wrapper')}>
            <KalkulatorLogoAndTitle />
            <IntroTextView nBarn={state.barn.length} />
            <NbarnSelectView state={state} dispatch={dispatch} nBarnMaks={nBarnMaks} />
            <FlereBarnUtfyllingsInfoView nBarn={state.barn.length} />
            <FormBlock>
                {barn.map((barnInfo: BarnInfo, index: number, listeAvBarn: BarnInfo[]) => {
                    return (
                        <FormBlock key={index}>
                            <BarnPanelView
                                index={index}
                                length={state.barn.length}
                                barnInfo={barnInfo}
                                apen={panelSkalVæreÅpent(barnInfo, state)}>
                                <BarnFodselsdatoView barnInfo={barnInfo} dispatch={dispatch} state={state} />
                                <BarnKroniskSyktView barnInfo={barnInfo} state={state} dispatch={dispatch} />
                                <BarnBorSammenView state={state} dispatch={dispatch} barnInfo={barnInfo} />
                                <BarnAleneOmOmsorgenView state={state} dispatch={dispatch} barnInfo={barnInfo} />
                                <MaybeNesteBarnKnapp
                                    barnInfo={barnInfo}
                                    index={index}
                                    listeAvBarn={listeAvBarn}
                                    dispatch={dispatch}
                                />
                            </BarnPanelView>
                        </FormBlock>
                    );
                })}
            </FormBlock>
            <ResultatArea resultView={state.resultViewData} dispatch={dispatch} />
        </Box>
    );
};

export default OmsorgsdagerKalkulator;
