// GoogleAuthCallback.tsx
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../auth/AuthContext";
import { CALLBACK_URL, GOOGLE_SIGNIN } from "../../utils/apiUrl/baseUrl";
import paths from "../../routes/path";
import { decode } from "../../utils/utils";

const GoogleAuthCallback: React.FC = () => {
  const { isAuthenticated, setIsAuthenticated, setUserInfo } = useAuth();

  const navigate = useNavigate();
  //const location = useLocation();

  useEffect(() => {
    // const searchParams = new URLSearchParams(location.search);
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");

    if (code) {
      // Exchange the authorization code for tokens
      axios
         .get(`https://localhost:7554/api/auth/signin-google?code=${code}&callbackuri=http://localhost:5173/auth/callback`)
        //.get(`${GOOGLE_SIGNIN}?code=${code}&callbackuri=${CALLBACK_URL}`)
        .then((response) => {
          const { jwtModel, googleToken } = response.data.responseRequestModel;

          if (jwtModel && googleToken) {
            // Store the tokens in localStorage or any storage mechanism
            localStorage.setItem("accessToken", jwtModel.accessToken);
            localStorage.setItem("refreshToken", jwtModel.refreshToken);
            localStorage.setItem("googleAccessToken", googleToken.access_token);

            // Extract the mentorId from the JWT (for example, you might parse it)
            // You can decode the JWT to get the mentorId from the claims
            const userData = decode(jwtModel.accessToken);
            // Redirect to the mentor's calendar page with mentorId
            // Set the user information and authentication state
            setUserInfo(userData);
            setIsAuthenticated(true);

            if(userData ){
              // console.log(userData)
              const mentorId = userData.nameidentifier
              
              if(userData.role === 'Mentor' && userData.mentorId){
                // TODO: replace with real mentorID
                // navigate(`/mentor/calendar/12345`)
                navigate("/homepage");
              }else{
                navigate("/homepage");
              }
            }else{
              navigate("/homepage");
            }
          } else {
            console.error("Failed to obtain tokens.");
            // Handle the failure case
            navigate("/login"); // Redirect to login in case of failure
          }
        })
        .catch((error) => {
          console.error("Google login failed:", error);
          // Handle error or redirect to an error page
          navigate("/login"); // Redirect on failure
        });
    }
  }, [location.search, navigate]);

  return <div>Loading...</div>;
};

// const extractMentorIdFromJwt = (token: string): string => {
//   const base64Url = token.split(".")[1];
//   const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
//   const jsonPayload = decodeURIComponent(
//     atob(base64)
//       .split("")
//       .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
//       .join("")
//   );

//   const payload = JSON.parse(jsonPayload);
//   return payload.nameidentifier; // Assuming the mentorId is stored here
// };

export default GoogleAuthCallback;
