"use client";
import { headers } from "next/headers";
import { create } from "zustand";

const useStoreApp = create((set: any) => ({
  vendor: {},

  setVendors: (vendor: any) => set({ vendor: vendor }),
  addVendor: (vendor: any) =>
    set((state: any) => {
      return { vendor: [...state.vendor, ...[vendor]] };
    }),
  removeVendor: (vendor: any) =>
    set((state: any) => {
      return { vendor: vendor.filter((v: any) => v.id !== vendor.id) };
    }),
  updateVendor: (vendor: any) =>
    set((state: any) => {
      const vendorCopy = [...state.vendor];
      const vendorIndex = vendorCopy.findIndex((v: any) => v.id === vendor.id);

      vendorCopy[vendorIndex] = vendor;

      return { vendor: vendorCopy };
    }),
}));
