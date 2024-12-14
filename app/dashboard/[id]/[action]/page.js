'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import '../../../styles/form.css';

export default function ActionPage() {
    const params = useParams(); // Access dynamic [id] and [action]
    const router = useRouter();
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(0);
    const [itemDetails, setItemDetails] = useState(null);

    const isEdit = params.action === 'edit';

    useEffect(() => {
        if (isEdit) {
            // Fetch current item details for editing
            fetch(`/api/dashboard/${params.id}`)
                .then((res) => res.json())
                .then((data) => {
                    setItemDetails(data);
                    setQuantity(data.quantity);
                    setPrice(data.price);
                })
                .catch(() => alert('Failed to load item details.'));
        }
    }, [params.id, isEdit]);

    const handleSubmit = () => {
        const method = isEdit ? 'PUT' : 'POST';
        const url = `/api/dashboard/${params.id}`;

        fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quantity, price }),
        })
            .then((res) => {
                if (res.ok) {
                    alert(`${isEdit ? 'Updated' : 'Added'} successfully!`);
                    router.push(`/dashboard/${params.id}`);
                } else {
                    throw new Error('Submission failed');
                }
            })
            .catch(() => alert('Failed to submit.'));
    };

    if (isEdit && !itemDetails) {
        return <div>Loading...</div>;
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

                {isEdit && (
                    <>
                        <label>Title:</label>
                        <input type="text" value={itemDetails?.title || ''} readOnly />

                        <label>Description:</label>
                        <input
                            type="text"
                            value={itemDetails?.description || ''}
                            readOnly
                        />
                    </>
                )}

                <label>Quantity:</label>
                <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />

                <label>Price per unit:</label>
                <input
                    type="number"
                    min="0"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />

                <button onClick={handleSubmit}>
                    {isEdit ? 'Update Item' : 'Add Item'}
                </button>
            </div>
        </div>
    );
}
