import React from 'react'

const Footer = () => {
  return (
    <footer className="info">
      <p>Click to edit a todo</p>
      <p>
        Created by <a href="https://d12n.me/">Dmitry Sharabin</a>
      </p>
      <p>
        Edited by
        <a href="https://github.com/sametkoyuncu">Samet Koyuncu</a>
      </p>
    </footer>
  )
}

export default React.memo(Footer)
