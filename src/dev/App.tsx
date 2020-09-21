import * as React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import 'nav-frontend-skjema-style';
import OmsorgsdagerKalkulator from "../omsorgsdager-kalkulator/OmsorgsdagerKalkulator";

const App: React.FC = () => {
    return (
        <Normaltekst tag="div">
            <OmsorgsdagerKalkulator />
        </Normaltekst>
    );
};

export default App;
