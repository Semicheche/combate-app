module.exports = function ServerUrl () {
  // Não sei pq o json Stringfy fode com a String e não consegui resolver enetão removi as " duplas da string
  const backendServer = process.env.BACKEND_SERVER.replaceAll('"', '')
  const port = process.env.BACKEND_PORT.replaceAll('"', '')

  return `${backendServer}:${port}`
}
