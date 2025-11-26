"use client";

import { useState, useEffect, useCallback } from "react";

const FAVORITES_COOKIE_NAME = "tokano_favorites";
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60; // 1 year in seconds

/**
 * Hook to manage favorites using cookies
 * Favorites are stored as: { type: 'stake'|'vest'|'lock', address: 'poolAddress' }
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from cookies on mount
  useEffect(() => {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${FAVORITES_COOKIE_NAME}=`));

    if (cookieValue) {
      try {
        const value = cookieValue.split("=")[1];
        const decoded = decodeURIComponent(value);
        const parsed = JSON.parse(decoded);
        setFavorites(Array.isArray(parsed) ? parsed : []);
      } catch (error) {
        console.error("Error loading favorites from cookie:", error);
        setFavorites([]);
      }
    }
  }, []);

  // Save favorites to cookies whenever they change
  const saveToCookie = useCallback((favoritesData) => {
    try {
      const encoded = encodeURIComponent(JSON.stringify(favoritesData));
      document.cookie = `${FAVORITES_COOKIE_NAME}=${encoded}; max-age=${COOKIE_MAX_AGE}; path=/; SameSite=Lax`;
    } catch (error) {
      console.error("Error saving favorites to cookie:", error);
    }
  }, []);

  // Check if an item is favorited
  const isFavorite = useCallback(
    (type, address) => {
      return favorites.some(
        (fav) => fav.type === type && fav.address === address,
      );
    },
    [favorites],
  );

  // Toggle favorite status
  const toggleFavorite = useCallback(
    (type, address) => {
      setFavorites((prev) => {
        const exists = prev.some(
          (fav) => fav.type === type && fav.address === address,
        );

        let newFavorites;
        if (exists) {
          // Remove from favorites
          newFavorites = prev.filter(
            (fav) => !(fav.type === type && fav.address === address),
          );
        } else {
          // Add to favorites
          newFavorites = [...prev, { type, address }];
        }

        // Save to cookie
        saveToCookie(newFavorites);
        return newFavorites;
      });
    },
    [saveToCookie],
  );

  // Get all favorites of a specific type
  const getFavoritesByType = useCallback(
    (type) => {
      return favorites.filter((fav) => fav.type === type);
    },
    [favorites],
  );

  // Clear all favorites
  const clearFavorites = useCallback(() => {
    setFavorites([]);
    document.cookie = `${FAVORITES_COOKIE_NAME}=; max-age=0; path=/`;
  }, []);

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    getFavoritesByType,
    clearFavorites,
  };
}
