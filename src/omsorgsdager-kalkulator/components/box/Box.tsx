import * as React from 'react';
import './box.less';
import bemUtils from "../../utils/bemUtils";

export type BoxMargin = 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl' | 'none';

interface BoxProps {
    margin?: BoxMargin;
    padBottom?: BoxMargin;
    textAlignCenter?: boolean;
    className?: string;
}

const bem = bemUtils('box');

const Box: React.FunctionComponent<BoxProps> = ({ margin, padBottom, className, textAlignCenter, children }) => {
    const classNames = bem.classNames(
        bem.block,
        bem.modifierConditional(margin, margin !== undefined),
        bem.modifierConditional(`bottom-${padBottom}`, padBottom !== undefined),
        {
            [bem.modifier('textAlignCenter')]: textAlignCenter,
            [`${className}`]: className !== undefined
        }
    );
    return <div className={classNames}>{children}</div>;
};

export default Box;
