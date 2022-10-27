import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import useResize from 'hooks/useResize'
import SearchInput from 'routes/MakeTodo/SearchInput'

import styles from './layout.module.scss'

const Layout = () => {
  const { size, isSize: isMobile } = useResize()

  useEffect(() => {
    size.MOBILE.RESIZE()
    size.MOBILE.SIZEEVENT()
  }, [size.MOBILE])

  return (
    <div className={styles.container}>
      <header>
        <SearchInput />
      </header>
      {isMobile ? (
        <main>
          <Outlet />
        </main>
      ) : (
        <main>
          <Outlet />
        </main>
      )}
    </div>
  )
}

export default Layout
