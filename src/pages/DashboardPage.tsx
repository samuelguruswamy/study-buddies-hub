import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { 
  Trophy, 
  Flame, 
  Target, 
  Clock, 
  BookOpen, 
  Calendar,
  ChevronRight,
  Play,
  CheckCircle2,
  Star,
  Zap,
  TrendingUp,
  Award,
  Code,
  Database,
  Globe,
  Sparkles
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

const user = {
  name: "Jordan",
  level: 12,
  xp: 2450,
  xpToNext: 3000,
  streak: 7,
  badges: 15,
  completedLessons: 42,
  hoursLearned: 28,
};

const recentActivities = [
  {
    type: "lesson",
    title: "Completed: JavaScript Arrays",
    time: "2 hours ago",
    xp: 50,
    icon: BookOpen,
  },
  {
    type: "quiz",
    title: "Passed: CSS Flexbox Quiz",
    time: "Yesterday",
    xp: 75,
    score: "8/10",
    icon: Target,
  },
  {
    type: "session",
    title: "Joined: Python Study Group",
    time: "2 days ago",
    xp: 30,
    icon: Calendar,
  },
];

const upcomingSessions = [
  {
    title: "React Hooks Workshop",
    tutor: "Sarah M.",
    time: "Today, 4:00 PM",
    icon: Code,
  },
  {
    title: "Database Design",
    tutor: "Marcus L.",
    time: "Tomorrow, 3:00 PM",
    icon: Database,
  },
];

const recommendedResources = [
  {
    title: "Introduction to APIs",
    type: "Tutorial",
    duration: "25 min",
    difficulty: "Intermediate",
    icon: Globe,
    progress: 0,
  },
  {
    title: "Git Version Control",
    type: "Video",
    duration: "18 min",
    difficulty: "Beginner",
    icon: Code,
    progress: 60,
  },
  {
    title: "CSS Grid Layout",
    type: "Practice",
    duration: "30 min",
    difficulty: "Intermediate",
    icon: Globe,
    progress: 0,
  },
];

const badges = [
  { name: "First Lesson", icon: "🎯", earned: true },
  { name: "Week Streak", icon: "🔥", earned: true },
  { name: "Quiz Master", icon: "🏆", earned: true },
  { name: "Helper", icon: "🤝", earned: true },
  { name: "Night Owl", icon: "🦉", earned: false },
  { name: "Speed Learner", icon: "⚡", earned: false },
];

const weeklyProgress = [
  { day: "Mon", hours: 1.5, lessons: 2 },
  { day: "Tue", hours: 2, lessons: 3 },
  { day: "Wed", hours: 1, lessons: 1 },
  { day: "Thu", hours: 2.5, lessons: 4 },
  { day: "Fri", hours: 0.5, lessons: 1 },
  { day: "Sat", hours: 3, lessons: 5 },
  { day: "Sun", hours: 1.5, lessons: 2 },
];

const maxHours = Math.max(...weeklyProgress.map(d => d.hours));

export function DashboardPage() {
  const progressPercentage = (user.xp / user.xpToNext) * 100;
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleStartResource = (title: string) => {
    toast({
      title: "Loading Resource... 📚",
      description: `Starting "${title}". Let's learn!`,
    });
  };

  const handleJoinSession = (session: typeof upcomingSessions[0]) => {
    toast({
      title: "Joining Session! 🎉",
      description: `Connecting to "${session.title}" with ${session.tutor}.`,
    });
    navigate("/schedule");
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Welcome Header */}
        <motion.div 
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            <Flame className="w-4 h-4" />
            {user.streak}-day streak!
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-3">
            Welcome back, {user.name}! 👋
          </h1>
          <p className="text-lg text-muted-foreground">
            Keep up the amazing work. You're making great progress!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Cards */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {[
                { icon: Trophy, value: `Level ${user.level}`, label: "Current Level", color: "from-primary to-primary/70" },
                { icon: Flame, value: `${user.streak} days`, label: "Current Streak", color: "from-accent to-accent/70" },
                { icon: CheckCircle2, value: user.completedLessons, label: "Lessons Done", color: "from-success to-success/70" },
                { icon: Clock, value: `${user.hoursLearned}h`, label: "Hours Learned", color: "from-warning to-warning/70" },
              ].map((stat, index) => (
                <motion.div 
                  key={stat.label}
                  variants={fadeInUp}
                  className="p-5 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                    <stat.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div className="text-2xl font-display font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* XP Progress */}
            <motion.div 
              className="p-6 rounded-3xl bg-card border border-border shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center shadow-glow">
                    <Zap className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground text-lg">Level Progress</h3>
                    <p className="text-sm text-muted-foreground">
                      {user.xpToNext - user.xp} XP to Level {user.level + 1}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-display font-bold text-primary">{user.xp}</span>
                  <span className="text-muted-foreground"> / {user.xpToNext} XP</span>
                </div>
              </div>
              <div className="h-4 bg-secondary rounded-full overflow-hidden">
                <motion.div 
                  className="h-full gradient-primary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                />
              </div>
            </motion.div>

            {/* Weekly Activity Chart */}
            <motion.div 
              className="p-6 rounded-3xl bg-card border border-border shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display font-semibold text-foreground text-lg">Weekly Activity</h3>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full gradient-primary"></span>
                    Hours
                  </span>
                </div>
              </div>
              <div className="flex items-end justify-between gap-3 h-36">
                {weeklyProgress.map((day, index) => (
                  <motion.div 
                    key={day.day} 
                    className="flex-1 flex flex-col items-center gap-2"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    style={{ transformOrigin: "bottom" }}
                  >
                    <div 
                      className="w-full rounded-xl gradient-primary transition-all hover:opacity-80 cursor-pointer"
                      style={{ height: `${(day.hours / maxHours) * 100}%`, minHeight: day.hours > 0 ? '12px' : '0' }}
                    />
                    <span className="text-xs text-muted-foreground font-medium">{day.day}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Recommended Resources */}
            <motion.div 
              className="p-6 rounded-3xl bg-card border border-border shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display font-semibold text-foreground text-lg">Continue Learning</h3>
                <Button asChild variant="ghost" size="sm">
                  <Link to="/resources">
                    View All
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
              <div className="space-y-3">
                {recommendedResources.map((resource, index) => (
                  <motion.div 
                    key={resource.title}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer group"
                    whileHover={{ x: 4 }}
                  >
                    <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shrink-0 group-hover:shadow-glow transition-shadow">
                      <resource.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground truncate">{resource.title}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{resource.type}</span>
                        <span>•</span>
                        <span>{resource.duration}</span>
                      </div>
                    </div>
                    {resource.progress > 0 ? (
                      <div className="flex items-center gap-3">
                        <div className="w-20 h-2 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-success rounded-full"
                            style={{ width: `${resource.progress}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-success">{resource.progress}%</span>
                      </div>
                    ) : (
                      <Button 
                        size="sm" 
                        variant="secondary"
                        onClick={() => handleStartResource(resource.title)}
                        aria-label={`Start ${resource.title}`}
                      >
                        <Play className="w-3 h-3" />
                        Start
                      </Button>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* Upcoming Sessions */}
            <div className="p-6 rounded-3xl bg-card border border-border shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-semibold text-foreground">Upcoming Sessions</h3>
                <Button asChild variant="ghost" size="sm">
                  <Link to="/schedule">
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
              <div className="space-y-3">
                {upcomingSessions.map((session) => (
                  <button 
                    key={session.title}
                    className="w-full p-4 rounded-2xl bg-secondary/50 hover:bg-secondary transition-colors text-left"
                    onClick={() => handleJoinSession(session)}
                    aria-label={`Join ${session.title} session`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <session.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-medium text-foreground text-sm">{session.title}</h4>
                        <p className="text-xs text-muted-foreground mb-2">{session.tutor}</p>
                        <span className="text-xs font-medium text-primary">{session.time}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <Button asChild className="w-full mt-4" variant="outline">
                <Link to="/schedule">Browse More Sessions</Link>
              </Button>
            </div>

            {/* Recent Activity */}
            <div className="p-6 rounded-3xl bg-card border border-border shadow-sm">
              <h3 className="font-display font-semibold text-foreground mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                      activity.type === 'lesson' ? 'bg-success/10' :
                      activity.type === 'quiz' ? 'bg-warning/10' : 'bg-primary/10'
                    )}>
                      <activity.icon className={cn(
                        "w-5 h-5",
                        activity.type === 'lesson' ? 'text-success' :
                        activity.type === 'quiz' ? 'text-warning' : 'text-primary'
                      )} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground font-medium">{activity.title}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{activity.time}</span>
                        <span className="text-success font-medium">+{activity.xp} XP</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Badges */}
            <div className="p-6 rounded-3xl bg-card border border-border shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-semibold text-foreground">Badges</h3>
                <span className="text-sm text-muted-foreground font-medium">{badges.filter(b => b.earned).length}/{badges.length}</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {badges.map((badge) => (
                  <motion.div 
                    key={badge.name}
                    whileHover={{ scale: badge.earned ? 1.1 : 1 }}
                    className={cn(
                      "aspect-square rounded-2xl flex flex-col items-center justify-center p-2 transition-all cursor-pointer",
                      badge.earned 
                        ? "bg-primary/10 hover:bg-primary/20 hover:shadow-md" 
                        : "bg-secondary/50 opacity-50"
                    )}
                  >
                    <span className="text-2xl mb-1">{badge.icon}</span>
                    <span className="text-[10px] text-center text-muted-foreground leading-tight font-medium">
                      {badge.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Motivation Card */}
            <div className="p-6 rounded-3xl gradient-accent text-accent-foreground shadow-accent-glow">
              <div className="text-4xl mb-3">💪</div>
              <h3 className="font-display font-semibold text-lg mb-2">Keep Going!</h3>
              <p className="text-sm text-accent-foreground/80">
                You're in the top 15% of learners this week. Just 2 more lessons to level up!
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
