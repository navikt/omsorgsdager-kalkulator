import * as React from 'react';
import { useReducer } from 'react';
import { KalkulatorReducer, reducer } from './utils/reducer';
import { createInitialState, State } from './utils/state';
import { BarnInfo } from './utils/types';
import KalkulatorLogoAndTitle from './views/KalkulatorLogoAndTitle';
import ResultatArea from './views/ResultatArea';
import BarnPanelView from './views/BarnPanelView';
import NbarnSelectView from './views/NBarnSelectView';
import IntroTextView from './views/IntroTextView';
import FlereBarnUtfyllingsInfoView from './views/FlereBarnUtfyllingsInfoView';
import BarnÅrFødtView from './views/BarnÅrFødtView';
import BarnKroniskSyktView from './views/BarnKroniskSyktView';
import BarnBorSammenView from './views/BarnBorSammenView';
import BarnAleneOmOmsorgenView from './views/BarnAleneOmOmsorgenView';
import MaybeNesteBarnKnapp from './views/MaybeNesteBarnKnapp';
import FormBlock from './components/form-block/FormBlock';
import bemUtils from './utils/bemUtils';
import Box from './components/box/Box';
import './OmsorgsdagerKalkulator.less';
import { setPanelErÅpent } from './utils/actions';

const bem = bemUtils('omsorgsdagerkalkulator');

export interface Props {
    initialBarnListe?: BarnInfo[];
    includeHeader?: boolean;
}

const OmsorgsdagerKalkulator = ({ initialBarnListe, includeHeader = true }: Props) => {
    const [state, dispatch] = useReducer<KalkulatorReducer>(reducer, createInitialState(initialBarnListe || []));
    const { nBarnMaks, barn }: State = state;

    return (
        <Box className={bem.element('wrapper')}>
            {includeHeader && <KalkulatorLogoAndTitle />}
            <IntroTextView nBarn={state.barn.length} />
            <NbarnSelectView state={state} dispatch={dispatch} nBarnMaks={nBarnMaks} />
            <FlereBarnUtfyllingsInfoView nBarn={state.barn.length} />
            <FormBlock>
                {barn.map((barnInfo: BarnInfo, index: number, listeAvBarn: BarnInfo[]) => {
                    return (
                        <FormBlock key={index}>
                            <BarnPanelView
                                id={barnInfo.id}
                                index={index}
                                length={state.barn.length}
                                barnInfo={barnInfo}
                                apen={barnInfo.panelErÅpent}
                                onClick={() => {
                                    dispatch(setPanelErÅpent(barnInfo.id, !barnInfo.panelErÅpent));
                                }}>
                                <BarnÅrFødtView barnInfo={barnInfo} dispatch={dispatch} state={state} />
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
