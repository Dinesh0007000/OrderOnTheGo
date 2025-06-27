import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GeneralContext } from '../context/GeneralContext';
import { toast } from 'react-toastify';

const ProtectedLink = ({ to, children, className }) => {
    const { user } = useContext(GeneralContext);
    const navigate = useNavigate();

    const handleClick = (e) => {
        if (!user) {
            e.preventDefault();
            toast.warning("⚠️ Please log in to access this page");
            navigate('/auth');
        }
    };

    return (
        <Link to={to} onClick={handleClick} className={className}>
            {children}
        </Link>
    );
};

export default ProtectedLink;
