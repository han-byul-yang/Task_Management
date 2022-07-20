import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

import NavBar from 'components/NavBar'

import styles from './layout.module.scss'

const Layout = () => {
  const [isMobile, setIsMobile] = useState(false)

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768)
  }

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768)

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className={styles.container}>
      {isMobile ? (
        <>
          <main>
            <Outlet />
          </main>
          <NavBar />
        </>
      ) : (
        <>
          <NavBar />
          <main>
            <Outlet />
          </main>
        </>
      )}
    </div>
  )
}

export default Layout
