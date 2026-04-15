'use client';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="text-center max-w-md p-8">
        <div className="w-24 h-24 mx-auto mb-8 bg-red-100 rounded-2xl flex items-center justify-center">
          <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Unauthorized</h1>
        <p className="text-slate-600 mb-8">You don't have permission to access this page.</p>
        <a href="/dashboard" className="bg-primary-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-700 transition-all">
          Go to Dashboard
        </a>
      </div>
    </div>
  );
}
