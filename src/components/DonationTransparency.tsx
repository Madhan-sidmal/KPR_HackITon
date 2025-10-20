import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle, ArrowRight, Download, ExternalLink, Lock, Eye } from "lucide-react";

const DonationTransparency = () => {
  const transactions = [
    {
      id: "TX001234567",
      donor: "Tech Corp India",
      amount: 50000,
      date: "2024-01-15",
      status: "Utilized",
      allocatedTo: "Bellandur Lake - Desilting Equipment",
      verificationHash: "0x7f9e2c1b...3a4d8e",
      blockNumber: 15234567,
    },
    {
      id: "TX001234568",
      donor: "Priya Sharma",
      amount: 5000,
      date: "2024-01-18",
      status: "In Progress",
      allocatedTo: "Community Pond - Water Testing",
      verificationHash: "0x8a3f4d2c...5b6e9f",
      blockNumber: 15234789,
    },
    {
      id: "TX001234569",
      donor: "Anonymous Donor",
      amount: 25000,
      date: "2024-01-20",
      status: "Utilized",
      allocatedTo: "Bellandur Lake - Native Plant Restoration",
      verificationHash: "0x9b4e5f3d...6c7f0a",
      blockNumber: 15235012,
    },
  ];

  const expenditures = [
    { category: "Equipment & Materials", amount: 35000, percentage: 43.8 },
    { category: "Labor & Contractors", amount: 28000, percentage: 35.0 },
    { category: "Water Quality Testing", amount: 12000, percentage: 15.0 },
    { category: "Administrative", amount: 5000, percentage: 6.2 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="text-2xl flex items-center gap-2">
                <Shield className="w-6 h-6 text-primary" />
                Donation Transparency Ledger
              </CardTitle>
              <CardDescription className="text-base">
                Blockchain-verified transaction tracking from donor to final expenditure
              </CardDescription>
            </div>
            <Badge className="bg-green-600">
              <Lock className="w-3 h-3 mr-1" />
              Blockchain Secured
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* How It Works */}
      <Card>
        <CardHeader>
          <CardTitle>How Transparency Works</CardTitle>
          <CardDescription>Every rupee is traceable on an immutable blockchain ledger</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
                  1
                </div>
              </div>
              <div className="flex-1 pt-1">
                <h4 className="font-semibold mb-1">Donation Recorded</h4>
                <p className="text-sm text-muted-foreground">
                  When a donation is made, it's immediately recorded on the blockchain with a unique hash
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-white text-xs font-bold">
                  2
                </div>
              </div>
              <div className="flex-1 pt-1">
                <h4 className="font-semibold mb-1">Fund Allocation</h4>
                <p className="text-sm text-muted-foreground">
                  Each expenditure is logged with vendor details, invoices, and blockchain verification
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center text-white text-xs font-bold">
                  3
                </div>
              </div>
              <div className="flex-1 pt-1">
                <h4 className="font-semibold mb-1">Public Verification</h4>
                <p className="text-sm text-muted-foreground">
                  Donors can verify their contribution's impact anytime using the transaction ID
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transaction Ledger */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Complete donation-to-expenditure trail</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((tx) => (
              <div key={tx.id} className="p-4 border rounded-lg space-y-3 hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{tx.donor}</h4>
                      <Badge variant={tx.status === "Utilized" ? "default" : "secondary"}>
                        {tx.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Transaction ID: {tx.id}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">₹{tx.amount.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">{tx.date}</div>
                  </div>
                </div>

                <div className="p-3 bg-muted/50 rounded-lg space-y-2">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="text-xs text-muted-foreground mb-1">Allocated To</div>
                      <div className="text-sm font-medium">{tx.allocatedTo}</div>
                    </div>
                    <CheckCircle className="w-4 h-4 text-green-600 mt-1 shrink-0" />
                  </div>

                  <div className="pt-2 border-t border-border/50">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Blockchain Verification</span>
                      <div className="flex items-center gap-2">
                        <code className="bg-background px-2 py-1 rounded font-mono">
                          {tx.verificationHash}
                        </code>
                        <Button variant="ghost" size="sm" className="h-6 px-2">
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs mt-1">
                      <span className="text-muted-foreground">Block Number</span>
                      <span className="font-mono text-muted-foreground">{tx.blockNumber}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="w-3 h-3 mr-2" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Download className="w-3 h-3 mr-2" />
                    Receipt
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Expenditure Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Expenditure Breakdown</CardTitle>
          <CardDescription>How donated funds are being utilized</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {expenditures.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{item.category}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-muted-foreground">{item.percentage}%</span>
                    <span className="font-bold text-primary">₹{item.amount.toLocaleString()}</span>
                  </div>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-secondary"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">Total Utilized</span>
              <span className="text-2xl font-bold text-primary">
                ₹{expenditures.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              All expenditures verified and recorded on blockchain
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Donor Portal */}
      <Card className="border-green-500/20 bg-green-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
            For Donors
          </CardTitle>
          <CardDescription>Track your contribution's journey</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Enter your transaction ID to see exactly how your donation is making an impact
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter Transaction ID (e.g., TX001234567)"
              className="flex-1 h-10 px-3 rounded-md border border-input bg-background"
            />
            <Button className="bg-gradient-to-r from-primary to-secondary">
              <Eye className="w-4 h-4 mr-2" />
              Track
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DonationTransparency;