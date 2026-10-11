import React, { createContext, useContext, useState, useEffect } from 'react';
import { PAYMENT_CONFIG } from '../config/payment';

export type PaymentMethod = 'EasyPaisa' | 'JazzCash';

export interface CustomerDetails {
  name: string;
  phone: string;
  email: string;
  transactionId: string;
}

interface PaymentContextType {
  selectedMethod: PaymentMethod | null;
  setSelectedMethod: (method: PaymentMethod | null) => void;
  customerDetails: CustomerDetails;
  setCustomerDetails: React.Dispatch<React.SetStateAction<CustomerDetails>>;
  receiptFile: File | null;
  setReceiptFile: (file: File | null) => void;
  receiptPreviewUrl: string | null;
  setReceiptPreviewUrl: (url: string | null) => void;
  uploadedImageUrl: string | null;
  setUploadedImageUrl: (url: string | null) => void;
  receiptSubmitted: boolean;
  setReceiptSubmitted: (val: boolean) => void;
  submissionDate: string | null;
  setSubmissionDate: (val: string | null) => void;
  amountPkr: number;
  resetCheckout: () => void;
}

const STORAGE_KEY = 'nexora_manual_checkout_data';

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const PaymentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedMethod, setSelectedMethodState] = useState<PaymentMethod | null>(() => {
    try {
      const saved = sessionStorage.getItem(`${STORAGE_KEY}_method`);
      return (saved as PaymentMethod) || null;
    } catch {
      return null;
    }
  });

  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>(() => {
    try {
      const saved = sessionStorage.getItem(`${STORAGE_KEY}_customer`);
      return saved
        ? JSON.parse(saved)
        : { name: '', phone: '', email: '', transactionId: '' };
    } catch {
      return { name: '', phone: '', email: '', transactionId: '' };
    }
  });

  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [receiptPreviewUrl, setReceiptPreviewUrl] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(() => {
    try {
      return sessionStorage.getItem(`${STORAGE_KEY}_receipt_url`) || null;
    } catch {
      return null;
    }
  });

  const [receiptSubmitted, setReceiptSubmittedState] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(`${STORAGE_KEY}_submitted`) === 'true';
    } catch {
      return false;
    }
  });

  const [submissionDate, setSubmissionDateState] = useState<string | null>(() => {
    try {
      return sessionStorage.getItem(`${STORAGE_KEY}_date`) || null;
    } catch {
      return null;
    }
  });

  const setSelectedMethod = (method: PaymentMethod | null) => {
    setSelectedMethodState(method);
    try {
      if (method) {
        sessionStorage.setItem(`${STORAGE_KEY}_method`, method);
      } else {
        sessionStorage.removeItem(`${STORAGE_KEY}_method`);
      }
    } catch {}
  };

  const setReceiptSubmitted = (val: boolean) => {
    setReceiptSubmittedState(val);
    try {
      sessionStorage.setItem(`${STORAGE_KEY}_submitted`, String(val));
    } catch {}
  };

  const setSubmissionDate = (val: string | null) => {
    setSubmissionDateState(val);
    try {
      if (val) {
        sessionStorage.setItem(`${STORAGE_KEY}_date`, val);
      } else {
        sessionStorage.removeItem(`${STORAGE_KEY}_date`);
      }
    } catch {}
  };

  useEffect(() => {
    try {
      sessionStorage.setItem(`${STORAGE_KEY}_customer`, JSON.stringify(customerDetails));
    } catch {}
  }, [customerDetails]);

  useEffect(() => {
    try {
      if (uploadedImageUrl) {
        sessionStorage.setItem(`${STORAGE_KEY}_receipt_url`, uploadedImageUrl);
      } else {
        sessionStorage.removeItem(`${STORAGE_KEY}_receipt_url`);
      }
    } catch {}
  }, [uploadedImageUrl]);

  const resetCheckout = () => {
    setSelectedMethodState(null);
    setCustomerDetails({ name: '', phone: '', email: '', transactionId: '' });
    setReceiptFile(null);
    if (receiptPreviewUrl) {
      URL.revokeObjectURL(receiptPreviewUrl);
    }
    setReceiptPreviewUrl(null);
    setUploadedImageUrl(null);
    setReceiptSubmittedState(false);
    setSubmissionDateState(null);
    try {
      sessionStorage.removeItem(`${STORAGE_KEY}_method`);
      sessionStorage.removeItem(`${STORAGE_KEY}_customer`);
      sessionStorage.removeItem(`${STORAGE_KEY}_receipt_url`);
      sessionStorage.removeItem(`${STORAGE_KEY}_submitted`);
      sessionStorage.removeItem(`${STORAGE_KEY}_date`);
    } catch {}
  };

  return (
    <PaymentContext.Provider
      value={{
        selectedMethod,
        setSelectedMethod,
        customerDetails,
        setCustomerDetails,
        receiptFile,
        setReceiptFile,
        receiptPreviewUrl,
        setReceiptPreviewUrl,
        uploadedImageUrl,
        setUploadedImageUrl,
        receiptSubmitted,
        setReceiptSubmitted,
        submissionDate,
        setSubmissionDate,
        amountPkr: PAYMENT_CONFIG.pricePkr,
        resetCheckout,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export function usePayment() {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
}
