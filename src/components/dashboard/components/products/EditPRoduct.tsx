import { useState, useEffect } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { getAllCategories } from "../../../../api/getAllCategories";
import { updateProduct } from "../../../../api/product";
import { getPoductById } from "../../../../api/product";
import { toast } from "react-toastify";
import { Editor } from "primereact/editor";

interface EditProductProps {
  setIsEditProduct: (isEditProduct: boolean) => void;
}

const productSpecificationsKeys = ["Brand", "Model", "Display", "Processor"];
const ourReviewKeys = ["Power", "Battery", "Other"];

const EditProduct = ({ setIsEditProduct }: EditProductProps) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>({
    product_name: "",
    our_price: "",
    product_description: "",
    category: "",
    product_specifications: productSpecificationsKeys.map((key) => ({
      key,
      value: "",
    })),
    our_review: ourReviewKeys.map((key) => ({
      key,
      value: "",
    })),
    product_image: undefined,
  });

  const [productData, setProductData] = useState<any>(null);

  // Retrieve edit ID from local storage
  const editID: string | any = localStorage.getItem("editProductID");

  // Handle input changes for basic fields
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    if (name.includes("product_specifications")) {
      const [_, index] = name.split(".");
      const newProductSpecifications = [...formData.product_specifications];
      newProductSpecifications[Number(index)].value = value;
      setFormData({
        ...formData,
        product_specifications: newProductSpecifications,
      });
    } else if (name.includes("our_review")) {
      const [_, index] = name.split(".");
      const newOurReview = [...formData.our_review];
      newOurReview[Number(index)].value = value;
      setFormData({ ...formData, our_review: newOurReview });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await getAllCategories();
      setCategories(response?.data || []);
    } catch (error) {
      toast.error("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  // Handle back button click
  const handleBackButton = () => {
    setIsEditProduct(false);
  };

  // Handle product fetching
  useEffect(() => {
    const fetchProduct = async () => {
      if (!editID) {
        toast.error("Invalid product ID");
        return;
      }

      try {
        setLoading(true);
        const { data } = await getPoductById(editID);
        console.log("data", data);
        
        setProductData(data?.product);
      } catch (error) {
        toast.error("Failed to fetch product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [editID]);

  // Populate form data with product details
  useEffect(() => {
    if (productData) {
      setFormData({
        product_name: productData.product_name,
        our_price: productData.our_price,
        product_description: productData.product_description,
        category: productData.category?._id,
        product_specifications: productSpecificationsKeys.map((key) => {
          const keyData = productData.product_specifications.find(
            (specification: any) => specification.key === key
          );
          return {
            key,
            value: keyData ? keyData.value : "",
          };
        }),
        our_review: ourReviewKeys.map((key) => {
          const keyData = productData.our_review.find(
            (review: any) => review.key === key
          );
          return {
            key,
            value: keyData ? keyData.value : "",
          };
        }),
        product_image: productData.product_image,
      });
    }
  }, [productData]);

  // Handle category change
  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      category: event.target.value,
    }));
  };

  // Handle Editor content change
  const handleEditorChange = (index: number, value: string) => {
    const updatedOurReview = [...formData.our_review];
    updatedOurReview[index].value = value;
    setFormData({
      ...formData,
      our_review: updatedOurReview,
    });
  };

  // Handle form submission
  const handleEditProductSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    // Validate form
    if (!formData.product_name) {
      toast.error("Product name is required");
      return;
    }
    if (!formData.category) {
      toast.error("Please select a category");
      return;
    }

    setLoading(true);

    const updatedFormData = new FormData();
    updatedFormData.append("product_name", formData.product_name);
    updatedFormData.append("our_price", formData.our_price);
    updatedFormData.append("product_description", formData.product_description);
    updatedFormData.append("category", formData.category);
    formData.product_specifications.forEach(
      (specification: any, index: number) => {
        updatedFormData.append(
          `product_specifications[${index}][key]`,
          specification.key
        );
        updatedFormData.append(
          `product_specifications[${index}][value]`,
          specification.value
        );
      }
    );

    formData.our_review.forEach((review: any, index: number) => {
      updatedFormData.append(`our_review[${index}][key]`, review.key);
      updatedFormData.append(`our_review[${index}][value]`, review.value);
    });

    if (formData.product_image) {
      updatedFormData.append("product_image", formData.product_image);
    }

    try {
      await updateProduct(updatedFormData, editID);
      toast.success("Product updated successfully");
      setIsEditProduct(false);
    } catch (error) {
      toast.error("Failed to update product");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  console.log("formData", formData);
  
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
      <div className="AddProductForm__form py-10 w-[70%] mb-12 rounded-md h-fit justify-center mx-auto mt-8 bg-white items-center">
        <div className="AddProductForm__form w-1/2 h-full flex flex-col justify-center mx-auto items-center">
          <div className="AddProductForm__form__title text-2xl font-bold mb-5">
            <button onClick={handleBackButton}>Ongeramo telefoni</button>
          </div>
          <form
            onSubmit={handleEditProductSubmit}
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
                required
              />
            </div>
            <div className="AddProductForm__form__inputs__price flex flex-col justify-start items-start mb-5">
              <label className="AddProductForm__form__inputs__price__label mb-2">
                Igiciro cya telefoni
              </label>
              <input
                className="AddProductForm__form__inputs__price__input w-96 h-10 rounded-md border outline-blue-700 border-gray-300 px-2"
                type="text"
                name="our_price"
                placeholder="Price"
                value={formData?.our_price}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="AddProductForm__form__inputs__description flex flex-col justify-start items-start mb-5">
              <label className="AddProductForm__form__inputs__description__label mb-2">
                Ibisobanuro
              </label>
              <textarea
                className="AddProductForm__form__inputs__description__input w-96 h-24 rounded-md border outline-blue-700 border-gray-300 px-2"
                name="product_description"
                placeholder="Product Description"
                value={formData?.product_description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="AddProductForm__form__inputs__category flex flex-col justify-start items-start mb-5">
              <label className="AddProductForm__form__inputs__category__label mb-2">
                Hitamo icyiciro
              </label>
              <select
                className="AddProductForm__form__inputs__category__select w-96 h-10 rounded-md border outline-blue-700 border-gray-300 px-2"
                name="category"
                value={formData.category}
                onChange={handleCategoryChange}
                required
              >
                <option value={
                    formData.category?._id 
                    }>
                    {formData.category?.name}
                </option>
                {categories.length === 0 && (
                  <option value="" disabled>
                    No categories available
                  </option>
                )
                }
                {categories.map((category: any) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="AddProductForm__form__inputs__specifications flex flex-col justify-start items-start mb-5">
              <label className="AddProductForm__form__inputs__specifications__label text-lg font-bold mb-2">
                Specifications
              </label>
              
              {formData?.product_specifications?.map(
                (specification: any, index: number) => (
                    <div className="flex flex-col justify-start items-start mb-5 w-full">
                        <p className="">{specification.key}</p>
                  <input
                    key={index}
                    className="AddProductForm__form__inputs__specifications__input w-96 h-10 rounded-md border outline-blue-700 border-gray-300 px-2 mb-2"
                    type="text"
                    name={`product_specifications.${index}.value`}
                    placeholder={specification.key}
                    value={specification.value}
                    onChange={handleInputChange}
                  />
                    </div>
                )
              )}
            </div>
            <div className="AddProductForm__form__inputs__review flex flex-col justify-start items-start mb-5">
              <label className="AddProductForm__form__inputs__review__label mb-2 text-lg font-bold">
                Our Review
              </label>
              {formData?.our_review?.map((review: any, index: number) => (
                <div className="flex flex-col justify-start items-start mb-5 w-full">
                <p className="">{review.key}</p>
                <Editor
                  key={index}
                  style={{ width: "600px", height: "150px", marginBottom: "20px" }}
                  value={review.value}
                  onTextChange={(e) => handleEditorChange(index, e.htmlValue || "")}
                  placeholder={`Enter ${review.key} review`}
                />
                </div>
              ))}
            </div>
            {/* <div className="AddProductForm__form__inputs__image flex flex-col justify-start items-start mb-5">
              <label className="AddProductForm__form__inputs__image__label mb-2">
                Ishusho
              </label>
              <input
                className="AddProductForm__form__inputs__image__input w-96 h-10 rounded-md border outline-blue-700 border-gray-300 px-2"
                type="file"
                name="product_image"
                onChange={(e) =>
                  setFormData({ ...formData, product_image: e.target.files?.[0] })
                }
              />
            </div> */}

            <div className="ImageUpload flex flex-col justify-start items-start mb-5">
                <label className="ImageUpload__label mb-2">Ishusho</label>
                {
                    formData?.product_image && (
                        <img src={
                            formData?.product_image instanceof File
                            ? URL.createObjectURL(formData?.product_image)
                            : formData?.product_image

                        } alt="Product" className="ImageUpload__image w-24 h-24 object-cover rounded-md mb-2" />
                    )


                }
                <input type="file" className="ImageUpload__input" onChange={(e) => setFormData({...formData, product_image: e.target.files?.[0]})} />
            </div>
            <div className="AddProductForm__form__inputs__submit flex justify-center items-center">
              <button
                className={`AddProductForm__form__inputs__submit__button w-48 h-12 rounded-md bg-blue-700 text-white font-bold ${
                  loading ? "opacity-50" : ""
                }`}
                type="submit"
                disabled={loading}
              >
                {loading ? "Loading..." : "Update Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
