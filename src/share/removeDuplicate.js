const removeDuplicate = (arr, key) => {
  const uniqueArr = arr.filter((value, index, self) => index === self.findIndex((t) => t[key] === value[key]))

  return uniqueArr
}

export default removeDuplicate