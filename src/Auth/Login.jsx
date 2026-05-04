import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import loginBg from '../Assets/login_bg.png';
import registerBg from '../Assets/register_bg.png';
import { Eye, EyeOff } from 'lucide-react';
import API_BASE_URL from '../config';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const containerRef = useRef(null);
    const formBoxRef = useRef(null);
    const imageBoxRef = useRef(null);
    const navigate = useNavigate();
    useEffect(() => {
        // Initial setup
        const isMobile = window.innerWidth < 768;
        if (isMobile) {
            gsap.set(formBoxRef.current, { xPercent: 0, x: 0 });
            gsap.set(imageBoxRef.current, { display: 'none' });
        } else {
            if (isLogin) {
                gsap.set(formBoxRef.current, { xPercent: 0 });
                gsap.set(imageBoxRef.current, { xPercent: 0, display: 'block' });
            } else {
                gsap.set(formBoxRef.current, { xPercent: 100 });
                gsap.set(imageBoxRef.current, { xPercent: -100, display: 'block' });
            }
        }
    }, [isLogin]);

    const toggleAuth = () => {
        const isMobile = window.innerWidth < 768;
        const tl = gsap.timeline();

        if (isMobile) {
            // Mobile: Simple fade out and in
            tl.to(formBoxRef.current, {
                opacity: 0, y: 10, duration: 0.3, onComplete: () => {
                    setIsLogin(!isLogin);
                    setError('');
                    gsap.to(formBoxRef.current, { opacity: 1, y: 0, duration: 0.3 });
                }
            });
        } else {
            // Desktop: Premium sliding
            if (isLogin) {
                tl.to(formBoxRef.current, { xPercent: 100, duration: 0.8, ease: "power3.inOut" })
                    .to(imageBoxRef.current, { xPercent: -100, duration: 0.8, ease: "power3.inOut" }, "<");
            } else {
                tl.to(formBoxRef.current, { xPercent: 0, duration: 0.8, ease: "power3.inOut" })
                    .to(imageBoxRef.current, { xPercent: 0, duration: 0.8, ease: "power3.inOut" }, "<");
            }
            setTimeout(() => {
                setIsLogin(!isLogin);
                setError('');
            }, 400);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await fetch(`${API_BASE_URL}/api/user/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (res.ok) {
                toggleAuth(); // Switch to login after success
            } else {
                setError(data.message || 'Registration failed');
            }
        } catch (err) {
            setError('Server error. Make sure backend is running.');
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await fetch(`${API_BASE_URL}/api/user/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: formData.email, password: formData.password })
            });
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem('user', JSON.stringify(data));
                navigate('/'); // Redirect to home
                window.location.reload(); // Refresh to update nav/cart state if needed
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('Server error. Make sure backend is running.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f0f2f5] p-2 md:p-4 font-['Inter'] relative">
            <div
                ref={containerRef}
                className="relative w-full max-w-5xl min-h-[500px] md:h-[650px] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
            >
                {/* Form Section */}
                <div
                    ref={formBoxRef}
                    className="w-full md:w-1/2 h-full bg-white z-20 flex flex-col justify-center px-6 py-10 sm:px-12 md:px-16 lg:px-20"
                >
                    {isLogin ? (
                        <div className="animate-fadeIn">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                            <p className="text-gray-500 mb-6 md:mb-8 font-medium text-xs sm:text-sm lg:text-base">Please enter your details to sign in.</p>

                            <form onSubmit={handleLogin} className="space-y-4 md:space-y-5">
                                <div>
                                    <label className="block text-[11px] sm:text-xs lg:text-sm font-semibold text-gray-700 mb-1.5 md:mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-0 transition-all outline-none bg-gray-50 text-xs sm:text-sm lg:text-base"
                                        placeholder="Enter your email"
                                    />
                                </div>
                                <div className="relative">
                                    <label className="block text-[11px] sm:text-xs lg:text-sm font-semibold text-gray-700 mb-1.5 md:mb-2">Password</label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-0 transition-all outline-none bg-gray-50 pr-12 text-xs sm:text-sm lg:text-base"
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                {error && <p className="text-red-500 text-[10px] sm:text-xs lg:text-sm font-medium">{error}</p>}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-black text-white py-3.5 md:py-4 rounded-xl font-bold hover:bg-gray-800 transition-all transform active:scale-[0.98] disabled:opacity-70 text-sm lg:text-base"
                                >
                                    {loading ? 'Signing in...' : 'Sign In'}
                                </button>
                            </form>

                            <p className="mt-6 md:mt-8 text-center text-gray-600 text-xs sm:text-sm lg:text-base">
                                Don't have an account? {' '}
                                <button onClick={toggleAuth} className="text-black font-bold hover:underline">Sign Up</button>
                            </p>
                        </div>
                    ) : (
                        <div className="animate-fadeIn">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 md:mb-2">Create Account</h2>
                            <p className="text-gray-500 mb-6 md:mb-8 font-medium text-xs sm:text-sm lg:text-base">Join us today! It only takes a minute.</p>

                            <form onSubmit={handleRegister} className="space-y-3 md:space-y-4">
                                <div>
                                    <label className="block text-[11px] sm:text-xs lg:text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 md:py-2.5 rounded-xl border border-gray-200 focus:border-black focus:ring-0 transition-all outline-none bg-gray-50 text-xs sm:text-sm"
                                        placeholder="Azar"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] sm:text-xs lg:text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 md:py-2.5 rounded-xl border border-gray-200 focus:border-black focus:ring-0 transition-all outline-none bg-gray-50 text-xs sm:text-sm"
                                        placeholder="azar@gmail.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] sm:text-xs lg:text-sm font-semibold text-gray-700 mb-1">Mobile Number</label>
                                    <input
                                        type="text"
                                        name="mobile"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 md:py-2.5 rounded-xl border border-gray-200 focus:border-black focus:ring-0 transition-all outline-none bg-gray-50 text-xs sm:text-sm"
                                        placeholder="9944171692"
                                    />
                                </div>
                                <div className="relative">
                                    <label className="block text-[11px] sm:text-xs lg:text-sm font-semibold text-gray-700 mb-1">Password</label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-2 md:py-2.5 rounded-xl border border-gray-200 focus:border-black focus:ring-0 transition-all outline-none bg-gray-50 pr-12 text-xs sm:text-sm"
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                {error && <p className="text-red-500 text-[10px] sm:text-xs lg:text-sm font-medium">{error}</p>}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-black text-white py-3.5 md:py-4 rounded-xl font-bold hover:bg-gray-800 transition-all transform active:scale-[0.98] disabled:opacity-70 mt-1 md:mt-2 text-sm lg:text-base"
                                >
                                    {loading ? 'Creating account...' : 'Create Account'}
                                </button>
                            </form>

                            <p className="mt-4 md:mt-5 lg:mt-6 text-center text-gray-600 text-xs sm:text-sm lg:text-base">
                                Already have an account? {' '}
                                <button onClick={toggleAuth} className="text-black font-bold hover:underline">Sign In</button>
                            </p>
                        </div>
                    )}
                </div>

                {/* Image Section */}
                <div
                    ref={imageBoxRef}
                    className="hidden lg:block w-1/2 h-full relative z-10 overflow-hidden"
                >
                    <div className="absolute inset-0 bg-black/20 z-10" />
                    <img
                        src={isLogin ? loginBg : registerBg}
                        alt="Auth Background"
                        className="w-full h-full object-cover transition-all duration-700 transform scale-105"
                    />

                    <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 lg:p-12 text-white">
                        <h3 className="text-2xl lg:text-3xl font-bold mb-2">
                            {isLogin ? "Premium Collection 2026" : "Start Your Journey"}
                        </h3>
                        <p className="text-white/80 max-w-md text-sm lg:text-base">
                            {isLogin
                                ? "Experience the finest luxury apparel curated just for you. Quality meets comfort in every thread."
                                : "Join our community of fashion enthusiasts and get exclusive access to new arrivals and special offers."
                            }
                        </p>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.5s ease-out forwards;
                }
            `}</style>
        </div>
    );
};


export default Auth;
