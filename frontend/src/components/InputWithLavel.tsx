
interface InputWithLabelProps {
    label: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputWithLabel = ({ label, onChange, placeholder }: InputWithLabelProps) => {
    return (
        <div className="w-full mt-5">
            <label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
            <input type={label === 'Password' ? "password" : label === "Email" ? "email" : "text"}
                className="border border-gray-300 text-gray-900 text-sm rounded-md w-full py-2 px-3 focus:outline-slate-400"
                onChange={onChange}
                placeholder={placeholder} required />
        </div>
    );
}