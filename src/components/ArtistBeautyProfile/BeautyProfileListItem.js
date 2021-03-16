import React from 'react'
import { FormattedMessage } from 'react-intl'
import codes from '../../utils/ArtistCodeMappingsForLang'
export default function ListItem({
  propertyName,
  stateVariable,
  keyName,
  valueName,
  toggleSelect,
}) {
  
  return (
    <li
      style={{ flexWrap: 'nowrap' }}
      className={`d-flex cursor-pointer ${
        !stateVariable.includes(keyName) ? 'unselected' : ''
      }`}
      data-propertyName={propertyName}
      data-propertyVal={keyName}
      onClick={toggleSelect}
    >
      <i
        className="fas fa-check-circle mr-2 mt-1"
        data-propertyName={propertyName}
        data-propertyVal={keyName}
        onClick={toggleSelect}
      ></i>
      <p
        data-propertyName={propertyName}
        data-propertyVal={keyName}
        onClick={toggleSelect}
      >
        <FormattedMessage id={codes[keyName]} defaultMessage={valueName} />
      </p>
    </li>
  )
}
