import * as React from 'react';
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
import FormBlock from '../components/form-block/FormBlock';
import bemUtils from '../utils/bemUtils';

const bem = bemUtils('BarnPanelView');

interface Props {
    id: string;
    index: number;
    length: number;
    apen: boolean;
    onClick: () => void;
}

const BarnPanelView: React.FC<Props> = ({
    id,
    index,
    length,
    children,
    apen,
    onClick,
}: React.PropsWithChildren<Props>) => {
    if (length === 1) {
        return (
            <div className={bem.element('border-top')}>
                <FormBlock>{children}</FormBlock>
            </div>
        );
    }

    return (
        <EkspanderbartpanelBase
            id={id}
            tittel={
                <div className={bem.element('ekspanderbarnpanel-tittel-wrapper')}>
                    <div>Barn {index + 1}</div>
                </div>
            }
            apen={apen}
            onClick={onClick}
            key={index}>
            {children}
        </EkspanderbartpanelBase>
    );
};

export default BarnPanelView;
