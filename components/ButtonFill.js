

import Link from 'next/link'
import React from 'react'

export const ButtonFill = ({children,text,...props}) => {

  return (
    <Link {...props} >
  
       {children}{text}
       </Link>
  )
}
