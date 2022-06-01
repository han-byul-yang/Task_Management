import { IHealthResponse } from 'types/types.d';
import { atom } from 'recoil'

export const healthDataState = atom<IHealthResponse>({
  key: 'healthDataState',
  default: {}
})
