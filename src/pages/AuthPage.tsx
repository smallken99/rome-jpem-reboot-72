import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext'; // 引入 AuthContext
import { Input } from '@/components/ui/input'; // Assuming Input component exists
import { Button } from '@/components/ui/button'; // Assuming Button component exists

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true); // true: 顯示登入表單, false: 顯示註冊表單
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const { login, signup, loading } = useAuth(); // 從 AuthContext 獲取登入、註冊函式和 loading 狀態

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(''); // 清除之前的錯誤訊息
    try {
      await login(email, password);
      // 登入成功後，AuthContext 的 onAuthStateChanged 會觸發，應用程式會導向主頁
    } catch (err: any) {
      console.error('Login failed:', err);
      setError(err.message);
    }
  };

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(''); // 清除之前的錯誤訊息
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    try {
      await signup(email, password);
      // 註冊成功後，使用者會自動登入，AuthContext 的 onAuthStateChanged 會觸發，應用程式會導向主頁
      // 或者您可以選擇不自動登入，然後導向登入頁面讓使用者自己登入
    } catch (err: any) {
      console.error('Signup failed:', err);
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100"> {/* Use flexbox for centering and background color */}
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"> {/* Card-like container */}
        <h2 className="text-2xl font-bold mb-6 text-center">{isLogin ? 'Login' : 'Sign Up'}</h2>

        {isLogin ? (
          <form onSubmit={handleLogin} className="flex flex-col gap-4"> {/* Use flex and gap for form layout */}
            <div>
              <label htmlFor="login-email" className="block text-sm font-medium text-gray-700">Email</label>
              <Input 
                type="email" 
                id="login-email" 
                placeholder="Email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full" // Use Tailwind for input styling
              />
            </div>
            <div>
              <label htmlFor="login-password" className="block text-sm font-medium text-gray-700">Password</label>
              <Input 
                type="password" 
                id="login-password" 
                placeholder="Password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full" // Use Tailwind for input styling
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full"> {/* Use Button component and full width */}
              Sign In
            </Button>
          </form>
        ) : (
          <form onSubmit={handleSignup} className="flex flex-col gap-4"> {/* Use flex and gap for form layout */}
             <div>
              <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700">Email</label>
              <Input 
                type="email" 
                id="signup-email" 
                placeholder="Email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full" // Use Tailwind for input styling
              />
            </div>
            <div>
              <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700">Password</label>
              <Input 
                type="password" 
                id="signup-password" 
                placeholder="Password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                 className="mt-1 block w-full" // Use Tailwind for input styling
              />
            </div>
            <div>
              <label htmlFor="signup-confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <Input 
                type="password" 
                id="signup-confirm-password" 
                placeholder="Confirm Password" 
                required 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                 className="mt-1 block w-full" // Use Tailwind for input styling
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full"> {/* Use Button component and full width */}
              Sign Up
            </Button>
          </form>
        )}

        {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>} {/* Use Tailwind for error message */}

        <div className="mt-6 text-center text-sm"> {/* Use Tailwind for spacing and text alignment */}
          {isLogin ? (
            <p>Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); setIsLogin(false); }} className="text-blue-600 hover:underline">Sign Up</a></p> // Use Tailwind for link styling
          ) : (
            <p>Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); setIsLogin(true); }} className="text-blue-600 hover:underline">Login</a></p> // Use Tailwind for link styling
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage; 