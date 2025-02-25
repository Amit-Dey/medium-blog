import { Quote } from "../components/Quote"
import { SigninForm } from "../components/SigninForm"

export const Signin = () => {
    return (
        <div className="w-full h-screen">
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <SigninForm />
                <div className="hidden lg:block">
                    <Quote />
                </div>
            </div>

        </div >
    )
}
