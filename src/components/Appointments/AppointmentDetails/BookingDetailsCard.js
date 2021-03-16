import React from 'react'

export default function BookingDetailsCard() {
  return (
    <div className="details-card">
      <h6>Booking Details</h6>
      <div className="flex-content">
        <div className="group w-50">
          <label>Payment Method</label>
          <p>Debit Card</p>
        </div>

        <div className="group ml-auto w-50">
          <label>Debit Card</label>
          <p>XXXX548</p>
        </div>
      </div>

      <div className="flex-content">
        <div className="group w-50">
          <label>Promo Code Used</label>
          <p>XDFRGGHSJ</p>
          <p
            style={{
              color: '#975E4A',
              fontSize: '9px',
              fontWeight: '600',
            }}
          >
            50% OFF
          </p>
        </div>

        <div className="group ml-auto w-50">
          <label>Redeemed Awards</label>
          <p>$200</p>
        </div>
      </div>

      <div className="flex-content">
        <div className="group">
          <label>Wallet Amount Used</label>
          <p>$50</p>
        </div>

        <div className="group ml-auto w-50">
          <label>Total Amount Paid</label>
          <p>$200</p>
        </div>
      </div>
    </div>
  )
}
