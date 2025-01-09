import { axiosInstance } from './axiosInstance'

type Brand = {
  id: number
  name: string
}

type FetchBrandsResponse = {
  content: Brand[]
  totalPages: number
}
export const saveBrand = async (brand: { id?: number; name: string }) => {
  if (brand.id) {
    await axiosInstance.put(`/admin/brands/${brand.id}`, brand)
  } else {
    await axiosInstance.post('/admin/brands', brand)
  }
}
export const fetchBrands = async (): Promise<FetchBrandsResponse> => {
  const requestBody = {
    page: 1,
    size: 100,
    sorts: [],
    filters: [],
  }

  try {
    const response = await axiosInstance.post(
      '/admin/brands/search',
      requestBody,
    )

    return {
      content: response.data.data,
      totalPages: Math.ceil(response.data.totalElements / response.data.size),
    }
  } catch (error) {
    console.error('Error fetching brands:', error)
    throw error
  }
}
export const deleteBrand = async (id: number) => {
  await axiosInstance.delete(`/admin/brands/${id}`)
}
export const fetchBrandById = async (id: number) => {
  const response = await axiosInstance.get(`/admin/brands/${id}`)
  return response.data
}
