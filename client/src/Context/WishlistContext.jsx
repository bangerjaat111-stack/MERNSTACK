import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config/api.js';
import { showSuccessToast, showErrorToast } from '../components/Notification/Tost';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const activeUserId = localStorage.getItem('userid');
      if (!activeUserId) return [];
      const saved = localStorage.getItem('autosyntax_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const userId = localStorage.getItem('userid');

  // Helper function to check if car is in wishlist (deduplicated by ID or Title)
  const isWishlisted = (carOrId) => {
    const activeUserId = localStorage.getItem('userid');
    if (!activeUserId || !carOrId) return false;
    const targetId = typeof carOrId === 'object' ? (carOrId.id || carOrId._id) : carOrId;
    const targetTitle = typeof carOrId === 'object' ? (carOrId.title || carOrId.name) : carOrId;

    return wishlist.some((item) => {
      if (!item) return false;
      const itemId = item.id || item._id;
      const itemTitle = item.title || item.name;

      if (targetId && itemId && String(targetId) === String(itemId)) return true;
      if (
        targetTitle &&
        itemTitle &&
        targetTitle.toString().toLowerCase().trim() === itemTitle.toString().toLowerCase().trim()
      ) {
        return true;
      }
      return false;
    });
  };

  // Load wishlist from DB on mount/login and remove any duplicate records
  useEffect(() => {
    const activeUserId = localStorage.getItem('userid');
    if (!activeUserId) {
      setWishlist([]);
      try {
        localStorage.removeItem('autosyntax_wishlist');
      } catch (e) {}
      return;
    }
    const fetchUserWishlist = async () => {
      try {
        const res = await axios.get(`${API_URL}/user/${activeUserId}/wishlist`);
        if (res.data?.status && Array.isArray(res.data?.wishlist)) {
          const uniqueList = [];
          res.data.wishlist.forEach((item) => {
            const itemId = item.id || item._id;
            const itemTitle = item.title || item.name;
            const isDuplicate = uniqueList.some((existing) => {
              const exId = existing.id || existing._id;
              const exTitle = existing.title || existing.name;
              return (
                (itemId && exId && String(itemId) === String(exId)) ||
                (itemTitle && exTitle && itemTitle.toString().toLowerCase().trim() === exTitle.toString().toLowerCase().trim())
              );
            });
            if (!isDuplicate) {
              uniqueList.push(item);
            }
          });
          setWishlist(uniqueList);
        }
      } catch (err) {
        console.error('Failed to load user wishlist from DB:', err);
      }
    };
    fetchUserWishlist();
  }, [userId]);

  // Persist to localStorage
  useEffect(() => {
    const activeUserId = localStorage.getItem('userid');
    if (!activeUserId) {
      try {
        localStorage.removeItem('autosyntax_wishlist');
      } catch (e) {}
      return;
    }
    try {
      localStorage.setItem('autosyntax_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist:', e);
    }
  }, [wishlist]);

  const toggleWishlist = async (car) => {
    const activeUserId = localStorage.getItem('userid');
    if (!activeUserId) {
      showErrorToast('Please sign in to save cars to your wishlist');
      return;
    }
    if (!car) return;
    const carId = car.id || car._id;
    const carName = car.title || car.name || 'Car';
    const isSaved = isWishlisted(car);

    if (isSaved) {
      // Remove car from wishlist
      setWishlist((prev) =>
        prev.filter((item) => {
          if (!item) return false;
          const itemId = item.id || item._id;
          const itemTitle = item.title || item.name;

          const matchesId = carId && itemId && String(carId) === String(itemId);
          const matchesTitle =
            carName &&
            itemTitle &&
            carName.toString().toLowerCase().trim() === itemTitle.toString().toLowerCase().trim();

          return !(matchesId || matchesTitle);
        })
      );
      showSuccessToast(`Removed ${carName} from wishlist`);
    } else {
      // Add car to wishlist (strictly deduplicate)
      setWishlist((prev) => {
        const alreadyInPrev = prev.some((item) => {
          if (!item) return false;
          const itemId = item.id || item._id;
          const itemTitle = item.title || item.name;

          const matchesId = carId && itemId && String(carId) === String(itemId);
          const matchesTitle =
            carName &&
            itemTitle &&
            carName.toString().toLowerCase().trim() === itemTitle.toString().toLowerCase().trim();

          return matchesId || matchesTitle;
        });

        return alreadyInPrev ? prev : [...prev, car];
      });
      showSuccessToast(`Added ${carName} to wishlist ❤️`);
    }

    // Sync with DB if logged in
    if (activeUserId) {
      try {
        await axios.post(`${API_URL}/user/${activeUserId}/wishlist`, { car });
      } catch (err) {
        console.error('Failed to sync wishlist with DB:', err);
      }
    }
  };

  const removeFromWishlist = async (carIdOrTitle) => {
    const activeUserId = localStorage.getItem('userid');
    if (!activeUserId) return;
    const targetStr = carIdOrTitle ? String(carIdOrTitle).toLowerCase().trim() : '';

    setWishlist((prev) =>
      prev.filter((item) => {
        if (!item) return false;
        const itemId = item.id || item._id ? String(item.id || item._id).toLowerCase().trim() : '';
        const itemTitle = item.title || item.name ? String(item.title || item.name).toLowerCase().trim() : '';

        return itemId !== targetStr && itemTitle !== targetStr;
      })
    );

    showSuccessToast('Car removed from wishlist');

    if (activeUserId) {
      try {
        await axios.post(`${API_URL}/user/${activeUserId}/wishlist`, { car: { id: carIdOrTitle, title: carIdOrTitle } });
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
        wishlist: userId ? wishlist : [],
        toggleWishlist,
        removeFromWishlist,
        isWishlisted,
        isInWishlist: isWishlisted,
        clearWishlist,
        count: userId ? wishlist.length : 0,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
