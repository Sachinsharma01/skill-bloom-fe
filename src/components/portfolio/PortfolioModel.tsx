import React, { useEffect, useRef } from 'react'
import { Button } from '../ui/button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { makeAPICall } from '../../utils/api'
import { useSelector, useDispatch } from 'react-redux'
import { redirect } from 'react-router-dom'
import config from '../../config'
import static_resource from '../../static/static_resource.json'
import { toast } from 'sonner'
import metaDataActions from '../../redux/actions/metaDataActions'

const PortfolioModel = ({ onClick, open }: { onClick: () => void; open: boolean }) => {
  const { token } = useSelector((state: any) => state.tokenReducer)
  const { user } = useSelector((state: any) => state.metaDataReducer)
  const dispatch = useDispatch()
  const rzp1Ref = useRef<any>(null)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = static_resource.razorpayScript
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const handleBuyPortfolioAccess = () => {
    makeAPICall(
      'createOrder',
      {
        course_id: '6', //? for testing purpose
        amount: 1000,
        user_id: user?.id + '',
      },
      token as string,
    )
      .then((order: any) => {
        console.log('order', order)

        const options = {
          key: config.razorpay.razorpayKey,
          currency: static_resource.currency,
          name: static_resource.companyName,
          image: static_resource.logoUrl,
          prefill: {
            name: user?.name ?? 'Demo User',
            email: user?.email ?? 'demo@gmail.com',
            contact: user?.mobile_number ?? '9999999999',
          },
          notes: {
            address: user?.address ?? 'India',
          },
          theme: static_resource.theme,
          amount: 1000, // amount in paisa
          description: 'Portfolio Access',
          order_id: order.id,
          handler: async function (response: any) {
            try {
              toast.loading('Processing payment please wait...')
              const res = await makeAPICall(
                'grantPortfolioAccess',
                {
                  id: user?.id + '',
                },
                token as string,
              )
              console.log('res', res)
              if (res.message || res.error || res.errorMessage) {
                toast.error(res.message || res.error || res.errorMessage)
              } else {
                dispatch(
                  metaDataActions.setMetaData({
                    ...user,
                    portfolio_access: true,
                  }),
                )
                toast.success('Purchase successful')
                rzp1Ref.current.close()
                onClick()
              }
            } catch (error) {
              toast.error('Failed to update order')
              console.error('Order update failed:', error)
            }
          },
          modal: {
            ondismiss: function () {
              toast.error('Payment cancelled')
            },
          },
        }

        rzp1Ref.current = new (window as any).Razorpay(options)
        rzp1Ref.current.open()
      })
      .catch((error: any) => {
        toast.error('Failed to create order')
        console.error('Order creation failed:', error)
      })
  }

  const handleViewSample = () => {
    onClick()
    window.open(`${config.skillbloom_portfoilo_url}/portfolio/6817dc2877afb432eed5b516`, '_blank')
  }

  return (
    <Dialog
      open={open}
      onClose={onClick}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Oops! You don't have access to this portfolio."}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Looks like you don't have access to this portfolio, you are missing out on some great opportunities. A good
          portfolio is a good way to start your journey in the world of trading.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outline"
          onClick={handleViewSample}
        >
          View Sample
        </Button>
        <Button
          onClick={handleBuyPortfolioAccess}
          autoFocus
        >
          Get Access
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default PortfolioModel
