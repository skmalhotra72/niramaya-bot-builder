import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Calendar, 
  MapPin, 
  Phone, 
  User, 
  Clock, 
  Shield, 
  CheckCircle,
  Calculator,
  Home as HomeIcon
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency } from "@/utils/pricingLogic";

interface BookingForm {
  name: string;
  phone: string;
  email: string;
  age: string;
  gender: string;
  address: string;
  pincode: string;
  preferredDate: string;
  preferredTime: string;
  specialInstructions: string;
  fastingRequired: boolean;
  consentGiven: boolean;
}

const BookNow = () => {
  const [formData, setFormData] = useState<BookingForm>({
    name: '',
    phone: '',
    email: '',
    age: '',
    gender: '',
    address: '',
    pincode: '',
    preferredDate: '',
    preferredTime: '',
    specialInstructions: '',
    fastingRequired: false,
    consentGiven: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const timeSlots = [
    '06:00 - 08:00', '08:00 - 10:00', '10:00 - 12:00',
    '12:00 - 14:00', '14:00 - 16:00', '16:00 - 18:00',
    '18:00 - 20:00'
  ];

  const handleInputChange = (field: keyof BookingForm, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.consentGiven) {
      toast({
        title: "Consent Required",
        description: "Please agree to the terms and conditions to proceed.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Replace with actual n8n webhook URL
      const webhookUrl = 'https://your-n8n-host.com/webhook/niramaya-booking';
      
      const payload = {
        event: 'book_request',
        session_id: crypto.randomUUID(),
        contact: {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          age: parseInt(formData.age),
          gender: formData.gender,
          address: formData.address,
          pincode: formData.pincode
        },
        booking_details: {
          preferred_date: formData.preferredDate,
          preferred_time: formData.preferredTime,
          special_instructions: formData.specialInstructions,
          fasting_required: formData.fastingRequired
        },
        context: {
          source: 'web',
          page: '/book-now',
          utm: {}
        },
        cart: [], // TODO: Get from cart context
        order_value_after_discount: 0,
        home_collection_charge: 0,
        timestamp: new Date().toISOString()
      };

      // Simulate API call for demo
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: "Booking Successful!",
        description: "Your home collection has been scheduled. Our team will contact you shortly with confirmation details.",
      });

      // Reset form
      setFormData({
        name: '', phone: '', email: '', age: '', gender: '',
        address: '', pincode: '', preferredDate: '', preferredTime: '',
        specialInstructions: '', fastingRequired: false, consentGiven: false
      });

      /*
      // In production, make actual API call:
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Webhook-Secret': 'your-webhook-secret'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        toast({
          title: "Booking Successful!",
          description: "Your home collection has been scheduled. Our team will contact you shortly.",
        });
      } else {
        throw new Error('Booking failed');
      }
      */

    } catch (error) {
      console.error('Booking error:', error);
      toast({
        title: "Booking Failed",
        description: "Unable to process your booking. Please call 9555009009 for immediate assistance.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-medical text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Book Home Collection
            </h1>
            <p className="text-xl text-brand-teal-lighter mb-6">
              Schedule your sample collection at your convenience
            </p>
            <Badge className="bg-brand-saffron text-brand-teal px-4 py-2">
              <Shield className="h-4 w-4 mr-2" />
              Safe • Convenient • Professional
            </Badge>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-brand-teal" />
                  Booking Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Personal Information
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          required
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          required
                          placeholder="10-digit mobile number"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="your.email@example.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="age">Age *</Label>
                        <Input
                          id="age"
                          type="number"
                          value={formData.age}
                          onChange={(e) => handleInputChange('age', e.target.value)}
                          required
                          placeholder="25"
                          min="1"
                          max="120"
                        />
                      </div>
                      <div>
                        <Label htmlFor="gender">Gender *</Label>
                        <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Address Information */}
                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Collection Address
                    </h3>
                    
                    <div>
                      <Label htmlFor="address">Complete Address *</Label>
                      <Textarea
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        required
                        placeholder="House/Flat No., Building, Street, Area"
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="pincode">Pincode *</Label>
                        <Input
                          id="pincode"
                          value={formData.pincode}
                          onChange={(e) => handleInputChange('pincode', e.target.value)}
                          required
                          placeholder="110001"
                          pattern="[0-9]{6}"
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Schedule Information */}
                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Preferred Schedule
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="preferredDate">Preferred Date *</Label>
                        <Input
                          id="preferredDate"
                          type="date"
                          value={formData.preferredDate}
                          onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                          required
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                      <div>
                        <Label htmlFor="preferredTime">Preferred Time Slot *</Label>
                        <Select value={formData.preferredTime} onValueChange={(value) => handleInputChange('preferredTime', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select time slot" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map(slot => (
                              <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="specialInstructions">Special Instructions</Label>
                      <Textarea
                        id="specialInstructions"
                        value={formData.specialInstructions}
                        onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
                        placeholder="Any specific instructions for our phlebotomist (e.g., gate number, directions)"
                        rows={2}
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Checkboxes */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="fastingRequired"
                        checked={formData.fastingRequired}
                        onCheckedChange={(checked) => handleInputChange('fastingRequired', checked as boolean)}
                      />
                      <Label htmlFor="fastingRequired" className="text-sm">
                        I understand that fasting may be required for certain tests
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="consentGiven"
                        checked={formData.consentGiven}
                        onCheckedChange={(checked) => handleInputChange('consentGiven', checked as boolean)}
                      />
                      <Label htmlFor="consentGiven" className="text-sm">
                        I agree to the terms and conditions and privacy policy *
                      </Label>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-brand-saffron hover:bg-brand-gold text-brand-teal font-semibold py-3"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Processing Booking..."
                    ) : (
                      <>
                        <Calendar className="h-4 w-4 mr-2" />
                        Confirm Booking
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            {/* Pricing Calculator */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calculator className="h-5 w-5 text-brand-teal" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6">
                  <p className="text-muted-foreground mb-4">
                    Add tests or packages to see pricing
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <a href="/tests">Browse Tests</a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Safety Information */}
            <Card className="border-l-4 border-l-brand-teal">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Shield className="h-5 w-5 text-brand-teal" />
                  Safety First
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Trained phlebotomists with full PPE</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Pre-barcoded sealed sample kits</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Cold-chain logistics to lab</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Social distancing maintained</span>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Phone className="h-5 w-5 text-brand-teal" />
                  Need Help?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">24×7 Helpdesk</p>
                  <div className="space-y-1">
                    <a href="tel:9555009009" className="block text-sm font-medium text-brand-teal hover:underline">
                      9555009009
                    </a>
                    <a href="tel:9958824555" className="block text-sm font-medium text-brand-teal hover:underline">
                      9958824555
                    </a>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Email Support</p>
                  <a href="mailto:care@niramayapathlabs.com" className="text-sm text-brand-teal hover:underline">
                    care@niramayapathlabs.com
                  </a>
                </div>

                <Button asChild variant="outline" className="w-full">
                  <a href="/support">
                    <HomeIcon className="h-4 w-4 mr-2" />
                    Visit Support Center
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookNow;