import { MdOutlineKeyboardBackspace } from "react-icons/md"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { getLatestComparasCodeByEmailOrPhone } from "../api/shops"
import { toast } from "react-toastify"

const ConfirmSteps = () => {
    const [isForgot, setIsForgot] = useState(false)
    const [formData, setFormData] = useState({
        code: ""
    })
    const [EmailOrPhone, setEmailOrPhone] = useState("")
    const navigate = useNavigate()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleNavigate = () => {
        navigate(`/confirm/${formData.code}`)
    }

    const handleViewCode = async () => {
        try {
            const response = await getLatestComparasCodeByEmailOrPhone(EmailOrPhone)
            if (response?.error) {
                toast.error("Komparas code ntibashije kuboneka")
            }
            else{
                toast.success("Komparas code yoherereje kuri email yawe")
            }
        } catch (error: any) {
            toast.error("Komparas code ntibashije kuboneka")
        }
    }

    return (
        <div className="flex py-24 relative flex-col w-fit h-fit min-h-max border-gray-950 border-2 m-auto justify-center gap-4 md:p-24 p-20 items-center">
            <div className="flex w-full justify-between">
                <button onClick={() => navigate(-1)} className="absolute top-2 left-2 w-fit rounded-md">
                    <MdOutlineKeyboardBackspace className="text-3xl" />
                </button>
                <button className="w-fit rounded-md absolute top-2 right-2 font-bold text-green-600">
                    Ndi Umuguzi
                </button>
            </div>

            <div className="flex flex-col gap-4 mt-12">
                <input
                    type="text"
                    value={formData.code}
                    onChange={handleChange}
                    name="code"
                    placeholder="Komparas code wakoreshesje ugura phone"
                    className="border-b-green-600 p-2 border-b outline-none bg-white"
                />

                <button
                    onClick={() => setIsForgot(!isForgot)}
                    className="text-gray-500 underline underline-offset-2 -mt-3 text-sm self-start justify-start">
                    Wibagiwe Code
                </button>

                {isForgot && (
                    <div className="flex flex-col">
                        <input
                            type="email"
                            name="email"
                            onChange={(e) => setEmailOrPhone(e.target.value)}
                            placeholder="Enter your email"
                            className="border-green-600 p-2 border outline-none bg-white"
                        />

                        <button
                            className="text-sm text-gray-500 self-end underline-offset-2 underline"
                            onClick={handleViewCode} 
                        >
                            Reba code
                        </button>
                    </div>
                )}

                <button
                    className="bg-yellow-500 text-white px-4 py-2 mt-12 flex self-end justify-end w-fit rounded-md"
                    onClick={handleNavigate}
                >
                    Emeza
                </button>
            </div>
        </div>
    )
}

export default ConfirmSteps
