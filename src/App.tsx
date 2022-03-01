import * as React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { Normaltekst } from 'nav-frontend-typografi';
import OmsorgsdagerKalkulator from './omsorgsdager-kalkulator/OmsorgsdagerKalkulator';
import OmsorgsdagerKalkulatorInfo from './omsorgsdager-kalkulator/OmsorgsdagerKalkulatorInfo';
import { BarnInput } from './omsorgsdager-kalkulator/utils/types';

const a: BarnInput[] = [];

const App: React.FC = () => {
    return (
        <Normaltekst tag="div">
            <Router>
                <Switch>
                    <Route path="/beregne">
                        {/* TODO: Test at BarnInput virker */}
                        <OmsorgsdagerKalkulator initialBarnListe={a} />
                    </Route>
                    <Route path="/">
                        <OmsorgsdagerKalkulatorInfo kalkulatorHref={'/beregne'} includeHeader={true} />
                    </Route>

                    <Redirect to="/" />
                </Switch>
            </Router>
        </Normaltekst>
    );
};

export default App;
