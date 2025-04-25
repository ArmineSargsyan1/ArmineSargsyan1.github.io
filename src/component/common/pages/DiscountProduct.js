import React, { useState } from 'react';
import moment from 'moment';
import { applyDiscountToProduct } from "../../store/actions/adminProduct";
import { useDispatch } from "react-redux";
import Button from "../Button";
import _ from "lodash";
import Modal from "../Modal";
import DatePiker from "../DatePiker";


const DiscountProduct = ({ product }) => {

  const dispatch = useDispatch();
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const [discountPercentage, setDiscountPercentage] = useState({});
  const [loading, setLoading] = useState(false);

  const { id, price, discount } = product;

  const changeDate = (date) => {
    setDateRange(date);
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
    if (!loading){
      setDiscountPercentage({});
    }

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
      <Modal onClose={onClose} isOpen={!_.isEmpty(discountPercentage)} className={"big"}>
      <div className="admin-discount-product">
        <form onSubmit={handleSubmit}>
          <div style={{width: "37%", margin: "0 auto"}}>
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

          <div style={{margin: "0 auto"}}>
            <DatePiker
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
