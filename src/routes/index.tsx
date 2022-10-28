import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import useResize from 'hooks/useResize'
import { boardProcessAtom } from 'store/atoms'
import MakeTodo from './TaskDashBoard'
import Board from './TaskDashBoard/BoardsContainer/Board'

import styles from './routes.module.scss'

const App = () => {
  const boardProcessList = useRecoilValue(boardProcessAtom)
  const { size, isSize: isTablet } = useResize()

  useEffect(() => {
    size.TABLET.RESIZE()
    size.TABLET.SIZEEVENT()
  }, [size.TABLET])

  return (
    <div className={styles.page}>
      <Routes>
        <Route path='/' element={<MakeTodo />}>
          {isTablet && <Route index element={<Board process={boardProcessList[0]} />} />}
          {isTablet &&
            boardProcessList.map((process) => (
              <Route key={process} path={`${process}`} element={<Board process={process} />} />
            ))}
        </Route>
        <Route path='*' element={<div>404</div>} />
      </Routes>
    </div>
  )
}

export default App
