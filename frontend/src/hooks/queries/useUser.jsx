/**
 * User/Profile Queries
 * TanStack Query hooks for user profile management
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import toast from "react-hot-toast";

// Query Keys
export const userKeys = {
  all: ["user"],
  profile: () => [...userKeys.all, "profile"],
  addresses: () => [...userKeys.all, "addresses"],
  settings: () => [...userKeys.all, "settings"],
};

// Fetch User Profile
export function useUserProfile() {
  return useQuery({
    queryKey: userKeys.profile(),
    queryFn: async () => {
      const response = await api.get("/users/profile");
      return response.data.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

// Update Profile - useMutation with automatic state handling
export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profileData) => {
      const response = await api.put("/users/profile", profileData);
      return response.data.data;
    },
    onMutate: () => {
      toast.loading("Updating profile...", { id: "profile-update" });
    },
    onSuccess: (updatedUser) => {
      toast.success("Profile updated successfully!", { id: "profile-update" });
      queryClient.setQueryData(userKeys.profile(), updatedUser);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update profile", {
        id: "profile-update",
      });
    },
  });
}

// Update Password
export function useUpdatePassword() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (passwordData) => {
      const response = await api.put("/users/password", passwordData);
      return response.data.data;
    },
    onMutate: () => {
      toast.loading("Updating password...", { id: "password-update" });
    },
    onSuccess: () => {
      toast.success("Password updated successfully!", {
        id: "password-update",
      });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to update password",
        { id: "password-update" },
      );
    },
  });
}

// Fetch User Addresses
export function useUserAddresses() {
  return useQuery({
    queryKey: userKeys.addresses(),
    queryFn: async () => {
      const response = await api.get("/users/addresses");
      return response.data.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

// Add Address
export function useAddAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (addressData) => {
      const response = await api.post("/users/addresses", addressData);
      return response.data.data;
    },
    onSuccess: () => {
      toast.success("Address added successfully!");
      queryClient.invalidateQueries({ queryKey: userKeys.addresses() });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to add address");
    },
  });
}

// Update Address
export function useUpdateAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ addressId, data }) => {
      const response = await api.put(`/users/addresses/${addressId}`, data);
      return response.data.data;
    },
    onSuccess: () => {
      toast.success("Address updated successfully!");
      queryClient.invalidateQueries({ queryKey: userKeys.addresses() });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update address");
    },
  });
}

// Delete Address
export function useDeleteAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (addressId) => {
      await api.delete(`/users/addresses/${addressId}`);
      return addressId;
    },
    onSuccess: () => {
      toast.success("Address deleted");
      queryClient.invalidateQueries({ queryKey: userKeys.addresses() });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete address");
    },
  });
}

// Update Profile Image
export function useUpdateProfileImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData) => {
      const response = await api.post("/users/profile-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data.data;
    },
    onSuccess: (updatedUser) => {
      toast.success("Profile image updated!");
      queryClient.setQueryData(userKeys.profile(), updatedUser);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update image");
    },
  });
}
