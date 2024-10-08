import React from 'react'
import FeedbackTable from '../../components/feedback/FeedbackTable'

export const FeedbackPage = () => {
  return (
    <div className='w-full'>
        <h1 className='text-lg font-bold'>Feedback Management</h1>
        <FeedbackTable/>
    </div>
  )
}
