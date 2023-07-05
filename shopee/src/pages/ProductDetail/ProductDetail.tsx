import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import productApi from 'src/apis/product.api'
import ProductRating2 from 'src/components/ProductRating2'
import { formatCurrency } from 'src/utils/utils'
import DOMPurify from 'dompurify'
import { useEffect, useState, useMemo } from 'react'
import { ProductListConfig } from 'src/types/product.type'
import Product from 'src/components/Products/Product'
import { getIdFromNameId } from 'src/utils/utils'

export default function ProductDetail() {
  const { nameId } = useParams()
  const id = getIdFromNameId(nameId as string)
  const { data } = useQuery({
    queryKey: ['productId', id],
    queryFn: () => {
      return productApi.getProductDetail(String(id))
    }
  })

  const product = data?.data.data

  //get category by product
  const queryConfig: ProductListConfig = { limit: '20', page: '1', category: product?.category._id }
  const { data: productData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig)
    }
    //staleTime: 5 * 60 * 1000
  })
  console.log('category', productData)
  //slider images
  const [currentIndexImages, setCurrentIndexImages] = useState([0, 5])
  const [activeImage, setActiveImage] = useState('')

  const currentImages = useMemo(
    () => (product ? product.images.slice(...currentIndexImages) : []),
    [product, currentIndexImages]
  )

  useEffect(() => {
    if (product && product.images.length > 0) {
      setActiveImage(product.images[0])
    }
  }, [product])

  const next = () => {
    if (product && currentIndexImages[1] < product.images.length) {
      setCurrentIndexImages((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }

  const prev = () => {
    if (currentIndexImages[0] > 0) {
      setCurrentIndexImages((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }

  const chooseActive = (img: string) => {
    setActiveImage(img)
  }
  if (!product) return null
  return (
    <div className='w-max-7xl bg-gray-200 py-4'>
      <div className=' grid grid-cols-12 m-8  shadow bg-white p-8'>
        <div className=' col-span-4'>
          <div className='w-full pt-[100%] relative  border-b-2 border-gray-300'>
            <img
              className='absolute top-0 left-0 bg-white w-full h-full object-cover'
              src={activeImage}
              alt={product.name}
            />
          </div>
          <div className='relative grid grid-cols-5 mt-2 gap-x-1 '>
            <button className='absolute bg-gray-400 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
                onClick={prev}
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
              </svg>
            </button>
            {currentImages.map((img) => {
              const isActive = img === activeImage
              return (
                <div
                  key={img}
                  className=' col-span-1 w-full pt-[100%] relative  border border-gray-300 cursor-pointer'
                  onMouseEnter={() => chooseActive(img)}
                >
                  <img
                    className='absolute top-0 left-0 bg-white w-full h-full object-cover'
                    src={img}
                    alt={product.name}
                  />
                  {isActive && <div className='absolute inset-0 border-2 border-orange' />}
                </div>
              )
            })}

            <button className='absolute right-0 bg-gray-400 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
                onClick={next}
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
              </svg>
            </button>
          </div>

          <div></div>
        </div>
        <div className='col-span-8 ml-8'>
          <div className='text-xl'>{product.name}</div>

          <div className='flex mt-2 items-center '>
            <div className=' text-red-500 mr-2 underline'>{product.rating}</div>
            <ProductRating2 rating={product.rating} />

            <div className='flex pl-4  ml-4 py-1 border-l border-l-gray-400'>
              <span>{product.sold}</span>
              <span className='text-gray-500 ml-2'>Đã bán</span>
            </div>
          </div>

          <div className='flex mt-8 items-center'>
            <div className='text-2xl text-gray-300 mr-4 line-through'>
              ₫{formatCurrency(product.price_before_discount)}
            </div>
            <div className='text-3xl text-orange'>₫{formatCurrency(product.price)}</div>
            <div className='text-sm ml-8 p-1 bg-orange text-white uppercase'>
              {Math.round(((product.price_before_discount - product.price) / product.price_before_discount) * 100)}%Giảm
            </div>
          </div>

          <div className='flex items-center mt-4'>
            <span className='text-gray-500 mr-8'>Số lượng:</span>

            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-8 h-8 border border-gray-400 text-gray-500 cursor-pointer'
              //onClick={handleMinus}
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 12h-15' />
            </svg>
            <input defaultValue={1} className=' h-8 w-8 border border-gray-400 text-gray-500 text-center' type='text' />
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-8 h-8 border border-gray-400 text-gray-500 cursor-pointer'
              //onClick={handlePlus}
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
            </svg>

            <span className='text-gray-400 text-sm ml-8'>{product.quantity} sản phẩm có sẵn</span>
          </div>

          <div className='flex mt-8'>
            <div className='flex bg-yellow-100 p-4 border rounded-sm mr-4 cursor-pointer'>
              <svg
                enableBackground='new 0 0 15 15'
                viewBox='0 0 15 15'
                x={0}
                y={0}
                className='mr-[10px] h-5 w-5 fill-current stroke-orange text-orange'
              >
                <g>
                  <g>
                    <polyline
                      fill='none'
                      points='.5 .5 2.7 .5 5.2 11 12.4 11 14.5 3.5 3.7 3.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeMiterlimit={10}
                    />
                    <circle cx={6} cy='13.5' r={1} stroke='none' />
                    <circle cx='11.5' cy='13.5' r={1} stroke='none' />
                  </g>
                  <line fill='none' strokeLinecap='round' strokeMiterlimit={10} x1='7.5' x2='10.5' y1={7} y2={7} />
                  <line fill='none' strokeLinecap='round' strokeMiterlimit={10} x1={9} x2={9} y1='8.5' y2='5.5' />
                </g>
              </svg>
              <div className='h-1 text-orange hover:opacity-60'>Thêm Vào Giỏ Hàng</div>
            </div>
            <div className=' bg-orange py-4 px-6 text-white border rounded-sm cursor-pointer hover:opacity-70'>
              Mua Ngay
            </div>
          </div>
        </div>
      </div>

      <div className='shadow bg-white m-8 p-8 mt-4'>
        <div className='text-2xl uppercase'>Mô tả sản phẩm</div>
        <div className='text-sm my-8 '>
          <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description) }} />
        </div>
      </div>

      <div className='shadow bg-white m-8 p-8 mt-4'>
        <div className='text-2xl uppercase'>Sản phẩm có thể bạn quan tâm</div>
        <div className='text-sm my-8 '>
          {productData && (
            <div className='col-span-9 flex flex-col'>
              <div className='grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 lg:grid-cols-6 gap-4 mt-8'>
                {productData.data.data.products.map((product) => (
                  <div key={product._id}>
                    <Product product={product} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
