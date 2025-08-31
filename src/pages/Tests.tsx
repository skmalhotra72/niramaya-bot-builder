import React, { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Search, ShoppingCart, Clock, Beaker, Info, Calculator } from "lucide-react";
import { testsData, Test } from "@/data/testsData";
import { calculatePricing, formatCurrency, LineItem, DiscountTier } from "@/utils/pricingLogic";
import { useToast } from "@/hooks/use-toast";

const Tests = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState<LineItem[]>([]);
  const [discountTier, setDiscountTier] = useState<DiscountTier>('standard');
  const { toast } = useToast();

  const categories = ["All", ...Array.from(new Set(testsData.map(test => test.category)))];

  const filteredTests = useMemo(() => {
    return testsData.filter(test => {
      const matchesSearch = test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          test.code.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || test.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const pricingResult = useMemo(() => {
    return cart.length > 0 ? calculatePricing(cart, discountTier) : null;
  }, [cart, discountTier]);

  const addToCart = (test: Test) => {
    const existingItem = cart.find(item => item.code === test.code);
    if (existingItem) {
      setCart(prev => prev.map(item => 
        item.code === test.code 
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      ));
    } else {
      setCart(prev => [...prev, {
        code: test.code,
        name: test.name,
        mrp: test.mrp,
        maxDiscount: test.maxDiscount,
        quantity: 1
      }]);
    }
    
    toast({
      title: "Added to Cart",
      description: `${test.name} has been added to your cart.`,
    });
  };

  const removeFromCart = (code: string) => {
    setCart(prev => prev.filter(item => item.code !== code));
    toast({
      title: "Removed from Cart",
      description: "Test removed from cart successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-medical text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Tests & Transparent Pricing
            </h1>
            <p className="text-xl text-brand-teal-lighter mb-6">
              Browse our comprehensive test catalog with upfront pricing and maximum discounts
            </p>
            <Badge className="bg-brand-saffron text-brand-teal px-4 py-2">
              Home Collection FREE above ₹600 (after discount)
            </Badge>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Filters */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by test name or code..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                {/* Category Filter */}
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <Badge
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      className={`cursor-pointer ${
                        selectedCategory === category 
                          ? "bg-brand-teal text-white" 
                          : "hover:bg-brand-teal hover:text-white"
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tests Grid */}
            <div className="space-y-4">
              {filteredTests.map(test => (
                <Card key={test.code} className="hover:shadow-medical transition-shadow">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                      <div className="md:col-span-2">
                        <h3 className="font-semibold text-lg text-foreground mb-1">
                          {test.name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="font-mono text-xs bg-muted px-2 py-1 rounded">
                            {test.code}
                          </span>
                          <Badge variant="outline">{test.category}</Badge>
                        </div>
                        {test.description && (
                          <p className="text-sm text-muted-foreground mt-2">
                            {test.description}
                          </p>
                        )}
                      </div>

                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-1">
                          <Beaker className="h-4 w-4" />
                          {test.sampleType}
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-1">
                          <Clock className="h-4 w-4" />
                          {test.tat}
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="text-lg font-bold text-foreground">
                          {formatCurrency(test.mrp)}
                        </div>
                        <div className="text-xs text-success">
                          Up to {test.maxDiscount}% discount
                        </div>
                        <Button
                          size="sm"
                          onClick={() => addToCart(test)}
                          className="mt-2 bg-brand-teal hover:bg-brand-teal-light w-full"
                        >
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredTests.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">No tests found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or category filter
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Cart Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <ShoppingCart className="h-5 w-5 text-brand-teal" />
                  <h3 className="font-semibold">Your Cart</h3>
                  <Badge className="ml-auto">{cart.length}</Badge>
                </div>

                {cart.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground text-sm">
                      Add tests to see pricing
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Discount Tier Selector */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">Discount Level</label>
                      <div className="space-y-2">
                        <Button
                          variant={discountTier === 'standard' ? "default" : "outline"}
                          size="sm"
                          onClick={() => setDiscountTier('standard')}
                          className="w-full justify-start text-xs"
                        >
                          Standard (20%)
                        </Button>
                        <Button
                          variant={discountTier === 'negotiated' ? "default" : "outline"}
                          size="sm"
                          onClick={() => setDiscountTier('negotiated')}
                          className="w-full justify-start text-xs"
                        >
                          Negotiated (25%)
                        </Button>
                        <Button
                          variant={discountTier === 'maximum' ? "default" : "outline"}
                          size="sm"
                          onClick={() => setDiscountTier('maximum')}
                          className="w-full justify-start text-xs"
                        >
                          Maximum Available
                        </Button>
                      </div>
                    </div>

                    <Separator />

                    {/* Cart Items */}
                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      {cart.map(item => (
                        <div key={item.code} className="text-sm">
                          <div className="flex justify-between items-start mb-1">
                            <span className="font-medium text-foreground line-clamp-2">
                              {item.name}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromCart(item.code)}
                              className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                            >
                              ×
                            </Button>
                          </div>
                          <div className="text-muted-foreground">
                            Qty: {item.quantity || 1} × {formatCurrency(item.mrp)}
                          </div>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    {/* Pricing Summary */}
                    {pricingResult && (
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Subtotal:</span>
                          <span>{formatCurrency(pricingResult.orderTotal)}</span>
                        </div>
                        <div className="flex justify-between text-success">
                          <span>Discount:</span>
                          <span>-{formatCurrency(pricingResult.totalDiscount)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>After Discount:</span>
                          <span>{formatCurrency(pricingResult.orderTotal - pricingResult.totalDiscount)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Home Collection:</span>
                          <span className={pricingResult.isFreeCollection ? "text-success" : ""}>
                            {pricingResult.isFreeCollection ? "FREE" : formatCurrency(pricingResult.homeCollectionCharge)}
                          </span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-semibold text-base">
                          <span>Total Payable:</span>
                          <span>{formatCurrency(pricingResult.finalPayable)}</span>
                        </div>

                        {!pricingResult.isFreeCollection && (
                          <div className="bg-medical-accent/10 p-3 rounded text-xs">
                            <Calculator className="h-4 w-4 inline mr-1" />
                            Add {formatCurrency(600 - (pricingResult.orderTotal - pricingResult.totalDiscount))} more for FREE collection!
                          </div>
                        )}
                      </div>
                    )}

                    <Button 
                      asChild
                      className="w-full bg-brand-saffron hover:bg-brand-gold text-brand-teal font-medium"
                    >
                      <a href="/book-now">
                        Proceed to Book
                      </a>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tests;