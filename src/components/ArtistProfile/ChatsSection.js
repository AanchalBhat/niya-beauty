import React from 'react'
import chatsIcon from '../../assets/images/chats.png'

export default function ChatsSection() {
  return (
    <div className="theme-card gray-card education-sec position-relative mt-3">
      <img src={chatsIcon} />
      <div className="">
        <h6>Chats</h6>
      </div>
      <div className="center-portion">
        <h1 style={{ fontWeight: '600' }}>15</h1>
        <p>Active</p>
      </div>
      <div className="end-portion">
        <h4>22</h4>
        <p>Expired</p>
      </div>
    </div>
  )
}
