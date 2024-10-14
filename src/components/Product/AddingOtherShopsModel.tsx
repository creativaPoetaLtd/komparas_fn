// Modal.tsx
import React, { useEffect, useState } from 'react';
import { fetchAllShops } from '../../api/shops';
import { addShopToProduct } from '../../api/shops'; // Import the API function

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: string; // Accept productId as a prop
  onAddShop: (shop: { vendor_id: string; price: number; colors: string[] }) => void;
}

const AddOtherShopsModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  productId,
  onAddShop,
}) => {
  const [shopName, setShopName] = useState('');
  const [shopPrice, setShopPrice] = useState<number | ''>('');
  const [shopColors, setShopColors] = useState<string[]>([]);
  const [allShops, setAllShops] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false); // To handle loading state
  const [error, setError] = useState<string | null>(null); // To handle errors

  const handleColorChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newColors = [...shopColors];
    newColors[index] = e.target.value;
    setShopColors(newColors);
  };

  const addColorField = () => {
    setShopColors([...shopColors, '']);
  };

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const { data } = await fetchAllShops();
        setAllShops(data);
      } catch (error) {
        console.error('Failed to fetch shops:', error);
      }
    };
    fetchShops();
  }, []);

  const handleAddShop = async () => {
    // Validate input fields before making an API call
    if (!shopName || !shopPrice || shopColors.length === 0) {
      setError('Please fill in all fields correctly.');
      return;
    }

    // Prepare the shop data
    const shopData = {
      vendor_id: shopName,
      price: shopPrice as number,
      colors: shopColors.filter((color) => color.trim() !== ''),
    };

    setIsLoading(true); // Set loading state
    setError(null); // Reset error state

    try {
      // Call the API to add the shop
      const response = await addShopToProduct(productId, shopData);

      // Notify parent component about the new shop addition
      onAddShop(shopData);
      onClose(); // Close the modal
      if(response?.status === true){
        window.location.reload();
      }
    } catch (error) {
      console.error('Error adding shop:', error);
      setError('Failed to add the shop. Please try again.');
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-xl font-bold mb-4">Add New Shop</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Shop Name</label>
            <select
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select Shop</option>
              {allShops.map((shop) => (
                <option key={shop._id} value={shop._id}>
                  {shop.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Price</label>
            <input
              type="number"
              value={shopPrice}
              onChange={(e) => setShopPrice(parseFloat(e.target.value))}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter price"
            />
          </div>
          <div className="mb-4 flex flex-col">
            <label className="block text-gray-700">Colors</label>
            {shopColors.map((color, index) => (
              <input
                key={index}
                type="text"
                value={color}
                onChange={(e) => handleColorChange(e, index)}
                className="w-fit border rounded px-3 py-2 mb-2"
                placeholder="Enter color code (e.g., #ff0000)"
              />
            ))}
            <button
              type="button"
              onClick={addColorField}
              className="text-blue-500"
            >
              Add Another Color
            </button>
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleAddShop}
              className="bg-green-500 text-white px-4 py-2 rounded mr-2"
              disabled={isLoading}
            >
              {isLoading ? 'Adding...' : 'Add Shop'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white px-4 py-2 rounded"
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOtherShopsModal;
