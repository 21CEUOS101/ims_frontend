import React from 'react';

import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Button1 from '@mui/material/Button';
import OrderDetailsDialog from '../DialogboxCard/OrderDetailsDialog';
import { Label } from 'semantic-ui-react';
import { ROCompleted } from '../../Services/DeliveryManService';
import Swal from 'sweetalert2';
import ReturnOrderDialogBox from './ReturnOrderDialogBox';
const mainColors = [
    '#FADBD8', // Light Coral
    '#F5CBA7', // Light Salmon
    '#F9E79F', // Light Yellow
    '#ABEBC6', // Light Greenish Blue
    '#AED6F1', // Light Blue
    '#D5DBDB', // Light Grayish Blue
    '#F2D7D5', // Light Pink
    '#FDEDEC', // Light Rose
    '#F5EEF8', // Light Lavender
    '#FDEBD0', // Light Orange
];


const generateRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * mainColors.length);
    return mainColors[randomIndex];
};

function HoverCardWithHeaderExample({ data }) {
    //   const [orderData, setOrderData] = useState({});
    const { warehouse, user, returnorder, product, customer } = data;
    const randomBackgroundColor = generateRandomColor();
    const [isHovered1, setIsHovered1] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const handleMouseEnter1 = () => {
        setIsHovered1(true);
    };

    const handleMouseLeave1 = () => {
        setIsHovered1(false);
    };
    const handleOpenDialog = (returnorderDetails) => {
        setSelectedOrder(returnorderDetails);
        setIsDialogOpen(true);
    };

    // Function to handle closing the dialog
    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    const handleRejected = async (data) => {
        try {
            const returnorder = await ROCompleted(data.id, "rejected");

            if (returnorder) {
                console.log("Order is rejected successfully");
                Swal.fire({
                    title: "return order request is rejected",
                    icon: "error",
                    timer: "4000"
                }).then(() => [
                    window.location.href = "/Delivery_man/dashboard"
                ]);
            } else {
                console.log("Failed to delivered");
                Swal.fire({
                    title: " Something went wrong!",
                    icon: "question",
                    timer: "2000"
                }).then(() => [
                    window.location.href = "/Delivery_man/dashboard"
                ]);
            }


        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const handleApproved = async (data) => {
        try {
            const returnorder = await ROCompleted(data.id, "approved");

            if (returnorder) {
                console.log("Order is approved ");
                Swal.fire({
                    title: "return order request is successful",
                    icon: "success",
                    timer: "4000"
                }).then(() => [
                    window.location.href = "/Delivery_man/dashboard"
                ]);
            } else {
                console.log("Failed to delivered");
                Swal.fire({
                    title: " Something went wrong!",
                    icon: "question",
                    timer: "2000"
                }).then(() => [
                    window.location.href = "/Delivery_man/dashboard"
                ]);
            }


        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (

        <Card
            style={{
                display: 'flex',
                flexDirection: 'column', // Set flex direction to column
                width: '65rem',
                marginLeft: "10px",
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                breturnorderRadius: '10px',
                overflow: 'hidden',
                height: "190px",
                marginBottom: "10px",
                marginTop: "30px",
                background: 'linear-gradient(45deg, #7FB3D5, #BBE5F3)', // Gradient background
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
            }}
        >
            <Card.Header style={{ position: 'relative', backgroundColor: randomBackgroundColor, color: '#000', fontSize: "1.2rem", display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 1rem', height: "40px" }}>
                <Label as='b' color='blue' ribbon style={{ position: 'absolute', marginLeft: "20px", top: '0.5rem', left: '-1.5rem', fontSize: '1rem' }}>
                    Return Order
                </Label>
                <span style={{ marginLeft: "640px" }}>Return Order no. :- {returnorder?.id}</span>
                
            </Card.Header>
            <Card.Body style={{ display: 'flex', flexDirection: 'row', background: "#FFFAFA" }}>
                <div style={{ flex: 1 }}>
                    <Card.Text style={{ color: '#000', fontSize: "1rem" }}><span style={{ fontStyle: "italic" }}>Customer name :  {user && user.name}</span></Card.Text>
                    <Card.Text style={{ color: '#000', fontSize: "1rem" }}><span style={{ fontStyle: "italic" }}>Customer phone :{user && user.phone}</span></Card.Text>
                    <Card.Text style={{ color: '#000', fontSize: "1rem" }}><span style={{ fontStyle: "italic" }}>Customer Address :  {user && customer.address}, {user && customer.pincode}</span></Card.Text>
                </div>
                <div style={{ flex: 0.5 }}>

                    <Card.Text style={{ color: '#000', fontSize: "1rem" }}><span style={{ fontStyle: "italic" }}>Product name : {product && product.name}</span></Card.Text>
                    <Card.Text style={{ color: '#000', fontSize: "1rem" }}><span style={{ fontStyle: "italic" }}>Quantity :{returnorder && returnorder.quantity}</span></Card.Text>
                    <Card.Text style={{ color: '#000', fontSize: "1rem" }}><span style={{ fontStyle: "italic" }}>Refund amount : {returnorder && returnorder.refund_amount}</span></Card.Text>
                </div>
                <div style={{ flex: 0.6}}>
                <Card.Text style={{ color: '#000', fontSize: "1rem" , marginLeft:"30px" }}><span style={{ fontStyle: "italic" }}>Order Status : </span> <span style={{ color: "blue" }}><span style={{ fontStyle: "italic" }}>{returnorder && returnorder.status === "shipped" ? "Shipped" : ""}</span></span></Card.Text>
                    <button
                        style={{
                            backgroundColor: isHovered1 ? '#000000' : '#FF1493',
                            color: 'white',
                            fontSize: '16px',
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            marginRight: "10px",
                            marginBottom: "12px",
                            transition: 'background-color 0.3s ease',
                            marginLeft:"40px"


                        }}
                        onClick={() => handleOpenDialog(data)}
                        onMouseEnter={handleMouseEnter1}
                        onMouseLeave={handleMouseLeave1}
                    >
                        OrderDetails
                    </button>
                    <br></br>

                    <div>
                        <Button1 variant="contained" color="error" onClick={() => handleRejected(returnorder)} style={{ marginRight: '10px' }}>
                            Rejected
                        </Button1>
                        <Button1 variant="contained" color="primary" onClick={() => handleApproved(returnorder)}>
                            Approved
                        </Button1>
                    </div>


                </div>
            </Card.Body>

            <ReturnOrderDialogBox isOpen={isDialogOpen} handleClose={handleCloseDialog} details={selectedOrder} />
        </Card>

    );
}

export default HoverCardWithHeaderExample;
