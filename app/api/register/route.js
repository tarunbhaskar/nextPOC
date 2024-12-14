export async function POST(req) {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
        return new Response(JSON.stringify({ message: 'All fields are required.' }), { status: 400 });
    }

    // Simulate storing the data or further processing
    console.log(`User registered: ${name}, ${email}`);

    return new Response(JSON.stringify({ message: 'Registration successful!' }), { status: 200 });
}
