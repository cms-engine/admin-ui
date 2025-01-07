'use client'

import Layout from '@/components/Layout/Layout'
import { JSX, useEffect, useState } from 'react'
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

/**
 * Props for the BrandRow component.
 */
interface BrandRowProps {
  brand: Brand
  onDelete: (id: number) => void
}
/**
 * Renders a single row in the brands table.
 *
 * @param {BrandRowProps} props - The props for the component.
 * @returns {JSX.Element} The rendered row component.
 */
const BrandRow = ({ brand, onDelete }: BrandRowProps): JSX.Element => (
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
/**
 * Component for rendering the Brands Page, which includes a table of brands,
 * loading states, and error handling.
 *
 * @returns {JSX.Element} The Brands Page component.
 */
const BrandPage = (): JSX.Element => {
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
