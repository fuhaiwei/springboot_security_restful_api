import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import type { RootState, AppDispatch } from './store'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useNav = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  return {
    pathname,
    navigate,
  }
}
