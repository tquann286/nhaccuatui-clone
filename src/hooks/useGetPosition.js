import { useLayoutEffect } from 'react'

const useGetPosition = (ref, handle, showModal) => {
  useLayoutEffect(() => {
    if (ref) {
			const position = ref.current?.getBoundingClientRect()
			const top = ref.current?.offsetTop || ref.current?.getBoundingClientRect().y + window.pageYOffset
      handle(position?.right, top)
    }
  }, [showModal, ref])
}

export default useGetPosition
