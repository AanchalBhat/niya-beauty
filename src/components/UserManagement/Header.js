import React from 'react'

export default function Header() {
  return (
    <div>
      <div class="head-bar flex-content">
        <div class="showing flex-content">
          <p>Showing 13 of 2,345</p>
          <form class="show-enteries flex-content ml-4">
            <p>Show Enteries</p>
            <div class="form-group select mb-0 ml-2 position-relative">
              <i class="fas fa-angle-down"></i>
              <select class="form-control" id="">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
          </form>
        </div>

        <div class="filter-search ml-auto">
          <form class="flex-content ml-4">
            <div class="form-group input-group position-relative ">
              <i class="fas fa-search"></i>
              <input
                type="text"
                class="form-control pl-4"
                placeholder="Search"
              />
            </div>
            <div class="form-group mb-0 ml-2">
              <button type="button" class="btn btn-default theme-button">
                Filter
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
