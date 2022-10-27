import { NavLink } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import { boardProcessAtom } from 'store/atoms'

import styles from './lnb.module.scss'

const LNB = () => {
  const boardProcessList = useRecoilValue(boardProcessAtom)

  return (
    <nav className={styles.lnb}>
      <ul className={styles.navList}>
        {boardProcessList.map((process) => {
          const navigationKey = `navigation-${process}`
          return (
            <NavLink
              key={navigationKey}
              to={`${process}`}
              className={({ isActive }) => (isActive ? `${styles.activatedLink}` : `${styles.unActivatedLink}`)}
            >
              <li>{process}</li>
            </NavLink>
          )
        })}
      </ul>
    </nav>
  )
}

export default LNB
