import axios from 'axios'



<<<<<<< HEAD
// export const getList = () => {
//   return axios
//     .get("http://localhost:5000/api/tasks", {
//       headers: { "Content-Type": "application/json" }
//     })
//     .then(res => {
//       return res.data;
//     });
//   /*.then(data => {
//       console.log(data);
//     });*/
// };

// export const addToList = term => {
//   return axios
//     .post(
//       "http://localhost:5000/api/task",
//       {
//         title: term,
//         isDone: false
//       },
//       {
//         headers: { "Content-Type": "application/json" }
//       }
//     )
//     .then(function(response) {
//       console.log(response);
//     });
// };
=======

>>>>>>> b1a1be95c82636b804defeeca254e965f96d4f97

export const deleteItem = term => {
  axios
    .delete(`https://user-auth-task.herokuapp.com/api/task/${term}`, {
<<<<<<< HEAD
      headers: { "Content-Type": "application/json" }
=======
      headers: { 'Content-Type': 'application/json' }
    })
    .then(function (response) {
      console.log(response)
>>>>>>> b1a1be95c82636b804defeeca254e965f96d4f97
    })
    .catch(function (error) {
      console.log(error)
    })
}

export const updateItem = (id) => {
  return axios
<<<<<<< HEAD
    .post(
=======
    .put(
>>>>>>> b1a1be95c82636b804defeeca254e965f96d4f97
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
