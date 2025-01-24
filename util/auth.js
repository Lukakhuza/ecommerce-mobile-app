import axios from "axios";

const API_KEY = "AIzaSyAIvueNUIkdLgTBprMM4UQBDVFEfbskIt8";
const BACKEND_API = "https://ecommerce-1e357-default-rtdb.firebaseio.com";

export async function createUser(email, password) {
  console.log(email);
  const response = await axios.post(
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + API_KEY,
    {
      email: email,
      password: password,
      returnSecureToken: true,
    }
  );
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

  const token = response.data.idToken;

  return token;
}

export async function loginOAuth() {
  const response = await axios.post(
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithIdp?key=" +
      API_KEY,
    // {"postBody":"id_token=[GOOGLE_ID_TOKEN]&providerId=[google.com]","requestUri":"[http://localhost]","returnIdpCredential":true,"returnSecureToken":true}'
    {
      postBody: "idToken=[GOOGLE_ID_TOKEN]&providerId=google.com",
      requestUri: "[http://localhost]",
      returnIdpCredential: true,
      returnSecureToken: true,
    }
  );
}

export async function addData(data) {
  const userData = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    uid: data.uid,
    shopFor: data.shopFor,
    ageRange: data.ageRange,
  };

  const response = await axios.post(BACKEND_API + "/users.json", userData);
}

export async function fetchData() {
  const response = await axios.get(BACKEND_API + "/users.json");

  const userData = [];

  for (const key in response.data) {
    const userObj = {
      id: key,
      firstName: response.data[key].firstName,
      lastName: response.data[key].lastName,
      email: response.data[key].email,
      shopFor: response.data[key].shopFor,
      ageRange: response.data[key].ageRange,
    };

    userData.push(userObj);
  }

  return userData;
}

export async function fetchProductsData() {
  // const response = await axios.get("https://api.escuelajs.co/api/v1/products");
  const response = await axios.get("https://fakestoreapi.com/products");

  // console.log(response.data[0].title);
  // console.log(response.data.category.name);

  // const userData = [];

  return response.data;
}
