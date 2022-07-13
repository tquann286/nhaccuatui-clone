import { toast, Slide } from 'react-toastify'

// Auth Toast
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
