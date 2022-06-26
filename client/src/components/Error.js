import React from 'react'

const Error = ({ message }) => {
  return (
    <div style={{ padding: '15px', fontSize: '16px', color: 'orangered' }}>
      Error:&nbsp;{message}!
    </div>
  )
}

export default Error
