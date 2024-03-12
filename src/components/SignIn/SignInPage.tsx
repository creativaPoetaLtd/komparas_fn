import Footer from "../Footer"
import SubNav from "../Navigations/SubNav"
import MobileHomeNav from "../home/HomeMobileNav"
import HomeNav from "../home/HomeNav"
import loginp from "../../assets/login.png"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { login } from "../../api/auth/login"

const SigninPage = () => {
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
}, []);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login({ email, password });
      if(res.status===true){
      localStorage.setItem("KomparasLoginsInfo", JSON.stringify(res.user));
      toast.success("Login successful");
      setLoading(false);
      if(res?.user?.role === "admin"){
        navigate("/dashboard");
      } else {
        navigate("/products");
      }
      }

      else{
        toast.error(res.message);
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  
    return (
        <><div className='w-full bg-white h-fit justify-between'>
            <SubNav />
            <HomeNav />
            <MobileHomeNav />
            <div className="flex lg:mt-12 mt-2 w-full h-[581px] mb-11">
                <div className="w-[65%] lg:flex hidden h-full">
                    <div className="xl:w-[805px] lg:w-[705px] h-[581px] flex">
                    <img src={loginp} alt="" className="w-full h-full" />
                    </div>
                </div>
                <div className="md:w-[30%] w-full md:px-0 px-8 h-full flex flex-col justify-center lg:items-start lg:m-0 m-auto items-center">
                    <h1 className="text-2xl font-semibold text-[#0C203B] flex items-start text-start">Log in to Komparas</h1>
                    <p className="text-sm mt-3">Enter your details below</p>
                    <form action="" className="flex flex-col md:w-[371px] w-full mt-6" onSubmit={handleSubmit}>
                        <input type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                         placeholder="Email or Phone Number" className="h-[50px] outline-none border-b border-b-[#0C203B] py-2 mb-3" />
                        <input type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                         placeholder="Your Password" className="h-[50px] outline-none border-b border-b-[#0C203B] py-2 mb-3" />
                        <div className="flex justify-between">
                            <div className="flex items-center">
                                <input
                                 type="checkbox" name="" id="" className="mr-2" />
                                <label htmlFor="">Remember Me</label>
                            </div>
                            <a href="/forgot_password" className="text-[#EDB62E] text-sm">Forgot Password?</a>
                        </div>
                        <button
                        disabled={loading}
                         className={`bg-[#EDB62E] text-white px-4 py-3 mt-2 w-full float-right justify-end self-end rounded-md ${loading ? 'cursor-not-allowed opacity-50':''}`}>Login</button>
                    </form>
                    <div className="flex mt-3">
                        <p className="text-sm">Don’t have an account?</p>
                        <a href="/signup" className="text-[#EDB62E] ml-1 text-sm flex my-auto justify-center underline underline-offset-4">Sign up</a>
                    </div>
                </div>
            </div>
        </div>
            <Footer />
        </>
    )
}

export default SigninPage