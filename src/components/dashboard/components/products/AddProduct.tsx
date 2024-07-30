import { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { getAllCategories } from "../../../../api/getAllCategories";
import { addProduct } from "../../../../api/product";
import { useEffect } from "react";
import { UploadSimple } from "@phosphor-icons/react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-toastify";
import { Editor } from "primereact/editor";

interface AddProductProps {
    setIsAddProduct: (isAddProduct: boolean) => void;
}
const product_specificationsKeys = [
    "Brand",
    "Model",
    "Display",
    "Processor",
];
const AddProduct = ({ setIsAddProduct }: AddProductProps) => {
    const [categories, setCategories] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [our_review, setOur_review] = useState([{ key: "", value: "" }])
    const [availableStorages, setAvailableStorages] = useState([{ value: "" }]);

    const [formData, setFormData] = useState({
        product_name: "",
        product_price: "",
        product_description: "",
        category: "",
        our_price: "",
        product_specifications: product_specificationsKeys.map((key) => ({ key, value: "" })),
        product_image: undefined,
        our_review: [],
        availableStorages: []
    });
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const fetchCategories = async () => {
        setLoading(true);
        const categories = await getAllCategories();
        setCategories(categories?.data);
        setLoading(false);
    };
    useEffect(() => {
        fetchCategories();
    }, []);

    const handleBackButton = () => {
        setIsAddProduct(false);
    };

    const handleAddProduct = () => {
        setIsAddProduct(false);
    };
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        if (name.startsWith("product_specifications")) {
            const [_, index] = name.split(".");
            const updatedproduct_specifications = [...formData.product_specifications];
            updatedproduct_specifications[Number(index)].value = value;
            setFormData({
                ...formData,
                product_specifications: updatedproduct_specifications,
            });
        } else {
            setFormData((prevFormData: any) => ({
                ...prevFormData,
                [name]: value,
            }));
        }
    }
    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            category: event.target.value,
        }));
    };
    const handleOurReviewChange = (index: number, field: string, value: string) => {
        const updatedOurReview: any = [...our_review];
        updatedOurReview[index][field] = value;
        setOur_review(updatedOurReview);
    };
    const handleAvailableStoragesChange = (index: any, field: string, value: string) => {
        const updatedStorages: any = [...availableStorages];
        updatedStorages[index][field] = value;
        setAvailableStorages(updatedStorages);
    };
    const addOurReview = () => {
        setOur_review([...our_review, { key: "", value: "" }])
    }
    const addAvailableStorageField = () => {
        setAvailableStorages([...availableStorages, { value: "" }]);
    };
    const removeAvailableStorageField = (index: any) => {
        const updatedStorages = [...availableStorages];
        updatedStorages.splice(index, 1);
        setAvailableStorages(updatedStorages);
    }
    const removeOurReviewField = (index: number) => {
        const updatedOurReview = [...our_review];
        updatedOurReview.splice(index, 1);
        setOur_review(updatedOurReview);
    };
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
    const clearFormAfterSubmit = () => {
        setFormData({
            product_name: "",
            product_price: "",
            product_description: "",
            category: "",
            our_price: "",
            product_specifications: product_specificationsKeys.map((key) => ({ key, value: "" })),
            product_image: undefined,
            our_review: [],
            availableStorages: []
        });
        setImageUrl(null);
    };
    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        try {
            const updatedFormData = {
                ...formData,
                our_review: our_review,
                availableStorages: availableStorages,
            };
            product_specificationsKeys.forEach((key, index) => {
                updatedFormData.product_specifications[index].key = key;
            });
            const response = await addProduct(updatedFormData);
            setLoading(false);

            if (response?.message === 'Product added successfully') {
                clearFormAfterSubmit();
                toast.success('Product added successfully');
                setLoading(false);
                handleBackButton();
            }
            else if (response?.message !== 'Product added successfully') {
                toast.error(response?.message);
                setLoading(false);
            }
            else {
                toast.error('Something went wrong');
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
        }
    };
    return (
        <div className='AddProductForm w-full h-fit flex flex-col pb-12 bg-gray-300 p-2'>
            <button className='AddProductForm__backButton w-full h-full flex justify-start items-start' onClick={handleBackButton}>
                <IoIosArrowRoundBack className='AddProductForm__backButton__icon text-4xl font-bold' />
                <div className='AddProductForm__backButton__text text-2xl font-bold'>Back</div>
            </button>
            <div className="AddProductForm__form py-10 w-[70%] mb-12 rounded-md h-fit justify-center mx-auto mt-8 bg-white items-cente">
                <div className='AddProductForm__form w-1/2 h-full flex flex-col justify-center mx-auto items-center'>
                    <div className='AddProductForm__form__title text-2xl font-bold mb-5'>
                        <button onClick={handleAddProduct}>Ongeramo telefoni</button>
                    </div>
                    <form onSubmit={handleFormSubmit} className='AddProductForm__form__inputs flex flex-col justify-center items-start'>
                        <div className='AddProductForm__form__inputs__name flex flex-col justify-start items-start mb-5'>
                            <label className='AddProductForm__form__inputs__name__label  mb-2'>Izina rya telefoni</label>
                            <input className='AddProductForm__form__inputs__name__input w-96 h-10 rounded-md border outline-blue-700 border-gray-300 px-2'
                                type="text"
                                name='product_name'
                                placeholder='Product Name'
                                value={formData?.product_name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='AddProductForm__form__inputs__description flex flex-col justify-start items-start mb-5'>
                            <label className='AddProductForm__form__inputs__description__label  mb-2'>Ibijyane na telefoni</label>
                            <textarea
                                className='AddProductForm__form__inputs__description__input w-96 h-28 rounded-md border outline-blue-700 border-gray-300 px-2'
                                placeholder='Product Description'
                                name='product_description'
                                value={formData?.product_description}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='AddProductForm__form__inputs__category flex flex-col justify-start items-start mb-5'>
                            <label className='AddProductForm__form__inputs__category__label  mb-2'>Ubwoko bwa telefoni</label>
                            <select
                                className='AddProductForm__form__inputs__category__input w-96 h-10 rounded-md border outline-blue-700 border-gray-300 px-2'
                                onChange={handleCategoryChange}
                                value={formData.category}
                            >
                                <option value="" disabled selected>Hotamo ubwoko</option>
                                {categories?.map((category: any) => (
                                    <option key={category.name} value={category.name}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="AddProductForm__form__inputs__product_specifications w-full flex flex-col justify-start items-start mb-5">
                            <label className="AddProductForm__form__inputs__product_specifications__label mb-2">
                                Ububiko bwose buhari
                            </label>
                            {availableStorages.map((spec, index) => (
                                <div key={index} className="flex w-[90%] space-x-2 mb-2">
                                    <input
                                        type="text"
                                        placeholder="Value"
                                        value={spec.value}
                                        onChange={(e) => handleAvailableStoragesChange(index, "value", e.target.value)}
                                        className="w-full h-10 rounded-md border outline-blue-700 border-gray-300 px-2"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeAvailableStorageField(index)}
                                        className="border px-2 py-0 text-black hover:text-white bg-red-100 hover:bg-red-500 rounded-md"
                                    >
                                        x
                                    </button>
                                </div>
                            ))}
                            <div className="w-[88%]">
                                <button
                                    type="button"
                                    onClick={addAvailableStorageField}
                                    className="border p-2 text-white bg-blue-600 rounded-md float-right"
                                >
                                    Add Storage
                                </button>
                            </div>
                        </div>
                        <div className='AddProductForm__form__inputs__name flex flex-col justify-start items-start mb-5'>
                            <label className='AddProductForm__form__inputs__name__label  mb-2'>Igiciro cyacu</label>
                            <input className='AddProductForm__form__inputs__name__input w-96 h-10 rounded-md border outline-blue-700 border-gray-300 px-2'
                                type="text"
                                name='our_price'
                                placeholder='Igicuro cyacu'
                                value={formData?.our_price}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="w-full flex justify-start flex-col items-start mt-4">
                            <label className="text-sm mb-1 font-normal text-grey-700 ">Product product_specifications</label>
                            {formData?.product_specifications.map((key, index) => (
                                <div key={index} className="w-full flex justify-between items-center mt-2">
                                    <span>{key.key}</span>
                                    <input
                                        type="text"
                                        name={`product_specifications.${index}`}
                                        value={key.value}
                                        onChange={handleInputChange}
                                        className="w-1/2 h-10 rounded-md border outline-blue-700 border-gray-300 px-2"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="AddProductForm__form__inputs__product_specifications flex flex-col justify-start items-start mb-5">
                            <label className="AddProductForm__form__inputs__product_specifications__label mb-2">
                                Icyo tuyivugaho
                            </label>
                            {our_review.map((rev, index) => (
                                <div key={index} className="flex flex-col w-[88%] space-y-2 mb-2">
                                    <div className="flex w-[88%] space-x-2 mb-2">
                                        <input
                                            type="text"
                                            placeholder="Key"
                                            value={rev.key}
                                            onChange={(e) => handleOurReviewChange(index, "key", e.target.value)}
                                            className="w-1/2 h-10 rounded-md border outline-blue-700 border-gray-300 px-2"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeOurReviewField(index)}
                                            className="border px-2 py-0 text-black hover:text-white bg-red-100 hover:bg-red-500 rounded-md"
                                        >
                                            x
                                        </button>
                                    </div>

                                    <Editor
                                        style={{ height: "100px" }}
                                        value={rev.value}
                                        onTextChange={(e: any) => handleOurReviewChange(index, "value", e.htmlValue)}
                                    />
                                </div>
                            ))}
                            <div className="w-[88%]">
                                <button
                                    type="button"
                                    onClick={addOurReview}
                                    className="border p-2 text-white bg-blue-600 rounded-md float-right"
                                >
                                    Ongeramo andi makuru
                                </button>
                            </div>
                        </div>
                        <div className="laptop:w-[88%] desktop:w-[88%] tablet:w-[88%] laptop:mt-0 tablet:mt-0 desktop:mt-0  mt-2 w-full justify-between flex felx-col space-y-4">
                            <div className="flex flex-col w-full">
                                <label className="text-sm mb-1 font-normal text-grey-700 ">
                                    Ifoto ya telefoni
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
                                            className="absolute left-2 bottom-2  hover:text-red-700 bg-red-600 cursor-pointer"
                                        >
                                            <div className="p-2 bg-error rounded-full">
                                                <RiDeleteBin6Line className="text-white text-xl  rounded-full  cursor-pointer" />
                                            </div>{" "}
                                        </button>
                                    </div>
                                ) : (
                                    <div
                                        className="flex flex-col text-center items-center justify-center m-auto w-full h-[250px] bg-grey-200 border-2  border-grey-500 rounded-lg relative hover:cursor-pointer"
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
                                                Shyiramo ifoto ya telefoni
                                            </p>
                                        </div>
                                    </div>
                                )}
                                <button type="button" className={`bg-blue-700 mb-12 text-white space-x-3 rounded-md flex justify-center m-auto items-center p-2 h-[47px] mt-5 w-full ${formData?.product_image ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={handleImageUpload}
                                >
                                    <p>Shiramo telefoni</p>
                                    <UploadSimple color="#90A8A2" size={22} />
                                </button>
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={formData?.product_image === "" ||  formData?.product_specifications === null}
                            className={`flex justify-center items-center w-96 h-10 rounded-md bg-blue-700 text-white ${formData?.product_image === "" || formData?.product_name === "" || formData?.product_description === "" || formData?.category === "" ||formData?.product_specifications === undefined ? "opacity-50 cursor-not-allowed" : "opacity-100 cursor-pointer"}`}
                        >
                            {loading ? "Loading..." : "Add Product"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddProduct