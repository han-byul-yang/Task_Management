import { Route, Routes } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { useMount } from 'react-use'

import healthDataJSON from 'data/health.json'

import { Dashboard } from './Dashboard'
import { Details } from './Details'
import { healthDataState } from 'states/healthDataState'

const App = () => {
  const setHealthData = useSetRecoilState(healthDataState)

  useMount(() => {
    setUserData(healthDataJSON)
  })
  return (
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='details' element={<Details />} />
      <Route path='*' element={<div>404</div>} />
    </Routes>
  )
}

export default App
