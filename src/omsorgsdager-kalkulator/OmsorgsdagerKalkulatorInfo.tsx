import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Undertittel } from 'nav-frontend-typografi';
import Box from './components/box/Box';
import DocumentTitle from './components/document-title/DocumentTitle';
import ExpandableInfo from './components/expandable-content/ExpandableInfo';
import FormBlock from './components/form-block/FormBlock';
import Knappelenke from './components/knappelenke/Knappelenke';
import { intlHelper } from './i18n/utils';
import bemUtils from './utils/bemUtils';
import { getStartDate, getYear } from './utils/dateUtils';
import KalkulatorLogoAndTitle from './views/KalkulatorLogoAndTitle';
import './OmsorgsdagerKalkulator.less';

const bem = bemUtils('omsorgsdagerkalkulator');

interface Props {
    kalkulatorHref: string;
    includeHeader?: boolean;
}

const OmsorgsdagerKalkulatorInfo = ({ includeHeader, kalkulatorHref }: Props) => {
    const intl = useIntl();
    return (
        <DocumentTitle title={intlHelper(intl, 'oms-calc.tittel.introside')}>
            <Box className={bem.element('wrapper')}>
                {includeHeader && <KalkulatorLogoAndTitle />}
                <Box margin="l">
                    <Undertittel>
                        <FormattedMessage id={'oms-calc.infoside.undertittel.1'} /> {getStartDate(intl)} {getYear()} til{' '}
                        <FormattedMessage id={'oms-calc.infoside.undertittel.2'} /> {getYear()}
                    </Undertittel>
                </Box>
                {getYear() === 2020 && (
                    <Box margin="m">
                        <strong>
                            <FormattedMessage id={'oms-calc.infoside.nb.1'} />
                        </strong>{' '}
                        <FormattedMessage id={'oms-calc.infoside.nb.2'} />{' '}
                        <strong>
                            <FormattedMessage id={'oms-calc.infoside.nb.3'} />
                        </strong>{' '}
                        <FormattedMessage id={'oms-calc.infoside.nb.4'} />
                    </Box>
                )}
                <Box margin="m">
                    <FormattedMessage id={'oms-calc.infoside.paragraph.1'} />
                </Box>
                <FormBlock margin="l">
                    <ExpandableInfo title={intlHelper(intl, 'oms-calc.infoside.expandableinfo.title')}>
                        <Box padBottom={'l'}>
                            <FormattedMessage id={'oms-calc.infoside.expandableinfo.content.1'} />
                        </Box>
                        <FormattedMessage id={'oms-calc.infoside.expandableinfo.content.2'} />
                    </ExpandableInfo>
                </FormBlock>
                <FormBlock margin={'xxl'}>
                    <div className={bem.element('flex-center')}>
                        <Knappelenke type={'hoved'} href={kalkulatorHref}>
                            Start kalkulator
                        </Knappelenke>
                    </div>
                </FormBlock>
            </Box>
        </DocumentTitle>
    );
};

export default OmsorgsdagerKalkulatorInfo;
