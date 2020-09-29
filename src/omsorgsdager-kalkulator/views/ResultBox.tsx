import * as React from 'react';
import { PropsWithChildren, useEffect } from 'react';
import SvgChild from '../svgs/SvgChild';
import SvgChildSad from '../svgs/SvgChildSad';
import './ResultBox.less';
import bemUtils from '../utils/bemUtils';
import Box from '../components/box/Box';

export const bem = bemUtils('OmsCalcResultBox');

const resultWrapperClassName = (type: ResultBoxType): string => {
    switch (type) {
        case 'WARNING':
            return bem.element('result-wrapper-orange');
        default:
            return bem.element('result-wrapper-green');
    }
};

const resultTopArrowClassName = (type: ResultBoxType): string => {
    switch (type) {
        case 'WARNING':
            return bem.element('result-top-arrow-orange');
        default:
            return bem.element('result-top-arrow-green');
    }
};

type ResultBoxType = 'SUCCESS' | 'WARNING';

interface Props {
    type: ResultBoxType;
}

const ResultBox: React.FC<Props> = ({ type, children }: PropsWithChildren<Props>) => {
    useEffect(() => {
        const element = document.getElementById('omsorgsdager-kalkulator-result-box-wrapper');
        if (element) {
            element.focus({ preventScroll: false });
            element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, []);

    return (
        <Box id={'omsorgsdager-kalkulator-result-box-wrapper'} margin={'xl'}>
            <div className={resultWrapperClassName(type)}>
                <div className={bem.element('result-top-arrow-wrapper')}>
                    <div className={resultTopArrowClassName(type)}></div>
                </div>
                <div className={bem.element('result-content')}>
                    <div className={bem.element('result-child-wrapper')}>
                        {type === 'SUCCESS' && <SvgChild />}
                        {type === 'WARNING' && <SvgChildSad />}
                    </div>
                    <div className={bem.element('result-content-wrapper')}>
                        <div>{children}</div>
                    </div>
                </div>
            </div>
        </Box>
    );
};

export default ResultBox;
