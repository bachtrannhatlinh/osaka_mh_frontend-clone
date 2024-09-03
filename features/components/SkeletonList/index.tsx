import { Skeleton } from 'antd';


interface SkeletonListProps {
  customClass?: string
  type?: string
}

function SkeletonList({ customClass = '' }: SkeletonListProps) {
  return (
    <div className={customClass}>
      <div className='d-flex'>
        <Skeleton active avatar paragraph={{ rows: 8 }} />
        <Skeleton active avatar paragraph={{ rows: 8 }} />
        <Skeleton active avatar paragraph={{ rows: 8 }} />
        <Skeleton active avatar paragraph={{ rows: 8 }} />
        <Skeleton active avatar paragraph={{ rows: 8 }} />
      </div>
    </div>
  )
}

export default SkeletonList
