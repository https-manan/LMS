import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLoginUserMutation, useRegisterUserMutation } from "@/features/api/authApi"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });
  const [signupInput, setSignupInput] = useState({ name: "", email: "", password: "" });
  const [loginUser,{data:loginData,error:loginError,isLoading:loginLoading,isSuccess:loginSuccess}] = useLoginUserMutation();
  const [registerUser ,{data:registerData,error:registerError,isLoading:registerLoading,isSuccess:registerSuccess}] = useRegisterUserMutation();
  const nevigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    await loginUser(loginInput)
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    await registerUser(signupInput);
  };
  useEffect(()=>{
    if(registerSuccess && registerData){
      toast.success(registerData.data.message||"SignUp successful.")
      nevigate('/login')
    }
    if(registerError){
      toast.error(registerData.data.message || "SignUp failed");
    }
    if(loginSuccess && loginData){
      toast.success(loginData.message||"Logined successful.")
      nevigate('/')
    }
    if(loginError){
      toast.error(loginData.data.message || "Login failed");
    }
  },[loginLoading,registerLoading,loginData,registerData,loginError,registerError ]) 
  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-muted">
      <Tabs defaultValue="login" className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Signup</TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Login</h3>
              <p className="text-sm text-muted-foreground">
                Enter your credentials to access your account.
              </p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  value={loginInput.email}
                  onChange={(e)=>setLoginInput({...loginInput,email:e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <Input
                  id="login-password"
                  type="password"
                  required
                  value ={loginInput.password}
                  onChange={(e)=>setLoginInput({...loginInput,password:e.target.value})}
                />
              </div>
              <Button disabled={loginLoading} type="submit" className="w-full">
                {loginLoading?(
                  <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wait
                  </>
                ):"Log In"
                }
              </Button>
            </form>
          </div>
        </TabsContent>

        <TabsContent value="signup">
          <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Create Account</h3>
              <p className="text-sm text-muted-foreground">
                Fill in the details to create a new account.
              </p>
            </div>
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-name">Full Name</Label>
                <Input
                  id="register-name"
                  placeholder="Your name"
                  required
                  value={signupInput.name}
                  onChange={(e) => setSignupInput({ ...signupInput, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <Input
                  id="register-email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  value={signupInput.email}
                  onChange={(e) => setSignupInput({ ...signupInput, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password">Password</Label>
                <Input
                  id="register-password"
                  type="password"
                  required
                  value={signupInput.password}
                  onChange={(e) => setSignupInput({ ...signupInput, password: e.target.value })}
                />
              </div>
              <Button disabled={registerLoading} type="submit" className="w-full">
                {registerLoading?(
                  <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wait
                  </>
                ):"Sign Up"
                }
              </Button>
            </form>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Login