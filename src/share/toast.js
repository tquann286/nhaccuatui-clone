import { toast, Slide } from 'react-toastify'

// Auth Toast
export const authToastProps = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: true,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
  transition: Slide,
}

export const authToastNotify = (message, status) =>
  toast[status](message, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    transition: Slide,
  })
