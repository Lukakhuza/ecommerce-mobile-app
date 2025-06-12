import axios from "axios";
import { AuthContext } from "../store/context/auth-context";
import { UserInputContext } from "../store/context/userInputContext";
import { useContext } from "react";

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
  const userData = {
    email: email,
    password: password,
  };
  fetch("https://backend-ecommerce-mobile-app.onrender.com/user/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
  // const response = await axios.post(
  //   "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
  //     API_KEY,
  //   {
  //     email: email,
  //     password: password,
  //     returnSecureToken: true,
  //   }
  // );

  // const token = response.data.idToken;
  const token = "secrettoken";
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

// export async function fetchUserData() {
//   const userData = {
//     email: "Lukakhuz778@test.com",
//   };
//   fetch(
//     "https://backend-ecommerce-mobile-app.onrender.com/user/get-user-by-email",
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(userData),
//     }
//   )
//     .then((response) => {
//       return response.json();
//     })
//     .then((resData) => {
//       return resData.user;
//     });
// }

export async function fetchProductsData() {
  const response = await axios.get("https://fakestoreapi.com/products");
  return response.data;
}

export async function fetchProfilePicture() {
  const response = await axios.get("https://dummyjson.com/users");
  return response.data;
}
