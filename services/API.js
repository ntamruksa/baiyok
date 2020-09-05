import axios from 'axios'

export const client = axios.create({
  baseURL: '',
  timeout: 30000
})

//  ****** no auths needed  *******//

const getMenuItems = () => {
  return client.get(`/api/menuitems`).then((res) => res.data)
}

export default {
  getMenuItems
}
