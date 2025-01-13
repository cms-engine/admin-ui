'use client'
import CardContainer from '@/components/Cards/CardContainer'
import Layout from '@/components/Layout/Layout'
import DataTable from '@/components/Table/DataTable'
import AreaChart from '@/components/Charts/AreaChart'
import BarChart from '@/components/Charts/BarChart'
import styles from './page.module.css'

export default function Home() {
  return (
    <Layout>
      <h1>Dashboard</h1>
      <CardContainer />
      <div className={styles.chartContainer}>
        <div className={styles.chartWrapper}>
          <AreaChart />
        </div>
        <div className={styles.chartWrapper}>
          <BarChart />
        </div>
      </div>
      <DataTable />
    </Layout>
  )
}
