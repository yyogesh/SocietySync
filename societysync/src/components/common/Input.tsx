

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    helperText?: string;
}

// int a =0
// a: number = 0
{/* <input type="text" id="input-123" aria-label="input" title="" /> */}

const Input = ({label, id, helperText, ...props}: InputProps) => {
    const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;
    return (
        <div>
            {
                label && <label htmlFor={inputId} className="text-gray-700 block">{label}</label>
            }
            <input id={inputId} 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none
             focus:border-blue-500 text-gray-500"
            aria-label="input" 
            type="text" {...props} />
            {
                helperText && <p className="text-gray-500 text-sm mt-1">{helperText}</p>
            }
        </div>
    )
}

export default Input