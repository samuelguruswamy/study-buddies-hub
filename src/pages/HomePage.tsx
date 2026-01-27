import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Users, 
  Calendar, 
  BookOpen, 
  Trophy,
  Zap,
  MessageCircle,
  Star,
  Play,
  Code,
  Laptop,
  Sparkles
} from "lucide-react";
import heroImage from "@/assets/hero-students.jpg";

const features = [
  {
    icon: Users,
    title: "Peer Tutoring",
    description: "Learn from fellow students who've mastered the material. Real help from people who get it."
  },
  {
    icon: Calendar,
    title: "Live Sessions",
    description: "Join scheduled study sessions, workshops, and collaborative coding sessions."
  },
  {
    icon: BookOpen,
    title: "Interactive Resources",
    description: "Quizzes, flashcards, tutorials, and practice problems tailored to your level."
  },
  {
    icon: Trophy,
    title: "Gamified Learning",
    description: "Earn badges, maintain streaks, and level up as you master new skills."
  },
];

const stats = [
  { value: "5,000+", label: "Active Students" },
  { value: "200+", label: "Peer Tutors" },
  { value: "1,500+", label: "Study Sessions" },
  { value: "98%", label: "Success Rate" },
];

const testimonials = [
  {
    quote: "Design2Learn helped me finally understand recursion. My peer tutor explained it way better than any lecture!",
    name: "Maya K.",
    role: "Computer Science Major",
    avatar: "M"
  },
  {
    quote: "The study groups here are amazing. We went from strangers to a real team that supports each other.",
    name: "Jordan T.",
    role: "High School Senior",
    avatar: "J"
  },
  {
    quote: "I love earning badges as I complete lessons. It actually makes me want to keep learning every day!",
    name: "Alex R.",
    role: "Middle School Student",
    avatar: "A"
  },
];

const upcomingSessions = [
  {
    title: "Python Basics Workshop",
    tutor: "Sarah M.",
    time: "Today, 4:00 PM",
    level: "Beginner",
    spots: 8
  },
  {
    title: "Web Dev Study Group",
    tutor: "Marcus L.",
    time: "Tomorrow, 3:30 PM",
    level: "Intermediate",
    spots: 5
  },
  {
    title: "Algorithm Practice",
    tutor: "Emily C.",
    time: "Wed, 5:00 PM",
    level: "Advanced",
    spots: 12
  },
];

export function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 gradient-hero opacity-90" />
        
        {/* Hero image overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            mixBlendMode: 'overlay'
          }}
        />

        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
              <span className="text-sm font-medium text-primary-foreground">Built by Students, For Students</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground mb-6 animate-slide-up">
              Learn Technology
              <span className="block mt-2">Together</span>
            </h1>
            
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 leading-relaxed max-w-2xl mx-auto animate-slide-up">
              Join a community of students helping students master coding, web development, 
              and computer science through peer tutoring and collaborative learning.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up">
              <Button asChild variant="hero-outline" size="xl">
                <Link to="/schedule">
                  <Calendar className="w-5 h-5" />
                  Join a Study Session
                </Link>
              </Button>
              <Button asChild size="xl" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                <Link to="/resources">
                  <BookOpen className="w-5 h-5" />
                  Explore Resources
                </Link>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center p-4 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20">
                <div className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-primary-foreground/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" 
              fill="hsl(var(--background))"
            />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Why Students Love Learning Here
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We've built a platform that makes learning feel less like a chore and more like collaboration with friends.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="group p-6 rounded-2xl bg-card border border-border card-hover"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4 group-hover:shadow-glow transition-shadow">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Sessions Preview */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
                Upcoming Sessions
              </h2>
              <p className="text-muted-foreground">
                Jump into a live study session happening soon
              </p>
            </div>
            <Button asChild variant="outline">
              <Link to="/schedule">
                View Full Schedule
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {upcomingSessions.map((session) => (
              <div 
                key={session.title}
                className="p-6 rounded-2xl bg-card border border-border card-hover"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    session.level === 'Beginner' ? 'bg-success/10 text-success' :
                    session.level === 'Intermediate' ? 'bg-warning/10 text-warning' :
                    'bg-accent/10 text-accent'
                  }`}>
                    {session.level}
                  </div>
                  <span className="text-sm text-muted-foreground">{session.spots} spots left</span>
                </div>
                
                <h3 className="text-lg font-semibold text-foreground mb-2">{session.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">Hosted by {session.tutor}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-primary">{session.time}</span>
                  <Button size="sm" variant="default">
                    Join
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              What Students Are Saying
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real stories from real students who've transformed their learning journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.name}
                className="p-6 rounded-2xl bg-card border border-border card-hover"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-warning text-warning" />
                  ))}
                </div>
                <p className="text-foreground mb-6 leading-relaxed">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-primary-foreground animate-float" />
          <div className="absolute bottom-10 right-10 w-24 h-24 rounded-full bg-primary-foreground animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 right-1/4 w-16 h-16 rounded-full bg-primary-foreground animate-float" style={{ animationDelay: '4s' }} />
        </div>

        <div className="relative container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join thousands of students who are mastering technology together. 
            Your next breakthrough is just a study session away.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="xl" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              <Link to="/dashboard">
                <Zap className="w-5 h-5" />
                View Your Dashboard
              </Link>
            </Button>
            <Button asChild variant="hero-outline" size="xl">
              <Link to="/community">
                <MessageCircle className="w-5 h-5" />
                Join the Community
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
