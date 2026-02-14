import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardStats, reset } from '../redux/slices/dashboardSlice';
import AdminAnalytics from '../components/AdminAnalytics';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { stats, isLoading, isError, message } = useSelector(
    (state) => state.dashboard
  );
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getDashboardStats());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  if (isLoading) {
    return <div className="text-center mt-10 text-primary">Loading statistics...</div>;
  }

  if (isError) {
    return <div className="text-center mt-10 text-red-500">Error: {message}</div>;
  }

  const isAdmin = user?.role === 'admin';

  return (
    <div className="text-primary">
      <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
      <p className="text-secondary mb-10">Welcome back, {user?.name}</p>

      {/* Role-based Description */}
      <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-accent mb-10">
        <h2 className="text-xl font-bold mb-2 text-primary">
          {isAdmin ? 'Admin Panel' : 'Staff Dashboard'}
        </h2>
        <p className="text-gray-600">
          {isAdmin
            ? 'Full system access, user management, analytics.'
            : 'Manage products, stock, customers, and sales invoices.'}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="text-center">
          <p className="text-5xl font-bold text-secondary">{stats?.totalProducts || 0}</p>
          <p className="text-gray-500 mt-2 uppercase tracking-widest text-sm">Total Products</p>
        </div>

        <div className="text-center">
          <p className="text-5xl font-bold text-accent">{stats?.totalCustomers || 0}</p>
          <p className="text-gray-500 mt-2 uppercase tracking-widest text-sm">Total Customers</p>
        </div>

        <div className="text-center">
          <p className="text-5xl font-bold text-secondary">{stats?.totalSales || 0}</p>
          <p className="text-gray-500 mt-2 uppercase tracking-widest text-sm">Total Sales</p>
        </div>

        <div className="text-center">
          <p className="text-5xl font-bold text-primary">
            ${stats?.totalRevenue?.toFixed(2) || '0.00'}
          </p>
          <p className="text-gray-500 mt-2 uppercase tracking-widest text-sm">Total Revenue</p>
        </div>
      </div>

      {isAdmin && <AdminAnalytics stats={stats} />}
    </div>
  );
};

export default Dashboard;
