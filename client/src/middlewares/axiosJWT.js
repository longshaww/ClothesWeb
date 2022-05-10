import axios from "axios";
import jwt_decode from "jwt-decode";



// export default async function axiosJWT(accessToken) {
//     const axiosJWT = axios.create()
   
//     axiosJWT.interceptors.request.use(
//       async (config) => { 
//         let currentDate = new Date();
//         const decodedToken = jwt_decode(accessToken);
//         if (decodedToken.exp * 1000 < currentDate.getTime()) {
//           const data = await refreshToken();
//           config.headers["authorization"] = "Bearer " + data.accessToken;
//         }
//         return config;
//       },
//       (error) => {
//         return Promise.reject(error);
//       }
//     );
  
// }
