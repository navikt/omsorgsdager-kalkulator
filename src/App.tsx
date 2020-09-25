import * as React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import OmsorgsdagerKalkulator from './omsorgsdager-kalkulator/OmsorgsdagerKalkulator';
import OmsorgsdagerKalkulatorInfo from './omsorgsdager-kalkulator/OmsorgsdagerKalkulatorInfo';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

const App: React.FC = () => {
    return (
        <Normaltekst tag="div">
            <Router>
                <Switch>
                    <Route path="/kalkulator-info">
                        <OmsorgsdagerKalkulatorInfo kalkulatorHref={'/kalkulator'} includeHeader={true} />
                    </Route>
                    <Route path="/kalkulator">
                        <OmsorgsdagerKalkulator initialBarnListe={[]} />
                    </Route>
                    <Redirect to="/kalkulator-info" />
                </Switch>
            </Router>
        </Normaltekst>
    );
};

export default App;
