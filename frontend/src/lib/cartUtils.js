/**
 * Cart Utilities
 * Helper functions for cart operations and formatting
 */

/**
 * Calculate item total
 */
export const calculateItemTotal = (price, quantity) => {
  return price * quantity;
};

/**
 * Calculate cart subtotal
 */
export const calculateSubtotal = (items, getPrice) => {
  return items.reduce((total, item) => {
    const price = getPrice(item.product) || 0;
    return total + price * item.quantity;
  }, 0);
};

/**
 * Calculate savings
 */
export const calculateSavings = (items, getPrice) => {
  return items.reduce((savings, item) => {
    const product = item.product || {};
    const publicPrice = product.publicPrice ?? product.price ?? 0;
    const userPrice = getPrice(product) || 0;

    if (userPrice < publicPrice) {
      return savings + (publicPrice - userPrice) * item.quantity;
    }
    return savings;
  }, 0);
};

/**
 * Format price
 */
export const formatPrice = (price, currency = "USD") => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(price);
};

/**
 * Calculate tax
 */
export const calculateTax = (subtotal, taxRate = 0.08) => {
  return subtotal * taxRate;
};

/**
 * Calculate shipping
 */
export const calculateShipping = (subtotal, freeShippingThreshold = 100) => {
  if (subtotal >= freeShippingThreshold) return 0;
  return 9.99;
};

/**
 * Calculate grand total
 */
export const calculateGrandTotal = (
  subtotal,
  taxRate = 0.08,
  shipping = null,
  discount = 0,
) => {
  const tax = calculateTax(subtotal, taxRate);
  const shippingCost = shipping ?? calculateShipping(subtotal);
  return subtotal + tax + shippingCost - discount;
};

/**
 * Get savings percentage
 */
export const getSavingsPercentage = (savings, subtotal) => {
  if (subtotal === 0) return 0;
  return Math.round((savings / (subtotal + savings)) * 100);
};

/**
 * Check if cart qualifies for free shipping
 */
export const qualifiesForFreeShipping = (subtotal, threshold = 100) => {
  return subtotal >= threshold;
};

/**
 * Get amount needed for free shipping
 */
export const getAmountForFreeShipping = (subtotal, threshold = 100) => {
  return Math.max(0, threshold - subtotal);
};

/**
 * Validate cart item
 */
export const validateCartItem = (item) => {
  if (!item?.productId) {
    return { valid: false, error: "Missing product ID" };
  }
  if (!item?.product) {
    return { valid: false, error: "Missing product data" };
  }
  if (!item?.quantity || item.quantity < 1) {
    return { valid: false, error: "Invalid quantity" };
  }
  if (item?.product?.inStock === false) {
    return { valid: false, error: "Product out of stock" };
  }
  return { valid: true };
};

/**
 * Merge duplicate items in cart
 */
export const mergeCartItems = (items) => {
  const merged = {};

  items.forEach((item) => {
    const key = item.productId;
    if (merged[key]) {
      merged[key].quantity += item.quantity;
    } else {
      merged[key] = { ...item };
    }
  });

  return Object.values(merged);
};

/**
 * Remove invalid items from cart
 */
export const filterValidCartItems = (items) => {
  return items.filter((item) => validateCartItem(item).valid);
};

/**
 * Sort cart items
 */
export const sortCartItems = (items, sortBy = "addedAt", order = "desc") => {
  return [...items].sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case "price":
        comparison = (a.product?.price || 0) - (b.product?.price || 0);
        break;
      case "name":
        comparison = (a.product?.title || "").localeCompare(
          b.product?.title || "",
        );
        break;
      case "addedAt":
      default:
        comparison = new Date(a.addedAt || 0) - new Date(b.addedAt || 0);
    }

    return order === "desc" ? -comparison : comparison;
  });
};

/**
 * Group cart items by category
 */
export const groupCartItemsByCategory = (items) => {
  return items.reduce((groups, item) => {
    const category = item.product?.category || "uncategorized";
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(item);
    return groups;
  }, {});
};

/**
 * Get unique brands in cart
 */
export const getUniqueBrandsInCart = (items) => {
  const brands = new Set();
  items.forEach((item) => {
    if (item.product?.brand) {
      brands.add(item.product.brand);
    }
  });
  return Array.from(brands);
};

/**
 * Check if all items in stock
 */
export const allItemsInStock = (items) => {
  return items.every((item) => item.product?.inStock !== false);
};

/**
 * Get out of stock items
 */
export const getOutOfStockItems = (items) => {
  return items.filter((item) => item.product?.inStock === false);
};

export default {
  calculateItemTotal,
  calculateSubtotal,
  calculateSavings,
  formatPrice,
  calculateTax,
  calculateShipping,
  calculateGrandTotal,
  getSavingsPercentage,
  qualifiesForFreeShipping,
  getAmountForFreeShipping,
  validateCartItem,
  mergeCartItems,
  filterValidCartItems,
  sortCartItems,
  groupCartItemsByCategory,
  getUniqueBrandsInCart,
  allItemsInStock,
  getOutOfStockItems,
};
