import * as React from 'react';
import { useReducer } from 'react';
import { KalkulatorReducer, reducer } from './utils/reducer';
import { createInitialState, State } from './utils/state';
import { BarnInfo, BarnInput } from './utils/types';
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
import { setPanelErÅpent } from './utils/actions';
import { maybeBarnInputListToBarnInfoList } from './utils/utils';
import { Locale } from './i18n/types';
import { applicationIntlMessages } from './i18n/applicationMessages';
import './OmsorgsdagerKalkulator.less';
import { IntlProvider } from 'react-intl';

const bem = bemUtils('omsorgsdagerkalkulator');

export interface Props {
    initialBarnListe?: BarnInput[];
    includeHeader?: boolean;
    locale?: Locale;
}

const OmsorgsdagerKalkulator = ({ initialBarnListe, includeHeader = true, locale }: Props) => {
    const [state, dispatch] = useReducer<KalkulatorReducer>(
        reducer,
        createInitialState(maybeBarnInputListToBarnInfoList(initialBarnListe))
    );
    const { nBarn, nBarnMaks, barn, resultViewData }: State = state;
    const i18n =
        locale && applicationIntlMessages[locale]
            ? { locale: locale, messages: applicationIntlMessages[locale] }
            : { locale: 'nb', messages: applicationIntlMessages['nb'] };

    return (
        <IntlProvider locale={i18n.locale} messages={i18n.messages}>
            <Box className={bem.element('wrapper')}>
                {includeHeader && <KalkulatorLogoAndTitle />}
                <IntroTextView nBarn={barn.length} />
                <NbarnSelectView nBarn={nBarn} dispatch={dispatch} nBarnMaks={nBarnMaks} />
                <FlereBarnUtfyllingsInfoView nBarn={barn.length} />
                <FormBlock>
                    {barn.map((barnInfo: BarnInfo, index: number, listeAvBarn: BarnInfo[]) => {
                        return (
                            <div style={{ paddingTop: '1rem' }} key={index} id={`barnPanel_${barnInfo.id}`}>
                                <BarnPanelView
                                    id={barnInfo.id}
                                    index={index}
                                    length={barn.length}
                                    barnInfo={barnInfo}
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
                </FormBlock>
                <ResultatArea resultView={resultViewData} dispatch={dispatch} />
            </Box>
        </IntlProvider>
    );
};

export default OmsorgsdagerKalkulator;
