import React from 'react'
import Loader from 'react-loader-spinner'
import './LoadingSpinner.css'

export default function LoadingSpinner(props) {
  const { height, width } = props
  return (
    <div className="outer-spinner">
      <div class="spinner">
        <div class="double-bounce1"></div>
        <div class="double-bounce2"></div>
      </div>
    </div>
  )
}
