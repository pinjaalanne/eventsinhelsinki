import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import { auth } from "../auth/firebase";
import { Col, Spinner } from "react-bootstrap";

const ProtectedRoute = ({ children }) => {
    const [user, loading, error] = useAuthState(auth);
    console.log("user: ", user);
    console.log("children: ", children);

    if (loading) {
        return (
            < Col className="text-center m-5" >
                <Spinner
                    animation="border"
                    role="status"
                    className="center"
                    variant="info"
                >
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Col >
        )
    }
    // If the user is not logged in, redirect to the login page
    return user ?
        children
        : <Navigate to="/login" replace />;
};

export default ProtectedRoute;