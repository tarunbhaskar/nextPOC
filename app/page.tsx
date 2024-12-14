import Link from 'next/link';
import './styles/home.css';

export default function HomePage() {
    return (
        <div className="home-container">
            {/* Header Section */}
            <div className="home-header">
                <h1>Welcome to the Vendor Management Platform</h1>
                <p>Your gateway to exclusive features and opportunities. Whether you&apos;re a business or an individual, we have got something for everyone.</p>
            </div>

            {/* Features Section */}
            <div className="features-section">
                <div className="feature-card">
                    <h3>Discover Opportunities</h3>
                    <p>Explore features tailored to help you achieve your goals efficiently and effectively.</p>
                </div>
                <div className="feature-card">
                    <h3>Seamless Integration</h3>
                    <p>Easily connect with tools and resources to enhance your experience.</p>
                </div>
                <div className="feature-card">
                    <h3>Trusted by Thousands</h3>
                    <p>Join a growing community of users who rely on our platform every day.</p>
                </div>
            </div>

            {/* Call-to-Action Section */}
            <div className="cta-section">
                <h2>Get Started Today</h2>
                <div className="button-group">
                    <Link href="/login" className="btn">
                        Login
                    </Link>
                    <Link href="/register?type=business" className="btn btn-secondary">
                        Sign Up as Business User
                    </Link>
                    <Link href="/register?type=regular" className="btn">
                        Sign Up as Regular User
                    </Link>
                </div>
            </div>
        </div>
    );
}
