import axios from "axios";

const API_KEY = "AIzaSyAIvueNUIkdLgTBprMM4UQBDVFEfbskIt8";

export async function createUser(email, password) {
  console.log("Testing 4");
  const response = await axios.post(
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + API_KEY,
    {
      email: email,
      password: password,
      returnSecureToken: true,
    }
  );
  console.log("returned successfully");

  return response.data;
}

export async function loginUser(email, password) {
  const response = await axios.post(
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
      API_KEY,
    {
      email: email,
      password: password,
      returnSecureToken: true,
    }
  );

  return response.data;
}
