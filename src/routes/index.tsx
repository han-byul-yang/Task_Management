import { Route, Routes } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

import MainTodo from './MainTodo'
import MakeTodo from './MakeTodo'

const App = () => {
  return (
    <RecoilRoot>
      <Routes>
        <Route path='/' element={<MainTodo />} />
        <Route path='todo' element={<MakeTodo />} />
        <Route path='*' element={<div>404</div>} />
      </Routes>
    </RecoilRoot>
  )
}

export default App
