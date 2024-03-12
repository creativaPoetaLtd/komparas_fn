import Footer from "../Footer"
import SubNav from "../Navigations/SubNav"
import MobileHomeNav from "../home/HomeMobileNav"
import HomeNav from "../home/HomeNav"
import login from "../../assets/login.png"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { addUsers } from "../../api/userCrud"

const SignupPage = () => {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: "",
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const { first_name, last_name, email, password, confirm_password } = formData;

    const setFirst_name = (value: string) => {
        setFormData((prevFormData: any) => ({
            ...prevFormData,
            first_name: value,
        }));
    };

    const setLast_name = (value: string) => {
        setFormData((prevFormData: any) => ({
            ...prevFormData,
            last_name: value,
        }));
    };
    const setEmail = (value: string) => {
        setFormData((prevFormData: any) => ({
            ...prevFormData,
            email: value,
        }));
    };

    const setPassword = (value: string) => {
        setFormData((prevFormData: any) => ({
            ...prevFormData,
            password: value,
        }));
    };

    const setConfirmPassword = (value: string) => {
        setFormData((prevFormData: any) => ({
            ...prevFormData,
            confirm_password: value,
        }));
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);

        try {
            const response = await addUsers(formData);
            if (response.user) {
                toast.success(response.message, {
                    position: "top-right",
                    theme: "colored",
                });
                setLoading(false);
                navigate("/login");

                setFormData({
                    first_name: "",
                    last_name: "",
                    email: "",
                    password: "",
                    confirm_password: "",
                });
            } else {
                toast.error(response.message, {
                    position: "top-right",
                    theme: "colored",
                });
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong", {
                position: "top-right",
                theme: "colored",
            });
        } finally {
            setLoading(false);
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
                        <img src={login} alt="" className="w-full h-full" />
                    </div>
                </div>
                <div className="md:w-[30%] w-full md:px-0 px-8 h-full flex flex-col justify-center lg:items-start lg:m-0 m-auto items-center">
                    <h1 className="text-2xl font-semibold text-[#0C203B] flex items-start text-start">Create an account</h1>
                    <p className="text-sm mt-3">Enter your details below</p>
                    <form action="" onSubmit={handleSubmit} className="flex flex-col md:w-[371px] w-full mt-6">
                        <input type="text" placeholder="First Name" data-testid="first_name" id="first_name"
                            name="first_name" value={first_name}
                            onChange={(e) => setFirst_name(e.target.value.trim())}
                            className="h-[50px] outline-none border-b border-b-[#0C203B] py-2 mb-3" />
                        <input type="text" placeholder="First Name" data-testid="last_name"
                            id="first_name"
                            name="last_name"
                            value={last_name}
                            onChange={(e) => setLast_name(e.target.value.trim())}
                            className="h-[50px] outline-none border-b border-b-[#0C203B] py-2 mb-3" />
                        <input data-testid="email"
                            type="email"
                            name="email"
                            id="email" placeholder="Email" className="h-[50px] outline-none border-b border-b-[#0C203B] py-2 mb-3"
                            value={email}
                            onChange={(e) => setEmail(e.target.value.trim())}
                        />
                        <input name="password"
                            id="password"
                            data-testid="password" type="password" placeholder="Your Password" value={password}
                            onChange={(e) => setPassword(e.target.value)} className="h-[50px] outline-none border-b border-b-[#0C203B] py-2 mb-3" />
                        <input name="confirm_password"
                            id="confirm_password"
                            data-testid="confirm_password" type="password" placeholder="Confirm Password" value={confirm_password}
                            onChange={(e) => setConfirmPassword(e.target.value)} className="h-[50px] outline-none border-b border-b-[#0C203B] py-2 mb-3" />
                        <button
                            disabled={loading}
                         className={`bg-[#EDB62E] text-white px-4 py-3 w-full float-right justify-end self-end rounded-md ${loading? "cursor-not-allowed opacity-50":""}`}>
                            {loading ? "Loading..." : "Create Account"}
                         </button>
                    </form>
                    <div className="flex mt-3">
                        <p className="text-sm">Already have an account?</p>
                        <a href="/login" className="text-[#EDB62E] ml-1 text-sm flex my-auto justify-center underline underline-offset-4">Login</a>
                    </div>
                </div>
            </div>
        </div>
            <Footer />
        </>
    )
}

export default SignupPage