import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  Video, 
  ChevronLeft, 
  ChevronRight,
  Code,
  Laptop,
  Database,
  Globe,
  Zap,
  Filter,
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

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const currentMonth = "January 2024";

const sessionTypes = [
  { id: "all", label: "All Sessions", icon: CalendarIcon },
  { id: "tutoring", label: "Peer Tutoring", icon: Users },
  { id: "study", label: "Study Groups", icon: Code },
  { id: "workshop", label: "Workshops", icon: Laptop },
];

const sessions = [
  {
    id: 1,
    title: "Python Fundamentals",
    type: "tutoring",
    tutor: "Sarah M.",
    date: "2024-01-15",
    time: "4:00 PM - 5:00 PM",
    level: "Beginner",
    spots: 8,
    totalSpots: 12,
    description: "Master Python basics including variables, loops, and functions.",
    icon: Code,
  },
  {
    id: 2,
    title: "Web Development Study Session",
    type: "study",
    tutor: "Marcus L.",
    date: "2024-01-15",
    time: "5:30 PM - 7:00 PM",
    level: "Intermediate",
    spots: 5,
    totalSpots: 8,
    description: "Collaborative practice building responsive websites with HTML, CSS, and JavaScript.",
    icon: Globe,
  },
  {
    id: 3,
    title: "Database Design Workshop",
    type: "workshop",
    tutor: "Emily C.",
    date: "2024-01-16",
    time: "3:00 PM - 5:00 PM",
    level: "Intermediate",
    spots: 15,
    totalSpots: 20,
    description: "Learn SQL and database fundamentals in this hands-on workshop.",
    icon: Database,
  },
  {
    id: 4,
    title: "React Basics",
    type: "tutoring",
    tutor: "Jordan T.",
    date: "2024-01-16",
    time: "6:00 PM - 7:00 PM",
    level: "Beginner",
    spots: 6,
    totalSpots: 10,
    description: "Introduction to React components, props, and state management.",
    icon: Laptop,
  },
  {
    id: 5,
    title: "Algorithm Problem Solving",
    type: "study",
    tutor: "Alex R.",
    date: "2024-01-17",
    time: "4:00 PM - 6:00 PM",
    level: "Advanced",
    spots: 12,
    totalSpots: 15,
    description: "Practice coding challenges and algorithm optimization together.",
    icon: Zap,
  },
  {
    id: 6,
    title: "Git & GitHub Essentials",
    type: "workshop",
    tutor: "Maya K.",
    date: "2024-01-18",
    time: "3:30 PM - 5:00 PM",
    level: "Beginner",
    spots: 20,
    totalSpots: 25,
    description: "Learn version control fundamentals for collaborative development.",
    icon: Code,
  },
];

const calendarDays = [
  { day: 14, hasSession: false },
  { day: 15, hasSession: true, count: 2 },
  { day: 16, hasSession: true, count: 2 },
  { day: 17, hasSession: true, count: 1 },
  { day: 18, hasSession: true, count: 1 },
  { day: 19, hasSession: false },
  { day: 20, hasSession: false },
];

export function SchedulePage() {
  const [selectedType, setSelectedType] = useState("all");
  const [selectedDate, setSelectedDate] = useState<number | null>(15);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleJoinSession = (session: typeof sessions[0]) => {
    toast({
      title: "Session Joined! 🎉",
      description: `You've registered for "${session.title}" with ${session.tutor}. See you at ${session.time}!`,
    });
    navigate("/dashboard");
  };

  const filteredSessions = sessions.filter(session => {
    const matchesType = selectedType === "all" || session.type === selectedType;
    const matchesDate = selectedDate === null || session.date === `2024-01-${selectedDate}`;
    return matchesType && matchesDate;
  });

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
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Live Learning
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-3">
            Study Sessions
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Join live tutoring sessions, study groups, and workshops with fellow students.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <motion.div 
            className="lg:col-span-1 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Calendar */}
            <div className="p-6 rounded-3xl bg-card border border-border shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-semibold text-foreground">{currentMonth}</h3>
                <div className="flex items-center gap-1">
                  <button className="p-2 rounded-lg hover:bg-secondary transition-colors">
                    <ChevronLeft className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-secondary transition-colors">
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-2">
                {days.map((day) => (
                  <div key={day} className="text-center text-xs text-muted-foreground py-2 font-medium">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map(({ day, hasSession, count }) => (
                  <motion.button
                    key={day}
                    onClick={() => setSelectedDate(selectedDate === day ? null : day)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "relative aspect-square rounded-xl flex flex-col items-center justify-center text-sm font-medium transition-all",
                      selectedDate === day 
                        ? "bg-primary text-primary-foreground shadow-glow" 
                        : hasSession 
                          ? "bg-primary/10 text-primary hover:bg-primary/20"
                          : "hover:bg-secondary text-foreground"
                    )}
                  >
                    {day}
                    {hasSession && count && (
                      <span className={cn(
                        "absolute bottom-1.5 w-1.5 h-1.5 rounded-full",
                        selectedDate === day ? "bg-primary-foreground" : "bg-primary"
                      )} />
                    )}
                  </motion.button>
                ))}
              </div>

              {selectedDate && (
                <button 
                  onClick={() => setSelectedDate(null)}
                  className="w-full mt-4 text-sm text-primary hover:underline font-medium"
                >
                  Show all dates
                </button>
              )}
            </div>

            {/* Filter by Type */}
            <div className="p-6 rounded-3xl bg-card border border-border shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <h3 className="font-display font-semibold text-foreground">Session Type</h3>
              </div>
              <div className="space-y-2">
                {sessionTypes.map((type) => (
                  <motion.button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                      selectedType === type.id
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    )}
                  >
                    <type.icon className="w-4 h-4" />
                    {type.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="p-6 rounded-3xl gradient-primary text-primary-foreground shadow-glow">
              <h3 className="font-display font-semibold mb-4">This Week</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-primary-foreground/80">Total Sessions</span>
                  <span className="text-2xl font-display font-bold">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-primary-foreground/80">Available Spots</span>
                  <span className="text-2xl font-display font-bold">156</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-primary-foreground/80">Peer Tutors</span>
                  <span className="text-2xl font-display font-bold">18</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sessions List */}
          <div className="lg:col-span-2">
            <motion.div 
              className="flex items-center justify-between mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="font-display font-semibold text-xl text-foreground">
                {selectedDate ? `January ${selectedDate}` : "All Upcoming"} Sessions
              </h2>
              <span className="text-sm text-muted-foreground px-3 py-1 rounded-full bg-secondary">
                {filteredSessions.length} session{filteredSessions.length !== 1 ? 's' : ''}
              </span>
            </motion.div>

            <motion.div 
              className="space-y-4"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {filteredSessions.map((session) => (
                <motion.div 
                  key={session.id}
                  variants={fadeInUp}
                  className="p-6 rounded-3xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center shrink-0 shadow-glow">
                      <session.icon className="w-7 h-7 text-primary-foreground" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-xs font-semibold",
                          session.level === 'Beginner' ? 'bg-success/10 text-success' :
                          session.level === 'Intermediate' ? 'bg-warning/10 text-warning' :
                          'bg-accent/10 text-accent'
                        )}>
                          {session.level}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground capitalize">
                          {session.type}
                        </span>
                      </div>

                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {session.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {session.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Users className="w-4 h-4" />
                          {session.tutor}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          {session.time}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Video className="w-4 h-4" />
                          {session.spots}/{session.totalSpots} spots
                        </span>
                      </div>
                    </div>

                    {/* Action */}
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <Button 
                        variant="default" 
                        className="shadow-md"
                        onClick={() => handleJoinSession(session)}
                        aria-label={`Join ${session.title} session`}
                      >
                        Join Session
                      </Button>
                      <span className="text-xs text-muted-foreground">
                        {session.spots} spots left
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}

              {filteredSessions.length === 0 && (
                <motion.div 
                  className="text-center py-16"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-4">
                    <CalendarIcon className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">No sessions found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your filters or selecting a different date.
                  </p>
                  <Button variant="outline" onClick={() => { setSelectedType("all"); setSelectedDate(null); }}>
                    Clear Filters
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
