import * as React from 'react';
import { PropsWithChildren } from 'react';
import { isRight } from 'fp-ts/lib/Either';
import { validateBarnInfo } from '../utils/utils';
import SvgSuccessCircle from '../svgs/SvgSuccessCircle';
import { BarnInfo } from '../utils/types';
import bemUtils from '../utils/bemUtils';
import FormBlock from '../components/form-block/FormBlock';
import {EkspanderbartpanelBase} from "nav-frontend-ekspanderbartpanel";

const bem = bemUtils('BarnPanelView');

interface Props {
    id: string;
    index: number;
    length: number;
    barnInfo: BarnInfo;
    apen: boolean;
    onClick: () => void;
}

const BarnPanelView: React.FC<Props> = ({
    id,
    index,
    length,
    barnInfo,
    children,
    apen,
    onClick,
}: PropsWithChildren<Props>) => {
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
                    {isRight(validateBarnInfo(barnInfo)) && (
                        <div>
                            <SvgSuccessCircle />
                        </div>
                    )}
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
