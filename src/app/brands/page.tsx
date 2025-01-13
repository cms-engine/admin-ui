'use client'
import React, { useEffect, useState } from 'react'
import {
  Button,
  CircularProgress,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from '@mui/material'
import { deleteBrand, fetchBrands } from '@/api/brandsService'
import { useRouter } from 'next/navigation'
interface Brand {
  id: number
  name: string
}

const BrandPage = () => {
  const [brands, setBrands] = useState<Brand[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchAndSetBrands = async () => {
      try {
        const data = await fetchBrands()
        setBrands(data.content)
        setIsLoading(false)
      } catch {
        setIsLoading(false)
      }
    }

    void fetchAndSetBrands()
  }, [])

  const handleDelete = async (id: number) => {
    try {
      await deleteBrand(id)
      setBrands((prev) => prev.filter((b) => b.id !== id))
    } catch {}
  }

  if (isLoading) return <CircularProgress />

  return (
    <Container maxWidth='md'>
      <Typography variant='h4' gutterBottom>
        Brands
      </Typography>
      <Button
        variant='contained'
        color='primary'
        onClick={() => router.push('/brands/create')}
      >
        Create
      </Button>
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {brands.map((brand) => (
              <TableRow key={brand.id}>
                <TableCell>{brand.id}</TableCell>
                <TableCell>{brand.name}</TableCell>
                <TableCell>
                  <Button
                    variant='contained'
                    onClick={() => router.push(`/brands/${brand.id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant='contained'
                    color='error'
                    onClick={() => handleDelete(brand.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default BrandPage
