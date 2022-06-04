import { HomeIcon, ListIcon } from 'assets/svgs'
import { NavLink } from 'react-router-dom'
import styles from './navBar.module.scss'

const NavBar = () => {
  return (
    <nav className={styles.navBar}>
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

export default NavBar
