import React from 'react'
import DataRow from './DataRow'
import { FormattedMessage } from 'react-intl'

export default function DataTable(props) {
  const { handleSortChange, sortField, sortOrder, handleActionClick, type } = props
  return (
    <React.Fragment>
      <div className="data-table">
        <table className="table table-striped ">
          <thead>
            <tr style={{ textAlign: 'left' }}>
              <th><FormattedMessage id="action" defaultMessage="Action"/></th>
              <th
                onClick={() => {
                  handleSortChange('user_id')
                }}
              >
                <FormattedMessage id="id" defaultMessage="ID"/>{' '}
                {sortField === 'user_id' ? (
                  <i
                    className={`fas fa-angle-${
                      sortOrder === 0 ? 'up' : 'down'
                    }`}
                  ></i>
                ) : (
                  ''
                )}
              </th>
              <th
                onClick={() => {
                  handleSortChange('full_name')
                }}
              >
                <FormattedMessage id="name" defaultMessage="Name"/>{' '}
                {sortField === 'full_name' ? (
                  <i
                    className={`fas fa-angle-${
                      sortOrder === 0 ? 'up' : 'down'
                    }`}
                  ></i>
                ) : (
                  ''
                )}
              </th>
              <th
                onClick={() => {
                  handleSortChange('email')
                }}
              >
                <FormattedMessage id="email" defaultMessage="Email"/>{' '}
                {sortField === 'email' ? (
                  <i
                    className={`fas fa-angle-${
                      sortOrder === 0 ? 'up' : 'down'
                    }`}
                  ></i>
                ) : (
                  ''
                )}
              </th>

              <th
                onClick={() => {
                  handleSortChange('email')
                }}
              >
                <FormattedMessage id="dateOfBirth" defaultMessage="Date Of Birth"/>{' '}
                {sortField === 'email' ? (
                  <i
                    className={`fas fa-angle-${
                      sortOrder === 0 ? 'up' : 'down'
                    }`}
                  ></i>
                ) : (
                  ''
                )}
              </th>

              <th
                onClick={() => {
                  handleSortChange('country')
                }}
              >
                <FormattedMessage id="country" defaultMessage="Country"/>{' '}
                {sortField === 'country' ? (
                  <i
                    className={`fas fa-angle-${
                      sortOrder === 0 ? 'up' : 'down'
                    }`}
                  ></i>
                ) : (
                  ''
                )}
              </th>
              {/* <th
                onClick={() => {
                  handleSortChange('language')
                }}
              >
                Language   {sortField === 'language' ? (
                  <i
                    className={`fas fa-angle-${
                      sortOrder === 0 ? 'up' : 'down'
                    }`}
                  ></i>
                ) : (
                  ''
                )}
              </th> */}
              <th
                onClick={() => {
                  handleSortChange('app_version')
                }}
              >
                <FormattedMessage id="appVersion" defaultMessage="App Version"/>{' '}
                {sortField === 'app_version' ? (
                  <i
                    className={`fas fa-angle-${
                      sortOrder === 0 ? 'up' : 'down'
                    }`}
                  ></i>
                ) : (
                  ''
                )}
              </th>
              <th
                onClick={() => {
                  handleSortChange('device_type')
                }}
              >
                <FormattedMessage id="device" defaultMessage="Device"/>{' '}
                {sortField === 'device_type' ? (
                  <i
                    className={`fas fa-angle-${
                      sortOrder === 0 ? 'up' : 'down'
                    }`}
                  ></i>
                ) : (
                  ''
                )}
              </th>
              {/* <th>
              <FormattedMessage id="profilePercent" defaultMessage="Profile %"/>{' '}
                {sortField === 'profile' ? (
                  <i
                    className={`fas fa-angle-${
                      sortOrder === 0 ? 'up' : 'down'
                    }`}
                  ></i>
                ) : (
                  ''
                )}
              </th> */}
              <th
                onClick={() => {
                  handleSortChange('phone')
                }}
              >
                <FormattedMessage id="phone" defaultMessage="Phone"/>{' '}
                {sortField === 'phone' ? (
                  <i
                    className={`fas fa-angle-${
                      sortOrder === 0 ? 'up' : 'down'
                    }`}
                  ></i>
                ) : (
                  ''
                )}
              </th>
              <th
                onClick={() => {
                  handleSortChange('auth_type')
                }}
              >
                <FormattedMessage id="regType" defaultMessage="Reg. Type"/>{' '}
                {sortField === 'auth_type' ? (
                  <i
                    className={`fas fa-angle-${
                      sortOrder === 0 ? 'up' : 'down'
                    }`}
                  ></i>
                ) : (
                  ''
                )}
              </th>
              <th
                onClick={() => {
                  handleSortChange('signup_date')
                }}
              >
                <FormattedMessage id="regDate" defaultMessage="Reg. Date"/>{'\u00A0'}
                {sortField === 'signup_date' ? (
                  <i
                    className={`fas fa-angle-${
                      sortOrder === 0 ? 'up' : 'down'
                    }`}
                  ></i>
                ) : (
                  ''
                )}
              </th>
              <th
                onClick={() => {
                  handleSortChange('is_enabled')
                }}
              >
                <FormattedMessage id="status" defaultMessage="Status"/>
                {sortField === 'is_enabled' ? (
                  <i
                    className={`fas fa-angle-${
                      sortOrder === 0 ? 'up' : 'down'
                    }`}
                  ></i>
                ) : (
                  ''
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {props.users.map((user) => {
              return (
                <DataRow
                  key={user.user_id}
                  user={user}
                  dropdownMenu={props.dropdownMenu}
                  handleActionClick={handleActionClick}
                  type={type}
                />
              )
            })}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  )
}
