import {useForm} from "react-hook-form";
import {useAppDispatch} from "../../hooks/reduxHook";
import {CreateMessageDto} from "../../types/message.type";
import {createMessage} from "../../redux/slice/message.slice";
import styles from "./MessageForm.module.css";
export const MessagesForm=()=>{
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CreateMessageDto>();

    const dispatch = useAppDispatch();

    const onSubmit = (data: CreateMessageDto) => {
        dispatch(createMessage(data))
            .unwrap()
            .then(() => {
                reset();
            })
            .catch((err) => {
                console.error("Create error:", err);
            });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.fieldGroup}>
                <label className={styles.label}>Title</label>
                <div className={styles.inputWrapper}>
                    <input
                        type="text"
                        {...register("title", { required: "Title is required" })}
                        className={`${styles.input} ${errors.title ? styles.error : ""}`}
                    />
                </div>
                {errors.title && (
                    <p className={styles.errorMessage}>{errors.title.message}</p>
                )}
            </div>

            <div className={styles.fieldGroup}>
                <label className={styles.label}>Message</label>
                <div className={styles.inputWrapper}>
          <textarea
              {...register("message", { required: "Message is required" })}
              className={`${styles.input} ${errors.message ? styles.error : ""}`}
          />
                </div>
                {errors.message && (
                    <p className={styles.errorMessage}>{errors.message.message}</p>
                )}
            </div>

            <div className={styles.fieldGroup}>
                <label className={styles.label}>Available At</label>
                <div className={styles.inputWrapper}>
                    <input
                        type="datetime-local"
                        {...register("availableAt", { required: "Date is required" })}
                        className={`${styles.input} ${errors.availableAt ? styles.error : ""}`}
                    />
                </div>
                {errors.availableAt && (
                    <p className={styles.errorMessage}>{errors.availableAt.message}</p>
                )}
            </div>

            <button type="submit" className={styles.submitButton}>
                Save Message
            </button>
        </form>
    );
}