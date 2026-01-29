import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  MessageSquare, 
  Heart, 
  ThumbsUp,
  Trophy,
  Star,
  Flame,
  Crown,
  Medal,
  ChevronRight,
  Send,
  Sparkles,
  TrendingUp,
  Award
} from "lucide-react";
import { cn } from "@/lib/utils";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const tabs = [
  { id: "discussions", label: "Discussions", icon: MessageSquare },
  { id: "groups", label: "Study Groups", icon: Users },
  { id: "leaderboard", label: "Leaderboard", icon: Trophy },
];

const discussions = [
  {
    id: 1,
    title: "Best resources for learning React?",
    author: "Maya K.",
    avatar: "M",
    content: "I'm just starting with React and feeling overwhelmed. What resources helped you the most?",
    likes: 24,
    replies: 18,
    time: "2 hours ago",
    tags: ["react", "beginners", "resources"],
  },
  {
    id: 2,
    title: "Tips for debugging JavaScript",
    author: "Jordan T.",
    avatar: "J",
    content: "Share your favorite debugging techniques! Console.log is great but there must be better ways...",
    likes: 45,
    replies: 32,
    time: "5 hours ago",
    tags: ["javascript", "debugging", "tips"],
  },
  {
    id: 3,
    title: "Study buddy for Python algorithms?",
    author: "Alex R.",
    avatar: "A",
    content: "Looking for someone to practice LeetCode problems together. Intermediate level preferred!",
    likes: 12,
    replies: 8,
    time: "1 day ago",
    tags: ["python", "algorithms", "study-buddy"],
  },
  {
    id: 4,
    title: "How do you stay motivated?",
    author: "Sarah M.",
    avatar: "S",
    content: "Some days I just don't feel like coding. What keeps you going when motivation is low?",
    likes: 89,
    replies: 54,
    time: "2 days ago",
    tags: ["motivation", "productivity", "community"],
  },
];

const studyGroups = [
  {
    id: 1,
    name: "Python Beginners",
    description: "Friendly group for Python newcomers. We meet twice a week!",
    members: 45,
    level: "Beginner",
    nextSession: "Tomorrow, 4 PM",
    topics: ["Python", "Basics", "Practice"],
  },
  {
    id: 2,
    name: "Web Dev Warriors",
    description: "Building projects together using HTML, CSS, JS, and React.",
    members: 32,
    level: "Intermediate",
    nextSession: "Wed, 5 PM",
    topics: ["Web Dev", "React", "Projects"],
  },
  {
    id: 3,
    name: "Algorithm Grinders",
    description: "Daily LeetCode practice and problem solving discussions.",
    members: 28,
    level: "Advanced",
    nextSession: "Daily, 6 PM",
    topics: ["Algorithms", "LeetCode", "DSA"],
  },
  {
    id: 4,
    name: "Database Explorers",
    description: "Learning SQL, NoSQL, and database design together.",
    members: 19,
    level: "Intermediate",
    nextSession: "Thu, 3 PM",
    topics: ["SQL", "MongoDB", "Design"],
  },
];

const leaderboard = [
  { rank: 1, name: "Sarah M.", xp: 12500, streak: 45, badges: 28, avatar: "S" },
  { rank: 2, name: "Marcus L.", xp: 11200, streak: 38, badges: 25, avatar: "M" },
  { rank: 3, name: "Emily C.", xp: 10800, streak: 32, badges: 24, avatar: "E" },
  { rank: 4, name: "Jordan T.", xp: 9500, streak: 28, badges: 21, avatar: "J" },
  { rank: 5, name: "Alex R.", xp: 8900, streak: 21, badges: 19, avatar: "A" },
  { rank: 6, name: "Maya K.", xp: 8200, streak: 18, badges: 17, avatar: "M" },
  { rank: 7, name: "Chris P.", xp: 7800, streak: 15, badges: 16, avatar: "C" },
  { rank: 8, name: "Nina S.", xp: 7200, streak: 14, badges: 15, avatar: "N" },
];

const achievements = [
  { name: "Week Warrior", description: "7-day learning streak", icon: "🔥", unlocked: true },
  { name: "Helpful Hand", description: "Answer 10 questions", icon: "🤝", unlocked: true },
  { name: "Quiz Master", description: "100% on 5 quizzes", icon: "🏆", unlocked: false },
  { name: "Early Bird", description: "Study before 8 AM", icon: "🌅", unlocked: false },
];

export function CommunityPage() {
  const [activeTab, setActiveTab] = useState("discussions");
  const [postContent, setPostContent] = useState("");
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const { toast } = useToast();

  const handlePost = () => {
    if (postContent.trim()) {
      toast({
        title: "Posted! 📝",
        description: "Your question has been shared with the community.",
      });
      setPostContent("");
    } else {
      toast({
        title: "Empty Post",
        description: "Please write something before posting.",
        variant: "destructive",
      });
    }
  };

  const handleLike = (postId: number) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter(id => id !== postId));
    } else {
      setLikedPosts([...likedPosts, postId]);
      toast({
        title: "Liked! ❤️",
        description: "You liked this post.",
      });
    }
  };

  const handleJoinGroup = (groupName: string) => {
    toast({
      title: "Group Joined! 🎉",
      description: `Welcome to "${groupName}"! Check the schedule for the next session.`,
    });
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-warning/10 text-warning text-sm font-medium mb-4">
            <Users className="w-4 h-4" />
            Connect & Learn
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-3">
            Community Hub
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Connect with fellow students, join study groups, and climb the leaderboard!
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div 
          className="flex items-center gap-2 mb-8 overflow-x-auto pb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "relative flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all",
                activeTab === tab.id
                  ? "text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              )}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="tab-active"
                  className="absolute inset-0 gradient-primary rounded-xl shadow-glow"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative flex items-center gap-2">
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </span>
            </motion.button>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {/* Discussions Tab */}
              {activeTab === "discussions" && (
                <motion.div 
                  key="discussions"
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  {/* New Post Input */}
                  <div className="p-6 rounded-3xl bg-card border border-border shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold shrink-0">
                        Y
                      </div>
                    <div className="flex-1">
                        <textarea
                          placeholder="Ask a question or share something with the community..."
                          className="w-full p-4 rounded-2xl bg-secondary border-0 resize-none focus:ring-2 focus:ring-primary/20 outline-none min-h-[100px] text-foreground"
                          value={postContent}
                          onChange={(e) => setPostContent(e.target.value)}
                          aria-label="Write your post"
                        />
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>Be kind and supportive 💪</span>
                          </div>
                          <Button className="shadow-md" onClick={handlePost}>
                            <Send className="w-4 h-4" />
                            Post
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Discussion List */}
                  <motion.div variants={staggerContainer} initial="hidden" animate="visible">
                    {discussions.map((discussion) => (
                      <motion.div 
                        key={discussion.id}
                        variants={fadeInUp}
                        className="p-6 rounded-3xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer mb-4"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold shrink-0">
                            {discussion.avatar}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-foreground">{discussion.author}</span>
                              <span className="text-sm text-muted-foreground">• {discussion.time}</span>
                            </div>
                            <h3 className="text-lg font-semibold text-foreground mb-2">{discussion.title}</h3>
                            <p className="text-muted-foreground mb-4">{discussion.content}</p>
                            
                            <div className="flex flex-wrap gap-2 mb-4">
                              {discussion.tags.map((tag) => (
                                <span 
                                  key={tag}
                                  className="px-3 py-1 rounded-lg bg-secondary text-xs text-muted-foreground font-medium"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>

                            <div className="flex items-center gap-4">
                              <motion.button 
                                className={cn(
                                  "flex items-center gap-1.5 text-sm transition-colors",
                                  likedPosts.includes(discussion.id) 
                                    ? "text-accent" 
                                    : "text-muted-foreground hover:text-accent"
                                )}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleLike(discussion.id)}
                                aria-label={likedPosts.includes(discussion.id) ? "Unlike this post" : "Like this post"}
                              >
                                <Heart className={cn("w-4 h-4", likedPosts.includes(discussion.id) && "fill-current")} />
                                {discussion.likes + (likedPosts.includes(discussion.id) ? 1 : 0)}
                              </motion.button>
                              <motion.button 
                                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label={`View ${discussion.replies} replies`}
                              >
                                <MessageSquare className="w-4 h-4" />
                                {discussion.replies} replies
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              )}

              {/* Study Groups Tab */}
              {activeTab === "groups" && (
                <motion.div 
                  key="groups"
                  className="grid md:grid-cols-2 gap-4"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0 }}
                >
                  {studyGroups.map((group) => (
                    <motion.div 
                      key={group.id}
                      variants={fadeInUp}
                      className="p-6 rounded-3xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <span className={cn(
                          "px-3 py-1.5 rounded-full text-xs font-semibold",
                          group.level === 'Beginner' ? 'bg-success/10 text-success' :
                          group.level === 'Intermediate' ? 'bg-warning/10 text-warning' :
                          'bg-accent/10 text-accent'
                        )}>
                          {group.level}
                        </span>
                        <span className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Users className="w-4 h-4" />
                          {group.members}
                        </span>
                      </div>

                      <h3 className="text-xl font-semibold text-foreground mb-2">{group.name}</h3>
                      <p className="text-muted-foreground mb-4">{group.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {group.topics.map((topic) => (
                          <span 
                            key={topic}
                            className="px-2.5 py-1 rounded-lg bg-primary/10 text-xs text-primary font-medium"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div className="text-sm">
                          <span className="text-muted-foreground">Next: </span>
                          <span className="text-primary font-medium">{group.nextSession}</span>
                        </div>
                        <Button 
                          size="sm"
                          onClick={() => handleJoinGroup(group.name)}
                          aria-label={`Join ${group.name} group`}
                        >
                          Join Group
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* Leaderboard Tab */}
              {activeTab === "leaderboard" && (
                <motion.div 
                  key="leaderboard"
                  className="space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Top 3 */}
                  <div className="grid grid-cols-3 gap-4">
                    {leaderboard.slice(0, 3).map((user, index) => (
                      <motion.div 
                        key={user.rank}
                        className={cn(
                          "p-6 rounded-3xl text-center",
                          index === 0 ? "gradient-accent text-accent-foreground shadow-accent-glow" :
                          index === 1 ? "bg-secondary" : "bg-card border border-border"
                        )}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="relative inline-block mb-4">
                          <motion.div 
                            className={cn(
                              "w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold",
                              index === 0 ? "bg-accent-foreground/20 text-accent-foreground" : "gradient-primary text-primary-foreground"
                            )}
                            whileHover={{ scale: 1.1 }}
                          >
                            {user.avatar}
                          </motion.div>
                          <div className={cn(
                            "absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-lg",
                            index === 0 ? "bg-accent-foreground text-accent" :
                            index === 1 ? "bg-muted-foreground text-background" :
                            "bg-warning text-warning-foreground"
                          )}>
                            {index === 0 ? <Crown className="w-4 h-4" /> :
                             index === 1 ? <Medal className="w-4 h-4" /> :
                             <Award className="w-4 h-4" />}
                          </div>
                        </div>
                        <h3 className={cn(
                          "font-semibold mb-1",
                          index === 0 ? "" : "text-foreground"
                        )}>
                          {user.name}
                        </h3>
                        <p className={cn(
                          "text-3xl font-display font-bold mb-2",
                          index === 0 ? "" : "text-primary"
                        )}>
                          {user.xp.toLocaleString()} XP
                        </p>
                        <div className="flex items-center justify-center gap-3 text-sm">
                          <span className="flex items-center gap-1">
                            <Flame className="w-4 h-4" />
                            {user.streak}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="w-4 h-4" />
                            {user.badges}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Rest of leaderboard */}
                  <motion.div 
                    className="p-6 rounded-3xl bg-card border border-border shadow-sm"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                  >
                    {leaderboard.slice(3).map((user) => (
                      <motion.div 
                        key={user.rank}
                        variants={fadeInUp}
                        className="flex items-center gap-4 py-4 border-b border-border last:border-0 hover:bg-secondary/50 -mx-2 px-2 rounded-xl transition-colors"
                      >
                        <span className="w-10 text-center font-display font-bold text-muted-foreground text-lg">
                          #{user.rank}
                        </span>
                        <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold">
                          {user.avatar}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">{user.name}</h4>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Flame className="w-3 h-3" />
                              {user.streak} day streak
                            </span>
                            <span className="flex items-center gap-1">
                              <Star className="w-3 h-3" />
                              {user.badges} badges
                            </span>
                          </div>
                        </div>
                        <span className="font-display font-bold text-primary text-lg">
                          {user.xp.toLocaleString()} XP
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* Your Rank */}
            <div className="p-6 rounded-3xl gradient-primary text-primary-foreground shadow-glow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-primary-foreground/20 flex items-center justify-center text-2xl font-bold">
                  Y
                </div>
                <div>
                  <h3 className="font-display font-semibold">Your Rank</h3>
                  <p className="text-primary-foreground/80 text-sm">Keep it up! 🎉</p>
                </div>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-5xl font-display font-bold">#24</span>
                <div className="flex items-center gap-1 text-success bg-success/20 px-2 py-1 rounded-full">
                  <TrendingUp className="w-4 h-4" />
                  <span className="font-medium text-sm">+3</span>
                </div>
              </div>
              <p className="text-sm text-primary-foreground/80">
                You're 450 XP away from rank #23!
              </p>
            </div>

            {/* Achievements */}
            <div className="p-6 rounded-3xl bg-card border border-border shadow-sm">
              <h3 className="font-display font-semibold text-foreground mb-4">Recent Achievements</h3>
              <div className="space-y-3">
                {achievements.map((achievement) => (
                  <motion.div 
                    key={achievement.name}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-2xl",
                      achievement.unlocked ? "bg-success/5" : "bg-secondary opacity-60"
                    )}
                    whileHover={{ x: achievement.unlocked ? 4 : 0 }}
                  >
                    <span className="text-3xl">{achievement.icon}</span>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground text-sm">{achievement.name}</h4>
                      <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    </div>
                    {achievement.unlocked && (
                      <Sparkles className="w-4 h-4 text-success" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Active Now */}
            <div className="p-6 rounded-3xl bg-card border border-border shadow-sm">
              <h3 className="font-display font-semibold text-foreground mb-4">Active Now</h3>
              <div className="flex -space-x-3 mb-3">
                {["S", "M", "E", "J", "A"].map((initial, i) => (
                  <motion.div 
                    key={i}
                    className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-semibold border-2 border-card"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    {initial}
                  </motion.div>
                ))}
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground text-sm font-medium border-2 border-card">
                  +42
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                47 students learning right now
              </p>
            </div>

            {/* Encouragement */}
            <div className="p-6 rounded-3xl bg-secondary/50 border border-border">
              <div className="text-4xl mb-3">🌟</div>
              <h3 className="font-display font-semibold text-foreground mb-2">You're Doing Great!</h3>
              <p className="text-sm text-muted-foreground">
                Every question you ask helps another student learn. Keep sharing your journey!
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}