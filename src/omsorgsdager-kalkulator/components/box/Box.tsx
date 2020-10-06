import * as React from 'react';
import './box.less';
import bemUtils from '../../utils/bemUtils';
import { uuidv4 } from '../../utils/utils';

export type BoxMargin = 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl' | 'none';

interface BoxProps {
    id?: string;
    margin?: BoxMargin;
    padBottom?: BoxMargin;
    textAlignCenter?: boolean;
    className?: string;
}

const bem = bemUtils('calcBox');

const Box: React.FunctionComponent<BoxProps> = ({
    id,
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
    return (
        <div id={id || uuidv4()} className={classNames}>
            {children}
        </div>
    );
};

export default Box;
