import { useQuery } from '@tanstack/react-query'
//import { omitBy, isUndefined } from 'lodash'
import AsideFilter from 'src/components/Products/AsideFilter'
import SortProductList from 'src/components/Products/SortProductList'
import productApi from 'src/apis/product.api'
//import useQueryParams from 'src/hooks/useQueryParams'
import Product from 'src/components/Products/Product'
import Pagination from 'src/components/Pagination'
import categoryAPI from 'src/apis/categories'
import configQuery from 'src/hooks/configQuery'

export default function ProductList() {
  const queryConfig = configQuery()
  const { data: productData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig)
    },
    keepPreviousData: true
  })

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
