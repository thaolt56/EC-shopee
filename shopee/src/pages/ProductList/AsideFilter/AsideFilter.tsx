import { Link } from 'react-router-dom'
export default function AsideFilter() {
  return (
    <div className=' px-4 bg-gray-[50] mt-8'>
      <Link to='/' className='flex px-8'>
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
        <div className='text-sm uppercase ml-2 font-bold'>Tất cả sản phẩm</div>
      </Link>
      <div className='bg-gray-300 h-[1px] my-4 mx-2'></div>

      <div className='flex '>
        <ul>
          <li className='py-2 hover:text-orange cursor-pointer'>
            <Link className='relative flex items-center  text-orange' to=''>
              <svg viewBox='0 0 4 7' className=' h-3 w-3 absolute fill-orange'>
                <polygon points='4 3.5 0 0 0 7' />
              </svg>
              <div className='text-md ml-4'>Điện thoại và phụ kiện</div>
            </Link>
          </li>
          <li className='py-2  hover:text-orange cursor-pointer'>
            <Link className='relative flex items-center' to=''>
              <svg viewBox='0 0 4 7' className=' h-2 w-2 absolute'>
                <polygon points='4 3.5 0 0 0 7' />
              </svg>
              <div className='text-md ml-4'>Điện thoại và phụ kiện</div>
            </Link>
          </li>
          <li className='py-2  hover:text-orange cursor-pointer'>
            <Link className='relative flex items-center' to=''>
              <svg viewBox='0 0 4 7' className=' h-2 w-2 absolute'>
                <polygon points='4 3.5 0 0 0 7' />
              </svg>
              <div className='text-md ml-4'>Điện thoại và phụ kiện</div>
            </Link>
          </li>
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

        <form className='flex items-center mb-4'>
          <input
            type='text'
            placeholder='₫ TỪ'
            className='border mr-2 border-gray-300 focus:border-gray-300 w-12 grow p-2'
          ></input>
          <div>-</div>
          <input
            type='text'
            placeholder='₫ ĐẾN'
            className='border ml-2 border-gray-300 focus:border-gray-300 w-12 grow p-2'
          ></input>
        </form>

        <button className='py-2 text-center bg-orange w-full border rounded-sm'>
          <span className='text-md text-white uppercase  '>Áp dụng</span>
        </button>
      </div>
      <div className='bg-gray-300 h-[1px] mt-8'></div>
      <div className='mt-8'>
        <div className='text-sm text-gray-500'>Đánh giá</div>
        <ul>
          <li className='py-2 pl-4'>
            <Link to='' className='flex items-center text-sm'>
              {Array(5)
                .fill(0)
                .map((_, index) => (
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
                ))}
              <span className='text-sm text-gray-500'>trở lên</span>
            </Link>
          </li>
        </ul>
        <div className='bg-gray-300 h-[1px] mt-8'></div>
      </div>
    </div>
  )
}
