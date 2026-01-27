import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
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
  Globe
} from "lucide-react";
import { cn } from "@/lib/utils";

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

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
            Welcome back, {user.name}! 👋
          </h1>
          <p className="text-muted-foreground">
            You're on a {user.streak}-day streak! Keep up the amazing work.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-card border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Trophy className="w-4 h-4 text-primary" />
                  </div>
                </div>
                <div className="text-2xl font-display font-bold text-foreground">Level {user.level}</div>
                <div className="text-sm text-muted-foreground">Current Level</div>
              </div>

              <div className="p-4 rounded-2xl bg-card border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Flame className="w-4 h-4 text-accent" />
                  </div>
                </div>
                <div className="text-2xl font-display font-bold text-foreground">{user.streak} days</div>
                <div className="text-sm text-muted-foreground">Current Streak</div>
              </div>

              <div className="p-4 rounded-2xl bg-card border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                  </div>
                </div>
                <div className="text-2xl font-display font-bold text-foreground">{user.completedLessons}</div>
                <div className="text-sm text-muted-foreground">Lessons Done</div>
              </div>

              <div className="p-4 rounded-2xl bg-card border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-warning/10 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-warning" />
                  </div>
                </div>
                <div className="text-2xl font-display font-bold text-foreground">{user.hoursLearned}h</div>
                <div className="text-sm text-muted-foreground">Hours Learned</div>
              </div>
            </div>

            {/* XP Progress */}
            <div className="p-6 rounded-2xl bg-card border border-border">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                    <Zap className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground">Level Progress</h3>
                    <p className="text-sm text-muted-foreground">
                      {user.xpToNext - user.xp} XP to Level {user.level + 1}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-display font-bold text-primary">{user.xp}</span>
                  <span className="text-muted-foreground"> / {user.xpToNext} XP</span>
                </div>
              </div>
              <div className="h-3 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full gradient-primary rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            {/* Weekly Activity Chart */}
            <div className="p-6 rounded-2xl bg-card border border-border">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display font-semibold text-foreground">Weekly Activity</h3>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-primary"></span>
                    Hours
                  </span>
                </div>
              </div>
              <div className="flex items-end justify-between gap-2 h-32">
                {weeklyProgress.map((day, index) => (
                  <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                    <div 
                      className="w-full rounded-t-lg gradient-primary transition-all hover:opacity-80"
                      style={{ height: `${(day.hours / maxHours) * 100}%`, minHeight: day.hours > 0 ? '8px' : '0' }}
                    />
                    <span className="text-xs text-muted-foreground">{day.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Resources */}
            <div className="p-6 rounded-2xl bg-card border border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-semibold text-foreground">Continue Learning</h3>
                <Button asChild variant="ghost" size="sm">
                  <Link to="/resources">
                    View All
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
              <div className="space-y-3">
                {recommendedResources.map((resource) => (
                  <div 
                    key={resource.title}
                    className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center shrink-0">
                      <resource.icon className="w-5 h-5 text-primary-foreground" />
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
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-success rounded-full"
                            style={{ width: `${resource.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">{resource.progress}%</span>
                      </div>
                    ) : (
                      <Button size="sm" variant="secondary">
                        <Play className="w-3 h-3" />
                        Start
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Sessions */}
            <div className="p-6 rounded-2xl bg-card border border-border">
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
                  <div 
                    key={session.title}
                    className="p-4 rounded-xl bg-secondary/50"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <session.icon className="w-4 h-4 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-medium text-foreground text-sm">{session.title}</h4>
                        <p className="text-xs text-muted-foreground mb-2">{session.tutor}</p>
                        <span className="text-xs font-medium text-primary">{session.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button asChild className="w-full mt-4" variant="outline">
                <Link to="/schedule">Browse More Sessions</Link>
              </Button>
            </div>

            {/* Recent Activity */}
            <div className="p-6 rounded-2xl bg-card border border-border">
              <h3 className="font-display font-semibold text-foreground mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                      activity.type === 'lesson' ? 'bg-success/10' :
                      activity.type === 'quiz' ? 'bg-warning/10' : 'bg-primary/10'
                    )}>
                      <activity.icon className={cn(
                        "w-4 h-4",
                        activity.type === 'lesson' ? 'text-success' :
                        activity.type === 'quiz' ? 'text-warning' : 'text-primary'
                      )} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground">{activity.title}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{activity.time}</span>
                        <span className="text-success">+{activity.xp} XP</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Badges */}
            <div className="p-6 rounded-2xl bg-card border border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-semibold text-foreground">Badges</h3>
                <span className="text-sm text-muted-foreground">{badges.filter(b => b.earned).length}/{badges.length}</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {badges.map((badge) => (
                  <div 
                    key={badge.name}
                    className={cn(
                      "aspect-square rounded-xl flex flex-col items-center justify-center p-2 transition-all",
                      badge.earned 
                        ? "bg-primary/10 hover:bg-primary/20" 
                        : "bg-secondary/50 opacity-50"
                    )}
                  >
                    <span className="text-2xl mb-1">{badge.icon}</span>
                    <span className="text-[10px] text-center text-muted-foreground leading-tight">
                      {badge.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Motivation Card */}
            <div className="p-6 rounded-2xl gradient-accent text-accent-foreground">
              <div className="text-3xl mb-3">💪</div>
              <h3 className="font-display font-semibold mb-2">Keep Going!</h3>
              <p className="text-sm text-accent-foreground/80">
                You're in the top 15% of learners this week. Just 2 more lessons to level up!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
