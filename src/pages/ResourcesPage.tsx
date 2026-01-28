import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  Play, 
  FileText, 
  HelpCircle,
  Download,
  Search,
  Filter,
  ChevronRight,
  CheckCircle2,
  Clock,
  Star,
  Code,
  Database,
  Globe,
  Laptop,
  Zap,
  Layers,
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
    transition: { staggerChildren: 0.06 }
  }
};

const categories = [
  { id: "all", label: "All Resources", icon: Layers },
  { id: "tutorials", label: "Tutorials", icon: BookOpen },
  { id: "videos", label: "Videos", icon: Play },
  { id: "quizzes", label: "Quizzes", icon: HelpCircle },
  { id: "flashcards", label: "Flashcards", icon: Zap },
  { id: "downloads", label: "Downloads", icon: Download },
];

const topics = [
  { id: "programming", label: "Programming", icon: Code, color: "bg-primary/10 text-primary" },
  { id: "web-dev", label: "Web Development", icon: Globe, color: "bg-accent/10 text-accent" },
  { id: "databases", label: "Databases", icon: Database, color: "bg-success/10 text-success" },
  { id: "tools", label: "Dev Tools", icon: Laptop, color: "bg-warning/10 text-warning" },
];

const resources = [
  {
    id: 1,
    title: "Python Fundamentals",
    description: "Learn Python basics from variables to functions. Perfect for complete beginners.",
    type: "tutorials",
    topic: "programming",
    difficulty: "Beginner",
    duration: "45 min",
    lessons: 8,
    completedLessons: 5,
    rating: 4.8,
    icon: Code,
  },
  {
    id: 2,
    title: "HTML & CSS Crash Course",
    description: "Build your first webpage from scratch with this hands-on video series.",
    type: "videos",
    topic: "web-dev",
    difficulty: "Beginner",
    duration: "2 hours",
    lessons: 12,
    completedLessons: 0,
    rating: 4.9,
    icon: Globe,
  },
  {
    id: 3,
    title: "JavaScript Quiz Challenge",
    description: "Test your JS knowledge with 25 carefully crafted questions.",
    type: "quizzes",
    topic: "programming",
    difficulty: "Intermediate",
    duration: "20 min",
    questions: 25,
    completedLessons: 0,
    rating: 4.6,
    icon: HelpCircle,
  },
  {
    id: 4,
    title: "React Essentials",
    description: "Master React components, props, and state with interactive examples.",
    type: "tutorials",
    topic: "web-dev",
    difficulty: "Intermediate",
    duration: "1.5 hours",
    lessons: 10,
    completedLessons: 3,
    rating: 4.7,
    icon: Laptop,
  },
  {
    id: 5,
    title: "SQL Flashcards",
    description: "Master SQL queries and database concepts with spaced repetition.",
    type: "flashcards",
    topic: "databases",
    difficulty: "Beginner",
    duration: "15 min",
    cards: 40,
    completedLessons: 0,
    rating: 4.5,
    icon: Database,
  },
  {
    id: 6,
    title: "Git Cheat Sheet PDF",
    description: "Quick reference guide for common Git commands and workflows.",
    type: "downloads",
    topic: "tools",
    difficulty: "Beginner",
    duration: "Reference",
    completedLessons: 0,
    rating: 4.9,
    icon: Download,
  },
  {
    id: 7,
    title: "CSS Flexbox Deep Dive",
    description: "Complete video walkthrough of CSS Flexbox with real-world examples.",
    type: "videos",
    topic: "web-dev",
    difficulty: "Intermediate",
    duration: "35 min",
    lessons: 1,
    completedLessons: 0,
    rating: 4.8,
    icon: Play,
  },
  {
    id: 8,
    title: "Algorithm Patterns Quiz",
    description: "Challenge yourself with algorithm problem patterns and solutions.",
    type: "quizzes",
    topic: "programming",
    difficulty: "Advanced",
    duration: "30 min",
    questions: 15,
    completedLessons: 0,
    rating: 4.4,
    icon: HelpCircle,
  },
];

const difficulties = ["Beginner", "Intermediate", "Advanced"];

export function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const handleStartResource = (resource: typeof resources[0]) => {
    toast({
      title: resource.completedLessons > 0 ? "Resuming... ▶️" : "Starting... 🚀",
      description: `Loading "${resource.title}". Get ready to learn!`,
    });
  };

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === "all" || resource.type === selectedCategory;
    const matchesTopic = !selectedTopic || resource.topic === selectedTopic;
    const matchesDifficulty = !selectedDifficulty || resource.difficulty === selectedDifficulty;
    const matchesSearch = !searchQuery || 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesTopic && matchesDifficulty && matchesSearch;
  });

  const inProgressResources = resources.filter(r => r.completedLessons > 0 && r.completedLessons < (r.lessons || 1));

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
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-success/10 text-success text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Interactive Learning
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-3">
            Learning Resources
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Interactive tutorials, videos, quizzes, and more to help you master technology.
          </p>
        </motion.div>

        {/* Continue Learning */}
        {inProgressResources.length > 0 && (
          <motion.div 
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="font-display font-semibold text-foreground text-xl mb-4">Continue Learning</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {inProgressResources.map((resource) => (
                <motion.div 
                  key={resource.id}
                  className="p-5 rounded-2xl bg-primary/5 border border-primary/20 hover:border-primary/40 transition-all cursor-pointer hover:-translate-y-1"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
                      <resource.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate">{resource.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {resource.completedLessons}/{resource.lessons} lessons
                      </p>
                    </div>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full gradient-primary rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(resource.completedLessons / (resource.lessons || 1)) * 100}%` }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Search and Filters */}
        <motion.div 
          className="flex flex-col lg:flex-row gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-4 rounded-2xl bg-card border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground"
            />
          </div>

          {/* Topic Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
            {topics.map((topic) => (
              <motion.button
                key={topic.id}
                onClick={() => setSelectedTopic(selectedTopic === topic.id ? null : topic.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all",
                  selectedTopic === topic.id
                    ? topic.color
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                )}
              >
                <topic.icon className="w-4 h-4" />
                {topic.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div 
            className="lg:col-span-1 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* Categories */}
            <div className="p-6 rounded-3xl bg-card border border-border shadow-sm">
              <h3 className="font-display font-semibold text-foreground mb-4">Categories</h3>
              <div className="space-y-1">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    whileHover={{ x: 4 }}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                      selectedCategory === category.id
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    )}
                  >
                    <category.icon className="w-4 h-4" />
                    {category.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Difficulty Filter */}
            <div className="p-6 rounded-3xl bg-card border border-border shadow-sm">
              <h3 className="font-display font-semibold text-foreground mb-4">Difficulty</h3>
              <div className="space-y-2">
                {difficulties.map((difficulty) => (
                  <motion.button
                    key={difficulty}
                    onClick={() => setSelectedDifficulty(selectedDifficulty === difficulty ? null : difficulty)}
                    whileHover={{ x: 4 }}
                    className={cn(
                      "w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
                      selectedDifficulty === difficulty
                        ? difficulty === 'Beginner' ? 'bg-success/10 text-success' :
                          difficulty === 'Intermediate' ? 'bg-warning/10 text-warning' :
                          'bg-accent/10 text-accent'
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    )}
                  >
                    {difficulty}
                    {selectedDifficulty === difficulty && <CheckCircle2 className="w-4 h-4" />}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="p-6 rounded-3xl gradient-primary text-primary-foreground shadow-glow">
              <h3 className="font-display font-semibold mb-4">Your Progress</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-primary-foreground/80">Resources Used</span>
                  <span className="text-2xl font-display font-bold">18</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-primary-foreground/80">Completed</span>
                  <span className="text-2xl font-display font-bold">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-primary-foreground/80">In Progress</span>
                  <span className="text-2xl font-display font-bold">3</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Resources Grid */}
          <div className="lg:col-span-3">
            <motion.div 
              className="flex items-center justify-between mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="font-display font-semibold text-xl text-foreground">
                {selectedCategory === 'all' ? 'All Resources' : categories.find(c => c.id === selectedCategory)?.label}
              </h2>
              <span className="text-sm text-muted-foreground px-3 py-1 rounded-full bg-secondary">
                {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''}
              </span>
            </motion.div>

            <motion.div 
              className="grid md:grid-cols-2 gap-4"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {filteredResources.map((resource) => (
                <motion.div 
                  key={resource.id}
                  variants={fadeInUp}
                  className="p-6 rounded-3xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center shrink-0 shadow-md">
                      <resource.icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={cn(
                          "px-2.5 py-0.5 rounded-full text-xs font-semibold",
                          resource.difficulty === 'Beginner' ? 'bg-success/10 text-success' :
                          resource.difficulty === 'Intermediate' ? 'bg-warning/10 text-warning' :
                          'bg-accent/10 text-accent'
                        )}>
                          {resource.difficulty}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Star className="w-3 h-3 fill-warning text-warning" />
                          {resource.rating}
                        </span>
                      </div>
                      <h3 className="font-semibold text-foreground text-lg">{resource.title}</h3>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {resource.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {resource.duration}
                      </span>
                      {resource.lessons && (
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          {resource.lessons}
                        </span>
                      )}
                    </div>
                    <Button 
                      size="sm" 
                      variant={resource.completedLessons > 0 ? "outline" : "default"}
                      onClick={() => handleStartResource(resource)}
                      aria-label={`${resource.completedLessons > 0 ? 'Continue' : 'Start'} ${resource.title}`}
                    >
                      {resource.completedLessons > 0 ? 'Continue' : 'Start'}
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {filteredResources.length === 0 && (
              <motion.div 
                className="text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">No resources found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters or search query.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => { 
                    setSelectedCategory("all"); 
                    setSelectedTopic(null); 
                    setSelectedDifficulty(null);
                    setSearchQuery("");
                  }}
                >
                  Clear Filters
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
