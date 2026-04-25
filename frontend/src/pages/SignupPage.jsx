import React, { useState } from 'react';
import { Eye, EyeOff, User, Mail, Lock } from 'lucide-react';
import rightSideImage from '../images/right.png';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full Name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password.trim()) return toast.error("Password is required");
    if (!formData.password.length >= 6) return toast.error("Password must be at least 6 characters long");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) signup(formData);
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-base-100 text-base-content">
      <div className="page-shell flex w-full flex-col justify-center md:w-1/2">
        <h1 className="mb-2 text-3xl font-bold">Create Account</h1>
        <p className="mb-8 opacity-70">Get started with your free account</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="form-control w-full">
            <label className="mb-2 block text-sm font-medium text-base-content">
              <span>Full Name</span>
            </label>
            <div className="relative border border-base-300 bg-base-100">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" size={18} />
              <input
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                type="text"
                placeholder="John Doe"
                className="h-12 w-full bg-transparent pl-10 pr-4 outline-none placeholder:text-base-content/45"
              />
            </div>
          </div>

          <div className="form-control w-full">
            <label className="mb-2 block text-sm font-medium text-base-content">
              <span>Email</span>
            </label>
            <div className="relative border border-base-300 bg-base-100">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" size={18} />
              <input
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                type="email"
                placeholder="you@example.com"
                className="h-12 w-full bg-transparent pl-10 pr-4 outline-none placeholder:text-base-content/45"
              />
            </div>
          </div>

          <div className="form-control w-full">
            <label className="mb-2 block text-sm font-medium text-base-content">
              <span>Password</span>
            </label>
            <div className="relative border border-base-300 bg-base-100">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" size={18} />
              <input
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                type={showPassword ? "text" : "password"}
                placeholder="........"
                className="h-12 w-full bg-transparent pl-10 pr-10 outline-none placeholder:text-base-content/45"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 opacity-50 transition hover:opacity-100"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary mt-4 w-full border-none" disabled={isSigningUp}>
            {isSigningUp && <span className="loading loading-spinner loading-sm" />}
            {isSigningUp ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-sm opacity-70">
          Already have an account?{" "}
          <Link to="/login" className="link link-primary no-underline hover:underline">
            Log in
          </Link>
        </p>
      </div>

      <div className="hidden w-1/2 flex-col items-center justify-center bg-base-200 p-12 md:flex">
        <div className="p-2">
          <img src={rightSideImage} alt="Right Side Image" />
        </div>
        <h2 className="text-2xl font-bold">Join our community</h2>
        <p className="mt-2 max-w-xs text-center opacity-70">
          Connect with friends, share moments, and stay in touch with your loved ones.
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
