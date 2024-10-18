// GoogleAuthCallback.tsx
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const GoogleAuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code");

    if (code) {
      // Exchange the authorization code for tokens
      axios
        .get("https://localhost:7554/api/auth/signin-google?code=${code}`")
        .then((response) => {
          const { jwtModel, googleToken } = response.data.responseRequestModel;

          if (jwtModel && googleToken) {
            // Store the tokens in localStorage or any storage mechanism
            localStorage.setItem("accessToken", jwtModel.accessToken);
            localStorage.setItem("refreshToken", jwtModel.refreshToken);
            localStorage.setItem("googleAccessToken", googleToken.access_token);

            // Extract the mentorId from the JWT (for example, you might parse it)
            // You can decode the JWT to get the mentorId from the claims
            //const mentorId = extractMentorIdFromJwt(jwtModel.accessToken); // Custom function to decode JWT

            // Redirect to the mentor's calendar page with mentorId
            navigate(`/dashboard`);
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
