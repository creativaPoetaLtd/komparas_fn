/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { getAllCategories } from "../../../../api/getAllCategories";
import { addProduct } from "../../../../api/product";
import { UploadSimple } from "@phosphor-icons/react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-toastify";
import { Editor } from "primereact/editor";
import AddCategoryForm from "../categories/AddCategoryForm"

interface AddProductProps {
  setIsAddProduct: (isAddProduct: boolean) => void;
}

const product_specificationsKeys = [
  "Ubwoko", 
  "Igiciro (yasohotse igura)", 
  "Umwaka yakorewemo", 
  "OS", 
  "Uko ingana", 
  "Ingano ya ecran/screen", 
  "Uburemere", 
  "Proseseri", 
  "Ingano y’ububiko/ ubushobozi bwo kubika", 
  "RAM", 
  "Foto", 
  "Selfie", 
  "NFC", 
  "Wi-Fi", 
  "Bluetooth",
  "5G",
  "Gutindana umuriro", 
  "Uburyo isharijwa", 
  "Ishobora gusharijwa nta mugozi", 
  "Ijyamo sim 2", 
  "Iboneka mu yahe mabara",
  "Icomekwaho ecouteur",
  "Uburyo screen igaragaza amashusho",
  "Ijyamo memory card", 
  "Ifunguka ikoresheje ibikumwe" ];
const ourReview = [
  "Imiterere y’inyuma (Design / Housing)", 
  "Imbere (Ecran/Screen)", 
  "Ibijyanye na apareye foto (appareil photo), selfie na kamera (camera)",
  "Ubushobozi / Imbaraga",
  "Ugukomera/Ukuramba",
  "Ibijyanye n’umuriro na bateri (Batterie/Battery)",
  "Umwanzuro"
];

const AddProduct = ({ setIsAddProduct }: AddProductProps) => {
  const [categories, setCategories] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    product_name: "",
    product_price: "",
    product_description: "",
    category: "",
    our_price: "",
    product_specifications: product_specificationsKeys.map((key) => ({
      key,
      value: "",
    })),
    product_image: undefined,
    our_review: ourReview.map((key) => ({ key, value: "" })),
  });
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isAddCategoryModalVisible, setIsAddCategoryModalVisible] = useState(false);

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

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any
  ) => {
    const { name, value } = event.target || event; // Add support for Editor
    if (name.startsWith("our_review")) {
      const [_, index] = name.split(".");
      const updatedOurReview = [...formData.our_review];
      updatedOurReview[Number(index)].value = value;
      setFormData({
        ...formData,
        our_review: updatedOurReview,
      });
    } else if (name.startsWith("product_specifications")) {
      const [_, index] = name.split(".");
      const updatedproduct_specifications = [
        ...formData.product_specifications,
      ];
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
  };

  const handleEditorChange = (index: number, value: string) => {
    const updatedOurReview = [...formData.our_review];
    updatedOurReview[index].value = value;
    setFormData({
      ...formData,
      our_review: updatedOurReview,
    });
  };

  const handleCategoryChange = (category: string) => {
    if (category === "other") {
      setIsAddCategoryModalVisible(true);
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        category,
      }));
    }
  };

 // Wrapper function to handle the onChange event for selecting category
  const handleCategoryChangeWrapper = (event: React.ChangeEvent<HTMLSelectElement>) => {
    handleCategoryChange(event.target.value);
  };

  const handleAddNewCategory = (newCategory: any) => {
    setCategories((prevCategories: any) => [...prevCategories, newCategory]);
    // Hide the modal after adding the category
    setIsAddCategoryModalVisible(false);
  };

  const handleRemoveProfilePicture = () => {
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      product_image: undefined,
    }));
    setImageUrl(null);
  };

  const handleImageUpload = () => {
    const image: HTMLElement | null = document.getElementById("product_image");
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
      product_specifications: product_specificationsKeys.map((key) => ({
        key,
        value: "",
      })),
      product_image: undefined,
      our_review: ourReview.map((key) => ({ key, value: "" })),
    });
    setImageUrl(null);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const updatedFormData = {
        ...formData,
      };
      product_specificationsKeys.forEach((key, index) => {
        updatedFormData.product_specifications[index].key = key;
      });
      ourReview.forEach((key, index) => {
        updatedFormData.our_review[index].key = key;
      });
      const response = await addProduct(updatedFormData);
      setLoading(false);

      if (response?.message === "Product added successfully") {
        clearFormAfterSubmit();
        toast.success("Product added successfully");
        setLoading(false);
        handleBackButton();
      } else if (response?.message !== "Product added successfully") {
        toast.error(response?.message);
        setLoading(false);
      } else {
        toast.error("Something went wrong");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="AddProductForm w-full h-fit flex flex-col pb-12 bg-gray-300 p-2">
      <button
        className="AddProductForm__backButton w-full h-full flex justify-start items-start"
        onClick={handleBackButton}
      >
        <IoIosArrowRoundBack className="AddProductForm__backButton__icon text-4xl font-bold" />
        <div className="AddProductForm__backButton__text text-2xl font-bold">
          Back
        </div>
      </button>
      <div className="AddProductForm__form py-10 w-[70%] mb-12 rounded-md h-fit justify-center mx-auto mt-8 bg-white items-cente">
        <div className="AddProductForm__form w-1/2 h-full flex flex-col justify-center mx-auto items-center">
          <div className="AddProductForm__form__title text-2xl font-bold mb-5">
            <button onClick={handleAddProduct}>Ongeramo telefoni</button>
          </div>
          <form
            onSubmit={handleFormSubmit}
            className="AddProductForm__form__inputs flex flex-col justify-center items-start"
          >
            <div className="AddProductForm__form__inputs__name flex flex-col justify-start items-start mb-5">
              <label className="AddProductForm__form__inputs__name__label  mb-2">
                Izina rya telefoni
              </label>
              <input
                className="AddProductForm__form__inputs__name__input w-96 h-10 rounded-md border outline-blue-700 border-gray-300 px-2"
                type="text"
                name="product_name"
                placeholder="Product Name"
                value={formData?.product_name}
                onChange={handleInputChange}
              />
            </div>
            <div className="AddProductForm__form__inputs__description flex flex-col justify-start items-start mb-5">
              <label className="AddProductForm__form__inputs__description__label  mb-2">
                Ibijyane na telefoni
              </label>
              <textarea
                className="AddProductForm__form__inputs__description__input w-96 h-28 rounded-md border outline-blue-700 border-gray-300 px-2"
                placeholder="Product Description"
                name="product_description"
                value={formData?.product_description}
                onChange={handleInputChange}
              />
            </div>
            <div className="AddProductForm__form__inputs__category flex flex-col justify-start items-start mb-5">
              <label className="AddProductForm__form__inputs__category__label  mb-2">
                Ubwoko bwa telefoni
              </label>
              <select
                className="AddProductForm__form__inputs__category__input w-96 h-10 rounded-md border outline-blue-700 border-gray-300 px-2"
                onChange={handleCategoryChangeWrapper}
                value={formData.category}
              >
                <option value="" disabled selected>
                  Hitamo ubwoko
                </option>
                {loading ? (
                  <option>Loading categories...</option>
                ) : (
                  categories?.map((category: any) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))
                )}
                <option value="other">Other (Ongeramo ubwoko bushya)</option>
              </select>
            </div>
            <div className="AddProductForm__form__inputs__price flex flex-col justify-start items-start mb-5">
              <label className="AddProductForm__form__inputs__price__label mb-2">
                Igiciro cyacu
              </label>
              <input
                className="AddProductForm__form__inputs__price__input w-96 h-10 rounded-md border outline-blue-700 border-gray-300 px-2"
                type="number"
                placeholder="Our Price"
                name="our_price"
                value={formData.our_price}
                onChange={handleInputChange}
              />
            </div>
            <div className="AddProductForm__form__inputs__specifications flex flex-col justify-start items-start mb-5">
              <label className="AddProductForm__form__inputs__specifications__label font-bold text-red-500  mb-2">
                Specifications
              </label>
              {formData.product_specifications.map((specification, index) => (
                <div key={index} className="flex flex-col mb-3">
                  <label className="mb-1">{specification.key}</label>
                  <input
                    className="AddProductForm__form__inputs__specifications__input w-96 h-10 rounded-md border outline-blue-700 border-gray-300 px-2"
                    type="text"
                    name={`product_specifications.${index}`}
                    placeholder={`Enter ${specification.key}`}
                    value={specification.value}
                    onChange={handleInputChange}
                  />
                </div>
              ))}
            </div>
            <div className="AddProductForm__form__inputs__reviews flex flex-col justify-start items-start mb-5">
              <label className="AddProductForm__form__inputs__reviews__label font-bold text-red-500  mb-2">
                Reviews
              </label>
              {formData.our_review.map((review, index) => (
                <div key={index} className="flex flex-col mb-3">
                  <label className="mb-1">{review.key}</label>
                  <Editor
                      id={review.key}
                      name={`our_review.${index}`} // Change name
                      value={review.value}
                      style={{ height: "100px" }}
                      onTextChange={(e) =>
                        handleEditorChange(index, e.htmlValue || "")
                      }
                    />
                </div>
              ))}
            </div>
            <div className="AddProductForm__form__inputs__product_image flex flex-col justify-start items-start mb-5">
              <label className="AddProductForm__form__inputs__product_image__label  mb-2">
                Ifoto ya telefoni
              </label>
              <input
                id="product_image"
                type="file"
                className="hidden"
                name="product_image"
                accept="image/*"
                onChange={handleImageChange}
              />
              {imageUrl ? (
                <div className="image-preview flex items-center justify-center gap-2 border border-gray-200 rounded-md shadow-md p-2">
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="object-cover w-20 h-20"
                  />
                  <div
                    className="remove-button text-red-500 cursor-pointer"
                    onClick={handleRemoveProfilePicture}
                  >
                    <RiDeleteBin6Line size={20} />
                  </div>
                </div>
              ) : (
                <div
                  onClick={handleImageUpload}
                  className="w-96 flex h-24 justify-center items-center flex-col rounded-md border outline-blue-700 border-gray-300"
                >
                  <UploadSimple size={32} color="gray" />
                  <span>Upload Product Image</span>
                </div>
              )}
            </div>
            <button
              type="submit"
              className="AddProductForm__form__inputs__submitButton w-96 h-10 rounded-md bg-blue-500 hover:bg-blue-600 text-white"
              disabled={loading}
            >
              {loading ? "Saving Product..." : "Save Product"}
            </button>
          </form>
        </div>
      </div>
      {isAddCategoryModalVisible && (
        <AddCategoryForm
          setIsAddCategory={setIsAddCategoryModalVisible}
          onAddCategory={handleAddNewCategory}
        />
      )}
    </div>
  );
};

export default AddProduct;
