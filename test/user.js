const axios = require('axios')
const functions = {

  fetchUsers : () => axios.get("https://jsonplaceholder.typicode.com/users/4").
    then(res => res.data).
    catch(err => "error")
  
}

module.exports = functions;