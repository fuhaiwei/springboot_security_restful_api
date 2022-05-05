import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'

export default function setup() {
  dayjs.extend(relativeTime)
  dayjs.locale('zh-cn')
}
