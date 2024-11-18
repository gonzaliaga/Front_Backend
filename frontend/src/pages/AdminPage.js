import React, { useState, useEffect } from 'react';
import API from '../api'; // Instancia de Axios configurada

const AdminPage = () => {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({
        name: '',
        description: '',
        price: '',
    });
    const [editingProduct, setEditingProduct] = useState(null);

    // Cargar productos al montar el componente
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await API.get('/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    // Manejar cambios en el formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
    };

    // Manejar envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingProduct) {
                // Editar producto
                const response = await API.put(`/products/${editingProduct._id}`, form);
                setProducts((prevProducts) =>
                    prevProducts.map((product) =>
                        product._id === editingProduct._id ? response.data : product
                    )
                );
            } else {
                // Crear nuevo producto
                const response = await API.post('/products', form);
                setProducts((prevProducts) => [...prevProducts, response.data]);
            }
            setForm({ name: '', description: '', price: '' });
            setEditingProduct(null);
        } catch (error) {
            console.error('Error saving product:', error);
        }
    };

    // Manejar edición de producto
    const handleEdit = (product) => {
        setForm({ name: product.name, description: product.description, price: product.price });
        setEditingProduct(product);
    };

    // Manejar eliminación de producto
    const handleDelete = async (productId) => {
        try {
            await API.delete(`/products/${productId}`);
            setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div>
            <h1>Admin Page</h1>
            <p>Aquí puedes agregar y editar productos</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Nombre del producto"
                    required
                />
                <input
                    type="text"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Descripción del producto"
                    required
                />
                <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="Precio del producto"
                    required
                />
                <button type="submit">{editingProduct ? 'Editar' : 'Agregar'} Producto</button>
            </form>
            <ul>
                {products.map((product) => (
                    <li key={product._id}>
                        {product.name} - {product.description} - ${product.price}
                        <button onClick={() => handleEdit(product)}>Editar</button>
                        <button onClick={() => handleDelete(product._id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminPage;