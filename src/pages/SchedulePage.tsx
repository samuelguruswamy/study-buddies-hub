import { useState } from "react";
import { Button } from "@/components/ui/button";
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
  Filter
} from "lucide-react";
import { cn } from "@/lib/utils";

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

  const filteredSessions = sessions.filter(session => {
    const matchesType = selectedType === "all" || session.type === selectedType;
    const matchesDate = selectedDate === null || session.date === `2024-01-${selectedDate}`;
    return matchesType && matchesDate;
  });

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
            Study Sessions
          </h1>
          <p className="text-muted-foreground">
            Join live tutoring sessions, study groups, and workshops with fellow students.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Calendar */}
            <div className="p-6 rounded-2xl bg-card border border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-semibold text-foreground">{currentMonth}</h3>
                <div className="flex items-center gap-1">
                  <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors">
                    <ChevronLeft className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors">
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-2">
                {days.map((day) => (
                  <div key={day} className="text-center text-xs text-muted-foreground py-2">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map(({ day, hasSession, count }) => (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(selectedDate === day ? null : day)}
                    className={cn(
                      "relative aspect-square rounded-lg flex flex-col items-center justify-center text-sm transition-all",
                      selectedDate === day 
                        ? "bg-primary text-primary-foreground" 
                        : hasSession 
                          ? "bg-primary/10 text-primary hover:bg-primary/20"
                          : "hover:bg-secondary text-foreground"
                    )}
                  >
                    {day}
                    {hasSession && count && (
                      <span className={cn(
                        "absolute bottom-1 w-1.5 h-1.5 rounded-full",
                        selectedDate === day ? "bg-primary-foreground" : "bg-primary"
                      )} />
                    )}
                  </button>
                ))}
              </div>

              {selectedDate && (
                <button 
                  onClick={() => setSelectedDate(null)}
                  className="w-full mt-4 text-sm text-primary hover:underline"
                >
                  Show all dates
                </button>
              )}
            </div>

            {/* Filter by Type */}
            <div className="p-6 rounded-2xl bg-card border border-border">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <h3 className="font-display font-semibold text-foreground">Session Type</h3>
              </div>
              <div className="space-y-2">
                {sessionTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                      selectedType === type.id
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    )}
                  >
                    <type.icon className="w-4 h-4" />
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="p-6 rounded-2xl gradient-primary text-primary-foreground">
              <h3 className="font-display font-semibold mb-4">This Week</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-primary-foreground/80">Total Sessions</span>
                  <span className="font-semibold">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-primary-foreground/80">Available Spots</span>
                  <span className="font-semibold">156</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-primary-foreground/80">Peer Tutors</span>
                  <span className="font-semibold">18</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sessions List */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-semibold text-foreground">
                {selectedDate ? `January ${selectedDate}` : "All Upcoming"} Sessions
              </h2>
              <span className="text-sm text-muted-foreground">
                {filteredSessions.length} session{filteredSessions.length !== 1 ? 's' : ''} found
              </span>
            </div>

            <div className="space-y-4">
              {filteredSessions.map((session) => (
                <div 
                  key={session.id}
                  className="p-6 rounded-2xl bg-card border border-border card-hover"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shrink-0">
                      <session.icon className="w-6 h-6 text-primary-foreground" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className={cn(
                          "px-2.5 py-0.5 rounded-full text-xs font-medium",
                          session.level === 'Beginner' ? 'bg-success/10 text-success' :
                          session.level === 'Intermediate' ? 'bg-warning/10 text-warning' :
                          'bg-accent/10 text-accent'
                        )}>
                          {session.level}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground capitalize">
                          {session.type}
                        </span>
                      </div>

                      <h3 className="text-lg font-semibold text-foreground mb-1">
                        {session.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
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
                      <Button variant="default">
                        Join Session
                      </Button>
                      <span className="text-xs text-muted-foreground">
                        {session.spots} spots left
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {filteredSessions.length === 0 && (
                <div className="text-center py-12">
                  <CalendarIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No sessions found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters or selecting a different date.
                  </p>
                  <Button variant="outline" onClick={() => { setSelectedType("all"); setSelectedDate(null); }}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
