// For this solution I use a convert str to array first. Then save as hash key
// the name vars in keysArray, and as value the value in valuesArray, using the
// same index for both of them.
// Then for params, if there are one of them, I save in paramsArray. After that
// I use destructuring assignment to get them.

export function urlParser(formatStr, urlInstance) {
  const keysArray = formatStr.split('/')
  const valuesArray = urlInstance.split('?')[0].split('/')
  const paramsArray = urlInstance.split('?')[1]
    ? urlInstance.split('?')[1].split('&')
    : []

  let hash = {}

  // add vars
  keysArray.forEach((item, index) => {
    if (item.includes(':')) {
      const key = item.replace(':', '')
      hash[key] = parseInt(valuesArray[index]) || valuesArray[index]
    }
  })

  // add params
  paramsArray.forEach((item) => {
    const [key, value] = item.split('=')
    hash[key] = parseInt(value) || value
  })

  return hash
}

//const formatStr = '/:version/api/:collection/:id'
//const urlInstance = '/6/api/listings/3?sort=desc&limit=10'
//
//console.log(urlParser(formatStr, urlInstance))
