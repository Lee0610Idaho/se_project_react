const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.wtwrtt.jumpingcrab.com"
    : "http://localhost:3001";

export function processResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error ${res.status}`);
}

function request(url, options) {
  return fetch(url, options).then(processResponse);
}

// Add item
export function addItems(item, token) {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  });
}

// Get item
export function getItems() {
  return request(`${baseUrl}/items`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });
}

export function deleteItem(_id, token) {
  return request(`${baseUrl}/items/${_id}`, {
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
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
}

export function removeCardLike(id, token) {
  return request(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
}
