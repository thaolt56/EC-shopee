import classNames from 'classnames'
import { Link, createSearchParams } from 'react-router-dom'
interface QueryConfig {
  page?: string
  limit?: string
  sort_by?: 'createdAt' | 'view' | 'sold' | 'price'
  order?: 'asc' | 'desc'
  exclude?: string
  rating_filter?: string
  price_max?: string
  price_min?: string
  name?: string
}
interface Props {
  queryConfig: QueryConfig
  pageSize: number
}
export default function Pagination({ queryConfig, pageSize }: Props) {
  const page = Number(queryConfig.page)
  const renderPagination = () => {
    let dotAfter = false
    let dotBefore = false
    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <span key={index} className='bg-gray-200 shadow-sm items-center rounded cursor-pointer p-2 m-1'>
            ...
          </span>
        )
      }
      return null
    }
    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <span key={index} className='bg-gray-200 shadow-sm items-center rounded cursor-pointer p-2 m-1'>
            ...
          </span>
        )
      }
      return null
    }

    const RANGE = 2

    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1
        //return ve ...
        if (page <= RANGE * 2 + 1 && pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
          return renderDotAfter(index)
        } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) {
            return renderDotBefore(index)
          } else if (pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
            return renderDotAfter(index)
          }
        } else if (page >= pageSize - RANGE * 2 && pageNumber > RANGE && pageNumber < page - RANGE) {
          return renderDotBefore(index)
        }
        return (
          <Link
            to={{
              pathname: '',
              search: createSearchParams({
                ...queryConfig,
                page: pageNumber.toString()
              }).toString()
            }}
            key={index}
            className={classNames('bg-gray-200 shadow-sm items-center rounded cursor-pointer p-2 m-1 border', {
              'border-red-500': pageNumber === page,
              'border-transparent-500': pageNumber === page
            })}
          >
            {pageNumber}
          </Link>
        )
      })
  }
  return (
    <div className='m-8 flex flex-wrap justify-center'>
      {page === 1 ? (
        <span className='bg-gray-200 shadow-sm items-center rounded  p-2 m-1 cursor-not-allowed'>Prev</span>
      ) : (
        <Link
          to={{
            pathname: '',
            search: createSearchParams({
              ...queryConfig,
              page: (page - 1).toString()
            }).toString()
          }}
          className='bg-gray-200 shadow-sm items-center rounded cursor-pointer p-2 m-1'
        >
          Prev
        </Link>
      )}
      {renderPagination()}
      {page === pageSize ? (
        <span className='bg-gray-200 shadow-sm items-center rounded  p-2 m-1 cursor-not-allowed'>Next</span>
      ) : (
        <Link
          to={{
            pathname: '',
            search: createSearchParams({
              ...queryConfig,
              page: (page + 1).toString()
            }).toString()
          }}
          className='bg-gray-200 shadow-sm items-center rounded cursor-pointer p-2 m-1'
        >
          Next
        </Link>
      )}
    </div>
  )
}
