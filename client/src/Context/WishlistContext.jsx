import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config/api.js';
import { showSuccessToast, showErrorToast } from '../components/Notification/Tost';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('autosyntax_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const userId = localStorage.getItem('userid');

  // Load wishlist from DB on mount/login
  useEffect(() => {
    if (!userId) return;
    const fetchUserWishlist = async () => {
      try {
        const res = await axios.get(`${API_URL}/user/${userId}/wishlist`);
        if (res.data?.status && Array.isArray(res.data?.wishlist)) {
          setWishlist(res.data.wishlist);
        }
      } catch (err) {
        console.error('Failed to load user wishlist from DB:', err);
      }
    };
    fetchUserWishlist();
  }, [userId]);

  // Persist to local storage
  useEffect(() => {
    try {
      localStorage.setItem('autosyntax_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist:', e);
    }
  }, [wishlist]);

  const isWishlisted = (carOrId) => {
    if (!carOrId) return false;
    const targetId = typeof carOrId === 'object' ? carOrId.id : carOrId;
    const targetName = typeof carOrId === 'object' ? (carOrId.name || carOrId.title) : carOrId;

    return wishlist.some(
      (item) =>
        (targetId && item.id && item.id === targetId) ||
        (targetName && item.name && item.name === targetName) ||
        (targetName && item.title && item.title === targetName)
    );
  };

  const toggleWishlist = async (car) => {
    if (!car) return;
    const carId = car.id;
    const carName = car.name || car.title;
    const isSaved = isWishlisted(car);

    // Optimistic state update & notification
    setWishlist((prev) => {
      if (isSaved) {
        showSuccessToast(`Removed ${carName || 'car'} from wishlist`);
        return prev.filter(
          (item) =>
            !(carId && item.id && item.id === carId) &&
            !(carName && (item.name === carName || item.title === carName))
        );
      } else {
        showSuccessToast(`Added ${carName || 'car'} to wishlist ❤️`);
        return [...prev, car];
      }
    });

    // If user is logged in, sync with DB
    if (userId) {
      try {
        await axios.post(`${API_URL}/user/${userId}/wishlist`, { car });
      } catch (err) {
        console.error('Failed to sync wishlist with DB:', err);
      }
    }
  };

  const removeFromWishlist = async (carIdOrTitle) => {
    const carToRemove = wishlist.find(
      (item) => item.id === carIdOrTitle || item.name === carIdOrTitle || item.title === carIdOrTitle
    );
    setWishlist((prev) =>
      prev.filter(
        (item) => item.id !== carIdOrTitle && item.name !== carIdOrTitle && item.title !== carIdOrTitle
      )
    );
    showSuccessToast('Car removed from wishlist');
    if (userId && carToRemove) {
      try {
        await axios.post(`${API_URL}/user/${userId}/wishlist`, { car: carToRemove });
      } catch (err) {
        console.error('Failed to remove item from DB wishlist:', err);
      }
    }
  };

  const clearWishlist = () => {
    setWishlist([]);
    localStorage.removeItem('autosyntax_wishlist');
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        removeFromWishlist,
        isWishlisted,
        isInWishlist: isWishlisted,
        clearWishlist,
        count: wishlist.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
