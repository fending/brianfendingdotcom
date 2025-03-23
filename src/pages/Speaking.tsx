// src/pages/Speaking.tsx

const Speaking = () => {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-4xl font-bold">Speaking Engagements</h1>
        <p className="mt-4 text-gray-700">Upcoming and past speaking engagements.</p>
        <ul className="mt-4 space-y-4">
          <li className="border p-4 rounded shadow-md">
            <h2 className="text-2xl font-semibold">The Future of IT Strategy</h2>
            <p className="text-gray-600">Speaking at XYZ Conference - June 2024</p>
          </li>
          <li className="border p-4 rounded shadow-md">
            <h2 className="text-2xl font-semibold">AI in Enterprise IT</h2>
            <p className="text-gray-600">Tech Leaders Summit - September 2024</p>
          </li>
        </ul>
      </div>
    );
  };
  
  export default Speaking;