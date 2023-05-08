
export const useLogin = () => {
  const idCliente = () => {
    try {
      let res = await axios.get(url)
      data.value = res.data
    } catch(error) {
      console.log(error)
    }
  }
  return {
    getData,
    data
  }
}