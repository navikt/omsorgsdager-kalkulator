import React from 'react';
import Box, { BoxMargin } from '../box/Box';

interface Props {
    margin?: BoxMargin;
    paddingBottom?: BoxMargin;
}

const FormBlock: React.FunctionComponent<Props> = ({ margin = 'xl', paddingBottom, children }) => (
    <Box margin={margin} padBottom={paddingBottom}>
        {children}
    </Box>
);

export default FormBlock;
