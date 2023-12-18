import {Card, CardActionArea, CardMedia, CardContent, Typography, Container, Box} from '@material-ui/core';
import { connect } from 'react-redux';
import React, {useEffect, useState} from 'react';
import { history } from '../helpers';
import ActionTypes from '../store/action-types';
import DataTable from "../component/DataTable";
import {addProducts, getProducts, removeProducts} from "../service";

const Home = ({ user, onUserLogout }) => {
    const [products, setProducts] = useState([])
    const logOut = () => {
        onUserLogout();
        history.push('/login');
    }

    useEffect(()=>{
       getProducts(user.id, setProducts)
    }, [])

    const handleAddProduct = async (newProduct) => addProducts(newProduct, user.id, setProducts, products)

    const handleDeleteProduct = (productId) => removeProducts(productId, setProducts)

    const handleEditProduct = (product, updatedProduct) => {

        fetch(`${process.env.REACT_APP_API_URL}/products/${updatedProduct.product_id}`, {
            method: 'PUT', // or 'PATCH' depending on your API
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "name": product.name,
                "description": product.description,
                "price": product.price,
                "user_id": user.id
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                // Update the local state with the updated product
                getProducts(user.id, setProducts)
            })
            .catch(error => {
                console.error('Update error:', error);
            });
    };


    return (
        <Container component="main" >
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image="https://via.placeholder.com/200X140"
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {user.name}
                        </Typography>
                        <Typography variant="body2">
                            {user.email}
                        </Typography>
                        <Box onClick={logOut}>Logout</Box>
                    </CardContent>
                </CardActionArea>
            </Card>
            <DataTable
                handleEditProduct={handleEditProduct}
                handleDeleteProduct={handleDeleteProduct}
                handleAddProduct={handleAddProduct}
                data={products}/>
        </Container>
    );
}
const mapStateToProps = (state) => ({
    user: state.auth.currentUser
});

const mapDispatchToProps = (dispatch) => ({
    onUserLogout: () => dispatch({ type: ActionTypes.LOGOUT_USER })
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);