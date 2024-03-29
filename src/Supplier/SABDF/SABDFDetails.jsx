import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const RequestDetails = ({ isOpen, handleClose, details }) => {
    if (!details) {
        return null; // Render nothing if details are null
    }

    // Destructure details object
    const { product,supplyOrder,warehouse,user } = details;

    return (
        <Modal show={isOpen} onHide={handleClose}>
            <Modal.Header closeButton style={{ fontSize: "1rem" }}>supply-Orderno.- {supplyOrder && (supplyOrder.id)}
              
            </Modal.Header>

            <Modal.Body>
                { warehouse  && user && product && supplyOrder && (
                    <div>
                        <h5>Order Details</h5>
                        <h6>Product Name: {product.name}</h6>
                        <h6>Product Quantity: {supplyOrder.quantity}</h6>
                        <h6>Total Amount: {supplyOrder.total_amount}</h6>
                        <h6>Order status: {supplyOrder.status === 'approved' ? <span style={{fontStyle:"italic",color:"purple"}}>Approved</span> :<>Not avaliable</>}</h6>
                        <h6>Order Request Date and time: {supplyOrder.date_time}</h6>
                        <h6>Order payment method: {supplyOrder.payment_method}</h6>
                        <h6>Product Wholesale price: {product.whole_sale_price}</h6>
                        <h6>Is Delivery_man is Free: <span style={{fontStyle:"italic", color:"red"}}>{supplyOrder.isdelivery_man_Available === true ? "True" : "False"} </span></h6>
                       
                    </div>

                )}
                {warehouse && (
                    <div>
                        <h5>WareHouse Details</h5>
                        <h6>Name: {warehouse.name}</h6>
                        <h6>Address: {warehouse.address},{warehouse.pincode}</h6>
                    </div>
                )}
                {user && (
                    <div>
                        <h5>WareHouse Manager Details</h5>
                        <h6>Name: {user.name}</h6>
                        <h6>Email: {user.email}</h6>
                        <h6>phone: {user.phone}</h6>
                    </div>
                )}
                 
               
            </Modal.Body>
            <Modal.Footer>
                <Button variant="info" onClick={handleClose} >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default RequestDetails;
