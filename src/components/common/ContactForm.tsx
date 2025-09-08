'use client';
import React, { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Card from '../ui/Card';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone: string;
  subject: string;
  message: string;
  interestedProducts: string[];
  preferredContact: 'email' | 'phone' | 'either';
}

interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => Promise<void>;
  preselectedProduct?: string;
  title?: string;
  subtitle?: string;
  className?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({
  onSubmit,
  preselectedProduct,
  title = "Get in Touch",
  subtitle = "Ready to make your packaging more sustainable? Let's talk!",
  className = ''
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    subject: preselectedProduct ? `Inquiry about ${preselectedProduct}` : '',
    message: '',
    interestedProducts: preselectedProduct ? [preselectedProduct] : [],
    preferredContact: 'email'
  });

  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  const productOptions = [
    'Biodegradable Packaging',
    'Recycled Cardboard Boxes',
    'Compostable Food Containers',
    'Eco-Friendly Bags',
    'Sustainable Labels',
    'Custom Packaging Solutions',
    'Bulk Orders',
    'Other'
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.company.trim()) newErrors.company = 'Company name is required';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleProductsChange = (product: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      interestedProducts: checked
        ? [...prev.interestedProducts, product]
        : prev.interestedProducts.filter(p => p !== product)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        // Default submission logic (you'd implement API call here)
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
        console.log('Form submitted:', formData);
      }
      
      setSubmitMessage({ type: 'success', text: 'Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.' });
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        phone: '',
        subject: '',
        message: '',
        interestedProducts: [],
        preferredContact: 'email'
      });
    } catch (error) {
      setSubmitMessage({ type: 'error', text: 'Sorry, there was an error sending your message. Please try again or contact us directly.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className={`max-w-2xl ${className}`}>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-ecoware-text-dark mb-2">{title}</h2>
        <p className="text-ecoware-gray-dark">{subtitle}</p>
      </div>

      {submitMessage && (
        <div className={`p-4 rounded-lg mb-6 ${submitMessage.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
          {submitMessage.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="First Name *"
            type="text"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            error={errors.firstName}
            placeholder="John"
          />
          <Input
            label="Last Name *"
            type="text"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            error={errors.lastName}
            placeholder="Doe"
          />
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Email Address *"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            error={errors.email}
            placeholder="john@company.com"
          />
          <Input
            label="Phone Number"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            error={errors.phone}
            placeholder="+1 (555) 123-4567"
          />
        </div>

        {/* Company */}
        <Input
          label="Company Name *"
          type="text"
          value={formData.company}
          onChange={(e) => handleInputChange('company', e.target.value)}
          error={errors.company}
          placeholder="Your Company Inc."
        />

        {/* Subject */}
        <Input
          label="Subject *"
          type="text"
          value={formData.subject}
          onChange={(e) => handleInputChange('subject', e.target.value)}
          error={errors.subject}
          placeholder="How can we help you?"
        />

        {/* Interested Products */}
        <div>
          <label className="block text-sm font-medium text-ecoware-text-dark mb-3">
            Products of Interest (Select all that apply)
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {productOptions.map((product) => (
              <label key={product} className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  checked={formData.interestedProducts.includes(product)}
                  onChange={(e) => handleProductsChange(product, e.target.checked)}
                  className="w-4 h-4 text-ecoware-primary border-ecoware-gray-medium rounded focus:ring-ecoware-primary focus:ring-2"
                />
                <span>{product}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Preferred Contact Method */}
        <div>
          <label className="block text-sm font-medium text-ecoware-text-dark mb-3">
            Preferred Contact Method
          </label>
          <div className="flex space-x-6">
            {(['email', 'phone', 'either'] as const).map((method) => (
              <label key={method} className="flex items-center space-x-2 text-sm">
                <input
                  type="radio"
                  name="preferredContact"
                  value={method}
                  checked={formData.preferredContact === method}
                  onChange={(e) => handleInputChange('preferredContact', e.target.value)}
                  className="w-4 h-4 text-ecoware-primary border-ecoware-gray-medium focus:ring-ecoware-primary focus:ring-2"
                />
                <span className="capitalize">{method}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Message */}
        <Textarea
          label="Message *"
          value={formData.message}
          onChange={(e) => handleInputChange('message', e.target.value)}
          error={errors.message}
          placeholder="Tell us about your packaging needs, sustainability goals, or any specific requirements..."
          rows={5}
        />

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isSubmitting}
            className="min-w-[150px]"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
        </div>
      </form>

      {/* Contact Information */}
      <div className="mt-8 pt-6 border-t border-ecoware-gray-medium">
        <div className="text-sm text-ecoware-gray-dark">
          <p className="mb-2">
            <strong>Direct Contact:</strong> hello@ecowaresolutions.com | +1 (555) 123-4567
          </p>
          <p>
            <strong>Response Time:</strong> We typically respond within 24 hours during business days.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default ContactForm;
