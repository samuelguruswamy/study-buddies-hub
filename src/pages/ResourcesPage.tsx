import { useState } from "react";
import { Button } from "@/components/ui/button";
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
  Layers
} from "lucide-react";
import { cn } from "@/lib/utils";

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
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
            Learning Resources
          </h1>
          <p className="text-muted-foreground">
            Interactive tutorials, videos, quizzes, and more to help you master technology.
          </p>
        </div>

        {/* Continue Learning */}
        {inProgressResources.length > 0 && (
          <div className="mb-8">
            <h2 className="font-display font-semibold text-foreground mb-4">Continue Learning</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {inProgressResources.map((resource) => (
                <div 
                  key={resource.id}
                  className="p-4 rounded-2xl bg-primary/5 border border-primary/20 card-hover cursor-pointer"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                      <resource.icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground truncate">{resource.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {resource.completedLessons}/{resource.lessons} lessons
                      </p>
                    </div>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full gradient-primary rounded-full"
                      style={{ width: `${(resource.completedLessons / (resource.lessons || 1)) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-4 rounded-xl bg-card border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>

          {/* Topic Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
            {topics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => setSelectedTopic(selectedTopic === topic.id ? null : topic.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all",
                  selectedTopic === topic.id
                    ? topic.color
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                )}
              >
                <topic.icon className="w-4 h-4" />
                {topic.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Categories */}
            <div className="p-6 rounded-2xl bg-card border border-border">
              <h3 className="font-display font-semibold text-foreground mb-4">Categories</h3>
              <div className="space-y-1">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                      selectedCategory === category.id
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    )}
                  >
                    <category.icon className="w-4 h-4" />
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Filter */}
            <div className="p-6 rounded-2xl bg-card border border-border">
              <h3 className="font-display font-semibold text-foreground mb-4">Difficulty</h3>
              <div className="space-y-2">
                {difficulties.map((difficulty) => (
                  <button
                    key={difficulty}
                    onClick={() => setSelectedDifficulty(selectedDifficulty === difficulty ? null : difficulty)}
                    className={cn(
                      "w-full flex items-center justify-between px-4 py-2 rounded-lg text-sm transition-all",
                      selectedDifficulty === difficulty
                        ? difficulty === 'Beginner' ? 'bg-success/10 text-success' :
                          difficulty === 'Intermediate' ? 'bg-warning/10 text-warning' :
                          'bg-accent/10 text-accent'
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    )}
                  >
                    {difficulty}
                    {selectedDifficulty === difficulty && <CheckCircle2 className="w-4 h-4" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="p-6 rounded-2xl gradient-primary text-primary-foreground">
              <h3 className="font-display font-semibold mb-4">Your Progress</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-primary-foreground/80">Resources Used</span>
                  <span className="font-semibold">18</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-primary-foreground/80">Completed</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-primary-foreground/80">In Progress</span>
                  <span className="font-semibold">3</span>
                </div>
              </div>
            </div>
          </div>

          {/* Resources Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-semibold text-foreground">
                {selectedCategory === 'all' ? 'All Resources' : categories.find(c => c.id === selectedCategory)?.label}
              </h2>
              <span className="text-sm text-muted-foreground">
                {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {filteredResources.map((resource) => (
                <div 
                  key={resource.id}
                  className="p-6 rounded-2xl bg-card border border-border card-hover cursor-pointer"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shrink-0">
                      <resource.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={cn(
                          "px-2 py-0.5 rounded-full text-xs font-medium",
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
                      <h3 className="font-semibold text-foreground">{resource.title}</h3>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
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
                          {resource.lessons} lessons
                        </span>
                      )}
                      {resource.questions && (
                        <span className="flex items-center gap-1">
                          <HelpCircle className="w-4 h-4" />
                          {resource.questions} questions
                        </span>
                      )}
                    </div>
                    <Button size="sm" variant={resource.completedLessons > 0 ? "outline" : "default"}>
                      {resource.completedLessons > 0 ? 'Continue' : 'Start'}
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {filteredResources.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No resources found</h3>
                <p className="text-muted-foreground mb-4">
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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
