import { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { getAllCategories } from "../../../../api/getAllCategories";
import { addProduct } from "../../../../api/product";
import { useEffect } from "react";
import { getAllShops } from "../../../../api/getAllShops";
import { UploadSimple } from "@phosphor-icons/react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-toastify";

interface AddProductProps {
    setIsAddProduct: (isAddProduct: boolean) => void;
}
const AddProduct = ({ setIsAddProduct }: AddProductProps) => {
    const [categories, setCategories] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [shops, setShops] = useState<any>([]);
    const [, setLoadingShops] = useState(false);
    const [specifications, setSpecifications] = useState([{ key: "", value: "" }]);
    const [vendor_prices, setVendorPrices] = useState([{ key: "", value: "" }]);
    const [our_review, setOur_review] = useState([{key:"", value: ""}])
    const [formData, setFormData] = useState({
        product_name: "",
        product_price: "",
        product_description: "",
        category: "",
        vendor_prices: [],
        specifications: [],
        product_image: undefined,
        our_review: []
    });
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const fetchCategories = async () => {
        setLoading(true);
        const categories = await getAllCategories();
        setCategories(categories?.data);
        setLoading(false);
    };
    const fetchShops = async () => {
        setLoadingShops(true);
        const shops = await getAllShops();
        setShops(shops?.data);
        setLoadingShops(false);
    };

    useEffect(() => {
        fetchShops();
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
        setFormData((prevFormData: any) => ({
            ...prevFormData,
            [name]: value,
        }));
    };
    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            category: event.target.value,
        }));
    };
 
    const handleSpecificationChange = (index: number, field: string, value: string) => {
        const updatedSpecifications: any = [...specifications];
        updatedSpecifications[index][field] = value;
        setSpecifications(updatedSpecifications);
    };


    const addSpecificationField = () => {
        setSpecifications([...specifications, { key: "", value: "" }]);
    };
    const handleOurReviewChange = (index: number, field: string, value: string) => {
        const updatedOurReview: any = [...our_review];
        updatedOurReview[index][field] = value;
        setOur_review(updatedOurReview);
    };

    const addOurReview = () => {
        setOur_review([...our_review, {key:"", value: ""}])
    }

    const handleVendorsChange = (index: number, field: string, value: string) => {
        const updatedVendors: any = [...vendor_prices];
        updatedVendors[index][field] = value;
        setVendorPrices(updatedVendors);
    };
    const handleVendorsSelectChange = (event: React.ChangeEvent<HTMLSelectElement>, index: number) => {
        const { value } = event.target;
        handleVendorsChange(index, "key", value);
    };


    const addVendorField = () => {
        setVendorPrices([...vendor_prices, { key: "", value: "" }]);
    };

    const removeSpecificationField = (index: number) => {
        const updatedSpecifications = [...specifications];
        updatedSpecifications.splice(index, 1);
        setSpecifications(updatedSpecifications);
    };
    const removeOurReviewField = (index: number) => {
        const updatedOurReview = [...our_review];
        updatedOurReview.splice(index, 1);
        setOur_review(updatedOurReview);
    };
    const removeVendors = (index: number) => {
        const updatedVendors = [...vendor_prices];
        updatedVendors.splice(index, 1);
        setVendorPrices(updatedVendors);
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
            vendor_prices: [],
            specifications: [],
            product_image: undefined,
            our_review: []
        });
        setSpecifications([{ key: "", value: "" }]);
        setVendorPrices([{ key: "", value: "" }]);
        setShops([{key:"", value: ""}])
        setImageUrl(null);
    };

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        try {
            const updatedFormData = {
                ...formData,
                specifications: specifications,
                vendor_prices: vendor_prices,
                our_review: our_review
            };

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
            console.log(error);
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
                        <button onClick={handleAddProduct}>Add New Product</button>
                    </div>
                    <form onSubmit={handleFormSubmit} className='AddProductForm__form__inputs flex flex-col justify-center items-start'>
                        <div className='AddProductForm__form__inputs__name flex flex-col justify-start items-start mb-5'>
                            <label className='AddProductForm__form__inputs__name__label  mb-2'>Product Name</label>
                            <input className='AddProductForm__form__inputs__name__input w-96 h-10 rounded-md border outline-blue-700 border-gray-300 px-2'
                                type="text"
                                name='product_name'
                                placeholder='Product Name'
                                value={formData?.product_name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='AddProductForm__form__inputs__description flex flex-col justify-start items-start mb-5'>
                            <label className='AddProductForm__form__inputs__description__label  mb-2'>Product Description</label>
                            <textarea
                                className='AddProductForm__form__inputs__description__input w-96 h-28 rounded-md border outline-blue-700 border-gray-300 px-2'
                                placeholder='Product Description'
                                name='product_description'
                                value={formData?.product_description}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='AddProductForm__form__inputs__category flex flex-col justify-start items-start mb-5'>
                            <label className='AddProductForm__form__inputs__category__label  mb-2'>Product Category</label>
                            <select
                                className='AddProductForm__form__inputs__category__input w-96 h-10 rounded-md border outline-blue-700 border-gray-300 px-2'
                                onChange={handleCategoryChange}
                                value={formData.category}
                            >
                                <option value="" disabled selected>Select Category</option>
                                {categories?.map((category: any) => (
                                    <option key={category.name} value={category.name}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="AddProductForm__form__inputs__specifications flex flex-col justify-start items-start mb-5">
                            <label className="AddProductForm__form__inputs__specifications__label mb-2">
                                Shops
                            </label>
                            {vendor_prices.map((spec, index) => (
                                <div key={index} className="flex w-[88%] space-x-2 mb-2">
                                    <select
                                        className='AddProductForm__form__inputs__category__input w-96 h-10 rounded-md border outline-blue-700 border-gray-300 px-2'
                                        onChange={(e) => handleVendorsSelectChange(e, index)}
                                        value={spec.key}
                                    >
                                        <option value="" disabled selected>Select Shop</option>
                                        {shops?.map((shop: any) => (
                                            <option key={shop.name} value={shop._id}>
                                                {shop.name}
                                            </option>
                                        ))}
                                    </select>
                                    <input
                                        type="text"
                                        placeholder="Value"
                                        value={spec.value}
                                        onChange={(e) => handleVendorsChange(index, "value", e.target.value)}
                                        className="w-1/2 h-10 rounded-md border outline-blue-700 border-gray-300 px-2"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeVendors(index)}
                                        className="border px-2 py-0 text-black hover:text-white bg-red-100 hover:bg-red-500 rounded-md"
                                    >
                                        x
                                    </button>
                                </div>
                            ))}
                            <div className="w-[88%]">
                                <button
                                    type="button"
                                    onClick={addVendorField}
                                    className="border p-2 text-white bg-blue-600 rounded-md float-right"
                                >
                                    Add Vendor Field
                                </button>
                            </div>
                        </div>

                        <div className="AddProductForm__form__inputs__specifications flex flex-col justify-start items-start mb-5">
                            <label className="AddProductForm__form__inputs__specifications__label mb-2">
                                Specifications
                            </label>
                            {specifications.map((spec, index) => (
                                <div key={index} className="flex w-[88%] space-x-2 mb-2">
                                    <input
                                        type="text"
                                        placeholder="Key"
                                        value={spec.key}
                                        onChange={(e) => handleSpecificationChange(index, "key", e.target.value)}
                                        className="w-1/2 h-10 rounded-md border outline-blue-700 border-gray-300 px-2"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Value"
                                        value={spec.value}
                                        onChange={(e) => handleSpecificationChange(index, "value", e.target.value)}
                                        className="w-1/2 h-10 rounded-md border outline-blue-700 border-gray-300 px-2"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeSpecificationField(index)}
                                        className="border px-2 py-0 text-black hover:text-white bg-red-100 hover:bg-red-500 rounded-md"
                                    >
                                        x
                                    </button>
                                </div>
                            ))}
                            <div className="w-[88%]">
                                <button
                                    type="button"
                                    onClick={addSpecificationField}
                                    className="border p-2 text-white bg-blue-600 rounded-md float-right"
                                >
                                    Add Specification
                                </button>
                            </div>
                        </div>
                        <div className="AddProductForm__form__inputs__specifications flex flex-col justify-start items-start mb-5">
                            <label className="AddProductForm__form__inputs__specifications__label mb-2">
                                Our Review
                            </label>
                            {our_review.map((rev, index) => (
                                <div key={index} className="flex w-[88%] space-x-2 mb-2">
                                    <input
                                        type="text"
                                        placeholder="Key"
                                        value={rev.key}
                                        onChange={(e) => handleOurReviewChange(index, "key", e.target.value)}
                                        className="w-1/2 h-10 rounded-md border outline-blue-700 border-gray-300 px-2"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Value"
                                        value={rev.value}
                                        onChange={(e) => handleOurReviewChange(index, "value", e.target.value)}
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
                            ))}
                            <div className="w-[88%]">
                                <button
                                    type="button"
                                    onClick={addOurReview}
                                    className="border p-2 text-white bg-blue-600 rounded-md float-right"
                                >
                                    Add Specification
                                </button>
                            </div>
                        </div>
                        {/* <div className='AddProductForm__form__inputs__description flex flex-col justify-start items-start mb-5'>
                            <label className='AddProductForm__form__inputs__description__label  mb-2'>Our Review</label>
                            <textarea
                                className='AddProductForm__form__inputs__description__input w-96 h-28 rounded-md border outline-blue-700 border-gray-300 px-2'
                                placeholder='Our review'
                                name='our_review'
                                value={formData?.our_review}
                                onChange={handleInputChange}
                            />
                        </div> */}
                        <div className="laptop:w-[88%] desktop:w-[88%] tablet:w-[88%] laptop:mt-0 tablet:mt-0 desktop:mt-0  mt-2 w-full justify-between flex felx-col space-y-4">
                            <div className="flex flex-col w-full">
                                <label className="text-sm mb-1 font-normal text-grey-700 ">
                                    Product Image
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
                                                Upload Product Image
                                            </p>
                                        </div>
                                    </div>
                                )}
                                <button type="button" className={`bg-blue-700 mb-12 text-white space-x-3 rounded-md flex justify-center m-auto items-center p-2 h-[47px] mt-5 w-full ${formData?.product_image ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={handleImageUpload}
                                >
                                    <p>Upload Product</p>
                                    <UploadSimple color="#90A8A2" size={22} />
                                </button>
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled = {formData?.product_image === "" || formData?.product_name === ""  || formData?.product_description === "" || formData?.category === "" || formData?.vendor_prices === null || formData?.specifications === null}
                            className={`flex justify-center items-center w-96 h-10 rounded-md bg-blue-700 text-white ${formData?.product_image === "" || formData?.product_name === ""  || formData?.product_description === "" || formData?.category === "" || formData?.vendor_prices === null || formData?.specifications === undefined ? "opacity-50 cursor-not-allowed" : "opacity-100 cursor-pointer"}`}
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