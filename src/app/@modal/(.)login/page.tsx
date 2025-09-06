// NEW: intercept the /login route and show it inside a modal overlay
"use client";

import Modal from "@/components/Modals/Modal";
import LoginPage from "@/app/login/page"; // CHANGED: reuse the canonical page UI

export default function LoginAsModal() {
  // CHANGED: render the same login content inside the modal shell
  return (
    <Modal title="Login">
      <LoginPage />
    </Modal>
  );
}
