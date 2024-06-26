import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { TBL_REVIEWS } from "../../utils/const";
import { toast } from "react-toastify";

const Reviews = () => {
  const [groupedReviews, setGroupedReviews] = useState({});

  useEffect(() => {
    const getReviewInfo = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, TBL_REVIEWS));
        const reviewList = {};
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (!reviewList[data.productId]) {
            reviewList[data.productId] = { reviews: [], productTitle: data.productTitle, totalRating: 0 };
          }
          reviewList[data.productId].reviews.push(data);
          reviewList[data.productId].totalRating += data.rating;
        });

        setGroupedReviews(reviewList);
      } catch (e) {
        toast.error(e.message);
      }
    };

    getReviewInfo();
  }, []);

  return (
    <AdminLayout title="Reviews">
      <div className="d-flex m-3 p-3">
        <table className="table table-bordered table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Product</th>
              <th scope="col">Comments, Ratings and Users</th>
              <th scope="col">Average Rating</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(groupedReviews).map((productId, index) => {
              const productReviews = groupedReviews[productId].reviews;
              const averageRating = (groupedReviews[productId].totalRating / productReviews.length).toFixed(2);
              
              return (
                <tr key={productId}>
                  <th scope="row">{index + 1}</th>
                  <td>{groupedReviews[productId].productTitle}</td>
                  <td>
                    {productReviews.map((review, index) => (
                      <div key={index}>
                        <p><strong>User:</strong> {review.user}</p>
                        <p><strong>Comment:</strong> {review.comment}</p>
                        <p><strong>Rating:</strong> {review.rating}</p>
                        <hr />
                      </div>
                    ))}
                  </td>
                  <td>{averageRating}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default Reviews;
