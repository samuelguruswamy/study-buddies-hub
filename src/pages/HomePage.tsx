import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
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
  Sparkles,
  GraduationCap,
  Target,
  Rocket
} from "lucide-react";
import heroImage from "@/assets/hero-abstract.jpg";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 }
};

const features = [
  {
    icon: Users,
    title: "Peer Tutoring",
    description: "Learn from fellow students who've mastered the material. Real help from people who get it.",
    color: "from-primary to-primary/70"
  },
  {
    icon: Calendar,
    title: "Live Sessions",
    description: "Join scheduled study sessions, workshops, and collaborative coding sessions.",
    color: "from-accent to-accent/70"
  },
  {
    icon: BookOpen,
    title: "Interactive Resources",
    description: "Quizzes, flashcards, tutorials, and practice problems tailored to your level.",
    color: "from-success to-success/70"
  },
  {
    icon: Trophy,
    title: "Gamified Learning",
    description: "Earn badges, maintain streaks, and level up as you master new skills.",
    color: "from-warning to-warning/70"
  },
];

const stats = [
  { value: "5,000+", label: "Active Students", icon: Users },
  { value: "200+", label: "Peer Tutors", icon: GraduationCap },
  { value: "1,500+", label: "Study Sessions", icon: Calendar },
  { value: "98%", label: "Success Rate", icon: Target },
];

const testimonials = [
  {
    quote: "NeoSocratic helped me finally understand recursion. My peer tutor explained it way better than any lecture!",
    name: "Maya K.",
    role: "Computer Science Major",
    avatar: "M",
    rating: 5
  },
  {
    quote: "The study groups here are amazing. We went from strangers to a real team that supports each other.",
    name: "Jordan T.",
    role: "High School Senior",
    avatar: "J",
    rating: 5
  },
  {
    quote: "I love earning badges as I complete lessons. It actually makes me want to keep learning every day!",
    name: "Alex R.",
    role: "Middle School Student",
    avatar: "A",
    rating: 5
  },
];

const upcomingSessions = [
  {
    title: "Python Basics Workshop",
    tutor: "Sarah M.",
    time: "Today, 4:00 PM",
    level: "Beginner",
    spots: 8,
    icon: Code
  },
  {
    title: "Web Dev Study Group",
    tutor: "Marcus L.",
    time: "Tomorrow, 3:30 PM",
    level: "Intermediate",
    spots: 5,
    icon: Laptop
  },
  {
    title: "Algorithm Practice",
    tutor: "Emily C.",
    time: "Wed, 5:00 PM",
    level: "Advanced",
    spots: 12,
    icon: Zap
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Create Your Profile",
    description: "Sign up and tell us about your learning goals and current skill level.",
    icon: Users
  },
  {
    step: "02",
    title: "Join Study Sessions",
    description: "Browse upcoming sessions and join ones that match your schedule and interests.",
    icon: Calendar
  },
  {
    step: "03",
    title: "Learn & Grow Together",
    description: "Collaborate with peers, earn badges, and track your progress as you master new skills.",
    icon: Rocket
  },
];

export function HomePage() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleJoinSession = (sessionTitle: string) => {
    toast({
      title: "Session Joined! 🎉",
      description: `You've successfully registered for "${sessionTitle}". Check your dashboard for details.`,
    });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        {/* Background */}
        <div className="absolute inset-0 gradient-hero" />
        
        {/* Hero image */}
        <motion.div 
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <img 
            src={heroImage} 
            alt="" 
            className="w-full h-full object-cover mix-blend-overlay"
          />
        </motion.div>

        {/* Floating decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute top-20 left-[10%] w-20 h-20 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20"
            animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute top-40 right-[15%] w-16 h-16 rounded-full bg-accent/20 backdrop-blur-sm"
            animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          <motion.div 
            className="absolute bottom-32 left-[20%] w-12 h-12 rounded-xl bg-success/20 backdrop-blur-sm"
            animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
          <motion.div 
            className="absolute bottom-20 right-[25%] w-24 h-24 rounded-3xl bg-warning/10 backdrop-blur-sm border border-warning/20"
            animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
        </div>

        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-foreground/10 backdrop-blur-md border border-primary-foreground/20 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-primary-foreground">Built by Students, For Students</span>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-primary-foreground mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Learn Technology
              <motion.span 
                className="block text-accent mt-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Together
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-primary-foreground/80 mb-10 leading-relaxed max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Join a community of students helping students master coding, web development, 
              and computer science through peer tutoring and collaborative learning.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button asChild variant="hero-outline" size="xl">
                <Link to="/schedule">
                  <Calendar className="w-5 h-5" />
                  Join a Study Session
                </Link>
              </Button>
              <Button asChild size="xl" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-xl">
                <Link to="/resources">
                  <BookOpen className="w-5 h-5" />
                  Explore Resources
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div 
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={stat.label}
                variants={scaleIn}
                className="text-center p-5 rounded-2xl bg-primary-foreground/10 backdrop-blur-md border border-primary-foreground/20 group hover:bg-primary-foreground/20 transition-colors"
              >
                <stat.icon className="w-6 h-6 text-accent mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-primary-foreground/70">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path 
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" 
              fill="hsl(var(--background))"
            />
          </svg>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Getting Started
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join our learning community in three simple steps
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {howItWorks.map((item, index) => (
              <motion.div 
                key={item.step}
                variants={fadeInUp}
                className="relative"
              >
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/30 to-transparent" />
                )}
                <div className="text-center">
                  <div className="relative inline-flex mb-6">
                    <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center shadow-glow">
                      <item.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent text-accent-foreground text-sm font-bold flex items-center justify-center shadow-lg">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
              Why Students Love Learning Here
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We've built a platform that makes learning feel less like a chore and more like collaboration with friends.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={feature.title}
                variants={fadeInUp}
                className="group p-8 rounded-3xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                  <feature.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Upcoming Sessions Preview */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div 
            className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-success/10 text-success text-sm font-medium mb-4">
                Live Learning
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-2">
                Upcoming Sessions
              </h2>
              <p className="text-muted-foreground">
                Jump into a live study session happening soon
              </p>
            </div>
            <Button asChild variant="outline" size="lg">
              <Link to="/schedule">
                View Full Schedule
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {upcomingSessions.map((session) => (
              <motion.div 
                key={session.title}
                variants={fadeInUp}
                className="group p-6 rounded-3xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                    session.level === 'Beginner' ? 'bg-success/10 text-success' :
                    session.level === 'Intermediate' ? 'bg-warning/10 text-warning' :
                    'bg-accent/10 text-accent'
                  }`}>
                    {session.level}
                  </div>
                  <span className="text-sm text-muted-foreground">{session.spots} spots left</span>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                    <session.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{session.title}</h3>
                    <p className="text-sm text-muted-foreground">Hosted by {session.tutor}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-sm font-medium text-primary">{session.time}</span>
                  <Button 
                    size="sm" 
                    variant="default"
                    onClick={() => handleJoinSession(session.title)}
                    aria-label={`Join ${session.title} session`}
                  >
                    Join Now
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-warning/10 text-warning text-sm font-medium mb-4">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
              What Students Are Saying
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real stories from real students who've transformed their learning journey.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={testimonial.name}
                variants={fadeInUp}
                className="p-8 rounded-3xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-warning text-warning" />
                  ))}
                </div>
                <p className="text-foreground mb-8 leading-relaxed text-lg">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 gradient-primary relative overflow-hidden">
        {/* Animated background shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute top-10 left-10 w-40 h-40 rounded-full bg-primary-foreground/5"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute bottom-10 right-10 w-32 h-32 rounded-3xl bg-primary-foreground/5"
            animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/4 w-24 h-24 rounded-2xl bg-accent/20"
            animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <motion.div 
          className="relative container mx-auto px-4 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="w-20 h-20 rounded-3xl bg-primary-foreground/20 flex items-center justify-center mx-auto mb-8"
          >
            <Rocket className="w-10 h-10 text-primary-foreground" />
          </motion.div>
          
          <h2 className="text-3xl md:text-5xl font-display font-bold text-primary-foreground mb-6">
            Ready to Start Learning?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
            Join thousands of students who are mastering technology together. 
            Your next breakthrough is just a study session away.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="xl" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-xl">
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
        </motion.div>
      </section>
    </div>
  );
}
