const mockData = Array.from({ length: 10 }, (_, i) => ({
    id: (i + 1).toString(),
    title: `Card ${i + 1}`,
    description: `This is the description for card ${i + 1}.`,
    price: (Math.random() * 50 + 10).toFixed(2), // Random price between $10 and $60
    image: `https://via.placeholder.com/300x150?text=Card+${i + 1}`, // Placeholder image
}));

export async function GET() {
    return new Response(JSON.stringify({ cards: mockData }), { status: 200 });
}
