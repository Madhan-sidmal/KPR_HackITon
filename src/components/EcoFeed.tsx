import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ThumbsUp, MessageSquare, Share2, MapPin, Droplet, Leaf } from "lucide-react";

interface FeedPost {
  id: number;
  author: string;
  authorType: "ngo" | "citizen" | "government";
  content: string;
  location?: string;
  timestamp: string;
  likes: number;
  comments: number;
  impact?: string;
}

const EcoFeed = () => {
  const posts: FeedPost[] = [
    {
      id: 1,
      author: "Waterkeeper Alliance",
      authorType: "ngo",
      content: "Successfully restored Bellandur Lake! Water quality improved by 40% in just 3 months. 450 volunteers made this possible. 🌊",
      location: "Bangalore, Karnataka",
      timestamp: "2 hours ago",
      likes: 234,
      comments: 45,
      impact: "+500 EcoPoints"
    },
    {
      id: 2,
      author: "Karnataka Water Board",
      authorType: "government",
      content: "New AI-driven water stress prediction system deployed across 5 districts. Early warnings will help prevent drought conditions.",
      timestamp: "5 hours ago",
      likes: 189,
      comments: 28,
    },
    {
      id: 3,
      author: "Priya Sharma",
      authorType: "citizen",
      content: "Organized cleanup drive at Ulsoor Lake today! 45 citizens joined. Removed 200kg of waste. Small steps, big impact! 💧",
      location: "Bangalore, Karnataka",
      timestamp: "1 day ago",
      likes: 156,
      comments: 32,
      impact: "+150 EcoPoints"
    },
  ];

  const getAuthorColor = (type: string) => {
    switch (type) {
      case "ngo": return "from-green-500 to-emerald-600";
      case "government": return "from-blue-500 to-cyan-600";
      case "citizen": return "from-orange-500 to-yellow-500";
      default: return "from-gray-500 to-gray-600";
    }
  };

  const getAuthorBadge = (type: string) => {
    switch (type) {
      case "ngo": return { label: "NGO", variant: "default" as const };
      case "government": return { label: "Government", variant: "secondary" as const };
      case "citizen": return { label: "Citizen", variant: "outline" as const };
      default: return { label: "User", variant: "outline" as const };
    }
  };

  return (
    <div className="space-y-4">
      {posts.map((post, index) => (
        <Card 
          key={post.id} 
          className="interactive-card animate-slide-up"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <CardContent className="pt-6">
            {/* Header */}
            <div className="flex items-start gap-3 mb-3">
              <Avatar className="w-12 h-12">
                <AvatarFallback className={`bg-gradient-to-br ${getAuthorColor(post.authorType)} text-white font-bold`}>
                  {post.author.charAt(0)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold">{post.author}</span>
                  <Badge variant={getAuthorBadge(post.authorType).variant} className="text-xs">
                    {getAuthorBadge(post.authorType).label}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                  <span>{post.timestamp}</span>
                  {post.location && (
                    <>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {post.location}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {post.impact && (
                <Badge className="bg-gradient-to-r from-primary to-secondary text-white">
                  <Leaf className="w-3 h-3 mr-1" />
                  {post.impact}
                </Badge>
              )}
            </div>

            {/* Content */}
            <p className="text-foreground mb-4 leading-relaxed">{post.content}</p>

            {/* Actions */}
            <div className="flex items-center gap-4 pt-3 border-t">
              <Button variant="ghost" size="sm" className="gap-2 hover:text-primary">
                <ThumbsUp className="w-4 h-4" />
                <span>{post.likes}</span>
              </Button>
              <Button variant="ghost" size="sm" className="gap-2 hover:text-primary">
                <MessageSquare className="w-4 h-4" />
                <span>{post.comments}</span>
              </Button>
              <Button variant="ghost" size="sm" className="gap-2 hover:text-primary ml-auto">
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Load more */}
      <Button variant="outline" className="w-full">
        Load More Posts
      </Button>
    </div>
  );
};

export default EcoFeed;
