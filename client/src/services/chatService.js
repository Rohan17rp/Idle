import axios from 'axios';

export default {
  getAll: async () => {
    let res = await axios.get('/api/chat');
    return res.data || [];
  }
}