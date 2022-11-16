import React, { useReducer } from 'react';
import { useIntl } from 'react-intl';
import Box from './components/box/Box';
import DocumentTitle from './components/document-title/DocumentTitle';
import { intlHelper } from './i18n/utils';
import { setPanelErÅpent } from './utils/actions';
import bemUtils from './utils/bemUtils';
import { KalkulatorReducer, reducer } from './utils/reducer';
import { createInitialState, State } from './utils/state';
import { BarnInfo, BarnInput } from './utils/types';
import { maybeBarnInputListToBarnInfoList } from './utils/utils';
import BarnAleneOmOmsorgenView from './views/BarnAleneOmOmsorgenView';
import BarnBorSammenView from './views/BarnBorSammenView';
import BarnKroniskSyktView from './views/BarnKroniskSyktView';
import BarnPanelView from './views/BarnPanelView';
import BarnÅrFødtView from './views/BarnÅrFødtView';
import FlereBarnUtfyllingsInfoView from './views/FlereBarnUtfyllingsInfoView';
import IntroTextView from './views/IntroTextView';
import KalkulatorLogoAndTitle from './views/KalkulatorLogoAndTitle';
import MaybeNesteBarnKnapp from './views/MaybeNesteBarnKnapp';
import NbarnSelectView from './views/NBarnSelectView';
import ResultatArea from './views/ResultatArea';
import './OmsorgsdagerKalkulator.less';

const bem = bemUtils('omsorgsdagerkalkulator');

export interface Props {
    initialBarnListe?: BarnInput[];
    includeHeader?: boolean;
}

const OmsorgsdagerKalkulator = ({ initialBarnListe, includeHeader = true }: Props) => {
    const intl = useIntl();
    const [state, dispatch] = useReducer<KalkulatorReducer>(
        reducer,
        createInitialState(maybeBarnInputListToBarnInfoList(initialBarnListe))
    );
    const { nBarn, nBarnMaks, barn, resultViewData }: State = state;

    return (
        <DocumentTitle title={intlHelper(intl, 'oms-calc.tittel.beregn')}>
            <Box className={bem.element('wrapper')}>
                {includeHeader && <KalkulatorLogoAndTitle />}
                <IntroTextView nBarn={barn.length} />
                <NbarnSelectView nBarn={nBarn} dispatch={dispatch} nBarnMaks={nBarnMaks} />
                <FlereBarnUtfyllingsInfoView nBarn={barn.length} />

                {barn.map((barnInfo: BarnInfo, index: number, listeAvBarn: BarnInfo[]) => {
                    return (
                        <div style={{ paddingTop: '1rem' }} key={index} id={`barnPanel_${barnInfo.id}`}>
                            <BarnPanelView
                                id={barnInfo.id}
                                index={index}
                                length={barn.length}
                                apen={barnInfo.panelErÅpent}
                                onClick={() => {
                                    dispatch(setPanelErÅpent(barnInfo.id, !barnInfo.panelErÅpent));
                                }}>
                                <BarnÅrFødtView barnInfo={barnInfo} dispatch={dispatch} state={state} />
                                <BarnKroniskSyktView barnInfo={barnInfo} state={state} dispatch={dispatch} />
                                <BarnBorSammenView barnInfo={barnInfo} state={state} dispatch={dispatch} />
                                <BarnAleneOmOmsorgenView barnInfo={barnInfo} state={state} dispatch={dispatch} />
                                <MaybeNesteBarnKnapp
                                    barnInfo={barnInfo}
                                    index={index}
                                    listeAvBarn={listeAvBarn}
                                    dispatch={dispatch}
                                />
                            </BarnPanelView>
                        </div>
                    );
                })}

                <ResultatArea resultView={resultViewData} dispatch={dispatch} />
            </Box>
        </DocumentTitle>
    );
};

export default OmsorgsdagerKalkulator;
