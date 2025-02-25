import { Quote } from "../components/Quote"
import { SignupForm } from "../components/SignupForm"

export const Signup = () => {
    return (
        <div className="w-full h-screen">
            <div className="grid grid-cols-1 lg:grid-cols-2">
                    <SignupForm />
                <div className="hidden lg:block">
                    <Quote />
                </div>
            </div>

        </div >
    )
}