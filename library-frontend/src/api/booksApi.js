import { BASE_URL } from "../config";
import { handleError } from "../helpers/errorHandler"; 

export const fetchBooks = async () => {
  const response = await fetch(`${BASE_URL}/books`); 
  if (!response.ok) throw new Error(handleError('Books could not be fetched')); 
  const books = await response.json();

  const booksWithUserDetails = await Promise.all(
      books.map(async (book) => {
          if (book.borrowedBy) {
              const userResponse = await fetch(`${BASE_URL}/users/${book.borrowedBy}`);
              if (userResponse.ok) {
                  const user = await userResponse.json();
                  return { 
                      ...book, 
                      borrowedBy: { id: user.id, name: user.name } 
                  };
              } else {
                  throw new Error(handleError('User details could not be fetched')); 
              }
          }
          return { ...book, borrowedBy: null };
      })
  );

  return booksWithUserDetails;
};

export const borrowBook = async ({ userId, bookId }) => {
  const response = await fetch(`${BASE_URL}/users/${userId}/borrow/${bookId}`, {
    method: 'POST',
  });
  if (!response.ok) {
    throw new Error(handleError('Book could not be borrowed')); 
  }
  return response.json();
};

export const returnBook = async ({ userId, bookId }) => {
  const response = await fetch(`${BASE_URL}/users/${userId}/return/${bookId}`, {
    method: 'POST',
  });
  if (!response.ok) {
    throw new Error(handleError('Book could not be returned')); 
  }
  return response.json();
};
