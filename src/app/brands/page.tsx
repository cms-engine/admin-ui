'use client'

import Layout from '@/components/Layout/Layout'
import { JSX, useEffect, useState } from 'react'
import { deleteBrand, fetchBrands } from '@/api/brandsService'
import styles from './BrandsPage.module.css'
import { useRouter } from 'next/navigation'

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

const BrandRow = ({ brand, onDelete }: BrandRowProps): JSX.Element => {
  const router = useRouter()

  return (
    <tr key={brand.id}>
      <td>{brand.id}</td>
      <td>{brand.name}</td>
      <td style={{ textAlign: 'center' }}>
        <button
          className={styles.actionButton}
          onClick={() => router.push(`/brands/${brand.id}`)}
        >
          Edit
        </button>
        <button
          className={styles.actionButton}
          onClick={() => {
            if (confirm('Are you sure you want to delete this brand?')) {
              onDelete(brand.id)
            }
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  )
}
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
  const [sortColumn, setSortColumn] = useState<'id' | 'name'>('id')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const router = useRouter()

  useEffect(() => {
    const fetchAndSetBrands = async () => {
      try {
        const data: FetchBrandsResponse = await fetchBrands()
        setBrands(data.content)
        setIsLoading(false)
      } catch (err) {
        console.error('Failed to fetch brands', err)
        setError('Failed to fetch brands.')
        setIsLoading(false)
      }
    }

    void fetchAndSetBrands()
  }, [])

  // Handle sorting
  const handleSort = (column: 'id' | 'name') => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortOrder('asc')
    }
  }

  // Delete a brand
  const handleDelete = async (id: number) => {
    try {
      await deleteBrand(id)
      setBrands((prevBrands) => prevBrands.filter((brand) => brand.id !== id))
    } catch (err) {
      console.error('Failed to delete brand', err)
      setError('Failed to delete brand.')
    }
  }

  // Sort brands dynamically
  const sortedBrands = [...brands].sort((a, b) => {
    if (sortColumn === 'id') {
      return sortOrder === 'asc' ? a.id - b.id : b.id - a.id
    } else {
      return sortOrder === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    }
  })

  return (
    <Layout>
      <div className={styles.container}>
        <h2 className={styles.title}>Brands</h2>
        <button
          className={styles.createButton}
          onClick={() => router.push('/brands/create')}
        >
          Create
        </button>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <table className={styles.table}>
          <thead>
            <tr>
              <th
                onClick={() => handleSort('id')}
                style={{ cursor: 'pointer' }}
              >
                ID{' '}
                {sortColumn === 'id' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th
                onClick={() => handleSort('name')}
                style={{ cursor: 'pointer' }}
              >
                Name{' '}
                {sortColumn === 'name' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedBrands.map((brand) => (
              <BrandRow key={brand.id} brand={brand} onDelete={handleDelete} />
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  )
}

export default BrandPage
