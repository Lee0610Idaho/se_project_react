import { BASE_URL } from "../utils/constants";

export function processResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error ${res.status}`);
}

export function request(url, options) {
  return fetch(url, options).then(processResponse);
}

// Add item
export function addItems(item) {
  return request(`${BASE_URL}/items`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(item),
  });
}

// Get item
export function getItems() {
  return request(`${BASE_URL}/items`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });
}

// Delete item
export function deleteItems(_id) {
  return request(`${BASE_URL}/items/${_id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  });
}

// Like item
export function addCardLike(id, token, isLiked, setIsLiked) {
  return request(`${BASE_URL}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(() => setIsLiked(!isLiked));
}

// Dislike item
export function removeCardLike(id, token, isLiked, setIsLiked) {
  return request(`${BASE_URL}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(() => setIsLiked(!isLiked));
}
