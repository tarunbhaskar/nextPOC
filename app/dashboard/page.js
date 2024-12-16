'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import '../styles/dashboard.css';

export default function DashboardPage() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [quantities, setQuantities] = useState({});
    const router = useRouter();

    useEffect(() => {
        // Fetch mock data for dashboard
        fetch('/api/dashboard')
            .then((res) => res.json())
            .then((data) => {
                setData(data.cards);
                setFilteredData(data.cards); // Initially show all cards
                const initialQuantities = {};
                data.cards.forEach((card) => {
                    initialQuantities[card.id] = 1; // Default quantity is 1
                });
                setQuantities(initialQuantities);
            })
            .catch((err) => console.error(err));
    }, []);

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredData(data); // Show all cards if search is empty
        } else {
            const lowerSearchTerm = searchTerm.toLowerCase();
            setFilteredData(
                data.filter(
                    (card) =>
                        card.title.toLowerCase().includes(lowerSearchTerm) ||
                        card.description.toLowerCase().includes(lowerSearchTerm)
                )
            );
        }
    }, [searchTerm, data]);

    // const handleQuantityChange = (id, value) => {
    //     setQuantities((prev) => ({ ...prev, [id]: value }));
    // };

    return (
        <div className="dashboard-container">
            <h1>Dashboard</h1>

            {/* Search Bar */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Card Grid */}
            <div className="card-grid">
                {filteredData.map((card) => (
                    <div
                        key={card.id}
                        className="card"
                        onClick={() => router.push(`/dashboard/${card.id}`)} // Navigate to details page
                    >
                        <img src={card.image} alt={card.title} />
                        <h2>{card.title}</h2>
                        <p>{card.description}</p>
                        <div className="price">${card.price}/unit</div>
                        <div className="quantity">Quantity: {card.quantity}</div> {/* Display quantity */}
                    </div>
                ))}
            </div>

        </div>
    );
}
