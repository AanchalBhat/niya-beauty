import React from 'react'

export default function RowDropdownMenu() {
  return (
    <div class="dropdown">
      <button
        class="btn btn-primary dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <i class="fas fa-angle-down"></i>
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" href="#">
          <i class="fas fa-eye"></i> View User
        </a>
        <a class="dropdown-item" href="#">
          <i class="fas fa-ban"></i> Disable User
        </a>
      </div>
    </div>
  )
}
