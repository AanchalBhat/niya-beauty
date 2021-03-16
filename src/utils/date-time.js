export function convertToUTCDateTime(date) {
  let tempDate = new Date(date + ' 00:00')

  let day = tempDate.getUTCDate().toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })

  let month = (tempDate.getUTCMonth() + 1).toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })

  let year = tempDate.getUTCFullYear()
  let hours = tempDate.getUTCHours()
  let minutes = tempDate.getUTCMinutes()

  const fullDate = `${year}-${month}-${day} ${hours}:${minutes}`

  return fullDate
}

export function convertToUTCDateTimeEndDate(date) {
  let tempDate = new Date(date + ' 23:59')

  let day = tempDate.getUTCDate().toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })

  let month = (tempDate.getUTCMonth() + 1).toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })

  let year = tempDate.getUTCFullYear()
  let hours = tempDate.getUTCHours()
  let minutes = tempDate.getUTCMinutes()

  const fullDate = `${year}-${month}-${day} ${hours}:${minutes}`

  return fullDate
}

