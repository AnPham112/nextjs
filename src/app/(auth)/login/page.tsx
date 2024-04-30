import LoginForm from "./login-form"

function LoginPage() {
  return (
    <>
      <h1 className="text-center">Đăng nhập</h1>
      <div className="flex justify-center">
        <LoginForm />
      </div>
    </>
    
  )
}

export default LoginPage