import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const Landing = () => {
    return (
        <div className="min-h-screen bg-primary text-light flex flex-col">
            <nav className="p-6 flex justify-between items-center container mx-auto">
                <h1 className="text-2xl font-bold tracking-wider">SISMS</h1>
                <div className="space-x-4">
                    <Link to="/login" className="px-4 py-2 rounded hover:text-accent transition">Login</Link>
                    <Link to="/register" className="px-4 py-2 bg-accent text-primary font-bold rounded hover:bg-opacity-90 transition">Register</Link>
                </div>
            </nav>

            <main className="flex-1 flex items-center justify-center container mx-auto px-6">
                <div className="text-center max-w-3xl">
                    <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                        Smart Inventory & Sales Management
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-300 mb-10 font-light">
                        Streamline your business operations with our comprehensive solution for inventory tracking, sales management, and detailed analytics.
                    </p>
                    <div className="flex justify-center gap-6">
                        <Link to="/register" className="px-8 py-4 bg-accent text-primary text-lg font-bold rounded-lg hover:bg-opacity-90 transition flex items-center gap-2">
                            Get Started <FiArrowRight />
                        </Link>
                    </div>
                </div>
            </main>

            <footer className="p-6 text-center text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} Team Omicron. All rights reserved.
            </footer>
        </div>
    );
};

export default Landing;
