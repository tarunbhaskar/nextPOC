export async function POST(req) {
    const { email, password } = await req.json();

    if (email === 'test@example.com' && password === 'password') {
        return new Response(JSON.stringify({ message: 'Login successful!' }), { status: 200 });
    }

    return new Response(JSON.stringify({ message: 'Invalid credentials.' }), { status: 401 });
}
