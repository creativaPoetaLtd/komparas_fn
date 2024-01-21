import { UploadSimple } from "@phosphor-icons/react"
import { useState } from "react"
import { RiDeleteBin6Line } from "react-icons/ri"
import { toast } from "react-toastify"
import { addPRoductimage } from "../../../../api/product"

interface AddProductImageProps {
    setIsAddProductImage: (isShopFormOpen: boolean) => void
    selectedShopId?: string
}
const AddProductImage = (
    { setIsAddProductImage, }: AddProductImageProps
) => {
    const [loading, setLoading] = useState(false)
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        product_image: undefined
    })

    const handleShopFormClose = () => {
        setIsAddProductImage(false)
    }
    const handleRemoveProfilePicture = () => {
        setFormData((prevFormData: any) => ({
            ...prevFormData,
            product_image: undefined,
        }));
        setImageUrl(null);
    };
    const handleImageUpload = () => {
        const image: HTMLElement | null =
            document.getElementById("product_image");
        image?.click();
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFormData((prevFormData: any) => ({
                ...prevFormData,
                product_image: file,
            }));
            const reader = new FileReader();
            reader.onload = () => {
                setImageUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setImageUrl(null);
        }
    };

    const handleAddProductImage = async (e: any) => {
        e.preventDefault();
        setLoading(true); 
        const res = await addPRoductimage(formData, localStorage.getItem("editProductID") || "");
        if (res?.message === 'Product image added successfully') {
          toast.success("Product Image Added Successfully");
          toast.success("Odd other images");
          setFormData({
            product_image: undefined,
          });
          setImageUrl(null);
          setLoading(false);
        } else {
          toast.error("Failed to add product image");
          setLoading(false);
        }
      };
    
    return (
        <div className="w-full h-full bg-black bg-opacity-50 fixed top-0 left-0 flex justify-center items-center">
            <div className=" h-fit bg-gray-300 pb-10 rounded-md flex flex-col justify-center items-center">
                <div className="w-full flex justify-between items-center px-4 py-2">
                    <h1 className="text-slate-900 text-lg font-bold pl-48">Add a product Image</h1>
                    <button className="w-10 h-10 rounded-md bg-slate-200 hover:bg-red-600  flex justify-center items-center"
                        onClick={handleShopFormClose}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-slate-900 hover:text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="w-[40rem] bg-yellow-300 flex justify-center items-center ">
                    <form className="w-full flex flex-col justify-center items-center px-52 bg-gray-300">
                        <div className="laptop:w-full desktop:w-full tablet:w-full laptop:mt-0 tablet:mt-0 desktop:mt-0  mt-2 w-full justify-between flex felx-col space-y-4">
                            <div className="flex flex-col w-full">
                                <label className="text-sm mb-1 font-normal text-grey-700 ">
                                    Profile Image
                                </label>
                                {formData?.product_image ? (
                                    <div className="relative w-full h-[250px]">
                                        <img
                                            src={imageUrl || ""}
                                            width={300}
                                            height={400}
                                            alt="Selected Profile"
                                            className="w-full h-full object-fill rounded-lg"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleRemoveProfilePicture}
                                            className="absolute left-2 bottom-2  hover:text-red-700 cursor-pointer"
                                        >
                                            <div className="p-2 bg-error rounded-full">
                                                <RiDeleteBin6Line className="text-white text-xl  rounded-full  cursor-pointer" />
                                            </div>{" "}
                                        </button>
                                    </div>
                                ) : (
                                    <div
                                        className="flex flex-col text-center items-center justify-center m-auto w-full h-[250px] bg-grey-200 border-2  border-grey-500 rounded-lg relative hover:cursor-pointer "
                                        onClick={handleImageUpload}
                                    >
                                        <input
                                            type="file"
                                            accept="image/png, image/jpeg"
                                            id="product_image"
                                            name="product_image"
                                            onChange={handleImageChange}
                                            style={{ display: "none" }}
                                        />
                                        <div className="absolute flex flex-col gap-5 items-center">
                                            <UploadSimple
                                                color="#90A8A2"
                                                size={22}
                                            />
                                            <p className="text-sm text-grey-700">
                                                Upload Profile
                                            </p>
                                        </div>
                                    </div>
                                )}
                                <button type="button" className={`bg-blue-700 text-white space-x-3 rounded-md flex justify-center m-auto items-center p-2 h-[47px] mt-5 w-full ${formData?.product_image ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={handleImageUpload}
                                >
                                    <p>Upload Profile</p>
                                    <UploadSimple color="#90A8A2" size={22} />

                                </button>
                            </div>

                        </div>
                        <div className="w-full flex justify-start items-start mt-4">
                            <button
                                type="button" className="w-full h-10 rounded-md bg-blue-700 text-white" onClick={handleAddProductImage} disabled={loading}
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
    
}

export default AddProductImage