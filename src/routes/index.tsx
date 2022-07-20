import { Route, Routes } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

import MakeTodo from './MakeTodo'
import DashBoard from './DashBoard'
import Layout from 'components/Layout'

const App = () => {
  return (
    <RecoilRoot>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<MakeTodo />} />
          <Route path='todo' element={<DashBoard />} />
          <Route path='*' element={<div>404</div>} />
        </Route>
      </Routes>
    </RecoilRoot>
  )
}

export default App
