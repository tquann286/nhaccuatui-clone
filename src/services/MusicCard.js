export const detectZ = (index) => {
  if (index === 0) {
    return 3
  } else if (index === 1) {
    return 2
  } else {
    return 1
  }
}

export const createTop20Url = (category) => {
  if (category) {
    return `top-20?q=${category}`
  } else {
    return '/'
  }
}