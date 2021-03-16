import React, { useState, useContext, createContext } from 'react'
import DEFAULTS from '../utils/DEFAULTS'

export const DropdownOptionsContext = createContext()

export default function DropdownOptionsProvider(props) {
  const [dropdownOptions, setDropdownOptions] = useState(
    DEFAULTS['DROPDOWN_OPTIONS'],
  )

  return (
    <DropdownOptionsContext.Provider
      value={{ dropdownOptions, setDropdownOptions }}
    >
      {props.children}
    </DropdownOptionsContext.Provider>
  )
}
