import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/lib/types/product';
import { WishlistItem } from '@/lib/types/cart';

interface WishlistStore {
  items: WishlistItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        set((state) => {
          const exists = state.items.some(
            (item) => item.product._id === product._id
          );

          if (exists) {
            return state;
          }

          return {
            items: [...state.items, { product, addedAt: new Date() }],
          };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.product._id !== productId),
        }));
      },

      isInWishlist: (productId) => {
        return get().items.some((item) => item.product._id === productId);
      },

      clearWishlist: () => {
        set({ items: [] });
      },
    }),
    {
      name: 'wishlist-storage',
    }
  )
);
