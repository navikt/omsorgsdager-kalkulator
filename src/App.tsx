import * as React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { Normaltekst } from 'nav-frontend-typografi';
import OmsorgsdagerKalkulator from './omsorgsdager-kalkulator/OmsorgsdagerKalkulator';
import OmsorgsdagerKalkulatorInfo from './omsorgsdager-kalkulator/OmsorgsdagerKalkulatorInfo';
import { BarnInput } from './omsorgsdager-kalkulator/utils/types';
import { IntlProvider } from 'react-intl';
import { applicationIntlMessages } from './omsorgsdager-kalkulator/i18n/applicationMessages';

const a: BarnInput[] = [];

const App: React.FC = () => {
    const i18n = { locale: 'nb', messages: applicationIntlMessages['nb'] };
    return (
        <Normaltekst tag="div" role="main">
            <IntlProvider locale={i18n.locale} messages={i18n.messages}>
                <Router>
                    <Switch>
                        <Route path="/omsorgspenger/kalkulator-antall-omsorgsdager/beregne">
                            <OmsorgsdagerKalkulator initialBarnListe={a} />
                        </Route>
                        <Route path="/omsorgspenger/kalkulator-antall-omsorgsdager">
                            <OmsorgsdagerKalkulatorInfo
                                kalkulatorHref={'/omsorgspenger/kalkulator-antall-omsorgsdager/beregne'}
                                includeHeader={true}
                            />
                        </Route>
                        <Redirect to="/omsorgspenger/kalkulator-antall-omsorgsdager" />
                    </Switch>
                </Router>
            </IntlProvider>
        </Normaltekst>
    );
};

export default App;
