export const getUser = async () => {
  return JSON.parse(await localStorage.getItem('user'))
}

export default getUser
