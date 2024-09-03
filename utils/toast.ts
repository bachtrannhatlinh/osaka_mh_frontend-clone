import { notification } from 'antd'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const openNotification = (props: any) => {
  const { message, description, className } = props
  notification.open({
    message,
    description,
    className,
    placement: 'bottomRight'
  })
}

export default openNotification
