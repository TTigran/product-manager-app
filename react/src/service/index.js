export const addProducts = async (newProduct, user_id, setProducts, products) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({...newProduct, user_id}),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const createdProduct = await response.json();
        setProducts([...products,createdProduct]);
    } catch (error) {
        console.error('Add product error:', error);
    }
}

export const getProducts = async (user_id, setProducts) => {
    fetch(`${process.env.REACT_APP_API_URL}/products?user_id=${user_id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            setProducts(data)
            console.log(data);
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}
export const removeProducts = async (productId, setProducts) => {
    fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`, {
        method: 'DELETE',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            setProducts(prevProducts => prevProducts.filter(product => product.product_id !== productId));
        })
        .catch(error => {
            console.error('Delete error:', error);
        });
}

