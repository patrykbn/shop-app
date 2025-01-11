import React from "react"
import styles from './cartComment.module.scss';
import { useDispatch } from "react-redux";
import { useState } from "react";
import { updateProductComment } from "../../../redux/cartRedux";

const CartComment = ({ productId, productComment }) => {
    const dispatch = useDispatch();
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [newComment, setNewComment] = useState('');
    const [error, setError] = useState(false);
    const [charCount, setCharCount] = useState(0);
    const [fade, setFade] = useState(false);

    const handleCommentClick = (id, currentComment) => {
        setEditingCommentId(id);
        setNewComment(currentComment);
        if(!currentComment) {
          setCharCount(0)
        } else {
          setCharCount(currentComment.length);
        }
      };
    
      const handleCommentChange = (event) => {
        const comment = event.target.value;
        if (comment.length > 60) {
          setError(true);
          setNewComment(comment);
          setCharCount(comment.length);
        } else {
          setError(false);
          setNewComment(comment);
          setCharCount(comment.length);
        }
      };
    
      const handleCommentKeyPress = (event, id) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          if (error) {
            setFade(true);
            setTimeout(() => setFade(false), 1250);
          } else {
            dispatch(updateProductComment({ id, comment: newComment }));
            setEditingCommentId(null);
          }
        }
      };

    return (
        <div className={styles.cartCommentContainer}>
            <span className={styles.productComment}>comment for this product:</span><br />
                {editingCommentId === productId ? (
                <div className={styles.commentContainer}>
                    <textarea
                    className={`${styles.productCommentTextArea} ${error ? styles.error : ''}`}
                    value={newComment}
                    onChange={handleCommentChange}
                    onKeyDown={(event) => handleCommentKeyPress(event, productId)}
                    />
                    {error && <span className={`${styles.errorMessage} ${fade ? styles.fade : ''}`}>Maximum 60 characters...</span>}
                    <span className={`${styles.charCount} ${error ? styles.error : ''}`}>{charCount}/60</span>
                </div>
                ) : (
                <span
                    className={styles.productCommentText}
                    onClick={() => handleCommentClick(productId, productComment)}
                >
                    {productComment}
                </span>
                )}
                <span className={styles.productCommentTextHidden}>click to edit comment and confirm with ENTER</span>
        </div>
    )
}

export default CartComment;