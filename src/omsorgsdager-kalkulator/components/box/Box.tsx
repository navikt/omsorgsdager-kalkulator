import * as React from 'react';
import bemUtils from '../../utils/bemUtils';
import './box.less';

export type BoxMargin = 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl' | 'none';

interface BoxProps {
    margin?: BoxMargin;
    padBottom?: BoxMargin;
    textAlignCenter?: boolean;
    className?: string;
}

const bem = bemUtils('calcBox');

const Box: React.FunctionComponent<BoxProps> = ({
    margin,
    padBottom,
    className,
    textAlignCenter,
    children,
}: React.PropsWithChildren<BoxProps>) => {
    const classNames = bem.classNames(
        bem.block,
        bem.modifierConditional(margin, margin !== undefined),
        bem.modifierConditional(`bottom-${padBottom}`, padBottom !== undefined),
        {
            [bem.modifier('textAlignCenter')]: textAlignCenter,
            [`${className}`]: className !== undefined,
        }
    );
    return <div className={classNames}>{children}</div>;
};

export default Box;
