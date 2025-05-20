import {useAppDispatch, useAppSelector} from "../../hooks/reduxHook";
import {useEffect} from "react";
import {deleteMessage, fetchMessages} from "../../redux/slice/message.slice";
import styles from './MessageList.module.css';

export const MessagesList=()=>{
    const dispatch = useAppDispatch();
    const { messages, loading, error } = useAppSelector(state => state.messages);

    useEffect(() => {
        dispatch(fetchMessages());
    }, [dispatch]);

    if (loading) return (
        <div className={styles.loadingContainer}>
            <p className={styles.loadingText}>Loading...</p>
        </div>
    );

    if (error) return (
        <div className={styles.errorContainer}>
            <p className={styles.errorText}>Error: {error}</p>
        </div>
    );

    const now = new Date();

    const availableMessages = messages.filter(
        (m) => new Date(m.availableAt) <= now
    );

    return (
        <div className={styles.messagesContainer}>
            <div className={styles.messagesHeader}>
                <h2 className={styles.messagesTitle}>Your Messages</h2>
                <p className={styles.messagesCount}>You have {availableMessages.length} available messages</p>
            </div>

            {availableMessages.length === 0 ? (
                <div className={styles.emptyState}>
                    No messages available at the moment
                </div>
            ) : (
                <ul className={styles.messagesList}>
                    {availableMessages.map(m => (
                        <li key={m.id} className={styles.messageItem}>
                            <div className={styles.messageContent}>
                                <div className={styles.messageBody}>
                                    <div className={styles.messageHeader}>
                                        <h3 className={styles.messageTitle}>{m.title}</h3>
                                        <span className={styles.messageTimestamp}>
                                            {new Date(m.availableAt).toLocaleString()}
                                        </span>
                                    </div>
                                    <p className={styles.messageText}>{m.message}</p>
                                </div>
                                <button
                                    onClick={() => dispatch(deleteMessage(m.id))}
                                    className={styles.deleteButton}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}