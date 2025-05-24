import React, { useState } from 'react'
import { DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { Dialog } from '@mui/material'
import { Button } from '../ui/button'
import ReactStars from 'react-rating-stars-component'
import { Textarea } from '../ui/textarea'
import { makeAPICall } from '../../utils/api'
import { toast } from 'sonner'

const ReviewModal = ({
  open,
  onClick,
  courseId,
  userId,
  token,
}: {
  open: boolean
  onClick: () => void
  courseId: string
  userId: string
  token: string
}) => {
  const [rating, setRating] = useState<number>(0)
  const [review, setReview] = useState<string>('')

  const submitReview = () => {
    toast.loading('Submitting review...')
    makeAPICall('reviewCourse', {
      rating,
      courseId,
      userId
    }, token).then((res: any) => {
      console.log("review res", res)
      if (res.error || res.errorMessage) {
        toast.dismiss()
        toast.error('Something went wrong')
      } else {
        toast.dismiss()
        toast.success('Thanks for your review!')
        onClick()
      }
    })
  }

  return (
    <Dialog
      open={open}
      onClose={onClick}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{'Review Course'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Please review the course and leave a review.
          <ReactStars
            count={5}
            onChange={(e) => setRating(e)}
            size={50}
            isHalf={true}
            value={rating}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            activeColor="#ffd700"
          />
          <Textarea
            placeholder="Review"
            className="mt-4"
            rows={4}
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={submitReview}
          autoFocus
        >
          Submit Review
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ReviewModal
