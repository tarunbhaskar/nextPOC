'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import '../../styles/details.css';

export default function CardDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const [card, setCard] = useState(null);

    useEffect(() => {
        if (!params?.id) return;

        // Fetch details for the selected card
        fetch(`/api/dashboard/${params.id}`)
            .then((res) => res.json())
            .then((data) => setCard(data))
            .catch(() => router.push('/dashboard')); // Redirect on error
    }, [params, router]);

    const handleAdd = () => {
        alert('Add feature clicked');
        // Redirect to Add Form or implement functionality
    };

    const handleEdit = () => {
        alert('Edit feature clicked');
        // Redirect to Edit Form or implement functionality
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this item?')) {
            fetch(`/api/dashboard/${params.id}`, { method: 'DELETE' })
                .then((res) => {
                    if (res.ok) router.push('/dashboard');
                })
                .catch(() => alert('Failed to delete item.'));
        }
    };

    if (!card) return <div>Loading...</div>;

    return (
        <div className="details-container">
            <div className="details-card">
                {/* Action Icons */}
                <div className="actions">
                    <button onClick={() => router.push(`/dashboard/${params.id}/add`)} title="Add">+</button>
                    <button onClick={() => router.push(`/dashboard/${params.id}/edit`)} title="Edit">✎</button>
                    <button
                        onClick={() => {
                            if (confirm('Are you sure you want to delete this item?')) {
                                fetch(`/api/dashboard/${params.id}`, { method: 'DELETE' })
                                    .then((res) => {
                                        if (res.ok) router.push('/dashboard');
                                    })
                                    .catch(() => alert('Failed to delete item.'));
                            }
                        }}
                        className="delete"
                        title="Delete"
                    >
                        🗑
                    </button>
                </div>

                {/* Card Image */}
                <img src={card.image} alt={card.title} />

                {/* Card Details */}
                <h1>{card.title}</h1>
                <div className="card-details">
                    <p><span>Description:</span> {card.description}</p>
                    <p><span>Quantity:</span> {card.quantity}</p>
                    <p><span>Price per unit:</span> ${card.price}</p>
                </div>
            </div>
        </div>
    );
}
