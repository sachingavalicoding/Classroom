/* eslint-disable react/prop-types */


const Button = ({ bgColor, children, type = "button", className = '' }) => {
    return (
        <button className={` ${bgColor} , ${className} `} type={type} >{children}</button>
    )
}

export default Button