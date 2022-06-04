import NavBar from 'components/NavBar'
import { Route, Routes } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

import MakeTodo from './MakeTodo'
import DashBoard from './DashBoard'

import styles from './routes.module.scss'

const App = () => {
  return (
    <div className={styles.page}>
      <NavBar />
      <RecoilRoot>
        <Routes>
          <Route path='/' element={<MakeTodo />} />
          <Route path='todo' element={<DashBoard />} />
          <Route path='*' element={<div>404</div>} />
        </Routes>
      </RecoilRoot>
    </div>
  )
}

export default App
