import React from 'react'

const WelcomeComponent:React.FC<{title:string,description:string}> = ({title,description}) => {
  return (
    <div>
    <h1 className="text-3xl font-semibold">{title}</h1>
    <p className="text-sm text-gray-500 mt-3">{description}</p>
  </div>
  )
}

export default WelcomeComponent