'use client'
import CardContainer from '@/components/Cards/CardContainer'
import Layout from '@/components/Layout/Layout'
import DataTable from '@/components/Table/DataTable'

export default function Home() {
  return (
    <Layout>
      <h1>Dashboard</h1>
      <CardContainer />
      <DataTable />
    </Layout>
  )
}
