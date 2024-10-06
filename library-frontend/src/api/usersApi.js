import { BASE_URL } from "../config";
import { handleError } from "../helpers/errorHandler"; 

export const fetchUsers = async () => {
  const response = await fetch(`${BASE_URL}/users`);
  if (!response.ok) {
    throw new Error(handleError('Users could not be fetched'));
  }
  return response.json();
};

export const fetchUserDetails = async (id) => {
  const response = await fetch(`${BASE_URL}/users/${id}`);
  if (!response.ok) {
    throw new Error(handleError('User details could not be fetched'));
  }
  return response.json();
};
