import React, {useState, useEffect} from 'react';
import moment from "moment";
import _ from "lodash";
import Modal from "./Modal";
import Button from "./Button";
import Api from "../../Api";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faStar, faUser} from "@fortawesome/free-solid-svg-icons";
const ReviewSection = ({productId}) => {
  const [reviews, setReviews] = useState([]);
  const [replyText, setReplyText] = useState({});

  const [index, setIndex] = useState("")


  useEffect(() => {
    (async () => {
      try {
        const response = await Api.getReviewList({productId});
        setReviews(response.data.productsReviews);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    })();
  }, [productId]);


  const handleSubmitReply = async (id) => {
    if (reviews.length > 0 && replyText.reply.trim()) {
      try {
        await Api.createReview({
          reviewId: id,
          reply: replyText.reply,
        });
        setReplyText({});

      } catch (error) {
        console.error('Failed to submit reply:', error);
      }
    }
  };


  return (
    <div className="review-section">

      <div className="reviews">
        {!!reviews.length ? reviews.map((review, i) => {

          return (
            <div className="review__item" key={review.id}>
              <div className="review__header">
                <div className="review__user_block">
                  <div className="review__avatar">
                    <FontAwesomeIcon icon={faUser} className="review__icon"/>
                  </div>
                  <div className="review__user">
                    <strong>
                      {review.user.lastName.charAt(0).toUpperCase() + review.user.lastName.slice(1)}
                      {review.user.firstName.charAt(0).toUpperCase() + review.user.firstName.slice(1)}
                    </strong>
                    <span>
                    <FontAwesomeIcon icon={faCheck} style={{color: "limegreen"}}/> Bought out
                  </span>
                  </div>
                </div>

                <div className="review__star-time">
                  <div className="review__star">
                    {Array.from({length: review.rating}).map((_, i) => (
                      <FontAwesomeIcon
                        key={i}
                        style={{fontSize: 20}}
                        icon={faStar}
                        className={` ${i <= review.rating ? 'star-active' : 'star-disable'} icon`}
                      />
                    ))}
                  </div>
                  <span className="review__time">{moment(review.createdAt).format('DD MMMM, YYYY, HH:mm')}</span>
                </div>
              </div>

              <div className="review-info">
                <span>{review.review}</span>
              </div>

              {_.isEmpty(review.reviewReply)
                ? <Button
                  className="reply__button"
                  onClick={() => setReplyText({reply: ""})}
                >
                  Reply
                </Button>

                :
                <>
                  <div className="message">
                    <div>
                      <strong>Seller's response</strong>
                    </div>

                    <div className="message__info">
                     <span className={i !== index ? "message__text" : "message__text-more"}>
                       {!_.isEmpty(review.reviewReply) && (
                         <div>
                           <span>{review.reviewReply.reply}</span>
                         </div>
                       )}
                      </span>
                      {i !== index ? (
                        <span className="message__more" onClick={() => setIndex(i)}>
                    more
                  </span>
                      ) : null}
                    </div>

                  </div>


                  <div className="review__time">
                    <span>{moment(review?.reviewReply?.createdAt).format('DD MMMM, YYYY, HH:mm')}</span>
                  </div>
                </>
              }


              <Modal
                onClose={() => setReplyText({})}
                isOpen={(!_.isEmpty(replyText))}
                className={"big"}
              >
                <h3>Reply to Review</h3>

                <div className="reply-form">
                  <textarea
                    className="reply-textarea"
                    value={replyText.reply}
                    onChange={({target: {value}}) => setReplyText({...replyText, reply: value})}
                    placeholder="Write your reply here..."
                    maxLength="800"
                  />

                  <div className="reply-buttons">
                    <Button
                      className="reply-submit-btn"
                      onClick={() => handleSubmitReply(review.id)}
                      disabled={replyText.reply && !replyText.reply.trim()}
                    >
                      Submit Reply
                    </Button>

                    <Button
                      className="reply-cancel-btn"
                      onClick={() => setReplyText({})}
                    >
                      Cancel
                    </Button>

                  </div>
                </div>
              </Modal>

            </div>

          );
        }) : null}

      </div>

    </div>
  );
};

export default ReviewSection;
