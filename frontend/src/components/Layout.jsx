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
    <div className="flex h-screen bg-light">
      <aside className="w-64 bg-secondary text-light shadow-xl">
        <div className="p-6 border-b border-primary">
          <h1 className="text-2xl font-bold tracking-wider">SISMS</h1>
          <p className="text-sm text-gray-400 mt-1">{user?.name}</p>
          <span className="text-xs px-2 py-1 bg-primary rounded-full mt-2 inline-block capitalize">{user?.role}</span>
        </div>
        <nav className="p-4 space-y-2">
          <Link to="/dashboard" className="flex items-center gap-3 p-3 rounded hover:bg-primary transition duration-200">
            <FiHome /> Dashboard
          </Link>
          <Link to="/products" className="flex items-center gap-3 p-3 rounded hover:bg-primary transition duration-200">
            <FiPackage /> Products
          </Link>
          <Link to="/customers" className="flex items-center gap-3 p-3 rounded hover:bg-primary transition duration-200">
            <FiUsers /> Customers
          </Link>
          <Link to="/sales" className="flex items-center gap-3 p-3 rounded hover:bg-primary transition duration-200">
            <FiShoppingCart /> Sales
          </Link>
          <button onClick={handleLogout} className="flex items-center gap-3 p-3 rounded hover:bg-red-900 w-full text-left text-red-300 transition duration-200 mt-8">
            <FiLogOut /> Logout
          </button>
        </nav>
      </aside>
      <main className="flex-1 overflow-auto p-8 bg-gray-50 text-gray-800">
        {children}
      </main>
    </div>
  );
};

export default Layout;
