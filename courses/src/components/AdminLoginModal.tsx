import { useState } from 'react';
import { X, Lock } from 'lucide-react';
import { authService } from '../lib/supabase';

interface AdminLoginModalProps {
  onClose: () => void;
  onLoginSuccess: () => void;
}

export function AdminLoginModal({ onClose, onLoginSuccess }: AdminLoginModalProps) {
  const [userId, setUserId] = useState('');
  const [adminKey, setAdminKey] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const isValid = authService.login(userId, adminKey);

      if (isValid) {
        authService.setAuthenticated(true);
        onLoginSuccess();
      } else {
        setError('Invalid credentials. Please check your User ID and Administrative Key.');
        setLoading(false);
      }
    }, 500);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-primary-400 hover:text-primary-700 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-primary-700 rounded-lg flex items-center justify-center">
            <Lock className="text-white" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-primary-900">Admin Login</h2>
            <p className="text-sm text-primary-600 font-body">Access content management</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="userId" className="block text-sm font-semibold text-primary-900 mb-2">
              User ID
            </label>
            <input
              type="text"
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full px-4 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent font-body"
              placeholder="Enter user ID"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="adminKey" className="block text-sm font-semibold text-primary-900 mb-2">
              Administrative Key
            </label>
            <input
              type="password"
              id="adminKey"
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              className="w-full px-4 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent font-body"
              placeholder="Enter administrative key"
              required
              disabled={loading}
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm font-body">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-700 hover:bg-primary-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Authenticating...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
