'use client'
import CardContainer from '@/components/Cards/CardContainer'
import Layout from '@/components/Layout/Layout'
import DataTable from '@/components/Table/DataTable'
import { JSX } from 'react'

/**
 * The `Home` component is the main dashboard page that renders a layout
 * consisting of a title, a card container, and a data table.
 *
 * This component uses the following:
 * - `Layout` for wrapping its children within a consistent page structure.
 * - `CardContainer` to display cards on the dashboard.
 * - `DataTable` to show tabular data on the dashboard.
 *
 * @returns {JSX.Element} The `Home` component.
 */
export default function Home(): JSX.Element {
  return (
    <Layout>
      <h1>Dashboard</h1>
      <CardContainer />
      <DataTable />
    </Layout>
  )
}
