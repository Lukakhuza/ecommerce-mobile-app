import axios from "axios";
import { AuthContext } from "../store/context/auth-context";

const API_KEY = "AIzaSyAIvueNUIkdLgTBprMM4UQBDVFEfbskIt8";
const BACKEND_API = "https://ecommerce-1e357-default-rtdb.firebaseio.com";

export async function createUser(email, password) {
  console.log("Creating User.....");
  // const response = await axios.post(
  //   "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + API_KEY,
  //   {
  //     email: email,
  //     password: password,
  //     returnSecureToken: true,
  //   }
  // );
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

// export async function loginOAuth() {
//   const response = await axios.post(
//     "https://identitytoolkit.googleapis.com/v1/accounts:signInWithIdp?key=" +
//       API_KEY,
//     // {"postBody":"id_token=[GOOGLE_ID_TOKEN]&providerId=[google.com]","requestUri":"[http://localhost]","returnIdpCredential":true,"returnSecureToken":true}'
//     {
//       postBody: "idToken=[GOOGLE_ID_TOKEN]&providerId=google.com",
//       requestUri: "[http://localhost]",
//       returnIdpCredential: true,
//       returnSecureToken: true,
//     }
//   );
// }

export async function addData(data) {
  const userData = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    uid: data.uid,
    shopFor: data.shopFor,
    ageRange: data.ageRange,
  };

  const response = axios.post(BACKEND_API + "/data.json", userData);
}

export async function fetchUserData(email) {
  console.log("Test 1: ", email);
  const authCtx = useContext(AuthContext);
  console.log("Test 2: ", authCtx);
  const response = await axios.get(BACKEND_API + "/data.json");
  // const users = [];

  // for (const key in response.data) {
  //   if (response.data[key].email === email) {
  //     const userObj = {
  //       id: key,
  //       email: response.data[key].email,
  //       firstName: response.data[key].firstName,
  //       lastName: response.data[key].lastName,
  //       ageRange: response.data[key].ageRange,
  //       shopFor: response.data[key].shopFor,
  //       uid: response.data[key].uid,
  //       phoneNumber: response.data[key].phoneNumber,
  //     };

  //     users.push(userObj);
  //   }
  // }

  return users;
}

export async function fetchProductsData() {
  const response = await axios.get("https://fakestoreapi.com/products");
  // console.log(response);
  return response.data;
}

export async function fetchProfilePicture() {
  const response = await axios.get("https://dummyjson.com/users");
  return response.data;
}
