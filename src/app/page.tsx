'use client'
import Layout from '@/components/src/components/Layout/Layout'
import CardContainer from '@/components/src/components/Cards/CardContainer'
import DataTable from '@/components/src/components/Table/DataTable'

export default function Home() {
  return (
    <Layout>
      <h1>Dashboard</h1>
      <CardContainer />
      <DataTable />
    </Layout>
  )
}
