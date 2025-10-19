import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  ShoppingBag, 
  Heart, 
  TrendingUp,
  Building2,
  CheckCircle,
  DollarSign,
  Award,
  Leaf,
  Droplet,
  Users,
  TreePine,
  Shield,
  ExternalLink,
  Sparkles
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const MarketplacePage = () => {
  const ecoProducts = [
    {
      id: 1,
      name: "Eco-Friendly Water Filter",
      price: 2499,
      category: "Water Solutions",
      impact: "10% proceeds fund lake restoration",
      verified: true,
      image: "🌊",
      rating: 4.5,
      sales: 340
    },
    {
      id: 2,
      name: "Bamboo Tree Sapling Kit",
      price: 499,
      category: "Plantation",
      impact: "Plant 5 trees, restore 1 watershed",
      verified: true,
      image: "🌳",
      rating: 4.8,
      sales: 580
    },
    {
      id: 3,
      name: "Rainwater Harvesting Kit",
      price: 8999,
      category: "Water Solutions",
      impact: "25% proceeds support rural projects",
      verified: true,
      image: "💧",
      rating: 4.6,
      sales: 120
    },
    {
      id: 4,
      name: "Organic Compost Set",
      price: 799,
      category: "Sustainability",
      impact: "Supports organic farming initiatives",
      verified: true,
      image: "🌱",
      rating: 4.7,
      sales: 450
    }
  ];

  const donationOptions = [
    {
      amount: 100,
      title: "Adopt a Tree",
      description: "Plant and maintain one tree for a year",
      icon: TreePine,
      impact: "1 tree planted"
    },
    {
      amount: 500,
      title: "Lake Cleanup",
      description: "Fund cleanup supplies for local volunteers",
      icon: Droplet,
      impact: "100kg waste removed"
    },
    {
      amount: 2500,
      title: "Water Testing Kit",
      description: "Provide water quality testing equipment",
      icon: Shield,
      impact: "50 water samples tested"
    },
    {
      amount: 5000,
      title: "Pond Restoration",
      description: "Complete restoration of a small pond",
      icon: Sparkles,
      impact: "1 pond restored"
    }
  ];

  const csrProjects = [
    {
      id: 1,
      ngo: "Waterkeeper Alliance India",
      project: "Bellandur Lake Restoration",
      fundingGoal: 5000000,
      fundingRaised: 4200000,
      impactScore: 9.2,
      verified: true,
      location: "Bangalore, Karnataka",
      volunteers: 450,
      area: "850 acres"
    },
    {
      id: 2,
      ngo: "Clean Water Foundation",
      project: "Rural Water Access Program",
      fundingGoal: 3000000,
      fundingRaised: 1800000,
      impactScore: 8.8,
      verified: true,
      location: "Marathwada, Maharashtra",
      volunteers: 280,
      area: "120 villages"
    },
    {
      id: 3,
      ngo: "River Guardians",
      project: "Yamuna River Cleanup",
      fundingGoal: 10000000,
      fundingRaised: 6500000,
      impactScore: 9.5,
      verified: true,
      location: "Delhi NCR",
      volunteers: 820,
      area: "45 km stretch"
    }
  ];

  const blockchainTransactions = [
    { txId: "0x1a2b...3c4d", donor: "Tech Corp India", amount: 50000, project: "Bellandur Lake", time: "2h ago" },
    { txId: "0x5e6f...7g8h", donor: "Green Foundation", amount: 25000, project: "Rural Water Access", time: "5h ago" },
    { txId: "0x9i0j...1k2l", donor: "Eco Warriors", amount: 15000, project: "Yamuna Cleanup", time: "1d ago" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <ShoppingBag className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold">Sustainability Marketplace</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Purchase eco-friendly products and donate to verified restoration projects
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="glass-card">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-1">₹2.4Cr</div>
              <div className="text-sm text-muted-foreground">Total Funds Raised</div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-secondary mb-1">1,240</div>
              <div className="text-sm text-muted-foreground">Eco Products Sold</div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-accent mb-1">45</div>
              <div className="text-sm text-muted-foreground">Active CSR Partners</div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-1">
                <Shield className="w-6 h-6 text-green-600" />
                <div className="text-3xl font-bold">100%</div>
              </div>
              <div className="text-sm text-muted-foreground">Transparent</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="marketplace" className="space-y-6">
          <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-4">
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
            <TabsTrigger value="donate">Micro-Donate</TabsTrigger>
            <TabsTrigger value="csr">CSR Portal</TabsTrigger>
            <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
          </TabsList>

          {/* Marketplace Tab */}
          <TabsContent value="marketplace" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-primary" />
                  EcoMarketplace
                </CardTitle>
                <CardDescription>
                  Verified eco-friendly products with proceeds funding restoration projects
                </CardDescription>
              </CardHeader>
            </Card>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {ecoProducts.map((product) => (
                <Card key={product.id} className="hover:shadow-water transition-all hover:-translate-y-1">
                  <CardHeader>
                    <div className="w-full h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center text-6xl mb-4">
                      {product.image}
                    </div>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                      {product.verified && (
                        <Badge variant="outline" className="text-green-600 border-green-600 shrink-0">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <CardDescription>{product.category}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-primary">₹{product.price}</div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        ⭐ {product.rating} ({product.sales})
                      </div>
                    </div>
                    <div className="p-2 bg-green-500/10 rounded text-xs text-green-700 dark:text-green-400">
                      <Leaf className="w-3 h-3 inline mr-1" />
                      {product.impact}
                    </div>
                    <Button className="w-full bg-gradient-to-r from-primary to-secondary">
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Micro-Donation Tab */}
          <TabsContent value="donate" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  Micro-Donation Feature
                </CardTitle>
                <CardDescription>
                  Small contributions, big impact. Every rupee counts!
                </CardDescription>
              </CardHeader>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              {donationOptions.map((option, index) => {
                const Icon = option.icon;
                return (
                  <Card key={index} className="hover:shadow-water transition-all">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-3">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-3xl font-bold text-primary">₹{option.amount}</div>
                      </div>
                      <CardTitle>{option.title}</CardTitle>
                      <CardDescription>{option.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <div className="text-sm font-semibold text-primary">Impact:</div>
                        <div className="text-sm">{option.impact}</div>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-primary to-secondary">
                        <Heart className="w-4 h-4 mr-2" />
                        Donate Now
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Custom Amount */}
            <Card>
              <CardHeader>
                <CardTitle>Custom Donation Amount</CardTitle>
                <CardDescription>Choose your own contribution</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input type="number" placeholder="Enter amount" className="flex-1" />
                  <Button className="bg-gradient-to-r from-primary to-secondary px-8">
                    Donate
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  All donations are tracked on blockchain for complete transparency
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* CSR Portal Tab */}
          <TabsContent value="csr" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-secondary" />
                  CSR Partnership Portal
                </CardTitle>
                <CardDescription>
                  Find, fund, and track high-impact NGO projects with verified scoring
                </CardDescription>
              </CardHeader>
            </Card>

            <div className="space-y-6">
              {csrProjects.map((project) => (
                <Card key={project.id} className="hover:shadow-water transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <CardTitle>{project.project}</CardTitle>
                          {project.verified && (
                            <Badge className="bg-green-600">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Gov Verified
                            </Badge>
                          )}
                        </div>
                        <CardDescription className="flex items-center gap-1">
                          <Building2 className="w-3 h-3" />
                          {project.ngo} • {project.location}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Impact Score</div>
                        <div className="text-3xl font-bold text-green-600">{project.impactScore}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Funding Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Funding Progress</span>
                        <span className="font-semibold">
                          ₹{(project.fundingRaised / 100000).toFixed(1)}L / ₹{(project.fundingGoal / 100000).toFixed(1)}L
                        </span>
                      </div>
                      <Progress value={(project.fundingRaised / project.fundingGoal) * 100} />
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <Users className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                        <div className="font-semibold">{project.volunteers}</div>
                        <div className="text-xs text-muted-foreground">Volunteers</div>
                      </div>
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <Droplet className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                        <div className="font-semibold">{project.area}</div>
                        <div className="text-xs text-muted-foreground">Coverage</div>
                      </div>
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <TrendingUp className="w-4 h-4 mx-auto mb-1 text-green-600" />
                        <div className="font-semibold">{project.impactScore}</div>
                        <div className="text-xs text-muted-foreground">Impact</div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button className="flex-1 bg-gradient-to-r from-primary to-secondary">
                        <Heart className="w-4 h-4 mr-2" />
                        Fund Project
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Blockchain Tab */}
          <TabsContent value="blockchain" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  Blockchain Transparency Ledger
                </CardTitle>
                <CardDescription>
                  Every rupee donated is traceable from donor to exact project expenditure
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Live Transactions */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Blockchain Transactions</CardTitle>
                <CardDescription>Live, verifiable donation tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {blockchainTransactions.map((tx, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-green-600" />
                          <span className="font-mono text-sm text-muted-foreground">{tx.txId}</span>
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            Verified
                          </Badge>
                        </div>
                        <div className="text-sm">
                          <span className="font-semibold">{tx.donor}</span> donated to <span className="font-semibold">{tx.project}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">{tx.time}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">₹{tx.amount.toLocaleString()}</div>
                        <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                          View on Chain
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* NFT Certificates */}
            <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-purple-600" />
                  NFT Certificates for Major Donors
                </CardTitle>
                <CardDescription>
                  Unique digital certificates as proof of significant impact
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { level: "Bronze", amount: "₹10K+", badge: "🥉" },
                    { level: "Silver", amount: "₹50K+", badge: "🥈" },
                    { level: "Gold", amount: "₹1L+", badge: "🥇" }
                  ].map((tier, index) => (
                    <div key={index} className="p-6 border-2 border-dashed rounded-lg text-center hover:border-primary transition-colors">
                      <div className="text-5xl mb-2">{tier.badge}</div>
                      <div className="font-bold text-lg">{tier.level}</div>
                      <div className="text-sm text-muted-foreground mb-3">{tier.amount}</div>
                      <Badge variant="outline">Mint NFT Certificate</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default MarketplacePage;