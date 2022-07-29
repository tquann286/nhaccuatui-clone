import React from 'react'
import './Select.scss'

import { RiArrowDownSLine } from 'react-icons/ri'

const Select = ({ defineLang, options }) => {
  return (
    <div className="select-common-container">
      <select className='bg-color-0-02 color-0-88 border-0-05'>
        {options.map(option => (
          <option key={options.value} value={options.value} className='bg-color-0-02 color-0-88'>{defineLang(options.vi, options.en)}</option>
        ))}
      </select>
      <div className='dropdown color-0-5'>
        <RiArrowDownSLine />
      </div>
    </div>
  )
}

export default Select