import { useQuery } from '@tanstack/react-query'
import { omitBy, isUndefined } from 'lodash'
import AsideFilter from 'src/components/Products/AsideFilter'
import SortProductList from 'src/components/Products/SortProductList'
import productApi from 'src/apis/product.api'
import useQueryParams from 'src/hooks/useQueryParams'
import Product from 'src/components/Products/Product'
import Pagination from 'src/components/Pagination'
import categoryAPI from 'src/apis/categories'

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
export default function ProductList() {
  const queryParams: QueryConfig = useQueryParams()
  console.log('queryParams', queryParams)
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit,
      sort_by: queryParams.sort_by,
      order: queryParams.order,
      exclude: queryParams.exclude,
      rating_filter: queryParams.rating_filter,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      category: queryParams.category
    },
    isUndefined
  )
  //console.log('queryConfig', queryConfig)

  const { data: productData } = useQuery({
    queryKey: ['products', queryParams],
    queryFn: () => {
      return productApi.getProducts(queryParams)
    },
    keepPreviousData: true
  })
  //console.log('data', data)
  const { data: categoryData } = useQuery({
    queryKey: ['category'],
    queryFn: () => {
      return categoryAPI.getCategories()
    }
  })

  console.log('category', categoryData?.data.data)
  return (
    <div className='max-w-7xl grid grid-cols-12'>
      <div className='col-span-3'>
        <AsideFilter queryConfig={queryConfig} categories={categoryData?.data.data || []} />
      </div>
      {productData && (
        <div className='col-span-9 flex flex-col'>
          <SortProductList queryConfig={queryConfig} pageSize={productData.data.data.pagination.page_size} />
          <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 lg:grid-cols-5 gap-4 mt-8'>
            {productData.data.data.products.map((product) => (
              <div key={product._id}>
                <Product product={product} />
              </div>
            ))}
          </div>
          <Pagination queryConfig={queryConfig} pageSize={productData.data.data.pagination.page_size} />
        </div>
      )}
      {/*{!productData && (
        <div className='col-span-9 flex flex-col'>
          <span>Rất đáng tiếc không tìm thấy sản phẩm!</span>
        </div>
      )}*/}
    </div>
  )
}
