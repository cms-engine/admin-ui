'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import styles from '../BrandsPage.module.css'
import { saveBrand } from '@/api/brandsService'

/**
 * The page for creating a new brand.
 *
 * @returns {React.ReactElement} The CreateBrandPage component.
 */
const CreateBrandPage = () => {
  const router = useRouter()
  const [brand, setBrand] = useState({ name: '' })
  const [error, setError] = useState<string | null>(null)
  /**
   * Handles changes to the input fields in the form.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event from the input field.
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBrand({ ...brand, [e.target.name]: e.target.value })
  }
  /**
   * Handles saving the brand.
   * This function calls the API to save the brand and redirects to the brands page on success.
   * If saving fails, an error message is displayed.
   *
   * @async
   * @throws Will log an error to the console if saving fails.
   */

  const handleSave = async () => {
    try {
      await saveBrand(brand)
      router.push('/brands')
    } catch (err) {
      setError('Failed to save a brand')
      console.error(err)
    }
  }

  return (
    <div className={styles.container}>
      <h2>Create New Brand</h2>
      {error && <p className={styles.error}>{error}</p>}
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
        <button className={styles.saveButton} onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  )
}

export default CreateBrandPage
