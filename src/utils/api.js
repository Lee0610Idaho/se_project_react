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
export function addItems(item, token) {
  return request(`${BASE_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
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
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
}

export function addCardLike(id, token) {
  return request(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
}

export function removeCardLike(id, token) {
  return request(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
}
