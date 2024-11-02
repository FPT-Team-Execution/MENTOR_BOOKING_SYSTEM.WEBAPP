// GoogleAuthCallback.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { signInGoogleApiUrl } from "../../utils/apiUrl/baseUrl";
import { decode } from "../../utils/utils";
import { ExternalSignInResponseModel, ResponseRequestModel, TokenData } from "../../types/common.types";
import { useRequest } from "ahooks";
import { message } from "antd";
import axiosInstance from "../../utils/axios/axiosInstance";
import { AxiosError } from "axios";

const GoogleAuthCallback: React.FC = () => {

  const { isAuthenticated, setIsAuthenticated, userInfo, setUserInfo } = useAuth();
  const searchParams = new URLSearchParams(window.location.search);
  const code = searchParams.get("code");
  const navigate = useNavigate();

  const { loading } = useRequest(async () => {

    try {

      if (isAuthenticated) {
        switch (userInfo?.role) {
          case "Mentor": {
            navigate("/homepage")
            break;
          }
          default: {
            setIsAuthenticated(false);
            message.error("Your are not mentor!");
            navigate("/login")
          }
        }
      }

      if (!code) {
        return;
      }

      const response = await axiosInstance.get<ResponseRequestModel<ExternalSignInResponseModel>>(signInGoogleApiUrl(code));
      const data = response.data;

      if (!data.isSuccess) {
        message.success(data.message);
      }

      const googleToken = data.responseRequestModel.googleToken;
      const jwtModel = data.responseRequestModel.jwtModel;

      localStorage.setItem("accessToken", jwtModel.accessToken);
      localStorage.setItem("refreshToken", jwtModel.refreshToken);
      localStorage.setItem("googleAccessToken", googleToken.access_token);

      const userData: TokenData | undefined = decode(jwtModel.accessToken);

      switch (userData?.role) {
        case "Mentor": {
          setUserInfo(userData!);
          setIsAuthenticated(true);
          message.success("Login successfully!");
          navigate("/homepage")
          break;
        }
        default: {
          setIsAuthenticated(false);
          message.error("Your are not mentor!");
          navigate("/login")
        }
      }

    } catch (error) {

      if (error instanceof AxiosError) {

        if (error.response) {

          switch (error.response.status) {
            case 500:
              message.error("Role or account was invalid, please contact Admin!");
              break;
            default:
              message.error("An unexpected error occurred!");
          }

        } else {

          message.error("Failed to connect to the server.");

        }

      } else {

        message.error("Something went wrong")
        console.log(error)

      }

      navigate("/login");
    }

  }, {

  })

  // useEffect(() => {
  // const searchParams = new URLSearchParams(location.search);

  // if (code) {
  //   // Exchange the authorization code for tokens
  //   axios
  //     .get(`https://localhost:7554/api/auth/signin-google?code=${code}&callbackuri=http://localhost:5173/auth/callback`)
  //     //.get(`${GOOGLE_SIGNIN}?code=${code}&callbackuri=${CALLBACK_URL}`)
  //     .then((response) => {
  //       const { jwtModel, googleToken } = response.data.responseRequestModel;

  //       if (jwtModel && googleToken) {
  //         // Store the tokens in localStorage or any storage mechanism
  //         localStorage.setItem("accessToken", jwtModel.accessToken);
  //         localStorage.setItem("refreshToken", jwtModel.refreshToken);
  //         localStorage.setItem("googleAccessToken", googleToken.access_token);

  //         // Extract the mentorId from the JWT (for example, you might parse it)
  //         // You can decode the JWT to get the mentorId from the claims
  //         const userData = decode(jwtModel.accessToken);
  //         // Redirect to the mentor's calendar page with mentorId
  //         // Set the user information and authentication state
  //         setUserInfo(userData);
  //         setIsAuthenticated(true);

  //         if (userData) {
  //           // console.log(userData)
  //           const mentorId = userData.nameidentifier

  //           if (userData.role === 'Mentor' && userData.mentorId) {
  //             // TODO: replace with real mentorID
  //             // navigate(`/mentor/calendar/12345`)
  //             navigate("/homepage");
  //           } else {
  //             navigate("/homepage");
  //           }
  //         } else {
  //           navigate("/homepage");
  //         }
  //       } else {
  //         console.error("Failed to obtain tokens.");
  //         // Handle the failure case
  //         navigate("/login"); // Redirect to login in case of failure
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Google login failed:", error);
  //       // Handle error or redirect to an error page
  //       navigate("/login"); // Redirect on failure
  //     });
  // }
  //   }, [location.search, navigate]);
  // };

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

  return (
    <>
      {loading ?? (<span className="animate-spin">Loading</span>)}
    </>
  )
}
export default GoogleAuthCallback;
