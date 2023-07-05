import useQueryParams from 'src/hooks/useQueryParams'
import { omitBy, isUndefined } from 'lodash'
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
const configQuery = () => {
  const queryParams: QueryConfig = useQueryParams()
  //console.log('queryParams', queryParams)
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
  return queryConfig
}

export default configQuery
