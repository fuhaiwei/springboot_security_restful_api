import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

export default function setup() {
  dayjs.extend(relativeTime)
}
