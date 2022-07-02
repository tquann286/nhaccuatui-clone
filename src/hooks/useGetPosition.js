import { useEffect } from 'react'

const useGetPosition = (ref, handle) => {
  useEffect(() => {
    if (ref) {
			const { right } = ref.current.getBoundingClientRect()
			const top = ref.current.offsetTop
      handle(right, top)
    }
  }, [ref, handle])
}

export default useGetPosition