export const requestLogger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
}

export const enableAllCors = (req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Methods', 'OPTION,GET,PUT,POST,DELETE,PATCH')
  res.set('Access-Control-Allow-Headers', 'Content-Type,X-Auth-Token')
  res.set('Access-Control-Expose-Headers', 'Content-Type,X-Subject-Token')
  next()
}
