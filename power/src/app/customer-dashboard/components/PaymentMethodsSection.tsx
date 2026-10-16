'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface PaymentMethod {
  id: string;
  type: 'card' | 'bank' | 'paypal';
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  email?: string;
  bankName?: string;
  isDefault: boolean;
}

interface PaymentMethodsSectionProps {
  paymentMethods: PaymentMethod[];
  onAddPaymentMethod: () => void;
  onSetDefault: (methodId: string) => void;
  onRemoveMethod: (methodId: string) => void;
}

const PaymentMethodsSection = ({ 
  paymentMethods, 
  onAddPaymentMethod, 
  onSetDefault, 
  onRemoveMethod 
}: PaymentMethodsSectionProps) => {
  const [showAddForm, setShowAddForm] = useState(false);

  const getPaymentIcon = (type: string, brand?: string) => {
    if (type === 'card') {
      switch (brand?.toLowerCase()) {
        case 'visa':
          return 'CreditCardIcon';
        case 'mastercard':
          return 'CreditCardIcon';
        case 'amex':
          return 'CreditCardIcon';
        default:
          return 'CreditCardIcon';
      }
    } else if (type === 'bank') {
      return 'BuildingLibraryIcon';
    } else if (type === 'paypal') {
      return 'CurrencyDollarIcon';
    }
    return 'CreditCardIcon';
  };

  const formatCardNumber = (last4: string) => `•••• •••• •••• ${last4}`;

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Payment Methods</h2>
        <button
          onClick={onAddPaymentMethod}
          className="flex items-center space-x-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors duration-200"
        >
          <Icon name="PlusIcon" size={16} />
          <span>Add Method</span>
        </button>
      </div>

      {paymentMethods.length === 0 ? (
        <div className="text-center py-8">
          <Icon name="CreditCardIcon" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No payment methods added</p>
          <p className="text-sm text-muted-foreground mt-2">Add a payment method for faster checkout</p>
        </div>
      ) : (
        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <div key={method.id} className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-8 bg-muted rounded flex items-center justify-center">
                    <Icon name={getPaymentIcon(method.type, method.brand) as any} size={20} className="text-muted-foreground" />
                  </div>
                  
                  <div>
                    {method.type === 'card' && (
                      <>
                        <div className="font-medium text-foreground">
                          {method.brand?.toUpperCase()} {formatCardNumber(method.last4 || '')}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Expires {method.expiryMonth?.toString().padStart(2, '0')}/{method.expiryYear}
                        </div>
                      </>
                    )}
                    
                    {method.type === 'bank' && (
                      <>
                        <div className="font-medium text-foreground">{method.bankName}</div>
                        <div className="text-sm text-muted-foreground">Bank Account ••••{method.last4}</div>
                      </>
                    )}
                    
                    {method.type === 'paypal' && (
                      <>
                        <div className="font-medium text-foreground">PayPal</div>
                        <div className="text-sm text-muted-foreground">{method.email}</div>
                      </>
                    )}
                    
                    {method.isDefault && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 text-primary mt-1">
                        Default
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {!method.isDefault && (
                    <button
                      onClick={() => onSetDefault(method.id)}
                      className="text-sm text-primary hover:text-primary/80 transition-colors duration-200"
                    >
                      Set Default
                    </button>
                  )}
                  <button
                    onClick={() => onRemoveMethod(method.id)}
                    className="text-red-500 hover:text-red-700 transition-colors duration-200"
                  >
                    <Icon name="TrashIcon" size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentMethodsSection;