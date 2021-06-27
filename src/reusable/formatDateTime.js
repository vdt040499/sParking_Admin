export const convertToDate = (dateStr) => {
  const date = new Date(dateStr)
  const day = date.getDate()
  const year = date.getFullYear()
  let month
  switch(date.getMonth()) {
      case 0:
          month = 'Jan'
          break
      case 1:
          month = 'Feb'
          break
      case 2:
          month = 'March'
          break
      case 3:
          month = 'Apr'
          break
      case 4:
          month = 'May'
          break
      case 5:
          month = 'Jun'
          break
      case 6:
          month = 'Jul'
          break
      case 7:
          month = 'Aug'
          break
      case 8:
          month = 'Sep'
          break
      case 9:
          month = 'Oct'
          break
      case 10:
          month = 'Nov'
          break
      case 11:
          month = 'Dec'
          break
  }

  return `${month} ${day}, ${year}`
}

export const convertToDateTime = (dateStr) => {
  const date = new Date(dateStr)
  const day = date.getDate()
  const year = date.getFullYear()
  const month = date.getMonth() + 1

  return `${day}/${month}/${year} ${date.getHours().toString().length === 1 ? `0${date.getHours()}` :  date.getHours()}:${date.getMinutes().toString().length === 1 ? `0${date.getMinutes()}` :  date.getMinutes()}:${date.getSeconds().toString().length === 1 ? `0${date.getSeconds()}` :  date.getSeconds()}`
}

