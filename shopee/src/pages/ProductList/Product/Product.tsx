import AsideFilter from '../AsideFilter'
import SortProductList from '../SortProductList'

export default function Product() {
  return (
    <div className='max-w-7xl grid grid-cols-12'>
      <div className='col-span-3'>
        <AsideFilter />
      </div>
      <div className='col-span-9'>
        <SortProductList />
        <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 lg:grid-cols-5 gap-4 mt-8'>
          {Array(30)
            .fill(0)
            .map((_, index) => (
              <div key={index}>
                <div className='bg-white shadow-sm hover:translate-y-[-0.05rem] hover:shadow-md duration-100 overflow-hidden cursor-pointer'>
                  <div className='w-full pt-[100%] relative'>
                    <img
                      className='absolute top-0 left-0 bg-white w-full h-full object-cover'
                      src='https://cf.shopee.vn/file/063c3d3f37d1d13b9acdbf9149bc02d1_tn'
                      alt='test'
                    />
                  </div>
                  <div className='p2'>
                    <div className='text-xs line-clamp-2 mt-4 px-2'>
                      Ốp Điện Thoại Silicon Dẻo Bề Mặt Vải Thời Trang Chống Sốc Bốn Góc Cho iPhone 14 13 12 11 Pro Max
                      XS XR X 8 + 7 Plus
                    </div>
                    <div className='mb-4'>
                      <div className='flex items-center mt-3 px-2'>
                        <div className='line-through max-w-[50%] text-gray-400'>
                          <span>₫</span>
                          <span>20.000</span>
                        </div>
                        <div className='max-w-[50%] text-red-500 px-2'>
                          <span>₫</span>
                          <span>15.000</span>
                        </div>
                      </div>
                      <div className='flex items-center'>
                        <div className='relative'>
                          <svg
                            enableBackground='new 0 0 15 15'
                            viewBox='0 0 15 15'
                            x={0}
                            y={0}
                            className='h-3 w-3 text-gray-300 fill-gray-300'
                          >
                            <polygon
                              points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeMiterlimit={10}
                            />
                          </svg>
                          <div className='absolute top-0 left-0 h-full overflow-hidden' style={{ width: '50%' }}>
                            <svg
                              enableBackground='new 0 0 15 15'
                              viewBox='0 0 15 15'
                              x={0}
                              y={0}
                              className='h-3 w-3 text-yellow-300 fill-yellow-300'
                            >
                              <polygon
                                points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeMiterlimit={10}
                              />
                            </svg>
                          </div>
                        </div>
                        <div className='text-sm text-gray-600 pl-2'>
                          Đã bán
                          <span>11k</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
