export const initialMentors = [
  {
    id: "m1",
    name: "Rahul Sharma",
    role: "Software Engineer",
    company: "Microsoft",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
    verified: true,
    rating: 4.9,
    reviewsCount: 42,
    bio: "Backend specialist with 6+ years of experience in high-throughput distributed systems and cloud architecture.",
    expertise: ["System Design", "Backend", "Node.js", "Microservices", "Java"],
    category: "System Design",
    articleCount: 8,
    online: true,
    socials: { github: "rahulsharma", linkedin: "rahul-sharma-dev" }
  },
  {
    id: "m2",
    name: "Priya Singh",
    role: "SDE II",
    company: "Amazon",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80",
    verified: true,
    rating: 4.95,
    reviewsCount: 56,
    bio: "Passionate about algorithms, scalable system architectures, and helping students crack top tech interviews.",
    expertise: ["DSA", "System Design", "AWS", "Java", "Python"],
    category: "Backend",
    articleCount: 12,
    online: true,
    socials: { github: "priyasingh", linkedin: "priya-singh-sde" }
  },
  {
    id: "m3",
    name: "Aman Verma",
    role: "Frontend Engineer",
    company: "Adobe",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80",
    verified: true,
    rating: 4.85,
    reviewsCount: 38,
    bio: "UI/UX enthusiast, web performance optimization fanatic, and open-source contributor.",
    expertise: ["React", "TypeScript", "Frontend", "Tailwind CSS", "Next.js"],
    category: "Frontend",
    articleCount: 6,
    online: false,
    socials: { github: "amanverma", linkedin: "aman-verma-ui" }
  },
  {
    id: "m4",
    name: "Neha Gupta",
    role: "ML Engineer",
    company: "Google",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80",
    verified: true,
    rating: 5.0,
    reviewsCount: 64,
    bio: "Building AI solutions at scale. Specializing in Deep Learning, NLP models, and MLOps deployment pipelines.",
    expertise: ["AI/ML", "Python", "PyTorch", "Data Science", "LLMs"],
    category: "AI/ML",
    articleCount: 15,
    online: true,
    socials: { github: "nehagupta", linkedin: "neha-gupta-ai" }
  },
  {
    id: "m5",
    name: "Siddharth Nair",
    role: "Senior DevOps Engineer",
    company: "Uber",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80",
    verified: true,
    rating: 4.88,
    reviewsCount: 29,
    bio: "Kubernetes enthusiast, CI/CD pipeline architect, and infrastructure as code automation advocate.",
    expertise: ["DevOps", "Docker", "Kubernetes", "AWS", "CI/CD"],
    category: "DevOps",
    articleCount: 5,
    online: false,
    socials: { github: "sidnair", linkedin: "siddharth-nair-devops" }
  },
  {
    id: "m6",
    name: "Ananya Roy",
    role: "Data Scientist",
    company: "Stripe",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=250&q=80",
    verified: true,
    rating: 4.92,
    reviewsCount: 31,
    bio: "Turning data into actionable insights. Expert in predictive modeling, A/B testing, and statistical engineering.",
    expertise: ["Data Science", "Python", "SQL", "Machine Learning", "Statistics"],
    category: "Data Science",
    articleCount: 9,
    online: true,
    socials: { github: "ananyaroy", linkedin: "ananya-roy-data" }
  }
];

export const initialArticles = [
  {
    id: "art-1",
    title: "How I Prepared for My First SDE Interview",
    subtitle: "A step-by-step roadmap covering Data Structures, System Design, and behavioral interview techniques.",
    category: "Interview Experience",
    cover: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Rahul Sharma",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
      role: "SDE @ Microsoft"
    },
    readTime: "6 min read",
    date: "Aug 15, 2026",
    likes: 142,
    bookmarks: 38,
    tags: ["DSA", "Interview Prep", "Career", "SDE"],
    body: `Preparing for SDE interviews can feel overwhelming with the sheer amount of topics available online. When I started preparing for my interviews, I narrowed my focus into 3 core pillars:

### 1. Data Structures & Algorithms (DSA)
- Mastered core topics: Arrays, Linked Lists, Trees, Graphs, Dynamic Programming, and Two Pointers.
- Practiced quality over quantity: solved around 150 well-curated LeetCode medium questions rather than grinding 500 random ones.
- Focused heavily on explaining space and time complexity (\`O(N)\`, \`O(log N)\`) aloud.

### 2. Low Level & System Design
- Understood fundamental design patterns (Observer, Factory, Singleton, Strategy).
- Practiced designing real-world systems like URL shorteners, Rate Limiters, and Notification Services.

### 3. Behavioral & Mock Interviews
- Prepared STAR (Situation, Task, Action, Result) stories for past projects.
- Scheduled peer mock interviews twice a week to build confidence and time management skills.

> **Key takeaway:** Consistency and structured review matter far more than last-minute cramming. Keep a log of problems you struggled with!`,
    comments: [
      { id: "c1", user: "Vikram Kumar", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80", text: "Extremely helpful roadmap! Loved the emphasis on mock interviews.", date: "Aug 16, 2026" },
      { id: "c2", user: "Kavya Patel", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80", text: "How did you manage time between DSA and System Design?", date: "Aug 17, 2026" }
    ]
  },
  {
    id: "art-2",
    title: "The Roadmap I Followed to Learn Backend Development",
    subtitle: "From HTTP basics and RESTful APIs to microservices, Caching, and database indexing.",
    category: "Web Development",
    cover: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Priya Singh",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80",
      role: "SDE II @ Amazon"
    },
    readTime: "8 min read",
    date: "Aug 12, 2026",
    likes: 215,
    bookmarks: 89,
    tags: ["Backend", "Node.js", "Databases", "System Design"],
    body: `Transitioning into backend engineering requires understanding what happens under the hood when a request leaves a browser until it returns data from a database.

### Step 1: Core Networking & Protocols
- HTTP/HTTPS headers, status codes (\`200\`, \`400\`, \`401\`, \`404\`, \`500\`), CORS policies.
- Understanding TCP/IP sockets and RESTful API architecture patterns.

### Step 2: Database Mastery
- SQL vs NoSQL (PostgreSQL vs MongoDB).
- Indexing strategies (B-Trees, Hash Indexes) to speed up query execution time.
- Database transactions, ACID properties, and ORM usage.

### Step 3: Performance & Scalability
- Caching layers with Redis for fast read latency.
- Message queues (RabbitMQ, Kafka) for asynchronous background job processing.
- Containerization using Docker to ensure consistent deployment across environments.`,
    comments: [
      { id: "c3", user: "Rohan Das", avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80", text: "Redis caching explanation was spot-on. Thanks Priya!", date: "Aug 13, 2026" }
    ]
  },
  {
    id: "art-3",
    title: "React Performance Optimization in 2026",
    subtitle: "Practical techniques using React Server Components, memoization, virtualization, and code splitting.",
    category: "Web Development",
    cover: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Aman Verma",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80",
      role: "Frontend Engineer @ Adobe"
    },
    readTime: "5 min read",
    date: "Aug 08, 2026",
    likes: 184,
    bookmarks: 64,
    tags: ["React", "Frontend", "JavaScript", "Performance"],
    body: `Modern web applications require smooth 60fps renders and instant response times. Here are 4 essential React performance practices:

1. **Avoid Unnecessary Re-renders**: Use \`useMemo\` and \`useCallback\` judiciously for expensive calculations and stable prop references.
2. **List Virtualization**: Render only visible DOM nodes when working with large lists (e.g. \`react-window\` or \`tanstack-virtual\`).
3. **Dynamic Import & Code Splitting**: Lazy-load heavy components using \`React.lazy\` and \`Suspense\`.
4. **Image & Asset Optimization**: Serve modern webp/avif image formats with proper layout dimensions to prevent Layout Shifts (CLS).`,
    comments: []
  },
  {
    id: "art-4",
    title: "Understanding System Design as a Student",
    subtitle: "Demystifying load balancers, database sharding, CDN networks, and rate limiting with real-world examples.",
    category: "System Design",
    cover: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Rahul Sharma",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
      role: "Software Engineer @ Microsoft"
    },
    readTime: "10 min read",
    date: "Jul 28, 2026",
    likes: 310,
    bookmarks: 142,
    tags: ["System Design", "Architecture", "Scalability", "Cloud"],
    body: `System design can feel abstract if you haven't managed production traffic. However, thinking like a systems architect starts with breaking down any large application into modular blocks:

- **Load Balancer (Nginx / HAProxy)**: Distributes incoming HTTP requests across backend server clusters.
- **Stateless Application Tier**: Ensures any application instance can handle any user request seamlessly.
- **Database Partitioning & Read Replicas**: Offloads heavy read queries to replica nodes while preserving write operations on the primary node.
- **Content Delivery Network (CDN)**: Caches static assets (images, JS, CSS) close to users geographically for near-zero latency.`,
    comments: []
  },
  {
    id: "art-5",
    title: "Practical AI & LLM Integration for Developers",
    subtitle: "How to harness prompt engineering, vector embeddings, and RAG architectures in modern web applications.",
    category: "AI/ML",
    cover: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Neha Gupta",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80",
      role: "ML Engineer @ Google"
    },
    readTime: "7 min read",
    date: "Jul 20, 2026",
    likes: 278,
    bookmarks: 110,
    tags: ["AI/ML", "LLM", "Python", "RAG"],
    body: `AI integration is fast becoming a standard feature in modern SaaS applications. In this article, we look at Retrieval-Augmented Generation (RAG) and vector search implementations.`,
    comments: []
  }
];

export const initialConversations = [
  {
    user_name: "Rahul Sharma",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
    role: "Software Engineer @ Microsoft",
    online: true,
    lastMessage: "Hey! Glad to connect. Let me know if you have questions on system design.",
    timestamp: "10:32 AM",
    unreadCount: 1
  },
  {
    user_name: "Priya Singh",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80",
    role: "SDE II @ Amazon",
    online: true,
    lastMessage: "Great article on React state management! I left a review.",
    timestamp: "Yesterday",
    unreadCount: 0
  },
  {
    user_name: "Aman Verma",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80",
    role: "Frontend Engineer @ Adobe",
    online: false,
    lastMessage: "Thanks for checking out the UI component library.",
    timestamp: "Aug 15",
    unreadCount: 0
  },
  {
    user_name: "Neha Gupta",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80",
    role: "ML Engineer @ Google",
    online: true,
    lastMessage: "Have you tried running vector embeddings locally?",
    timestamp: "Aug 14",
    unreadCount: 0
  }
];
