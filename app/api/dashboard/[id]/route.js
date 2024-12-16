const mockData = Array.from({ length: 10 }, (_, i) => ({
    id: (i + 1).toString(),
    title: `Card ${i + 1}`,
    description: `This is the description for card ${i + 1}.`,
    price: (Math.random() * 50 + 10).toFixed(2), // Random price between $10 and $60
    quantity: Math.floor(Math.random() * 91 + 10), // Random quantity between 10 and 100
    image: `https://via.placeholder.com/300x150?text=Card+${i + 1}`, // Placeholder image
}));

export async function GET(req, { params }) {
    const { id } = await params; // Await params before accessing `id`

    const item = mockData.find((item) => item.id === id);

    if (!item) {
        return new Response(JSON.stringify({ error: 'Item not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(item), { status: 200 });
}
