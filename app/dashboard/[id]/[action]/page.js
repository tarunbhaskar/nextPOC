'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useCart } from '../../../context/CartContext';
import '../../../styles/form.css';

export default function ActionPage() {
    const params = useParams();
    const router = useRouter();
    const { addToCart } = useCart();

    const isEdit = params.action === 'edit';
    const [itemDetails, setItemDetails] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(0);

    useEffect(() => {
        // Fetch item details for "edit" or initialize for "add"
        if (isEdit) {
            fetch(`/api/dashboard/${params.id}`)
                .then((res) => res.json())
                .then((data) => {
                    setItemDetails(data);
                    setQuantity(data.quantity);
                    setPrice(data.price);
                })
                .catch(() => {
                    alert('Failed to fetch item details.');
                    router.push('/dashboard');
                });
        } else {
            setItemDetails({ title: '', description: '' }); // Default for "add"
        }
    }, [params.id, isEdit, router]);

    const handleAddToCart = () => {
        if (quantity <= 0) {
            alert('Please enter a valid quantity.');
            return;
        }

        const newItem = {
            id: params.id,
            title: itemDetails.title || 'New Item',
            quantity,
            price,
        };

        addToCart(newItem);
        alert('Item added to cart!');
        router.push('/orders'); // Navigate to the Orders Page
    };

    if (!itemDetails) {
        return <div>Loading item details...</div>;
    }

    return (
        <div className="form-container">
            <div className="form-card">
                <button
                    className="close-btn"
                    onClick={() => router.push(`/dashboard/${params.id}`)}
                >
                    ×
                </button>
                <h2 className="form-header">{isEdit ? 'Edit Item' : 'Add Item'}</h2>

                <label>Title:</label>
                <input type="text" value={itemDetails.title} readOnly={!isEdit} />

                <label>Quantity:</label>
                <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                />

                <label>Price per unit:</label>
                <input
                    type="number"
                    min="0"
                    value={price}
                    onChange={(e) => setPrice(parseFloat(e.target.value))}
                />

                <div className="action-buttons">
                    {!isEdit && (
                        <button onClick={handleAddToCart}>Add to Cart</button>
                    )}

                    {isEdit && (
                        <button onClick={handleAddToCart}>update Cart</button>
                    )}

                </div>
            </div>
        </div>
    );
}
