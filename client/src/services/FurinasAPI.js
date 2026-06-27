const API_URL = "http://localhost:3000/api/furinas";

const checkResponse = async (response) => {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Something went wrong with the API request.");
  }

  return data;
};

export const getAllFurinas = async () => {
  const response = await fetch(API_URL);
  return checkResponse(response);
};

export const getFurina = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  return checkResponse(response);
};

export const createFurina = async (furina) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(furina),
  });

  return checkResponse(response);
};

export const updateFurina = async (id, furina) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(furina),
  });

  return checkResponse(response);
};

export const deleteFurina = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  return checkResponse(response);
};
