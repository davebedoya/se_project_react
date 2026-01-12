const baseUrl = "http://localhost:3001";

const headers = {
  "Content-Type": "application/json",
};

const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export const getItems = () => {
  return fetch(`${baseUrl}/items`, { headers }).then(handleServerResponse);
};

export const addItem = ({ name, imageUrl, weather }) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      imageUrl,
      name,
      weather,
    }),
  }).then(handleServerResponse);
};

export const deleteCard = (id) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers,
  }).then(handleServerResponse);
};

// getInitialCards() {
//     return fetch(`${this._baseUrl}/cards`, {
//       headers: this._headers,
//     }).then(this._checkResponse);
//   }

//   getUserInfo() {
//     return fetch(`${this._baseUrl}/users/me`, {
//       headers: this._headers,
//     }).then(this._checkResponse);
//   }

//   editUserInfo({ name, about }) {
//     return fetch(`${this._baseUrl}/users/me`, {
//       method: "PATCH",
//       headers: this._headers,
//       body: JSON.stringify({
//         name,
//         about,
//       }),
//     }).then(this._checkResponse);
//   }

//   editAvatarUserInfo(avatar) {
//     return fetch(`${this._baseUrl}/users/me/avatar`, {
//       method: "PATCH",
//       headers: this._headers,
//       body: JSON.stringify({
//         avatar,
//       }),
//     }).then(this._checkResponse);
//   }

//   deleteCard(id) {
//     return fetch(`${this._baseUrl}/cards/${id}`, {
//       method: "DELETE",
//       headers: this._headers,
//     }).then(this._checkResponse);
//   }

//   changeLikeStatus(id, isLiked) {
//     return fetch(`${this._baseUrl}/cards/${id}/likes`, {
//       method: isLiked ? "DELETE" : "PUT",
//       headers: this._headers,
//     }).then(this._checkResponse);
//   }
//   _checkResponse(res) {
//     if (res.ok) {
//       return res.json();
//     }
//     return Promise.reject(`Error: ${res.status}`);
//   }
// }

// export default Api;

// Example

// const arr = [
//   { _id: 1, name: "a" },
//   { _id: 2, name: "b" },
//   { _id: 3, name: "c" },
// ];

// const id = 2

// const filterArr = arr.filter((item)=> {
//   return item._id != id;
// })

// filterArr
