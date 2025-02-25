
// Required imports
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { SingnupInput } from "@amit-dey/medium-common"
import { BACKEND_URL } from "../config"

// Component imports
import { CreateAccountHadding } from "./CreateAccountHadding"
import { InputWithLabel } from "./InputWithLavel"

export const SignupForm = () => {
    const navigate = useNavigate()
    const [signupInput, setSignupInput] = useState<SingnupInput>({
        name: "",
        email: "",
        password: ""
    })

    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, signupInput)
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
            <CreateAccountHadding type="signup" />
            <div className="flex flex-col items-center w-xs mt-1">
                <InputWithLabel label="Name" placeholder="Enter your name" onChange={
                    (e) => setSignupInput({ ...signupInput, name: e.target.value })
                } />
                <InputWithLabel label="Email" placeholder="abc@gmail.com" onChange={
                    (e) => setSignupInput({ ...signupInput, email: e.target.value })
                } />
                <InputWithLabel label="Password" placeholder="******" onChange={
                    (e) => setSignupInput({ ...signupInput, password: e.target.value })
                } />
                <button
                    type="button"
                    className="w-full text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-sm text-sm px-5 py-2.5 mt-4 cursor-pointer"
                    onClick={sendRequest}
                >
                    Sign Up
                </button>
            </div>

        </div>
    )
}
