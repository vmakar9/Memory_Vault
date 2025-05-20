import {useAppDispatch, useAppSelector} from "../../hooks/reduxHook";
import {useNavigate} from "react-router-dom";
import {IAuthCredentials} from "../../types/auth.type";
import {useForm} from "react-hook-form";
import {signInUser, signUpUser} from "../../redux/slice/auth.slice";
import styles from "./AuthForm.module.css"

export const AuthForm=({ isLogin }: {isLogin?: boolean}) =>{
   const dispatch = useAppDispatch()
   const navigate = useNavigate()
   const {status, error} = useAppSelector((state)=>state.auth)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IAuthCredentials>();

    const onSubmit = async (data: IAuthCredentials) => {
        const action = isLogin ? signInUser : signUpUser;
        const result = await dispatch(action(data));
        if (signInUser.fulfilled.match(result)) {
            navigate("/messages");
        } else if (signUpUser.fulfilled.match(result)) {
            navigate("/login");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            {/* Email Field */}
            <div className={styles.fieldGroup}>
                <label htmlFor="email" className={styles.label}>
                    Email
                </label>
                <div className={styles.inputWrapper}>
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        {...register("email", { required: "Email is required" })}
                        className={`${styles.input} ${errors.email ? styles.error : ''}`}
                    />
                    <svg className={styles.inputIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                </div>
                {errors.email && (
                    <p className={styles.errorMessage}>
                        <svg className={styles.errorIcon} fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.email.message}
                    </p>
                )}
            </div>

            {/* Password Field */}
            <div className={styles.fieldGroup}>
                <label htmlFor="password" className={styles.label}>
                    Password
                </label>
                <div className={styles.inputWrapper}>
                    <input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", { required: "Password is required" })}
                        className={`${styles.input} ${errors.password ? styles.error : ''}`}
                    />
                    <svg className={styles.inputIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>
                {errors.password && (
                    <p className={styles.errorMessage}>
                        <svg className={styles.errorIcon} fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.password.message}
                    </p>
                )}
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={status === "loading"}
                className={styles.submitButton}
            >
                {status === "loading" ? (
                    <>
                        <svg className={styles.spinner} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                    </>
                ) : (
                    <>
                        {isLogin ? "Sign In" : "Sign Up"}
                        <svg className={styles.buttonIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </>
                )}
            </button>

            {/* General Error Message */}
            {error && (
                <div className={styles.errorAlert}>
                    <div className={styles.errorAlertContent}>
                        <svg className={styles.errorAlertIcon} viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <p className={styles.errorAlertText}>{error}</p>
                    </div>
                </div>
            )}
        </form>

    );
};
