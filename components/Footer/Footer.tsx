import React, { useState } from 'react';
import { compose } from "redux";
import { injectIntl } from 'react-intl'
import { intlShape } from '../../utils/locale';

import styles from './Footer.module.scss';

export interface FooterProps {
  intl: intlShape;
}

const Footer = ({
  intl: {
		messages: {
      footer
		}
	},
} : FooterProps) => {
  
  return (
    <div className={styles.footerContainer}>
      { footer }
    </div>
  )
}

const hocChain = compose(
	injectIntl,
);


export default hocChain(Footer);