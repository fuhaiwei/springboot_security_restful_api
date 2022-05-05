import { useNav } from '#A/hooks'
import { MyHeader } from '#C/header/Header'

export default function NotFound() {
  const { pathname } = useNav()
  return (
    <div className="NotFound">
      <MyHeader title="PAGE NOT FOUND" error={{ name: 'PATH', message: pathname }} />
    </div>
  )
}
