import NavBar from 'components/NavBar'
import { Route, Routes } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

import MainTodo from './MainTodo'
import MakeTodo from './MakeTodo'

import styles from './routes.module.scss'

const App = () => {
  return (
    <div className={styles.page}>
      <NavBar />
      <RecoilRoot>
        <Routes>
          <Route path='/' element={<MainTodo />} />
          <Route path='todo' element={<MakeTodo />} />
          <Route path='*' element={<div>404</div>} />
        </Routes>
      </RecoilRoot>
    </div>
  )
}

export default App
