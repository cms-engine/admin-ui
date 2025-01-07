'use client'

import Layout from '@/components/Layout/Layout'
import { useEffect, useState } from 'react'
import { fetchBrands } from '@/api/brandsService'
import styles from './BrandsPage.module.css'
type Brand = {
  id: number
  name: string
}

type FetchBrandsResponse = {
  content: Brand[]
  totalPages: number
}

const BrandRow = ({
  brand,
  onDelete,
}: {
  brand: Brand
  onDelete: (id: number) => void
}) => (
  <tr key={brand.id}>
    <td>{brand.id}</td>
    <td>{brand.name}</td>
    <td style={{ textAlign: 'center' }}>
      <button
        className={styles.actionButton}
        onClick={() => onDelete(brand.id)}
      >
        Delete
      </button>
    </td>
  </tr>
)

const BrandPage = () => {
  const [brands, setBrands] = useState<Brand[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAndSetBrands = async () => {
      try {
        const data: FetchBrandsResponse = await fetchBrands()
        setBrands(data.content) // Use `content` here
        setIsLoading(false)
      } catch (err) {
        console.error('Failed to fetch brands', err)
        setError('Failed to fetch brands.')
        setIsLoading(false)
      }
    }

    void fetchAndSetBrands()
  }, [])

  return (
    <Layout>
      <div className={styles.container}>
        <h2 className={styles.title}>Brands Page</h2>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {brands.map((brand) => (
              <BrandRow key={brand.id} brand={brand} onDelete={() => {}} />
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  )
}

export default BrandPage
