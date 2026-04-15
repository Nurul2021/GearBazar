/**
 * Order Queries
 * TanStack Query hooks for order data fetching and mutations
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import toast from "react-hot-toast";

// Query Keys
export const orderKeys = {
  all: ["orders"],
  lists: () => [...orderKeys.all, "list"],
  list: (filters) => [...orderKeys.lists(), filters],
  details: () => [...orderKeys.all, "detail"],
  detail: (id) => [...orderKeys.details(), id],
  user: (userId) => [...orderKeys.all, "user", userId],
  vendor: (vendorId) => [...orderKeys.all, "vendor", vendorId],
};

// Fetch User Orders
export function useOrders(filters = {}) {
  return useQuery({
    queryKey: orderKeys.list(filters),
    queryFn: async () => {
      const response = await api.get("/orders", { params: filters });
      return response.data.data;
    },
    staleTime: 5 * 60 * 1000, // 5-minute cache
  });
}

// Fetch Single Order
export function useOrder(orderId) {
  return useQuery({
    queryKey: orderKeys.detail(orderId),
    queryFn: async () => {
      const response = await api.get(`/orders/${orderId}`);
      return response.data.data;
    },
    enabled: !!orderId,
  });
}

// Place Order - useMutation with loading state
export function usePlaceOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderData) => {
      const response = await api.post("/orders", orderData);
      return response.data.data;
    },
    onMutate: () => {
      toast.loading("Placing your order...", { id: "order-placement" });
    },
    onSuccess: (order) => {
      toast.success("Order placed successfully!", { id: "order-placement" });
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to place order", {
        id: "order-placement",
      });
    },
  });
}

// Update Order Status
export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ orderId, status }) => {
      const response = await api.patch(`/orders/${orderId}/status`, { status });
      return response.data.data;
    },
    onSuccess: (updatedOrder, { orderId }) => {
      toast.success("Order status updated");
      queryClient.invalidateQueries({ queryKey: orderKeys.detail(orderId) });
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update status");
    },
  });
}

// Cancel Order
export function useCancelOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderId) => {
      const response = await api.post(`/orders/${orderId}/cancel`);
      return response.data.data;
    },
    onSuccess: (_, orderId) => {
      toast.success("Order cancelled");
      queryClient.invalidateQueries({ queryKey: orderKeys.detail(orderId) });
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to cancel order");
    },
  });
}

// Fetch Orders by User
export function useUserOrders(userId, options = {}) {
  return useQuery({
    queryKey: orderKeys.user(userId),
    queryFn: async () => {
      const response = await api.get(`/orders/user/${userId}`, {
        params: options,
      });
      return response.data.data;
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
}

// Fetch Vendor Orders
export function useVendorOrders(vendorId, options = {}) {
  return useQuery({
    queryKey: orderKeys.vendor(vendorId, options),
    queryFn: async () => {
      const response = await api.get("/orders/vendor", {
        params: { ...options, vendorId },
      });
      return response.data;
    },
    enabled: !!vendorId,
    staleTime: 5 * 60 * 1000,
  });
}

// Update Vendor Order Status - with optimistic update
export function useUpdateVendorOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ orderId, status, vendorId }) => {
      const response = await api.patch(`/orders/${orderId}/status`, {
        status,
        vendorId,
      });
      return response.data.data;
    },
    onMutate: async ({ orderId, status, vendorId }) => {
      await queryClient.cancelQueries({ queryKey: orderKeys.all });

      const previousOrders = queryClient.getQueryData(orderKeys.lists());
      const previousVendorOrders = queryClient.getQueryData(
        orderKeys.vendor(vendorId),
      );

      queryClient.setQueriesData({ queryKey: orderKeys.lists() }, (old) => {
        if (!old) return old;
        return {
          ...old,
          data: old.data?.map((order) => {
            if (order._id === orderId) {
              return { ...order, orderStatus: status };
            }
            return order;
          }),
        };
      });

      queryClient.setQueriesData(
        { queryKey: orderKeys.vendor(vendorId) },
        (old) => {
          if (!old) return old;
          return {
            ...old,
            data: old.data?.orders?.map((order) => {
              if (order._id === orderId) {
                return { ...order, orderStatus: status };
              }
              return order;
            }),
          };
        },
      );

      return { previousOrders, previousVendorOrders };
    },
    onError: (err, { vendorId }, context) => {
      if (context?.previousOrders) {
        queryClient.setQueriesData(
          { queryKey: orderKeys.lists() },
          context.previousOrders,
        );
      }
      if (context?.previousVendorOrders) {
        queryClient.setQueriesData(
          { queryKey: orderKeys.vendor(vendorId) },
          context.previousVendorOrders,
        );
      }
      toast.error(err.response?.data?.message || "Failed to update status");
    },
    onSuccess: (data, { orderId, vendorId }) => {
      toast.success("Order status updated");
      queryClient.invalidateQueries({ queryKey: orderKeys.detail(orderId) });
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
      queryClient.invalidateQueries({ queryKey: orderKeys.vendor(vendorId) });
    },
  });
}
