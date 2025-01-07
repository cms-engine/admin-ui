export interface Brand {
  id: number
  name: string
}

export interface FetchBrandsResponse {
  content: Brand[]
  totalPages: number
  totalElements: number
  size: number
  number: number
}
