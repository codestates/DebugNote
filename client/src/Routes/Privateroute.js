import React from 'react';
import { Navigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';
const cookies = new Cookies();

const PrivateRoute = ({ component: RouteComponent }) => {
  return cookies.get('accToken') ? <RouteComponent /> : <Navigate to="/" />;
};

export default PrivateRoute;
