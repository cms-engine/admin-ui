'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import styles from './BrandsPage.module.css'
import { deleteBrand, fetchBrandById, saveBrand } from '@/api/brandsService'
import React from 'react'
/**
 * EditBrandPage component for editing or deleting an existing brand.
 *
 * @param {Object} props - The props object.
 * @param {Object} props.params - The route parameters.
 * @param {string} props.params.id - The ID of the brand being edited.
 * @returns {React.ReactElement} The EditBrandPage component.
 */

const EditBrandPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter()
  const { id } = params

  const [brand, setBrand] = useState({ id: Number(id), name: '' })
  const [error, setError] = useState<string | null>(null)
  /**
   * Fetches the brand details using the ID from the API and updates the local state.
   * This function runs automatically when the component mounts or when the `id` changes.
   *
   * @async
   * @returns {Promise<void>} Resolves when the brand data is fetched or an error occurs.
   */
  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const data = await fetchBrandById(Number(id))
        setBrand(data)
      } catch (err) {
        console.error(err)
        setError('Failed to fetch brand.')
      }
    }
    void fetchBrand()
  }, [id])
  /**
   * Handles input changes and updates the `brand` state.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event from the input field.
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBrand({ ...brand, [e.target.name]: e.target.value })
  }
  /**
   * Saves the brand details to the API and redirects to the brands page on success.
   *
   * @async
   * @throws Will log an error to the console and display an error message if saving fails.
   */
  const handleSave = async () => {
    try {
      await saveBrand(brand)
      router.push('/brands') // Redirect to brands list
    } catch (err) {
      console.error(err)
      setError('Failed to save brand.')
    }
  }
  /**
   * Deletes the brand from the API and redirects to the brands page on success.
   * Prompts the user for confirmation before proceeding with the deletion.
   *
   * @async
   * @throws Will log an error to the console and display an error message if deletion fails.
   */
  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this brand?')) {
      try {
        await deleteBrand(Number(id))
        router.push('/brands') // Redirect to brands list
      } catch (err) {
        console.error(err)
        setError('Failed to delete brand.')
      }
    }
  }

  return (
    <div className={styles.container}>
      <h2>Edit Brand</h2>
      {error && <p className={styles.error}>{error}</p>}
      <p className={styles.label}>ID: {id}</p>
      <form className={styles.form}>
        <label htmlFor='name'>
          Name <span className={styles.mandatory}>*</span>
        </label>
        <input
          type='text'
          id='name'
          name='name'
          value={brand.name}
          onChange={handleInputChange}
          maxLength={255}
          required
        />
      </form>
      <div className={styles.actions}>
        <button className={styles.deleteButton} onClick={handleDelete}>
          Delete
        </button>
        <button className={styles.saveButton} onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  )
}

export default EditBrandPage
