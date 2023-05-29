import http from 'src/utils/http'
import { Category } from 'src/types/product.type'
import { SuccessResponse } from 'src/types/utils.type'

const URL = 'categories'

const categoryAPI = {
  getCategories() {
    return http.get<SuccessResponse<Category[]>>(URL)
  }
}

export default categoryAPI
