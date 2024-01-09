/* eslint-disable react/prop-types */
import { forwardRef, useId } from "react"
const Input = forwardRef(function Input({
    type = "text",
    placeholder = "Enter data",
    className = '',
    label,
}, ref) {
    const id = useId()
    return <div className="w-full">
        {
            label && <label
                className="font-bold text-xl"
                htmlFor={id}>
                {label}
            </label>
        }
        <input type={type} placeholder={placeholder} className={`${className} border-2 px-3 py-2 font-bold w-full`} ref={ref} id={id} />
    </div>
})



export default Input