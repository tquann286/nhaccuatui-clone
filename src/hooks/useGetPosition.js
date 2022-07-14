import { useLayoutEffect } from 'react'

const useGetPosition = (ref, handle, showModal) => {
  useLayoutEffect(() => {
    if (ref) {
			const { right } = ref.current.getBoundingClientRect()
			const top = ref.current.offsetTop
      handle(right, top)
    }
  }, [showModal])
}

export default useGetPosition
