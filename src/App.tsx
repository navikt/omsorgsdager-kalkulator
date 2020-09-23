import * as React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import OmsorgsdagerKalkulator from './omsorgsdager-kalkulator/OmsorgsdagerKalkulator';

const App: React.FC = () => {
    return (
        <Normaltekst tag="div">
            <OmsorgsdagerKalkulator initialBarnListe={[]} />
        </Normaltekst>
    );
};

export default App;
