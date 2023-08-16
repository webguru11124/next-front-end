// Code inspired by https://dev.to/dmtrkovalenko/the-neatest-way-to-handle-alert-Modals-in-react-1aoe
// If you prefer to use Context API, refer to that link
"use client"

import { User } from '@/app/(page)/(manage)/users/types';
import { Vendor } from '@/app/(page)/(tables)/(contact)/vendors/types';
import { produce } from 'immer';
import { create } from 'zustand';

export enum ModalType {
  PorfileEditModal,
  VendorEditModal,
  ProfileModal,
  OrganizationEditModal,
  InviteUser,
  UserDetail,
  VendorDetail
}
export interface ModalOptions {
  catchOnCancel?: boolean;
  modalType?: ModalType | null;
  data: Vendor | User | null;
}

type ModalStoreType = {
  awaitingPromise: {
    resolve?: () => void;
    reject?: () => void;
  };
  open: boolean;
  state: ModalOptions;
  modal: (options: Partial<ModalOptions>) => Promise<void>;
  handleClose: () => void;
  handleSubmit: () => void;
};

const useModalStore = create<ModalStoreType>((set) => ({
  awaitingPromise: {},
  open: false,
  state: {
    catchOnCancel: false,
    data: null
  },
  modal: (options) => {
    set(
      produce((state: ModalStoreType) => {
        state.open = true;
        state.state = { ...state.state, ...options };
      })
    );
    return new Promise<void>((resolve, reject) => {
      set(
        produce((state: ModalStoreType) => {
          state.awaitingPromise = { resolve, reject };
        })
      );
    });
  },
  handleClose: () => {
    set(
      produce((state: ModalStoreType) => {
        // Allowing us to catch the promise
        // Set catchOnCancel to false if you are not catching promise
        // to avoid uncatched promise error.
        state.state.modalType = null;
        state.state.catchOnCancel && state.awaitingPromise?.reject?.();
        state.open = false;
      })
    );
  },
  handleSubmit: () => {
    set(
      produce((state: ModalStoreType) => {
        state.awaitingPromise?.resolve?.();
        state.open = false;
      })
    );
  },
}));

export default useModalStore;
export const useOpen = () => useModalStore((state) => state.open);
export const useModalType = () => useModalStore((state) => state.state.modalType)
export const useSelected = () => useModalStore((state) => state.state.data)
export const useClose = () => useModalStore((state) => state.handleClose);
export const useModal = () => useModalStore((state) => state.modal);
