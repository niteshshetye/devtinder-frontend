import { useCallback, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { REQUESTS_URLS, USER_URLS } from '../../config/api.js'
import UserCard from '../../components/UserCard.jsx'
import useToast from '../../hooks/useToast.jsx'

const FeedPage = () => {
  const [feeds, setFeeds] = useState([])
  const [loading, setLoading] = useState(false)
  const [pageNumber, setPageNumber] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [userActionLoading, setUserActionLoading] = useState(false)
  
  const controllerRef = useRef(null)
  
  const { renderToast, showToast, notifiyToast } = useToast()
  
  const calculateTotalPages = (total = 0, limit = 0) => Math.ceil(total / limit)
  
  const handleUserConnection = async (status = '', userId = '') => {
    setUserActionLoading(true)
    
    try {
      const { data: response = {} } = await axios.post(`${REQUESTS_URLS.CREATE_CONNECTIONS}/${status}/${userId}`, {}, { withCredentials: true })
      const { data = {}, message = '' } = response
      const { receiverUserId = '' } = data
      
      if (!receiverUserId) return
      
      notifiyToast(message)
      
      setFeeds(prevFeed => prevFeed.filter(({ _id = '' }) => _id !== receiverUserId))
      
      if (feeds.length === 1 && pageNumber !== totalPages) {
        await fetchFeeds(pageNumber + 1)
      }
      
    } catch (e) {
      console.error('Error While handling user connection', e)
      notifiyToast(e?.message || 'Something went wrong')
    } finally {
      setUserActionLoading(false)
    }
  }
  
  const fetchFeeds = useCallback(async (page = 1, limit = 10) => {
    controllerRef.current && controllerRef.current?.abort()
    
    setLoading(true)
    
    try {
      controllerRef.current = new AbortController()
      
      const { data: response = {} } = await axios.get(USER_URLS.HOME_FEED, {
        withCredentials: true,
        params: { page, limit },
        signal: controllerRef.current.signal,
      })
      const { data = [], totaUsers = 0 } = response
      
      const totalPages = calculateTotalPages(totaUsers, limit)
      
      setFeeds(preValue => [...preValue, ...data])
      setPageNumber(page)
      setTotalPages(totalPages)
    } catch (e) {
      if (axios.isCancel(e)) {
        console.log('Request canceled', e.message)
      } else {
        console.log('Error while fetching feed data: ', e)
        notifiyToast(e?.message || 'Could not fetch feed data')
      }
    } finally {
      setLoading(false)
    }
  }, [])
  
  // Load Initially
  useEffect(() => {
    fetchFeeds()
  }, [])
  
  if (loading && !feeds.length) {
    return (
      <div className="flex justify-center items-center h-full">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    )
  }
  
  if (!feeds.length) {
    return <div className="flex items-center justify-center">
      <p className="text-2xl font-semibold">Your Feed Is Empty</p>
    </div>
  }
  
  return <div className="w-screen flex flex-col items-center justify-center">
    <UserCard {...[0]} isLoading={userActionLoading} handleUserConnection={handleUserConnection}/>
    {showToast && renderToast()}
  </div>
  
}

export default FeedPage
