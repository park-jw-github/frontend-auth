import axios from "axios";

import { API_SERVER_HOST } from "./todoApi";

const rest_api_key =`7319617c1d1cfb26a7b79e3f549e9151` //REST키값

const redirect_uri =`https://main.db3n1v76gqj7y.amplifyapp.com/member/kakao`

const auth_code_path = `https://kauth.kakao.com/oauth/authorize`

const access_token_url =`https://kauth.kakao.com/oauth/token` //추가

export const getKakaoLoginLink = () => {

    const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

    return kakaoURL

}

export const getAccessToken = async (authCode) => {

    const header = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
    }
    const params = {
        grant_type: "authorization_code",
        client_id: rest_api_key,
        redirect_uri: redirect_uri,
        code:authCode
    }

    const res = await axios.post(access_token_url, params , header)

    const accessToken = res.data.access_token

    return accessToken
}

export const getMemberWithAccessToken = async(accessToken) => {

    const res = await axios.get(`${API_SERVER_HOST}/api/member/kakao?accessToken=${accessToken}`)

    return res.data

}