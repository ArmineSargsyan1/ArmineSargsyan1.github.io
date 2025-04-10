import React, { useState } from 'react';
import moment from 'moment';
import DatePiker from "../common/DatePiker";
import { useDispatch } from "react-redux";
import useQuery from "../../utils/useQuery";
import {applyDiscountToProduct} from "../store/actions/adminProduct";
import Button from "./Button";
import _ from "lodash";
import Modal from "./Modal";


const DiscountProduct = ({ product }) => {
  const dispatch = useDispatch();

  // Use query hook for managing date range
  const { query, setQuery } = useQuery();

  const { startDate, endDate } = query;
  // Initialize state for discount percentage
  const [discountPercentage, setDiscountPercentage] = useState({});
  const [loading, setLoading] = useState(false);
  // Destructure product fields
  const { id, brandName, name, description, images, size, store, price, discount, createdAt, updatedAt } = product;



  const changeDate = (date) => {
    const [start, end] = date;
    setQuery({ startDate: start, endDate: end });
  };

  // Handle form submission to apply discount
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Set loading to true while submitting
    setLoading(true);


    // Dispatch apply discount action
    await dispatch(
      applyDiscountToProduct({
        productId: id,
        discountPercentage: Number(discountPercentage.percentage),
        startDate: moment(startDate).toISOString(),
        endDate: moment(endDate).toISOString(),
      })
    );

    // Reset discount percentage state and set loading to false after submission
    onClose()
    setLoading(false);

  };

  // Handle changes to discount percentage input
  const onChangePercentage = (value) => {
    if (value >= 10 && value <= 100) {
      setDiscountPercentage({ percentage: value });
    }
  };

  // Reset modal and discount state on modal close
  const onClose = () => {
    setDiscountPercentage({});
  };

  return (
    <div className="product-discount">

      {/* If no discount, show Add Discount Button */}
      <Button onClick={() => setDiscountPercentage({ percentage: '' })}>
        {_.isEmpty(discount) ? "Add Discount" : "Update Discount"}
      </Button>

      <>
        <p>
          <span className="original-price">Original Price: ${parseFloat(price)}</span>
          <span className="discounted-price">
              {/*Discounted Price: ${(discount?.discountPrice)}*/}
            </span>
        </p>
        <p>Discount: {parseInt(discount?.discountPercentage)}%</p>
        <p>
          Valid from {moment(discount?.startDate).format('LL')} to{' '}
          {moment(discount?.endDate).format('LL')}
        </p>

        <Modal onClose={onClose} isOpen={!_.isEmpty(discountPercentage)}>
          <div className="admin-discount-product">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="discountPercentage">Discount Percentage</label>
                <input
                  type="number"
                  id="discountPercentage"
                  value={discountPercentage?.percentage}
                  onChange={({ target: { value } }) => onChangePercentage(value)}
                  min="10"
                  max="100"
                />
              </div>

              <div>
                <DatePiker
                  showIcon
                  selected={startDate}
                  startDate={startDate}
                  endDate={endDate}
                  onChange={changeDate}
                  selectsRange
                  monthsShown={2}
                  showYearDropdown
                  showMonthDropdown
                  openToDate={new Date()}
                  minDate={new Date()}
                />
              </div>

              <Button
                type="submit"
                className="admin-discount-button"
                disabled={!discountPercentage.percentage || discountPercentage.percentage < 10 || discountPercentage.percentage > 100}
                loading={loading}
              >
                Apply Discount
              </Button>
            </form>
          </div>
        </Modal>
      </>

    </div>
  );
};

export default DiscountProduct;
