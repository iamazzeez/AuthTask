import axios from 'axios'





export const deleteItem = term => {
  axios
    .delete(`https://user-auth-task.herokuapp.com/api/task/${term}`, {
      headers: { 'Content-Type': 'application/json' }
    })
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    })
}

export const updateItem = (id) => {
  return axios
    .put(
      `https://user-auth-task.herokuapp.com/api/task/${id}`,
      {
        isValid: true
      },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    )
    .then(function (response) {
      console.log(response)
    })
}
