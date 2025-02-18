import React from 'react'

const User = () => {

  const userName = localStorage.getItem("name");
  return (
    <h1>Hello {userName}</h1>
  )
}

export default User