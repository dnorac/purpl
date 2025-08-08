import { useLocation, useNavigate, useParams } from "@tanstack/react-router";

// Hook to replace useHistory
export const useHistory = () => {
  const navigate = useNavigate();
  return {
    push: (path: string) => navigate({ to: path }),
    replace: (path: string) => navigate({ to: path, replace: true }),
    goBack: () => window.history.back(),
    goForward: () => window.history.forward(),
  };
};

// Hook to replace useRouteMatch
export function useRouteMatch<T extends object = {}>() {
  const params = useParams<T>();
  const location = useLocation();
  return {
    params,
    url: location.pathname,
    path: location.pathname,
  };
}

// Component to replace <Redirect>
// For redirects, use <Navigate /> from @tanstack/react-router directly in components
