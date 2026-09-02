import { useState, useContext, createContext, useEffect, useCallback } from 'react';
import axios from 'axios';
import { API_URL } from '../config/api';
import { showSuccessToast, showErrorToast } from '../components/Notification/Tost';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function DataProvider({ children }) {
  const [signin, setsignin] = useState(() => {
    return Boolean(localStorage.getItem('usertoken') && localStorage.getItem('userid'));
  });

  const getGuestWishlist = () => {
    try {
      const saved = localStorage.getItem('guest_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  };

  const [wishlist, setWishlist] = useState(() => {
    const userId = localStorage.getItem('userid');
    if (!userId) return getGuestWishlist();
    return [];
  });

  const userId = localStorage.getItem('userid');

  const fetchWishlist = useCallback(async () => {
    const currentUserId = localStorage.getItem('userid');
    if (!currentUserId) {
      setWishlist(getGuestWishlist());
      return;
    }
    try {
      const res = await axios.get(`${API_URL}/user/${currentUserId}/wishlist`);
      if (res.data?.status && Array.isArray(res.data?.wishlist)) {
        setWishlist(res.data.wishlist);
      }
    } catch (err) {
      console.error("Failed to fetch wishlist:", err);
    }
  }, []);

  useEffect(() => {
    if (signin && userId) {
      fetchWishlist();
    } else {
      setWishlist(getGuestWishlist());
    }
  }, [signin, userId, fetchWishlist]);

  const toggleWishlist = async (car) => {
    const currentUserId = localStorage.getItem('userid');

    // GUEST WISHLIST (WHEN NOT LOGGED IN)
    if (!currentUserId || !signin) {
      const guestList = getGuestWishlist();
      const existingIndex = guestList.findIndex(item =>
        (item.id && car.id && item.id === car.id) ||
        (item.name && car.name && item.name === car.name) ||
        (item.title && car.title && item.title === car.title)
      );

      let updatedList = [...guestList];
      let msg = "";
      if (existingIndex > -1) {
        updatedList.splice(existingIndex, 1);
        msg = "Car removed from wishlist";
      } else {
        updatedList.push(car);
        msg = "Car added to wishlist (Saved locally)";
      }

      localStorage.setItem('guest_wishlist', JSON.stringify(updatedList));
      setWishlist(updatedList);
      showSuccessToast(msg);
      return true;
    }

    // LOGGED IN USER WISHLIST (DB PERSISTENCE)
    try {
      const res = await axios.post(`${API_URL}/user/${currentUserId}/wishlist`, { car });
      if (res.data?.status) {
        setWishlist(res.data.wishlist);
        showSuccessToast(res.data.msg);
        return true;
      }
    } catch (err) {
      showErrorToast(err?.response?.data?.msg || "Failed to update wishlist");
      return false;
    }
  };

  const isInWishlist = (carIdentifier) => {
    if (!carIdentifier) return false;
    return wishlist.some(item =>
      (item.id && carIdentifier.id && item.id === carIdentifier.id) ||
      (item.name && carIdentifier.name && item.name === carIdentifier.name) ||
      (item.title && carIdentifier.title && item.title === carIdentifier.title) ||
      item.id === carIdentifier ||
      item.name === carIdentifier ||
      item.title === carIdentifier
    );
  };

  const value = {
    signin,
    setsignin,
    wishlist,
    setWishlist,
    fetchWishlist,
    toggleWishlist,
    isInWishlist
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}