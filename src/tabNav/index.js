import React from 'react';
import {NavLink} from 'react-router-dom'
import styles from './index.module.css';

const Tab = ({label, path}) => (
  <>
    <NavLink
      to={path}
      className={styles.tabLink}
      activeStyle={{color: 'var(--secondaryColor)', background: 'var(--white)'}}
    >
      {label}
    </NavLink>
    <div className={styles.divider}/>
  </>
);

const TabNav = () => (
  <div id={styles.container}>
    <Tab label='Map' path='/admin/map'/>
    <Tab label='Accounts' path='/admin/accounts'/>
  </div>
);

export default TabNav;