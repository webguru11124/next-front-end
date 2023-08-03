// components/protectedRoute.tsx

import { getSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const session = await getSession();

            if (!session) {
                // Redirect to login page if the user is not authenticated
                router.push('/login');
            }
        };

        checkAuth();
    }, []);

    return <>{children}</>;
};

export default ProtectedRoute;
