import { useState } from "react";
import { toast } from "sonner";

export function useFetch(action) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fn = async (...args) => {
    setLoading(true);
    setError(null);

    try {
      const response = await action(...args);
      setData(response);
      return response;
    } catch (err) {
      const message = err.message || "An error occurred";
      setError(err);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fn, setData };
}
