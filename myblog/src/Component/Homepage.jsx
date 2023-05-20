import React, { useEffect, useRef, useState } from 'react'
import "../Css/Homepage.css"
import { Button, Heading, useToast  } from '@chakra-ui/react'
import { RiCloseLine } from "react-icons/ri";
import { toast } from 'react-toastify'

const Homepage = () => {
    const [apiData,setApiData]=useState([])
    const [singleData,setSingleData]=useState({})
    const [openPopup,setOpenPopup]=useState(false)
    const [page,setPage]=useState(1)
    const [allData,setAllData]=useState([])
    const [query,setQuery]=useState("")
    const totalPageRef=useRef(null)
    const [loading,setLoading]=useState(false)
    const toast = useToast()

    const alertError=(msg)=> toast.error(msg)
    const alertSuccess=(msg)=>toast.success(msg)

    useEffect(()=>{
    getData()
    getAllData()
    },[page])
   
    const getAllData=async()=>{
        let res=await fetch(`https://api.theinnerhour.com/v1/customers/resources/articles/list?page=1&limit=500`)
        let data=await res.json()
            setAllData(data.data)
    }

  const getData=async()=>{
    try{
        setLoading(true)
        let res=await fetch(`https://api.theinnerhour.com/v1/customers/resources/articles/list?page=${page}&limit=10`)
        let data=await res.json()
        setApiData(data.data) // this data is coming from api
        console.log(data)
        totalPageRef.current=data.total_page
        setLoading(false)
    }
    catch(err){
        console.log(err)
        setLoading(false)
    }
   
  }

  const getSingleData=async(slug)=>{
try{
    setLoading(true)
    let res=await fetch(`https://api.theinnerhour.com/v1/blogdetail/${slug}`)
    let data=await res.json()
     setSingleData(data.blog)
    setOpenPopup(true)
    console.log(data)
    setLoading(false)
}
catch(err){
    console.log(err)
    setLoading(false)
}
  }

  console.log("all data",allData)

  const handleSubmit=async()=>{
    setLoading(true)
    let filtered= allData.filter((el)=>{
     if(el.primary_category && el.primary_category.name ){
        return el.primary_category.name===query
     }

    
       })
       setLoading(false)
     if(filtered.length>0){
        console.log(filtered)
      setApiData(filtered)
      toast({
        title: 'Data Found.',
        description: `Your Data of Title ${query} is here...`,
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
     } else{
        toast({
            title: 'Data Not Found.',
            description: `Your Data of Title ${query} is not found...`,
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
        console.log("data not found")
     }
     setQuery("")
  }

  const getSearchData=async(query)=>{
    console.log(query)
   
   setTimeout(()=>{
    let filtered= allData.filter((el)=>{
        return el.primary_category.name==query
    
       })
       
        console.log(filtered)
   },3000)
  }
  if(loading){
    return <div class="🤚">
	<div class="👉"></div>
	<div class="👉"></div>
	<div class="👉"></div>
	<div class="👉"></div>
	<div class="🌴"></div>		
	<div class="👍"></div>
</div>
  }
  return (
    <div className='main-container'>
       <div className='headingandinput'>
        <Heading size='lg'>All articles</Heading>
       <div className='pagination'>
        <Button Disabled={page<=1 ? "true" : false} onClick={()=> setPage(prev=>prev-1)}>prev</Button>
        <Button colorScheme='teal' variant='outline'>{page}</Button>
        <Button Disabled={page===totalPageRef ? "true" : false} onClick={()=> setPage(prev=>prev+1)}>next</Button>
       </div>
        <div id='formdiv'>
        <form action="" >
         <input type="text" name="text" className="input" placeholder="Search By Title" value={query} onInput={(e)=>setQuery(e.target.value)} />
        <Button colorScheme='whatsapp' onClick={()=>handleSubmit()}>Search</Button>
         </form>
        </div>
       </div>
    <div className='container'>
    {apiData.map((el)=>{
        return (
     <div className='blogs' key={el.id} onClick={()=> getSingleData(el.slug)}>
      <img src={el.thumb} alt="picture" />
    <Heading as='h3' size='md'>
             {el.title}
  </Heading>
                <p>{el.short_description}</p>
            </div>
        )
     })}
    </div>

     <div className='popopDiv'>
        {openPopup ? <div className='darkBg'  onClick={()=>  setOpenPopup(false)}>
        <div id="popup" className='popup'>
        <img src={singleData.thumb} alt="picture" />
        <Heading as='h3' size='md'>
             {singleData.metatitle}
  </Heading>
  <p>{singleData.metadescription}</p>
  <p>{singleData.metadescription}</p>
  <p>{singleData.metadescription}</p>
  <p>{singleData.metadescription}</p>
  <button className='closeBtn' onClick={()=>  setOpenPopup(false)}>
        {/* icon */}
        <RiCloseLine></RiCloseLine>
       </button>
        </div>
        </div> : ""}
     </div>

    </div>
  )
}

export default Homepage