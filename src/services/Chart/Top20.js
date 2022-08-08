export const getRankWeek = () => {
  // Source: https://www.javatpoint.com/calculate-current-week-number-in-javascript
  const todayDate = new Date()
  const oneJan = new Date(todayDate.getFullYear(), 0, 1)
  const numberOfDays = Math.floor((todayDate - oneJan) / (24 * 60 * 60 * 1000)) 

  return Math.ceil((todayDate.getDay() + 1 + numberOfDays) / 7)
}

export const getRankDay = (week) => {
  var curr = new Date() // get current date
  var first = curr.getDate() - curr.getDay() // First day is the day of the month - the day of the week
  var last = first + 6 // last day is the first day + 6

  var firstday = new Date(curr.setDate(first)).toUTCString()
  var lastday = new Date(curr.setDate(last)).toUTCString()
  return { firstday, lastday }
}
