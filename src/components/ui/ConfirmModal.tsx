"use client";

import React from 'react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDanger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDanger = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-surface-container border border-outline-variant rounded-xl max-w-md w-full p-6 shadow-2xl animate-in zoom-in-95">
        <h3 className="font-headline-md text-headline-md mb-2">{title}</h3>
        <p className="text-on-surface-variant font-body-md mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-lg font-bold border border-outline-variant hover:bg-surface-container-high text-on-surface"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`px-4 py-2 rounded-lg font-bold transition-all ${
              isDanger
                ? 'bg-error text-on-error hover:brightness-110'
                : 'bg-primary text-on-primary hover:brightness-110'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
