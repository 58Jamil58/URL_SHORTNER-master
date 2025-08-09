import React, { useEffect, useState } from "react";
import axios from "axios";

const UserUrl = () => {
  const [urls, setUrls] = useState([]);
  const [copiedId, setCopiedId] = useState(null);

  // Get backend URL from .env
  const backendBaseUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const res = await axios.get(`${backendBaseUrl}/api/url/user`, {
          withCredentials: true,
        });
        setUrls(res.data);
      } catch (err) {
        console.error("Error fetching URLs", err);
      }
    };

    fetchUrls();
  }, [backendBaseUrl]);

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Original URL</th>
            <th className="border border-gray-300 px-4 py-2">Short URL</th>
            <th className="border border-gray-300 px-4 py-2">Clicks</th>
            <th className="border border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((url) => {
            const shortLink = `${backendBaseUrl}/${url.short_url}`;
            return (
              <tr key={url._id}>
                <td className="border border-gray-300 px-4 py-2 break-all">
                  {url.original_url}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-blue-600 hover:text-blue-900 hover:underline">
                  <a
                    href={shortLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {shortLink}
                  </a>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {url.clicks}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    onClick={() => handleCopy(shortLink, url._id)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
                  >
                    {copiedId === url._id ? "Copied!" : "Copy"}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserUrl;
