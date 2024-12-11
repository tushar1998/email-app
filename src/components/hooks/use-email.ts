import { create, StoreApi, UseBoundStore } from "zustand";

interface EmailState {
  emailId: string;
  setEmailId: (emailId: string) => void;
}

export const useEmail: UseBoundStore<StoreApi<EmailState>> = create((set) => {
  return {
    emailId: "",
    setEmailId: (emailId: string) => {
      return set({ emailId });
    },
  };
});
