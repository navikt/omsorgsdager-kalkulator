import * as React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import OmsorgsdagerKalkulator from './omsorgsdager-kalkulator/OmsorgsdagerKalkulator';
import OmsorgsdagerKalkulatorInfo from './omsorgsdager-kalkulator/OmsorgsdagerKalkulatorInfo';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import {BarnInput} from "./omsorgsdager-kalkulator/utils/types";

const a: BarnInput[] = [
    {
        årFødt: 2012,
        kroniskSykt: true,
        aleneOmOmsorgen: false,
        borSammen: false
    }
]

const App: React.FC = () => {
    return (
        <Normaltekst tag="div">
            <Router>
                <Switch>
                    <Route path="/kalkulator-info">
                        <OmsorgsdagerKalkulatorInfo kalkulatorHref={'/kalkulator'} includeHeader={true} />
                    </Route>
                    <Route path="/kalkulator">
                        {/* TODO: Test at BarnInput virker */}
                        <OmsorgsdagerKalkulator initialBarnListe={a}/>
                    </Route>
                    <Redirect to="/kalkulator-info" />
                </Switch>
            </Router>
        </Normaltekst>
    );
};

export default App;
