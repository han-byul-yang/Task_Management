import { NavLink } from 'react-router-dom'

import { HomeIcon, ListIcon } from 'assets/svgs'
import styles from './gnb.module.scss'

const GNB = () => {
  return (
    <nav className={styles.gnb}>
      <div className={styles.title}>MANAGE YOUR LIFE</div>
      <ul className={styles.navList}>
        <NavLink
          to='/'
          className={({ isActive }) => (isActive ? `${styles.activatedLink}` : `${styles.nonActivatedLink}`)}
        >
          <li className={styles.navItem}>
            <HomeIcon className={styles.navIcon} />
            <div>TASK MANAGNE</div>
          </li>
        </NavLink>
        <NavLink
          to='/todo'
          className={({ isActive }) => (isActive ? `${styles.activatedLink}` : `${styles.nonActivatedLink}`)}
        >
          <li className={styles.navItem}>
            <ListIcon className={styles.navIcon} />
            <div>DASHBOARD</div>
          </li>
        </NavLink>
      </ul>
    </nav>
  )
}

export default GNB
