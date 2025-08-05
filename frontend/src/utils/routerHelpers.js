import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

// Hook to replace useHistory
export const useHistory = () => {
  const navigate = useNavigate();
  return {
    push: (path) => navigate(path),
    replace: (path) => navigate(path, { replace: true }),
    goBack: () => navigate(-1),
    goForward: () => navigate(1),
  };
};

// Hook to replace useRouteMatch
export const useRouteMatch = () => {
  const params = useParams();
  const location = useLocation();

  return {
    params,
    url: location.pathname,
    path: location.pathname,
  };
};

// Component to replace <Redirect>
export const Redirect = ({ to }) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate(to, { replace: true });
  }, [navigate, to]);

  return null;
};
