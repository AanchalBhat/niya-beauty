import React from 'react'

export default function Breadcrumbs({ text }) {
  return (
    <div>
      <div class="head-bar flex-content">
        <div class="breadcrumb">
          <p>
            {/* Artist Management {'>'} User Profile {'>'} <b>Gallery</b> */}
            {text}
          </p>
        </div>
      </div>
    </div>
  )
}
