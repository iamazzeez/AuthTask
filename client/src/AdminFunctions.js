import axios from 'axios'




export const deleteItem = term => {
  axios
    .delete(`http://localhost:5000/api/task/${term}`, {
      headers: { "Content-Type": "application/json" }
    })
    .catch(function (error) {
      console.log(error)
    })
}

export const updateItem = (id) => {
  return axios
    .post(
      `http://localhost:5000/api/task/${id}`,
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
