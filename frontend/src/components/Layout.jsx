import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { FiHome, FiPackage, FiUsers, FiShoppingCart, FiLogOut } from 'react-icons/fi';

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-gray-800">SISMS</h1>
          <p className="text-sm text-gray-600">{user?.name} ({user?.role})</p>
        </div>
        <nav className="p-4">
          <Link to="/" className="flex items-center gap-3 p-3 rounded hover:bg-gray-100">
            <FiHome /> Dashboard
          </Link>
          <Link to="/products" className="flex items-center gap-3 p-3 rounded hover:bg-gray-100">
            <FiPackage /> Products
          </Link>
          <Link to="/customers" className="flex items-center gap-3 p-3 rounded hover:bg-gray-100">
            <FiUsers /> Customers
          </Link>
          <Link to="/sales" className="flex items-center gap-3 p-3 rounded hover:bg-gray-100">
            <FiShoppingCart /> Sales
          </Link>
          <button onClick={handleLogout} className="flex items-center gap-3 p-3 rounded hover:bg-gray-100 w-full text-left text-red-600">
            <FiLogOut /> Logout
          </button>
        </nav>
      </aside>
      <main className="flex-1 overflow-auto p-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;
