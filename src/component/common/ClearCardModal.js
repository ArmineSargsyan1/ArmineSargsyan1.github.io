// import React from 'react';
// import Modal from './Modal';
// import Button from "./Button";
//
// const ClearCartModal = ({isOpen, onClose, onConfirm,desc,loading}) => {
//   const closeModal = ()=> {
//     !loading && onClose
//   }
//   return (
//     <Modal
//       isOpen={isOpen}
//       onClose={closeModal}
//       className="small"
//     >
//       <div className="modal-content">
//         <h3>{desc}?</h3>
//         <div className="modal-actions">
//           <Button onClick={onConfirm} className="confirm-btn" loading={loading}>Delete</Button>
//           <Button onClick={onClose} className="cancel-btn">Cancel</Button>
//         </div>
//       </div>
//     </Modal>
//   );
// };
//
// export default ClearCartModal;



import React from 'react';
import Modal from './Modal';
import Button from "./Button";

const ClearCartModal = ({ isOpen, onClose, onConfirm, desc, loading }) => {
  const closeModal = () => {
    if (!loading) {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      className="small"
    >
      <div className="modal-content">
        <h3>{desc}?</h3>
        <div className="modal-actions">
          <Button onClick={onConfirm} className="confirm-btn" loading={loading}>
            Delete
          </Button>
          <Button onClick={closeModal} className="cancel-btn">
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ClearCartModal;
