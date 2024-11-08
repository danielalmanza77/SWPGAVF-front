import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import { useUser } from '../../context/UserContext';
import { Link } from 'react-router-dom';  // Import Link to navigate to Register

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useUser();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get(
                `http://localhost:8080/users/login?username=${username}&password=${password}`
            );

            if (response.data) {
                const user = {
                    id: response.data.id,
                    username: response.data.username,
                    role: response.data.type, 
                    name: response.data.name,
                    lastname: response.data.lastname,
                    email: response.data.email,
                    phone: response.data.phone,
                    dob: response.data.dob,
                };

                login(user);

                if (user.role === 'client') {
                    navigate('/landing');
                } else if (user.role === 'employee') {
                    navigate('/dashboard');
                }
            } else {
                setError('Invalid credentials');
            }
        } catch (err) {
            setError('An error occurred, please try again');
            console.error(err);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

                {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div className="mb-6">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Login
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <p className="text-sm">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-indigo-600 hover:text-indigo-500">
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
