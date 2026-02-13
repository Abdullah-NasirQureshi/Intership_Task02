import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardStats, reset } from '../redux/slices/dashboardSlice';
import { FiPackage, FiUsers, FiShoppingCart, FiDollarSign } from 'react-icons/fi';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { stats, isLoading, isError, message } = useSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    dispatch(getDashboardStats());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  if (isLoading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (isError) {
    return <div className="text-center mt-10 text-red-500">Error: {message}</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow flex items-center justify-between">
          <div>
            <h3 className="text-gray-500 text-sm">Total Products</h3>
            <p className="text-3xl font-bold mt-2">{stats?.totalProducts || 0}</p>
          </div>
          <div className="bg-blue-100 p-3 rounded-full text-blue-600">
            <FiPackage size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow flex items-center justify-between">
          <div>
            <h3 className="text-gray-500 text-sm">Total Customers</h3>
            <p className="text-3xl font-bold mt-2">{stats?.totalCustomers || 0}</p>
          </div>
          <div className="bg-green-100 p-3 rounded-full text-green-600">
            <FiUsers size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow flex items-center justify-between">
          <div>
            <h3 className="text-gray-500 text-sm">Total Sales</h3>
            <p className="text-3xl font-bold mt-2">{stats?.totalSales || 0}</p>
          </div>
          <div className="bg-purple-100 p-3 rounded-full text-purple-600">
            <FiShoppingCart size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow flex items-center justify-between">
          <div>
            <h3 className="text-gray-500 text-sm">Revenue</h3>
            <p className="text-3xl font-bold mt-2">
              ${stats?.totalRevenue?.toFixed(2) || '0.00'}
            </p>
          </div>
          <div className="bg-yellow-100 p-3 rounded-full text-yellow-600">
            <FiDollarSign size={24} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
