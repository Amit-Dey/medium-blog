
// Required imports
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { SigninInput } from "@amit-dey/medium-common"
import { BACKEND_URL } from "../config"


// Component imports 
import { CreateAccountHadding } from "./CreateAccountHadding"
import { InputWithLabel } from "./InputWithLavel"


export const SigninForm = () => {

    const navigate = useNavigate()
    const [signinInput, setSigninInput] = useState<SigninInput>({
        email: "",
        password: ""
    })

    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, signinInput)
            localStorage.setItem("jwt", response.data.jwt)
            navigate("/")
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    alert(error.response.data.message)
                } else if (error.request) {
                    alert("Something went wrong")
                } else {
                    alert("Something went wrong")
                }
            } else {
                alert("Something went wrong")
            }
        }
    }


    return (
        <div className="bg-white flex flex-col h-screen justify-center items-center p-4">
            {/* {JSON.stringify(signinInput)} */}
            <CreateAccountHadding type="signin" />
            <div className="flex flex-col items-center w-xs mt-1">
                <InputWithLabel label="Email" placeholder="abc@gmail.com" onChange={
                    (e) => setSigninInput({ ...signinInput, email: e.target.value })
                } />
                <InputWithLabel label="Password" placeholder="******" onChange={
                    (e) => setSigninInput({ ...signinInput, password: e.target.value })
                } />
                <button
                    type="button"
                    className="w-full text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-sm text-sm px-5 py-2.5 mt-4 cursor-pointer"
                    onClick={sendRequest}
                >
                    Sign In
                </button>
            </div>
        </div >
    )
}
