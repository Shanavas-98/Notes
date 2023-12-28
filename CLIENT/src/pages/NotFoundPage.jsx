// import React from "react";

function NotFoundPage() {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
          <div className="text-center">
            <h1 className="text-9xl font-bold text-gray-700">404</h1>
            <p className="text-2xl font-semibold text-gray-600">Page Not Found</p>
            <p className="text-gray-500">The page you are looking for does not exist.</p>
          </div>
        </div>
      );
}

export default NotFoundPage;