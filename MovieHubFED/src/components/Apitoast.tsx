// utils/apiToast.ts
import toast from 'react-hot-toast';

export const postWithToast = async (
  url: string,
  body: object,
  successMsg: string,
  errorMsg?: string
) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok || data.success === false) {
      toast.error(data.message || errorMsg || 'Something went wrong');
      return false;
    }

    toast.success(data.message);
    return true;
  } catch (err) {
    toast.error('Server error');
    return false;
  }
};
