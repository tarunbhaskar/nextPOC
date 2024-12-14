const mockData = Array.from({ length: 10 }, (_, i) => ({
    id: (i + 1).toString(),
    title: `Card ${i + 1}`,
    description: `This is the description for card ${i + 1}.`,
    quantity: Math.floor(Math.random() * 10 + 1), // Random quantity between 1 and 10
    price: (Math.random() * 50 + 10).toFixed(2), // Random price between $10 and $60
    image: `https://via.placeholder.com/300x200?text=Card+${i + 1}`, // Placeholder image
}));

export async function GET(req, { params }) {
    const { id } = params;

    const card = mockData.find((item) => item.id === id);

    if (!card) {
        return new Response(JSON.stringify({ error: 'Card not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(card), { status: 200 });
}
