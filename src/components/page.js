import React from 'react';
import styles from './page.module.css';

const Page = ({children, className}) => (
  <div className={`${styles.container} ${className}`}>
    {children}
  </div>
);

export default Page;