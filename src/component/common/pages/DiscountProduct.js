import React, { useState } from 'react';
import moment from 'moment';
import { applyDiscountToProduct } from "../../store/actions/adminProduct";
import { useDispatch } from "react-redux";
import useQuery from "../../../utils/useQuery";
import Button from "../Button";
import _ from "lodash";
import Modal from "../Modal";
import DatePiker from "../DatePiker";


const DiscountProduct = ({ product }) => {

  const dispatch = useDispatch();

  const { query, setQuery } = useQuery();

  const { startDate, endDate } = query;
  const [discountPercentage, setDiscountPercentage] = useState({});
  const [loading, setLoading] = useState(false);

  const { id, brandName, name, description, images, size, store, price, discount, createdAt, updatedAt } = product;



  const changeDate = (date) => {
    const [start, end] = date;
    setQuery({ startDate: start, endDate: end });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    await dispatch(
      applyDiscountToProduct({
        productId: id,
        discountPercentage: Number(discountPercentage.percentage),
        startDate: moment(startDate).toISOString(),
        endDate: moment(endDate).toISOString(),
      })
    );

    onClose()
    setLoading(false);

  };

  const onChangePercentage = (value) => {
    if (value >= 10 && value <= 100) {
      setDiscountPercentage({ percentage: value });
    }
  };

  const onClose = () => {
    setDiscountPercentage({});
  };
  return (
    <div className="product-discount">

      <Button onClick={() => setDiscountPercentage({ percentage: '' })}>
        {_.isEmpty(discount) ? "Add Discount" : "Update Discount"}
      </Button>

      {discount &&
      <>

        <p>
          <span className="original-price">Original Price: ${parseFloat(price)}</span>
          <span className="discounted-price">
              Discounted Price: ${parseFloat(discount?.discountPrice)}
            </span>
        </p>
        <p>Discount: {parseInt(discount?.discountPercentage)}%</p>
        <p>
          Valid from {moment(discount?.startDate).format('LL')} to{' '}
          {moment(discount?.endDate).format('LL')}
        </p>


      </>
      }
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
    </div>
  );
};

export default DiscountProduct;
