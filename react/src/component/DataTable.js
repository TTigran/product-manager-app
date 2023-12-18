import React, { useState } from 'react';

const tableHeaderStyle = {
    background: '#f2f2f2',
    padding: '10px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
};

const tableCellStyle = {
    padding: '10px',
    borderBottom: '1px solid #ddd',
};

const buttonStyle = {
    background: '#4caf50',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '5px',
};

const removeButtonStyle = {
    background: 'red',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '5px',
};
const DataTable = ({ data , handleAddProduct, handleDeleteProduct, handleEditProduct}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [action, setAction] = useState('');
    const [updatedRow,setUpdatedRow] = useState({})
    const handleEdit = (row) => {
        setUpdatedRow(row)
        setIsEditing(true);
        setAction('edit')
    };

    const handleCreate = () => {
        setIsEditing(true);
        setAction('create')
    }

    const handleSave = async () => {
        const {name, description, price} = formData;
        const newProduct = {name, description, price}
        if(action === 'create'){
            await handleAddProduct(newProduct)
        } else {
           await handleEditProduct(newProduct, updatedRow)
        }

        setIsEditing(false);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
            [e.target.description]: e.target.value,
            [e.target.price]: e.target.value,});
        console.log(formData)
    };

    return (
        <div style={{ maxWidth: '800px', margin: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                <tr>
                    <th style={tableHeaderStyle}>Product ID</th>
                    <th style={tableHeaderStyle}>Name</th>
                    <th style={tableHeaderStyle}>Description</th>
                    <th style={tableHeaderStyle}>Price</th>
                    <th style={tableHeaderStyle}>Actions</th>
                    <th style={tableHeaderStyle}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {data.map((row) => (
                    <tr key={row.product_id}>
                        <td style={tableCellStyle}>{row.product_id}</td>
                        <td style={tableCellStyle}>{row.name}</td>
                        <td style={tableCellStyle}>{row.description}</td>
                        <td style={tableCellStyle}>{row.price}</td>
                        <td style={tableCellStyle}>
                            <button style={buttonStyle} onClick={() => handleEdit(row,formData)}>
                                Edit
                            </button>
                        </td>
                        <td style={tableCellStyle}>
                            <button style={removeButtonStyle} onClick={() => handleDeleteProduct(row.product_id)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div style={{ marginTop: '20px' }}>
                <button style={buttonStyle} onClick={handleCreate}>
                    Create
                </button>
            </div>

            {isEditing && (
                <div>
                    <h2>{action === 'edit' ? 'Edit Product' : 'Create Product'}</h2>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name || ''}
                        onChange={handleChange}
                        style={{marginRight: '10px'}}
                    /><br/>
                    <label>Description:</label>
                    <input
                        type="text"
                        name="description"
                        value={formData.description || ''}
                        onChange={handleChange}
                        style={{marginRight: '10px'}}
                    /><br/>
                    <label>Price :</label>
                    <input
                        type="text"
                        name="price"
                        value={formData.price || ''}
                        onChange={handleChange}
                        style={{marginRight: '10px'}}
                    /><br/>

                    <button style={buttonStyle} onClick={handleSave}>
                        Save
                    </button>
                </div>
            )}
        </div>
    );
};



export default DataTable;