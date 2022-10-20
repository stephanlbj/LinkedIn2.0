import React from 'react'
import Header from './Header'

const Main = ({children}:{children:React.ReactNode}) => {
  return (
    <div>
      <head>
      <Header/> 
      </head>
<main>
    {children}
</main>
    </div>
  )
}

export default Main