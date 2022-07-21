import { useLayoutEffect } from 'react'

const useGetFixedPosition = (ref, handle, showModal) => {
  useLayoutEffect(() => {
    if (ref) {
			const { right } = ref.current?.getBoundingClientRect()
			const top = ref.current?.offsetTop
      handle(right, top)
    }
  }, [showModal, ref])
}

export default useGetFixedPosition
