import { Skeleton } from 'antd';


interface SkeletonDetailProps {
  customClass?: string
  type?: string
}

function SkeletonDetail({ customClass = '' }: SkeletonDetailProps) {
  return (
    <div className={customClass}>
      <Skeleton avatar paragraph={{ rows: 15 }} active />
    </div>
  )
}

export default SkeletonDetail
