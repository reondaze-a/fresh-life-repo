"use client";

import Modal from "@/components/Modals/Modal";
import LoginPage from "@/app/login/page"; // reuse the canonical page UI

export default function LoginAsModal() {
  return (
    <Modal title="Login">
      <LoginPage />
    </Modal>
  );
}

