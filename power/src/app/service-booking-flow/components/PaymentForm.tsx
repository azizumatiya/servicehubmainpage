'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'apple' | 'google';
  name: string;
  icon: string;
  last4?: string;
  expiry?: string;
}

interface PaymentFormProps {
  onNext: (data: any) => void;
  onBack: () => void;
}

const PaymentForm = ({ onNext, onBack }: PaymentFormProps) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');
  const [useNewCard, setUseNewCard] = useState<boolean>(false);
  const [cardNumber, setCardNumber] = useState<string>('');
  const [expiryDate, setExpiryDate] = useState<string>('');
  const [cvv, setCvv] = useState<string>('');
  const [cardName, setCardName] = useState<string>('');
  const [billingAddress, setBillingAddress] = useState<string>('');
  const [promoCode, setPromoCode] = useState<string>('');
  const [promoApplied, setPromoApplied] = useState<boolean>(false);

  const savedPaymentMethods: PaymentMethod[] = [
    {
      id: 'card-1',
      type: 'card',
      name: 'Visa ending in 4242',
      icon: 'CreditCardIcon',
      last4: '4242',
      expiry: '12/25'
    },
    {
      id: 'paypal-1',
      type: 'paypal',
      name: 'PayPal Account',
      icon: 'CurrencyDollarIcon'
    }
  ];

  const pricingBreakdown = {
    serviceRate: 85,
    duration: 2,
    urgencyFee: 0,
    timeSlotFee: 0,
    subtotal: 170,
    serviceFee: 12.75,
    tax: 14.53,
    discount: promoApplied ? 17.00 : 0,
    total: promoApplied ? 180.28 : 197.28
  };

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === 'first10') {
      setPromoApplied(true);
    }
  };

  const handlePayment = () => {
    if (selectedPaymentMethod || (useNewCard && cardNumber && expiryDate && cvv && cardName)) {
      onNext({
        paymentMethod: selectedPaymentMethod || 'new-card',
        cardDetails: useNewCard ? {
          number: cardNumber,
          expiry: expiryDate,
          cvv: cvv,
          name: cardName
        } : null,
        billingAddress,
        promoCode: promoApplied ? promoCode : '',
        total: pricingBreakdown.total
      });
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Payment & Checkout</h2>
        <p className="text-text-secondary">Secure payment processing with escrow protection</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payment Methods */}
        <div className="lg:col-span-2">
          <h3 className="text-lg font-semibold text-foreground mb-4">Payment Method</h3>
          
          {/* Saved Payment Methods */}
          <div className="space-y-3 mb-4">
            {savedPaymentMethods.map((method) => (
              <label
                key={method.id}
                className="flex items-center p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors duration-200"
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.id}
                  checked={selectedPaymentMethod === method.id && !useNewCard}
                  onChange={(e) => {
                    setSelectedPaymentMethod(e.target.value);
                    setUseNewCard(false);
                  }}
                  className="w-4 h-4 text-primary border-border focus:ring-primary"
                />
                <div className="ml-3 flex items-center space-x-3">
                  <Icon name={method.icon as any} size={24} className="text-muted-foreground" />
                  <div>
                    <div className="font-medium text-foreground">{method.name}</div>
                    {method.expiry && (
                      <div className="text-sm text-muted-foreground">Expires {method.expiry}</div>
                    )}
                  </div>
                </div>
              </label>
            ))}
            
            {/* Add New Card Option */}
            <label className="flex items-center p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors duration-200">
              <input
                type="radio"
                name="paymentMethod"
                value="new-card"
                checked={useNewCard}
                onChange={() => {
                  setUseNewCard(true);
                  setSelectedPaymentMethod('');
                }}
                className="w-4 h-4 text-primary border-border focus:ring-primary"
              />
              <div className="ml-3 flex items-center space-x-3">
                <Icon name="PlusIcon" size={24} className="text-muted-foreground" />
                <div className="font-medium text-foreground">Add New Card</div>
              </div>
            </label>
          </div>

          {/* New Card Form */}
          {useNewCard && (
            <div className="p-4 bg-muted/30 rounded-lg space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-foreground mb-1">
                    Card Number *
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    className="input"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="expiryDate" className="block text-sm font-medium text-foreground mb-1">
                    Expiry Date *
                  </label>
                  <input
                    type="text"
                    id="expiryDate"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                    placeholder="MM/YY"
                    maxLength={5}
                    className="input"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="cvv" className="block text-sm font-medium text-foreground mb-1">
                    CVV *
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').substring(0, 4))}
                    placeholder="123"
                    maxLength={4}
                    className="input"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="cardName" className="block text-sm font-medium text-foreground mb-1">
                    Name on Card *
                  </label>
                  <input
                    type="text"
                    id="cardName"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="John Doe"
                    className="input"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Billing Address */}
          <div className="mt-6">
            <label htmlFor="billingAddress" className="block text-sm font-medium text-foreground mb-2">
              Billing Address
            </label>
            <textarea
              id="billingAddress"
              value={billingAddress}
              onChange={(e) => setBillingAddress(e.target.value)}
              placeholder="Enter your billing address..."
              className="input min-h-[80px] resize-none"
            />
          </div>

          {/* Promo Code */}
          <div className="mt-6">
            <label htmlFor="promoCode" className="block text-sm font-medium text-foreground mb-2">
              Promo Code
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                id="promoCode"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Enter promo code"
                className="input flex-1"
                disabled={promoApplied}
              />
              <button
                onClick={handleApplyPromo}
                disabled={!promoCode || promoApplied}
                className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                Apply
              </button>
            </div>
            {promoApplied && (
              <div className="mt-2 text-sm text-success flex items-center space-x-1">
                <Icon name="CheckCircleIcon" size={16} />
                <span>Promo code "FIRST10" applied - 10% discount!</span>
              </div>
            )}
            <div className="mt-1 text-xs text-muted-foreground">
              Try "FIRST10" for 10% off your first booking
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-muted/30 rounded-lg p-4 sticky top-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">Order Summary</h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Service Rate (${pricingBreakdown.serviceRate}/hr)</span>
                <span className="text-foreground">${pricingBreakdown.serviceRate}.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration ({pricingBreakdown.duration} hours)</span>
                <span className="text-foreground">${pricingBreakdown.subtotal}.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Service Fee (7.5%)</span>
                <span className="text-foreground">${pricingBreakdown.serviceFee}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span className="text-foreground">${pricingBreakdown.tax}</span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-success">
                  <span>Discount (FIRST10)</span>
                  <span>-${pricingBreakdown.discount}</span>
                </div>
              )}
              <div className="border-t border-border pt-3">
                <div className="flex justify-between font-semibold text-lg">
                  <span className="text-foreground">Total</span>
                  <span className="text-foreground">${pricingBreakdown.total}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-primary/10 rounded-lg">
              <div className="flex items-start space-x-2">
                <Icon name="ShieldCheckIcon" size={16} className="text-primary mt-0.5" />
                <div className="text-xs text-primary">
                  <div className="font-medium">Escrow Protection</div>
                  <div>Payment held securely until service completion</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:justify-between mt-6 space-y-3 sm:space-y-0 sm:space-x-4">
        <button
          onClick={onBack}
          className="px-6 py-3 border border-border text-foreground rounded-lg font-semibold hover:bg-muted transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <Icon name="ArrowLeftIcon" size={20} />
          <span>Back to Scheduling</span>
        </button>
        <button
          onClick={handlePayment}
          disabled={!selectedPaymentMethod && !useNewCard}
          className="btn-primary px-6 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          <Icon name="LockClosedIcon" size={20} />
          <span>Secure Payment - ${pricingBreakdown.total}</span>
        </button>
      </div>
    </div>
  );
};

export default PaymentForm;