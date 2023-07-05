import ProductRating from 'src/components/ProductRating'
import { Product as ProductType } from 'src/types/product.type'
import { formatCurrency } from 'src/utils/utils'
import { formatNumberToSocialStyle } from 'src/utils/utils'
import { Link } from 'react-router-dom'
import { generateNameId } from 'src/utils/utils'
interface Props {
  product: ProductType
}
export default function Product({ product }: Props) {
  return (
    <Link
      to={`/${generateNameId({ name: product.name, id: product._id })}`}
      className='bg-white shadow-sm hover:translate-y-[-0.05rem] hover:shadow-sm duration-100 overflow-hidden cursor-pointer'
    >
      <div className='w-full pt-[100%] relative'>
        <img
          className='absolute top-0 left-0 bg-white w-full h-full object-cover'
          src={product.image}
          alt={product.name}
        />
      </div>
      <div className='p2'>
        <div className='text-xs line-clamp-2 mt-4 px-2'>{product.name}</div>
        <div className='mb-4'>
          <div className='flex items-center mt-3 px-2'>
            <div className='line-through max-w-[50%] text-gray-400'>
              <span>₫</span>
              <span>{formatCurrency(product.price_before_discount)}</span>
            </div>
            <div className='max-w-[50%] text-red-500 px-2'>
              <span>₫</span>
              <span>{formatCurrency(product.price)}</span>
            </div>
          </div>
          <div className='flex items-center px-2'>
            <ProductRating rating={product.rating} />

            <div className='text-sm text-gray-600 pl-2'>
              Đã bán:
              <span className='pl-1'>{formatNumberToSocialStyle(product.sold)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
