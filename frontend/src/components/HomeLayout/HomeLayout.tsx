import {checkAuth, signOutUser} from "../../redux/slice/auth.slice";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHook";
import {Link, Outlet, useNavigate} from "react-router-dom";
import styles from "./Header.module.css";
import {useEffect} from "react";

export const HomeLayout=()=>{
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAppSelector((state) => state.auth);


    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);

    const handleSignOut = async () => {
        try {
            await dispatch(signOutUser()).unwrap();
            navigate("/login");
        } catch (error) {
            console.error("Failed to sign out:", error);
            // Тут можна показати повідомлення користувачу
        }
    };


    return (
        <div>
            <header className={styles.header}>
                <div className={styles.container}>
                    <h1 className={styles.title}>Time Capsule App</h1>
                    <nav className={styles.nav}>
                        {isAuthenticated ? (
                            <>
                                <div className={styles.userInfo}>
                                    <span>Logged in as:</span>
                                    <span className={styles.userEmail}>{user.email}</span>
                                </div>
                                <span className={styles.separator}>|</span>
                                <button
                                    onClick={handleSignOut}
                                    className={styles.signOutButton}
                                >
                                    Sign Out
                                </button>
                            </>
                        ) : (
                            <div className={styles.authLinks}>
                                <Link to="/login" className={styles.authLink}>
                                    Login
                                </Link>
                                <span className={styles.separator}>or</span>
                                <Link to="/register" className={styles.authLink}>
                                    Register
                                </Link>
                            </div>
                        )}
                    </nav>
                </div>
            </header>
            <hr className={styles.divider} />

            <main>
                <Outlet />
            </main>
        </div>
    );
};


