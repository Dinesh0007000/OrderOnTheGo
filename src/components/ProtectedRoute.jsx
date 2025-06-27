import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { GeneralContext } from '../context/GeneralContext';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ allowedRoles }) => {
    const { user } = useContext(GeneralContext);

    if (!user) {
        toast.error('⚠️ Please log in to access this page.');
        return <Navigate to="/auth" replace />;
    }

    if (!allowedRoles.includes(user.usertype)) {
        toast.error('❌ Unauthorized access.');
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
