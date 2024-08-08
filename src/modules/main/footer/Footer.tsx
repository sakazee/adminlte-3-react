import { useTranslation } from 'react-i18next';
import { DateTime } from 'luxon';
import packageJSON from '../../../../package.json';

import { Footer as RawFooter } from '@profabric/react-components';
import styled from 'styled-components';

const Footer = styled(RawFooter)`
  width: 100%;

  --pf-height: 57px;
  --pf-width: 100%;
  --pf-background-color: white;
  --pf-color: #869099;

  border-top: 1px solid #dee2e6;
`;

export const AppFooter = ({
  containered,
  ...rest
}: { containered?: boolean } & any) => {
  const [t] = useTranslation();

  return (
    <Footer>
      <div
        style={{
          width: '100%',
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1rem',
        }}
        className={containered ? 'container' : ''}
      >
        <div>
          <span>Copyright © {DateTime.now().toFormat('y')} </span>
          <a
            href="https://erdkse.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            erdkse.com
          </a>
          <span>.</span>
        </div>
        <div>
          <b>{t('footer.version')}</b>
          <span>&nbsp;{packageJSON.version}</span>
        </div>
      </div>
    </Footer>
  );
};
