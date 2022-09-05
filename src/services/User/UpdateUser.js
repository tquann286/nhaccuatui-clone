const arrOfInt = (first, last) => {
  const list = []
  for (let i = first; i <= last; i++) {
    list.push(i >= 10 ? i : `0${i}`)
  }

  return list
}

const dayArr = arrOfInt(1, 30)

const monthArr = arrOfInt(1, 12)

const yearArr = arrOfInt(1960, new Date().getFullYear())

export { dayArr, monthArr, yearArr }

export const genderArr = [
  'Nam', 'Nữ', 'Khác'
]