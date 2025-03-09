import { useState } from "react"
import Button from "../../components/common/Button"
import Input from "../../components/common/Input"

const LoginPage = () => {
  const [email, setEmail] = useState("abc@gmail.com"); // maintain state
  const [password, setPassword] = useState(""); // maintain state
  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="text-center mb-8">
        <p className="text-gray-600 mt-2">Sign in to your account</p>
      </div>

      <form>
        <Input label={"Email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          helperText={"Enter your email"} />

        <Input label={"Password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          helperText={"Enter your password"} />
        <div>
          <a>Forgot your password?</a>
        </div>
        <Button>
          Sign in
        </Button>
      </form>
    </div>
  )
}

export default LoginPage

// class Login {
//   constructor() {
//     this.username = ""
//     this.password = ""
//   }
// }