import * as React from 'react';
import { PropsWithChildren } from 'react';
import SvgChild from '../svgs/SvgChild';
import SvgChildSad from '../svgs/SvgChildSad';
import './ResultBox.less';
import bemUtils from '../utils/bemUtils';
import FormBlock from '../components/form-block/FormBlock';

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
    return (
        <FormBlock>
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
        </FormBlock>
    );
};

export default ResultBox;
