import React from 'react'

const DataTable: React.FC = () => {
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
