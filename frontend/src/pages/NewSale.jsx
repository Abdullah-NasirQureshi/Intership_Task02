import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createSale, reset as resetSale } from '../redux/slices/saleSlice';
import { getProducts, reset as resetProduct } from '../redux/slices/productSlice';
import { getCustomers, reset as resetCustomer } from '../redux/slices/customerSlice';
import { FiPlus, FiTrash2, FiShoppingCart } from 'react-icons/fi';
import { toast } from 'react-toastify';

const NewSale = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { products } = useSelector((state) => state.products);
    const { customers } = useSelector((state) => state.customers);
    const { isCreateSuccess, isError, message } = useSelector((state) => state.sales);

    const [selectedCustomerId, setSelectedCustomerId] = useState('');
    const [cart, setCart] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        dispatch(getProducts());
        dispatch(getCustomers());
        dispatch(resetSale());

        return () => {
            dispatch(resetProduct());
            dispatch(resetCustomer());
            dispatch(resetSale());
        };
    }, [dispatch]);

    useEffect(() => {
        if (isCreateSuccess) {
            toast.success('Sale completed successfully');
            navigate('/sales');
        }
        if (isError) {
            toast.error(message);
        }
    }, [isCreateSuccess, isError, message, navigate]);

    const addToCart = (product) => {
        if (product.quantity <= 0) {
            toast.error('Product is out of stock');
            return;
        }

        const existingItem = cart.find((item) => item.productId === product._id);

        if (existingItem) {
            if (existingItem.quantity >= product.quantity) {
                toast.error('Not enough stock available');
                return;
            }
            setCart(
                cart.map((item) =>
                    item.productId === product._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            );
        } else {
            setCart([
                ...cart,
                {
                    productId: product._id,
                    name: product.name,
                    price: product.price,
                    quantity: 1,
                    maxQuantity: product.quantity,
                },
            ]);
        }
    };

    const removeFromCart = (productId) => {
        setCart(cart.filter((item) => item.productId !== productId));
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) return;

        const item = cart.find(i => i.productId === productId);
        if (newQuantity > item.maxQuantity) {
            toast.error(`Only ${item.maxQuantity} items in stock`);
            return;
        }

        setCart(
            cart.map((item) =>
                item.productId === productId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!selectedCustomerId) {
            toast.error('Please select a customer');
            return;
        }

        if (cart.length === 0) {
            toast.error('Please add items to cart');
            return;
        }

        const saleData = {
            customerId: selectedCustomerId,
            items: cart.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
            })),
            paymentMethod,
        };

        dispatch(createSale(saleData));
    };

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex h-[calc(100vh-100px)] gap-6">
            <div className="w-2/3 flex flex-col">
                <div className="bg-white p-4 rounded-lg shadow mb-4">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="grid grid-cols-3 gap-4 overflow-y-auto">
                    {filteredProducts.map((product) => (
                        <div
                            key={product._id}
                            onClick={() => addToCart(product)}
                            className="bg-white p-4 rounded-lg shadow cursor-pointer hover:shadow-lg transition flex flex-col justify-between"
                        >
                            <div>
                                <h3 className="font-bold text-lg">{product.name}</h3>
                                <p className="text-gray-500 text-sm">{product.category}</p>
                            </div>
                            <div className="flex justify-between items-end mt-4">
                                <span className="text-xl font-bold text-blue-600">
                                    ${product.price}
                                </span>
                                <span className="text-sm text-gray-500">
                                    Stock: {product.quantity}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="w-1/3 bg-white rounded-lg shadow p-6 flex flex-col">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <FiShoppingCart /> Current Sale
                </h2>

                <div className="flex-1 overflow-y-auto mb-4">
                    {cart.length === 0 ? (
                        <p className="text-center text-gray-500 mt-10">Cart is empty</p>
                    ) : (
                        <div className="space-y-4">
                            {cart.map((item) => (
                                <div
                                    key={item.productId}
                                    className="flex justify-between items-center border-b pb-2"
                                >
                                    <div className="flex-1">
                                        <h4 className="font-semibold">{item.name}</h4>
                                        <p className="text-sm text-gray-500">${item.price}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="number"
                                            min="1"
                                            className="w-16 border rounded px-1"
                                            value={item.quantity}
                                            onChange={(e) =>
                                                updateQuantity(item.productId, parseInt(e.target.value))
                                            }
                                        />
                                        <button
                                            onClick={() => removeFromCart(item.productId)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <FiTrash2 />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="border-t pt-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Customer
                        </label>
                        <select
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                            value={selectedCustomerId}
                            onChange={(e) => setSelectedCustomerId(e.target.value)}
                        >
                            <option value="">Select Customer</option>
                            {customers.map((customer) => (
                                <option key={customer._id} value={customer._id}>
                                    {customer.name} ({customer.phone})
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Payment Method
                        </label>
                        <select
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                            <option value="cash">Cash</option>
                            <option value="card">Card</option>
                            <option value="upi">UPI</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="flex justify-between items-center text-xl font-bold mb-6">
                        <span>Total:</span>
                        <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                    <button
                        onClick={handleSubmit}
                        className="w-full bg-green-600 text-white py-3 rounded-lg text-lg font-bold hover:bg-green-700 transition"
                    >
                        Complete Sale
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewSale;
