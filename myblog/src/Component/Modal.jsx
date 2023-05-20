import React, { useEffect, useState } from 'react'

const Modal = ({slug}) => {
    const [singleData,setSingleData]=useState({})

    useEffect(()=>{
       getSingleData()
    },[])

    const getSingleData=async()=>{
        let res=await fetch(`https://api.theinnerhour.com/v1/blogdetail/${slug}`)
        let data=await res.json()
         setSingleData(data.blog)
        console.log(data)
         }
  return (
    <div>Modal</div>
  )
}

export default Modal