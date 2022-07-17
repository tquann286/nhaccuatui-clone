import { useLayoutEffect } from 'react'

const useGetPosition = (ref, handle, showModal) => {
  useLayoutEffect(() => {
    if (ref) {
			const { right } = ref.current.getBoundingClientRect()
			const top = ref.current.offsetTop || ref.current.getBoundingClientRect().y + window.pageYOffset
      handle(right, top)
    }
  }, [showModal, ref])
}

export default useGetPosition
