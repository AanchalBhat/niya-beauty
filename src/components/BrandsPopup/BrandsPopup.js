import React from 'react'
import { Modal } from 'react-bootstrap'
import Loader from 'react-loader-spinner'
import './BrandsPopup.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import { FormattedMessage } from 'react-intl'

export default function BrandsPopup({
  show,
  handleClose,
  handleScroll,
  ownedBrands,
  brands,
  brandsLoading,
  offset,
  addToOwnedBrands,
  removeFromOwnedBrands,
  handleAddBrands,
  handleSearchTextChange,
  handleBrandsSearch,
  brandsUpdating,
  handleSearchClick,
}) {
  function isBrandAlreadyOwned(brandId) {
    return ownedBrands.some((ownedBrand) => ownedBrand.id === brandId)
  }

  const searchText = <FormattedMessage id="search" defaultMessage="Search" />

  return (
    <React.Fragment>
      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            <FormattedMessage id="brands" />
          </Modal.Title>
          <div className="ml-auto mr-2">
            <div className="form-group search position-relative">
              <FormattedMessage id="search" defaultMessage="Search">
                {(searchText) => (
                  <input
                    type="text"
                    className="form-control"
                    placeholder={searchText}
                    onChange={handleSearchTextChange}
                    onKeyDown={handleBrandsSearch}
                  />
                )}
              </FormattedMessage>

              <i
                className="fas fa-search cursor-pointer"
                onClick={handleSearchClick}
              ></i>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <form
            style={{ borderBottom: '1px solid #F5EEE7' }}
            className="brands-added-list flex-wrap  pb-3 mb-3 height-scroll brand-button"
          >
            {ownedBrands.length ? (
              ownedBrands.map((brand) => (
                <div
                  className="form-group mt-2 mr-2 text-center position-relative"
                  key={brand.id}
                >
                  <span
                    onClick={() => {
                      removeFromOwnedBrands(brand.id)
                    }}
                  >
                    &times;
                  </span>
                  <button
                    type="button"
                    className="btn btn-default selected wrap"
                  >
                    {brand.brand_name}
                  </button>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', width: '100%' }}>
                <FormattedMessage id="brands.owned.zero" />
              </div>
            )}
          </form>
          <div className="height-scroll" onScroll={handleScroll}>
            {brandsLoading && offset === 0 ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Loader
                  type="TailSpin"
                  color="#975E4A"
                  height={60}
                  width={60}
                />
              </div>
            ) : (
              <>
                <form className="brands-list  flex-wrap brand-button">
                  {brands.map((brand) => {
                    return (
                      <div
                        className="form-group mt-2 pb-3  mr-2 text-center position-relative"
                        onClick={() => {
                          addToOwnedBrands(brand)
                        }}
                        key={brand.id}
                      >
                        <span>&times;</span>
                        <button
                          type="button"
                          className="btn btn-default wrap"
                          disabled={isBrandAlreadyOwned(brand.id)}
                        >
                          {brand.brand_name}
                        </button>
                      </div>
                    )
                  })}
                </form>
                {brandsLoading ? (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <Loader
                      type="TailSpin"
                      color="#975E4A"
                      height={60}
                      width={60}
                    />
                  </div>
                ) : (
                  ''
                )}
              </>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div>
            <button
              type="button"
              className="btn btn-default theme-button"
              onClick={handleAddBrands}
            >
              {brandsUpdating ? (
                <Loader type="TailSpin" color="#fff" height={20} width={20} />
              ) : (
                <FormattedMessage id="save" defaultMessage="Save" />
              )}
            </button>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-default white-button"
              onClick={handleClose}
            >
              <FormattedMessage id="cancel" defaultMessage="Cancel" />
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  )
}
