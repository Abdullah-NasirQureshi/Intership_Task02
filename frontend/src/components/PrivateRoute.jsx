import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from './Layout';

const PrivateRoute = () => {
  const { user } = useSelector((state) => state.auth);

  return user ? <Layout><Outlet /></Layout> : <Navigate to="/login" />;
};

export default PrivateRoute;
