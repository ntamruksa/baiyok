import axios from 'axios'

export const client = axios.create({
  baseURL: '',
  timeout: 30000
})

//  ****** no auths needed  *******//

const getMenuItems = () => {
  return client.get(`/api/menuitems`).then((res) => res.data)
}

const addBooking = (reservation) => {
  return client.post('/api/addBooking', { reservation }).then((res) => res.data)
}

const checkin = (checkin) => {
  return client.post('/api/checkin', { checkin }).then((res) => res.data)
}

export default {
  getMenuItems,
  addBooking,
  checkin
}
