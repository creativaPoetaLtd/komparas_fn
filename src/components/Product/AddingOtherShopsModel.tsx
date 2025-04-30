// Modal.tsx
import React, { useEffect, useState } from 'react';
import { fetchAllShops } from '../../api/shops';
import { addShopToProduct } from '../../api/shops';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: string;
  onAddShop: (shop: { vendor_id: string; price: number; colors: string[] }) => void;
}

const commonColors = [
  { name: 'Red', hex: '#FF0000' },
  { name: 'Blue', hex: '#0000FF' },
  { name: 'Green', hex: '#008000' },
  { name: 'Black', hex: '#000000' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Yellow', hex: '#FFFF00' },
  { name: 'Purple', hex: '#800080' },
  { name: 'Orange', hex: '#FFA500' },
  { name: 'Pink', hex: '#FFC0CB' },
  { name: 'Gray', hex: '#808080' },
  { name: 'Brown', hex: '#A52A2A' },
  { name: 'Beige', hex: '#F5F5DC' },
  { name: 'Navy', hex: '#000080' },
  { name: 'Teal', hex: '#008080' },
  { name: 'Gold', hex: '#FFD700' },
  { name: 'Silver', hex: '#C0C0C0' },
];

const AddOtherShopsModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  productId,
  onAddShop,
}) => {
  const [shopName, setShopName] = useState('');
  const [shopPrice, setShopPrice] = useState<number | ''>('');
  const [shopColors, setShopColors] = useState<string[]>([]);
  const [selectedColorNames, setSelectedColorNames] = useState<string[]>([]);
  const [allShops, setAllShops] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [colorError, setColorError] = useState<boolean>(false);

  const addColor = (colorHex: string, colorName: string) => {
    if (!shopColors.includes(colorHex)) {
      setShopColors([...shopColors, colorHex]);
      setSelectedColorNames([...selectedColorNames, colorName]);
      setColorError(false);
    }
  };

  const removeColor = (index: number) => {
    const newColors = [...shopColors];
    const newColorNames = [...selectedColorNames];
    newColors.splice(index, 1);
    newColorNames.splice(index, 1);
    setShopColors(newColors);
    setSelectedColorNames(newColorNames);
  };

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const data = await fetchAllShops();
        setAllShops(data);
      } catch (error) {
        console.error('Failed to fetch shops:', error);
      }
    };
    fetchShops();
  }, []);

  const handleAddShop = async () => {
    // Validate fields
    if (!shopName) {
      setError('Please select a shop.');
      return;
    }
    
    if (!shopPrice && shopPrice !== 0) {
      setError('Please enter a valid price.');
      return;
    }
    
    if (shopColors.length === 0) {
      setError('Please select at least one color.');
      setColorError(true);
      return;
    }

    // Prepare the shop data
    const shopData = {
      vendor_id: shopName,
      price: shopPrice as number,
      colors: shopColors,
    };

    setIsLoading(true);
    setError(null);

    try {
      const response = await addShopToProduct(productId, shopData);
      onAddShop(shopData);
      onClose();
      if(response?.status === true){
        window.location.reload();
      }
    } catch (error) {
      console.error('Error adding shop:', error);
      setError('Failed to add the shop. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Add New Shop</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ×
          </button>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Shop Name</label>
          <select
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Shop</option>
            {allShops.map((shop) => (
              <option key={shop._id} value={shop._id}>
                {shop.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Price</label>
          <div className="relative">
            <span className="absolute left-4 top-3 text-gray-600">rwf</span>
            <input
              type="number"
              value={shopPrice}
              onChange={(e) => setShopPrice(e.target.value === '' ? '' : parseFloat(e.target.value))}
              className="w-full border border-gray-300 rounded-lg pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
              step="0.01"
              min="0"
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Available Colors</label>
          
          {/* Visual color picker */}
          <div className="mb-4">
            <div className="grid grid-cols-8 gap-2 mb-4">
              {commonColors.map((color) => (
                <button
                  key={color.hex}
                  type="button"
                  title={color.name}
                  className={`w-8 h-8 rounded-full border transition-transform hover:scale-110 ${color.name === 'White' ? 'border-gray-300' : 'border-transparent'}`}
                  style={{ backgroundColor: color.hex }}
                  onClick={() => addColor(color.hex, color.name)}
                />
              ))}
            </div>
          </div>
          
          {/* Selected colors display */}
          <div className="border border-gray-300 rounded-lg p-3 min-h-24">
            <p className="text-gray-600 mb-2 text-sm">Selected colors:</p>
            {shopColors.length === 0 ? (
              <p className="text-gray-400 italic">No colors selected</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {shopColors.map((color, index) => (
                  <div 
                    key={index} 
                    className="flex items-center bg-gray-100 rounded-full pl-2 pr-3 py-1"
                  >
                    <div 
                      className="w-6 h-6 rounded-full mr-2 border border-gray-200" 
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-sm">{selectedColorNames[index]}</span>
                    <button
                      type="button"
                      onClick={() => removeColor(index)}
                      className="ml-2 text-gray-500 hover:text-red-500"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          {colorError && (
            <p className="text-red-500 text-sm mt-1">Please select at least one color</p>
          )}
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleAddShop}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-sm disabled:bg-green-400"
            disabled={isLoading}
          >
            {isLoading ? 'Adding...' : 'Add Shop'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddOtherShopsModal;