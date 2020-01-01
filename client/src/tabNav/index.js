import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './index.module.css'

const Tab = ({ label, path }) => (
  <>
    <NavLink
      exact
      to={path}
      className={styles.tabLink}
      activeClassName={styles.tabLinkActive}
      // activeStyle={{ color: 'var(--secondaryColor)', background: 'var(--white)' }}
    >
      {label}
    </NavLink>
    <div className={styles.divider} />
  </>
)

const TabNav = () => (
  <div id={styles.container}>
    {/* <Tab label='Home' path='/' />
    <Tab label='Users' path='/users' />
    <Tab label='Admittance' path='/admittance' />
    <Tab label='Stats' path='/stats' /> */}
    <Tab label='Review' path='/review' />
  </div>
)

export default TabNav
