import { MdOutlineKeyboardBackspace } from "react-icons/md"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
const ConfirmSteps = () => {
    const [formData, setFormData] = useState({
        code: ""
    })
    const navigate = useNavigate()
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleNavigate = () => {
        navigate(`/confirm/${formData.code}`)
    }
    return (
        <div className="flex py-24 relative flex-col w-fit  h-fit min-h-max  border-gray-950 border-2 m-auto justify-center gap-4 md:p-24 p-20 items-center">
            <div className="flex w-full justify-between">
                <button onClick={() => navigate(-1)} className="absolute top-2 left-2 w-fit rounded-md"><MdOutlineKeyboardBackspace className="text-3xl" /></button>
                <button className=" w-fit rounded-md absolute top-2 right-2 font-bold text-green-600">Ndi Umuguzi</button>
            </div>
            <form className="flex flex-col gap-4 mt-12">
                <input type="text"
                    value={formData.code}
                    onChange={handleChange}
                    name="code"
                    placeholder="Komparas code wakoreshesje ugura phone"
                    className="border-b-green-600 p-2 border-b outline-none bg-white" />
                <button className="bg-yellow-500 text-white px-4 py-2 mt-12 flex self-end justify-end w-fit rounded-md" onClick={handleNavigate}>Emeza</button>
            </form>
        </div>
    )
}
export default ConfirmSteps