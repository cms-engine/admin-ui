'use client'
import React, { useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '@/constants/API'

const DataTable: React.FC = () => {
  useEffect(() => {
    axios.get(`${API_URL}`)
  })
  return (
    <div className='table-container'>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Office</th>
            <th>Age</th>
            <th>Start Date</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  )
}

export default DataTable
