import React from 'react';

const InfoModal = ({data, closeModal}) => {
  return (
    <div className="modal-container">
      <div className="modal-content-wrapper">
        <div className="modal-content">
          <div>OKR Information <span onClick={closeModal}>X</span></div>
          <hr />
          {Object.keys(data).map((item) => {
            return item !== "children" ? <div key={`modal-${item.id}`} className="item-container">
              <div className="title">{item}</div>
              <div className="content">{data[item]}</div>
            </div>: ""
          })}
        </div>
      </div>
    </div>
  )
};

export default InfoModal;
