import classNames from 'classnames'
import { Category } from 'src/types/product.type'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { priceRules } from 'src/utils/rules'
import { omit } from 'lodash'

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
  category?: string
}
interface Props {
  categories: Category[]
  queryConfig: QueryConfig
}
interface FormData {
  price_max: string
  price_min: string
}
export default function AsideFilter({ categories, queryConfig }: Props) {
  const { category } = queryConfig
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>()

  const onSubmit = handleSubmit((data) => {
    if (data.price_max != '' && data.price_min != '' && data.price_max < data.price_min) {
      setError('price_min', { type: 'custom', message: 'Vui lòng nhập giá đúng' })
      return
    }
    navigate({
      pathname: '',
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            price_max: data.price_max,
            price_min: data.price_min
          },
          ['order']
        )
      ).toString()
    })
  })

  const handleStar = (index_star: number) => {
    navigate({
      pathname: '',
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            rating_filter: String(index_star)
          },
          ['order']
        )
      ).toString()
    })
  }

  const handleDelete = () => {
    navigate({
      pathname: '',
      search: createSearchParams(
        omit(
          {
            ...queryConfig
          },
          ['rating_filter', 'category', 'price_max', 'price_min']
        )
      ).toString()
    })
  }

  return (
    <div className=' px-4 bg-gray-[50] mt-8'>
      <Link to='/' className='flex hover:opacity-75'>
        <div
          className={classNames('flex text-sm uppercase font-bold', {
            'text-orange fill-orange': !category
          })}
        >
          <svg viewBox='0 0 12 10' className='h-4 w-4 '>
            <g fillRule='evenodd' stroke='none' strokeWidth={1}>
              <g transform='translate(-373 -208)'>
                <g transform='translate(155 191)'>
                  <g transform='translate(218 17)'>
                    <path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                    <path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                    <path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  </g>
                </g>
              </g>
            </g>
          </svg>
          <div className='pl-4'>Tất cả sản phẩm</div>
        </div>
      </Link>
      <div className='bg-gray-300 h-[1px] my-4 mx-2'></div>

      <div className='flex '>
        <ul>
          {categories &&
            categories.map((categoryItem) => {
              const isActive = category === categoryItem._id
              return (
                <li key={categoryItem._id} className='py-2 hover:opacity-70'>
                  <Link
                    className={classNames('relative flex items-center text-black-400 fill-black-400 ', {
                      'text-orange fill-orange': isActive
                    })}
                    to={{
                      pathname: '',
                      search: createSearchParams({
                        ...queryConfig,
                        category: categoryItem._id
                      }).toString()
                    }}
                  >
                    <svg viewBox='0 0 4 7' className=' h-3 w-3 absolute '>
                      <polygon points='4 3.5 0 0 0 7' />
                    </svg>
                    <div className='text-md ml-4'>{categoryItem.name}</div>
                  </Link>
                </li>
              )
            })}
        </ul>
      </div>

      <div>
        <div className='flex relative mt-8 '>
          <svg enableBackground='new 0 0 15 15' viewBox='0 0 15 15' x={0} y={0} className='w-3 h-3 stroke-current'>
            <g>
              <polyline
                fill='none'
                points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeMiterlimit={10}
              />
            </g>
          </svg>
          <div className='uppercase text-md font-bold ml-2'>Bộ lọc tìm kiếm</div>
        </div>
        <div className='bg-gray-300 h-[1px] px-4 mt-8'></div>
        <div className='text-gray-500 text-sm my-4'>Khoảng giá</div>

        <form onSubmit={onSubmit}>
          <div className='flex items-center'>
            <input
              type='text'
              {...register('price_min', priceRules.price_min)}
              placeholder='₫ TỪ'
              className='border mr-2 border-gray-300 focus:border-gray-300 w-12 grow p-2'
            ></input>
            <div>-</div>
            <input
              type='text'
              placeholder='₫ ĐẾN'
              {...register('price_max', priceRules.price_max)}
              className='border ml-2 border-gray-300 focus:border-gray-300 w-12 grow p-2'
            ></input>
          </div>
          <div className='mt-1 text-red-600 text-sm min-h-[1rem]'>{errors.price_min?.message}</div>
          <div className='mt-1 text-red-600 text-sm min-h-[1rem]'>{errors.price_max?.message}</div>

          <button className='py-2 text-center bg-orange w-full border rounded-sm ' type='submit'>
            <span className='text-md text-white'>Áp dụng</span>
          </button>
        </form>
      </div>
      <div className='bg-gray-300 h-[1px] mt-8'></div>
      <div className='mt-8'>
        <div className='text-sm text-gray-500'>Đánh giá</div>
        <ul>
          <li className='py-2 pl-4'>
            {Array(5)
              .fill(0)
              .map((_, count) => (
                <button
                  key={count}
                  className='flex items-center text-sm mt-1'
                  onClick={() => {
                    handleStar(5 - count)
                  }}
                >
                  {Array(5)
                    .fill(0)
                    .map((_, index) => {
                      if (index < 5 - count) {
                        return (
                          <svg viewBox='0 0 9.5 8' className='w-4 h-4 mr-1' key={index}>
                            <defs>
                              <linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
                                <stop offset={0} stopColor='#ffca11' />
                                <stop offset={1} stopColor='#ffad27' />
                              </linearGradient>
                              <polygon
                                id='ratingStar'
                                points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
                              />
                            </defs>
                            <g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth={1}>
                              <g transform='translate(-876 -1270)'>
                                <g transform='translate(155 992)'>
                                  <g transform='translate(600 29)'>
                                    <g transform='translate(10 239)'>
                                      <g transform='translate(101 10)'>
                                        <use stroke='#ffa727' strokeWidth='.5' xlinkHref='#ratingStar' />
                                      </g>
                                    </g>
                                  </g>
                                </g>
                              </g>
                            </g>
                          </svg>
                        )
                      } else {
                        return (
                          <svg
                            key={index}
                            enableBackground='new 0 0 15 15'
                            viewBox='0 0 15 15'
                            x={0}
                            y={0}
                            className='w-4 h-4 mr-1 fill-gray-300'
                          >
                            <polygon
                              points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeMiterlimit={10}
                            />
                          </svg>
                        )
                      }
                    })}
                  {count != 0 && <span className='text-sm text-gray-500 pl-2'>Trở lên</span>}
                </button>
              ))}
          </li>
        </ul>
        <div className='bg-gray-300 h-[1px] mt-8'></div>
      </div>
      <button className='py-2 text-center bg-orange w-full border rounded-sm mt-8' onClick={handleDelete}>
        <span className='text-md text-white uppercase'>Xóa tất cả</span>
      </button>
    </div>
  )
}
