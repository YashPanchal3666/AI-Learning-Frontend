// Centralized Course Detail Database
// Each key maps to a course ID from Courses.js

const courseDetailData = {
    // ===================== AI TOOLS =====================
    "ai-1": {
        title: "ChatGPT & Prompt Engineering Mastery",
        category: "AI Tools",
        instructor: "Dr. Andrew Ng",
        rating: 4.9,
        reviews: "12,400",
        duration: "12 Hours",
        lessonsCount: "18 Lessons",
        students: "45,200 Enrolled",
        price: "$49.99",
        originalPrice: "$99.99",
        image: "https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fit=crop&w=800&q=80",
        desc: "Master the art of prompt engineering with ChatGPT, GPT-4 Turbo, and custom GPTs. Learn system instructions, chain-of-thought prompting, and build AI-powered business tools.",
        outcomes: [
            "Write advanced system prompts and multi-step chain-of-thought instructions",
            "Build Custom GPTs with actions, file retrieval, and code interpreter",
            "Automate business workflows using ChatGPT API integrations",
            "Understand token limits, temperature settings, and model selection",
            "Create AI content pipelines for marketing, SEO, and social media",
            "Earn a verified Prompt Engineering certificate for your resume"
        ],
        chapters: [
            {
                title: "Module 1: ChatGPT Fundamentals & Interface",
                lessons: [
                    { name: "1. Welcome & Course Overview", duration: "10 min", videoUrl: "https://www.youtube.com/embed/jC4v5AS4RIM" },
                    { name: "2. Understanding GPT Architecture Basics", duration: "22 min", videoUrl: "https://www.youtube.com/embed/aircAruvnKk" },
                    { name: "3. Crafting Your First Effective Prompts", duration: "28 min", videoUrl: "https://www.youtube.com/embed/jHv63Uvk5VA" }
                ]
            },
            {
                title: "Module 2: Advanced Prompt Techniques",
                lessons: [
                    { name: "4. Chain-of-Thought & Few-Shot Prompting", duration: "35 min", videoUrl: "https://www.youtube.com/embed/bMknfKXIFA8" },
                    { name: "5. System Instructions & Role-Based Prompts", duration: "30 min", videoUrl: "https://www.youtube.com/embed/kCc8FmEb1nY" },
                    { name: "6. Temperature, Top-P & Token Optimization", duration: "25 min", videoUrl: "https://www.youtube.com/embed/BP9fi_0XTlw" }
                ]
            },
            {
                title: "Module 3: Custom GPTs & API Integration",
                lessons: [
                    { name: "7. Building Custom GPTs with Actions", duration: "40 min", videoUrl: "https://www.youtube.com/embed/zjkBMFhNj_g" },
                    { name: "8. ChatGPT API: Python Integration Lab", duration: "45 min", videoUrl: "https://www.youtube.com/embed/c-g6epk3fFE" },
                    { name: "9. Capstone: AI-Powered Content Generator", duration: "50 min", videoUrl: "https://www.youtube.com/embed/uRQH2CFvedY" }
                ]
            }
        ]
    },

    "ai-2": {
        title: "Generative AI Application Development",
        category: "Deep Learning & AI",
        instructor: "Sarah Jenkins",
        rating: 4.8,
        reviews: "8,900",
        duration: "18 Hours",
        lessonsCount: "24 Lessons",
        students: "32,100 Enrolled",
        price: "$69.99",
        originalPrice: "$129.99",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
        desc: "Build production-ready Generative AI applications using Transformer architectures, PyTorch, LangChain, and vector databases. Covers RAG pipelines, agent systems, and deployment.",
        outcomes: [
            "Understand Transformer Encoder-Decoder architectures from scratch",
            "Fine-tune open source LLMs (LLaMA 3, Mistral) using LoRA & QLoRA",
            "Build production RAG pipelines with Vector Databases (ChromaDB)",
            "Deploy custom AI agents using LangChain & FastAPI",
            "Implement Prompt Engineering & System instructions for enterprise apps",
            "Earn a verifiable Blockchain Skill Certificate for your resume"
        ],
        chapters: [
            {
                title: "Module 1: Introduction to Generative AI & Transformers",
                lessons: [
                    { name: "1. Welcome & Course Overview", duration: "12 min", videoUrl: "https://www.youtube.com/embed/2eWuYf-ke52" },
                    { name: "2. Attention Is All You Need Paper Breakdown", duration: "28 min", videoUrl: "https://www.youtube.com/embed/SZorAJ4I-sA" },
                    { name: "3. Self-Attention Mechanisms in Code", duration: "35 min", videoUrl: "https://www.youtube.com/embed/kCc8FmEb1nY" }
                ]
            },
            {
                title: "Module 2: Fine-Tuning Open Source LLMs",
                lessons: [
                    { name: "4. Full vs Parameter-Efficient Fine-Tuning (PEFT)", duration: "25 min", videoUrl: "https://www.youtube.com/embed/e-gwvmhyU54" },
                    { name: "5. Setting Up PyTorch & HuggingFace Trainer", duration: "40 min", videoUrl: "https://www.youtube.com/embed/EMXfZB8FVUA" },
                    { name: "6. Hands-on LoRA Fine-Tuning Lab", duration: "50 min", videoUrl: "https://www.youtube.com/embed/t509sv5MT0w" }
                ]
            },
            {
                title: "Module 3: LangChain Agents & RAG Deployment",
                lessons: [
                    { name: "7. Vector Embeddings & Similarity Search", duration: "30 min", videoUrl: "https://www.youtube.com/embed/ySus5ZS0b94" },
                    { name: "8. Building an Autonomous AI Code Reviewer", duration: "45 min", videoUrl: "https://www.youtube.com/embed/LhnCwJmOUv8" }
                ]
            }
        ]
    },

    "ai-3": {
        title: "Midjourney & Stable Diffusion Art Design",
        category: "AI Creative Tools",
        instructor: "Alex Rivera",
        rating: 4.7,
        reviews: "6,500",
        duration: "10 Hours",
        lessonsCount: "16 Lessons",
        students: "24,800 Enrolled",
        price: "$39.99",
        originalPrice: "$79.99",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
        desc: "Create stunning AI-generated artwork using Midjourney V6, Stable Diffusion XL, and DALL-E 3. Master prompt composition, style transfer, ControlNet, and commercial design workflows.",
        outcomes: [
            "Craft detailed Midjourney prompts with aspect ratios, styles & parameters",
            "Set up Stable Diffusion locally with ComfyUI & Automatic1111 WebUI",
            "Use ControlNet for precise pose, depth, and edge-guided generation",
            "Train custom LoRA models on your own art style or brand identity",
            "Create commercial-ready product mockups, logos, and illustrations",
            "Understand AI art licensing, copyright, and ethical considerations"
        ],
        chapters: [
            {
                title: "Module 1: AI Art Fundamentals & Midjourney Setup",
                lessons: [
                    { name: "1. Introduction to AI Image Generation", duration: "15 min" },
                    { name: "2. Midjourney V6 Prompt Anatomy", duration: "25 min" },
                    { name: "3. Parameters: Aspect Ratio, Stylize, Chaos", duration: "20 min" }
                ]
            },
            {
                title: "Module 2: Stable Diffusion & Advanced Techniques",
                lessons: [
                    { name: "4. Installing Stable Diffusion Locally", duration: "30 min" },
                    { name: "5. ControlNet: Pose & Depth Conditioning", duration: "35 min" },
                    { name: "6. Training Custom LoRA Models", duration: "45 min" }
                ]
            },
            {
                title: "Module 3: Commercial Design Projects",
                lessons: [
                    { name: "7. Product Mockup & Brand Design Lab", duration: "40 min" },
                    { name: "8. Portfolio Capstone: AI Art Collection", duration: "35 min" }
                ]
            }
        ]
    },

    "ai-4": {
        title: "Building LLMs with LangChain & LlamaIndex",
        category: "Advanced AI Engineering",
        instructor: "Michael Chang",
        rating: 4.9,
        reviews: "5,400",
        duration: "22 Hours",
        lessonsCount: "28 Lessons",
        students: "19,500 Enrolled",
        price: "$89.99",
        originalPrice: "$149.99",
        image: "https://images.unsplash.com/photo-1677756119517-756a188d2d94?auto=format&fit=crop&w=800&q=80",
        desc: "Architect and deploy production LLM applications with LangChain, LlamaIndex, and vector stores. Build autonomous AI agents, multi-step reasoning chains, and enterprise RAG systems.",
        outcomes: [
            "Build multi-agent AI systems with LangChain LCEL & LangGraph",
            "Implement semantic search with Pinecone, Weaviate & ChromaDB",
            "Create autonomous tool-calling agents with function execution",
            "Design multi-step reasoning chains with memory and context windows",
            "Deploy production LLM apps using FastAPI & Docker containers",
            "Monitor and evaluate LLM outputs with LangSmith tracing"
        ],
        chapters: [
            {
                title: "Module 1: LangChain Architecture Deep Dive",
                lessons: [
                    { name: "1. LangChain Ecosystem Overview", duration: "18 min", videoUrl: "https://www.youtube.com/embed/aywZrzNaKjs" },
                    { name: "2. Chains, Prompts & Output Parsers", duration: "30 min", videoUrl: "https://www.youtube.com/embed/nE2skSRWTTs" },
                    { name: "3. Memory Systems & Conversation Buffers", duration: "35 min", videoUrl: "https://www.youtube.com/embed/3yPBVii7Ct0" }
                ]
            },
            {
                title: "Module 2: LlamaIndex & Vector Store Integration",
                lessons: [
                    { name: "4. Document Loaders & Text Splitters", duration: "25 min", videoUrl: "https://www.youtube.com/embed/6iHVhyTI_Lk" },
                    { name: "5. Building a Knowledge Base with LlamaIndex", duration: "40 min", videoUrl: "https://www.youtube.com/embed/5gUtl_U_iHQ" },
                    { name: "6. Hybrid Search: BM25 + Semantic Retrieval", duration: "35 min", videoUrl: "https://www.youtube.com/embed/2TJxpyO3Ei4" }
                ]
            },
            {
                title: "Module 3: Autonomous Agent Systems",
                lessons: [
                    { name: "7. Tool-Calling Agents & Function Execution", duration: "45 min", videoUrl: "https://www.youtube.com/embed/b-Qy7q_oD1k" },
                    { name: "8. Multi-Agent Orchestration with LangGraph", duration: "50 min", videoUrl: "https://www.youtube.com/embed/pGWZhzXW2-o" },
                    { name: "9. Capstone: Full-Stack AI Agent Deployment", duration: "55 min", videoUrl: "https://www.youtube.com/embed/ySus5ZS0b94" }
                ]
            }
        ]
    },

    "ai-5": {
        title: "AI Business Automation with Zapier & Make",
        category: "AI Automation",
        instructor: "Elena Rostova",
        rating: 4.6,
        reviews: "4,200",
        duration: "14 Hours",
        lessonsCount: "20 Lessons",
        students: "16,300 Enrolled",
        price: "$44.99",
        originalPrice: "$89.99",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
        desc: "Automate repetitive business tasks using Zapier, Make (Integromat), and AI-powered workflows. Connect CRMs, email marketing, databases, and AI APIs without writing code.",
        outcomes: [
            "Build no-code automation workflows with Zapier multi-step Zaps",
            "Create advanced scenario flows in Make with conditional logic",
            "Integrate OpenAI API for automated content generation pipelines",
            "Connect Slack, Google Sheets, Notion & CRM systems automatically",
            "Design AI-powered customer support chatbot workflows",
            "Reduce manual work by 80% with intelligent trigger systems"
        ],
        chapters: [
            {
                title: "Module 1: Automation Fundamentals",
                lessons: [
                    { name: "1. Introduction to Business Automation", duration: "12 min" },
                    { name: "2. Zapier Interface & First Zap", duration: "20 min" },
                    { name: "3. Make.com Scenario Builder Walkthrough", duration: "25 min" }
                ]
            },
            {
                title: "Module 2: AI-Powered Workflow Design",
                lessons: [
                    { name: "4. Connecting OpenAI API to Zapier", duration: "30 min" },
                    { name: "5. Automated Email Sequences with AI", duration: "35 min" },
                    { name: "6. CRM Lead Scoring Automation", duration: "40 min" }
                ]
            },
            {
                title: "Module 3: Enterprise Automation Capstone",
                lessons: [
                    { name: "7. Multi-Platform Sync Architecture", duration: "35 min" },
                    { name: "8. Capstone: End-to-End Business Pipeline", duration: "45 min" }
                ]
            }
        ]
    },

    "ai-6": {
        title: "Copilot & AI Code Assistants for Developers",
        category: "Developer Productivity",
        instructor: "David Miller",
        rating: 4.8,
        reviews: "7,100",
        duration: "8 Hours",
        lessonsCount: "14 Lessons",
        students: "28,400 Enrolled",
        price: "$34.99",
        originalPrice: "$69.99",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
        desc: "Supercharge your coding speed with GitHub Copilot, Cursor AI, and Codeium. Learn AI pair programming, intelligent code generation, test writing, and refactoring workflows.",
        outcomes: [
            "Configure GitHub Copilot for VS Code, JetBrains & Neovim",
            "Write effective inline comments that guide AI code suggestions",
            "Use Cursor AI for multi-file codebase-aware refactoring",
            "Generate unit tests, documentation, and API schemas with AI",
            "Understand Copilot security best practices and code review",
            "Compare Copilot vs Cursor vs Codeium for different use cases"
        ],
        chapters: [
            {
                title: "Module 1: AI Coding Assistants Overview",
                lessons: [
                    { name: "1. The AI Pair Programming Revolution", duration: "10 min" },
                    { name: "2. Setting Up GitHub Copilot", duration: "15 min" },
                    { name: "3. Your First AI-Assisted Coding Session", duration: "25 min" }
                ]
            },
            {
                title: "Module 2: Advanced AI Code Generation",
                lessons: [
                    { name: "4. Multi-File Context with Cursor AI", duration: "30 min" },
                    { name: "5. AI-Driven Test Generation & TDD", duration: "35 min" },
                    { name: "6. Refactoring Legacy Code with AI", duration: "30 min" }
                ]
            },
            {
                title: "Module 3: Production Workflows",
                lessons: [
                    { name: "7. Security Scanning & Code Review", duration: "20 min" },
                    { name: "8. Capstone: Full Feature with AI", duration: "40 min" }
                ]
            }
        ]
    },

    "ai-7": {
        title: "AI Video & Audio Production Masterclass",
        category: "AI Media Production",
        instructor: "Jessica Taylor",
        rating: 4.7,
        reviews: "3,800",
        duration: "16 Hours",
        lessonsCount: "22 Lessons",
        students: "14,200 Enrolled",
        price: "$59.99",
        originalPrice: "$119.99",
        image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80",
        desc: "Produce professional videos and audio using AI tools like Runway ML, Sora, ElevenLabs, and Descript. Master AI video editing, voice cloning, music generation, and content workflows.",
        outcomes: [
            "Generate cinematic videos with Runway Gen-3 & Sora",
            "Clone voices and create realistic AI narration with ElevenLabs",
            "Edit podcasts and videos with AI using Descript",
            "Generate background music with Suno AI & AIVA",
            "Build automated YouTube content production pipelines",
            "Understand deepfake detection and ethical AI media usage"
        ],
        chapters: [
            {
                title: "Module 1: AI Video Generation",
                lessons: [
                    { name: "1. Text-to-Video: Runway ML & Sora", duration: "20 min" },
                    { name: "2. Image-to-Video Animation Techniques", duration: "25 min" },
                    { name: "3. AI B-Roll & Stock Footage Creation", duration: "30 min" }
                ]
            },
            {
                title: "Module 2: AI Audio & Voice Production",
                lessons: [
                    { name: "4. Voice Cloning with ElevenLabs", duration: "30 min" },
                    { name: "5. AI Music Generation: Suno & AIVA", duration: "25 min" },
                    { name: "6. Podcast Editing with Descript AI", duration: "35 min" }
                ]
            },
            {
                title: "Module 3: Content Production Pipeline",
                lessons: [
                    { name: "7. Automated YouTube Workflow", duration: "40 min" },
                    { name: "8. Capstone: Full AI Video Project", duration: "45 min" }
                ]
            }
        ]
    },

    "ai-8": {
        title: "Ethics, Safety, and Governance in AI",
        category: "AI Policy & Ethics",
        instructor: "Prof. Robert Vance",
        rating: 4.9,
        reviews: "2,900",
        duration: "11 Hours",
        lessonsCount: "16 Lessons",
        students: "11,800 Enrolled",
        price: "$49.99",
        originalPrice: "$89.99",
        image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=800&q=80",
        desc: "Navigate the complex landscape of AI ethics, bias mitigation, responsible deployment, and global AI regulation. Understand EU AI Act, NIST frameworks, and corporate governance models.",
        outcomes: [
            "Identify and mitigate algorithmic bias in ML models",
            "Understand EU AI Act risk classification and compliance",
            "Implement fairness metrics and model auditing pipelines",
            "Design responsible AI deployment checklists for organizations",
            "Navigate copyright, IP, and data privacy in AI-generated content",
            "Build an AI governance framework for enterprise adoption"
        ],
        chapters: [
            {
                title: "Module 1: Foundations of AI Ethics",
                lessons: [
                    { name: "1. History of AI Ethics & Key Debates", duration: "18 min" },
                    { name: "2. Algorithmic Bias: Sources & Impact", duration: "25 min" },
                    { name: "3. Fairness Metrics & Evaluation", duration: "30 min" }
                ]
            },
            {
                title: "Module 2: Global AI Regulation",
                lessons: [
                    { name: "4. EU AI Act Deep Dive", duration: "35 min" },
                    { name: "5. NIST AI Risk Management Framework", duration: "28 min" },
                    { name: "6. Copyright & IP in AI Content", duration: "25 min" }
                ]
            },
            {
                title: "Module 3: Enterprise AI Governance",
                lessons: [
                    { name: "7. Building an AI Ethics Board", duration: "30 min" },
                    { name: "8. Capstone: AI Governance Policy Draft", duration: "40 min" }
                ]
            }
        ]
    },

    // ===================== TECHNOLOGY =====================
    "tech-1": {
        title: "Full-Stack Web Development Bootcamp",
        category: "Web Development",
        instructor: "Colt Steele",
        rating: 4.9,
        reviews: "28,900",
        duration: "65 Hours",
        lessonsCount: "82 Lessons",
        students: "112,000 Enrolled",
        price: "$94.99",
        originalPrice: "$189.99",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
        desc: "The complete full-stack bootcamp covering HTML, CSS, JavaScript, React, Node.js, Express, MongoDB, and deployment. Build 15+ real-world projects from scratch.",
        outcomes: [
            "Build responsive websites with HTML5, CSS3 & modern JavaScript",
            "Create dynamic frontends with React 19 & Next.js 14",
            "Develop REST APIs with Node.js, Express & MongoDB",
            "Implement authentication, authorization & session management",
            "Deploy full-stack apps to Vercel, Railway & AWS",
            "Build a portfolio with 15+ production-ready projects"
        ],
        chapters: [
            {
                title: "Module 1: HTML, CSS & JavaScript Foundations",
                lessons: [
                    { name: "1. Web Development Roadmap 2026", duration: "15 min" },
                    { name: "2. HTML5 Semantic Elements & Forms", duration: "35 min" },
                    { name: "3. CSS Flexbox, Grid & Animations", duration: "45 min" }
                ]
            },
            {
                title: "Module 2: React & Frontend Architecture",
                lessons: [
                    { name: "4. React Components, Props & State", duration: "40 min" },
                    { name: "5. React Router & SPA Navigation", duration: "30 min" },
                    { name: "6. Next.js 14: SSR & API Routes", duration: "50 min" }
                ]
            },
            {
                title: "Module 3: Backend & Database",
                lessons: [
                    { name: "7. Node.js & Express REST API", duration: "45 min" },
                    { name: "8. MongoDB, Mongoose & CRUD Operations", duration: "40 min" },
                    { name: "9. Capstone: Full-Stack E-Commerce App", duration: "60 min" }
                ]
            }
        ]
    },

    "tech-2": {
        title: "Python for Data Science & Machine Learning",
        category: "Data Science",
        instructor: "Jose Portilla",
        rating: 4.8,
        reviews: "21,500",
        duration: "42 Hours",
        lessonsCount: "56 Lessons",
        students: "89,300 Enrolled",
        price: "$84.99",
        originalPrice: "$169.99",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
        desc: "Complete Python bootcamp for data science covering NumPy, Pandas, Matplotlib, Seaborn, Scikit-Learn, and TensorFlow. Build real ML models and data analysis dashboards.",
        outcomes: [
            "Master Python programming from basics to advanced OOP",
            "Manipulate and analyze data with NumPy & Pandas",
            "Create stunning visualizations with Matplotlib & Seaborn",
            "Build ML models: Regression, Classification & Clustering",
            "Implement neural networks with TensorFlow & Keras",
            "Complete 10+ real-world data science projects"
        ],
        chapters: [
            {
                title: "Module 1: Python & Data Manipulation",
                lessons: [
                    { name: "1. Python Setup & Jupyter Notebooks", duration: "15 min", videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8" },
                    { name: "2. NumPy Arrays & Matrix Operations", duration: "35 min", videoUrl: "https://www.youtube.com/embed/QUT1VHiLmmI" },
                    { name: "3. Pandas DataFrames & Data Cleaning", duration: "45 min", videoUrl: "https://www.youtube.com/embed/vmEHCJofslg" }
                ]
            },
            {
                title: "Module 2: Data Visualization & EDA",
                lessons: [
                    { name: "4. Matplotlib: Charts & Custom Plots", duration: "30 min", videoUrl: "https://www.youtube.com/embed/OZOOLe2imFo" },
                    { name: "5. Seaborn: Statistical Visualizations", duration: "25 min", videoUrl: "https://www.youtube.com/embed/ooqXQ375704" },
                    { name: "6. Exploratory Data Analysis Project", duration: "40 min", videoUrl: "https://www.youtube.com/embed/r-uOLxNrNk8" }
                ]
            },
            {
                title: "Module 3: Machine Learning with Scikit-Learn",
                lessons: [
                    { name: "7. Linear & Logistic Regression", duration: "40 min", videoUrl: "https://www.youtube.com/embed/i_LwzRVP7bg" },
                    { name: "8. Decision Trees & Random Forests", duration: "35 min", videoUrl: "https://www.youtube.com/embed/7VeUPuFGJHk" },
                    { name: "9. Capstone: End-to-End ML Pipeline", duration: "50 min", videoUrl: "https://www.youtube.com/embed/GwIo3gDZCVQ" }
                ]
            }
        ]
    },

    "tech-3": {
        title: "Modern React Architecture & Next.js 14",
        category: "Frontend Engineering",
        instructor: "Maximilian Schwarzmüller",
        rating: 4.9,
        reviews: "18,300",
        duration: "38 Hours",
        lessonsCount: "48 Lessons",
        students: "67,500 Enrolled",
        price: "$79.99",
        originalPrice: "$159.99",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80",
        desc: "Master modern React patterns, Server Components, App Router, and full-stack Next.js 14. Build performant, SEO-optimized applications with TypeScript and Tailwind CSS.",
        outcomes: [
            "Build apps with React 19 Server Components & Actions",
            "Master Next.js 14 App Router, layouts & middleware",
            "Implement TypeScript for type-safe React development",
            "Create responsive UIs with Tailwind CSS & Framer Motion",
            "Handle data fetching, caching & revalidation strategies",
            "Deploy production apps with Vercel & edge functions"
        ],
        chapters: [
            {
                title: "Module 1: Modern React Patterns",
                lessons: [
                    { name: "1. React 19 New Features Overview", duration: "20 min" },
                    { name: "2. Server Components vs Client Components", duration: "35 min" },
                    { name: "3. Hooks Deep Dive: useOptimistic & useFormState", duration: "30 min" }
                ]
            },
            {
                title: "Module 2: Next.js 14 Architecture",
                lessons: [
                    { name: "4. App Router, Layouts & Loading States", duration: "40 min" },
                    { name: "5. Server Actions & Form Mutations", duration: "35 min" },
                    { name: "6. API Routes & Database Integration", duration: "45 min" }
                ]
            },
            {
                title: "Module 3: Production Deployment",
                lessons: [
                    { name: "7. Performance Optimization & Caching", duration: "30 min" },
                    { name: "8. Capstone: Full-Stack SaaS Dashboard", duration: "55 min" }
                ]
            }
        ]
    },

    "tech-4": {
        title: "AWS Certified Cloud Practitioner & Developer",
        category: "Cloud Computing",
        instructor: "Stephane Maarek",
        rating: 4.9,
        reviews: "31,000",
        duration: "28 Hours",
        lessonsCount: "36 Lessons",
        students: "140,000 Enrolled",
        price: "$89.99",
        originalPrice: "$179.99",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
        desc: "Prepare for AWS Cloud Practitioner & Developer Associate certifications. Master EC2, S3, Lambda, DynamoDB, API Gateway, and serverless architecture patterns.",
        outcomes: [
            "Pass the AWS Cloud Practitioner (CLF-C02) certification exam",
            "Deploy scalable applications on EC2, ECS & EKS",
            "Build serverless APIs with Lambda & API Gateway",
            "Implement storage solutions with S3, DynamoDB & RDS",
            "Set up CI/CD pipelines with CodePipeline & CodeDeploy",
            "Design cost-optimized, secure cloud architectures"
        ],
        chapters: [
            { title: "Module 1: AWS Core Services", lessons: [
                { name: "1. AWS Global Infrastructure", duration: "20 min" },
                { name: "2. EC2 Instances & Auto Scaling", duration: "35 min" },
                { name: "3. S3 Storage & CloudFront CDN", duration: "30 min" }
            ]},
            { title: "Module 2: Serverless & Databases", lessons: [
                { name: "4. AWS Lambda & Event-Driven Architecture", duration: "40 min" },
                { name: "5. DynamoDB & RDS Database Design", duration: "35 min" },
                { name: "6. API Gateway & REST API Development", duration: "30 min" }
            ]},
            { title: "Module 3: Certification Prep", lessons: [
                { name: "7. Security Best Practices & IAM", duration: "25 min" },
                { name: "8. Practice Exams & Review", duration: "60 min" }
            ]}
        ]
    },

    "tech-5": {
        title: "Cybersecurity Essentials & Ethical Hacking",
        category: "Cybersecurity",
        instructor: "Nathan House",
        rating: 4.7,
        reviews: "14,200",
        duration: "30 Hours",
        lessonsCount: "40 Lessons",
        students: "52,100 Enrolled",
        price: "$69.99",
        originalPrice: "$139.99",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
        desc: "Learn ethical hacking, penetration testing, network security, and vulnerability assessment. Master Kali Linux, Wireshark, Metasploit, and Bug Bounty hunting methodologies.",
        outcomes: [
            "Set up Kali Linux hacking lab environments",
            "Perform network scanning with Nmap & vulnerability assessment",
            "Exploit systems using Metasploit framework",
            "Analyze network traffic with Wireshark packet capture",
            "Understand web app security: SQL injection, XSS & CSRF",
            "Prepare for CompTIA Security+ certification exam"
        ],
        chapters: [
            { title: "Module 1: Security Fundamentals & Lab Setup", lessons: [
                { name: "1. Cybersecurity Landscape 2026", duration: "15 min" },
                { name: "2. Kali Linux Installation & Configuration", duration: "30 min" },
                { name: "3. Networking Essentials for Hackers", duration: "35 min" }
            ]},
            { title: "Module 2: Penetration Testing", lessons: [
                { name: "4. Network Scanning with Nmap", duration: "40 min" },
                { name: "5. Exploitation with Metasploit", duration: "45 min" },
                { name: "6. Web Application Security Testing", duration: "40 min" }
            ]},
            { title: "Module 3: Advanced Defense & Certification", lessons: [
                { name: "7. Incident Response & Forensics", duration: "35 min" },
                { name: "8. Capstone: Full Penetration Test Report", duration: "50 min" }
            ]}
        ]
    },

    "tech-6": {
        title: "Android Native App Development with Kotlin",
        category: "Mobile Development",
        instructor: "Denis Panjuta",
        rating: 4.8,
        reviews: "9,800",
        duration: "35 Hours",
        lessonsCount: "44 Lessons",
        students: "38,900 Enrolled",
        price: "$74.99",
        originalPrice: "$149.99",
        image: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?auto=format&fit=crop&w=800&q=80",
        desc: "Build modern Android apps with Kotlin, Jetpack Compose, MVVM architecture, Room database, and Retrofit. Publish production apps to Google Play Store.",
        outcomes: [
            "Master Kotlin programming language fundamentals",
            "Build beautiful UIs with Jetpack Compose",
            "Implement MVVM architecture with ViewModels & LiveData",
            "Handle local storage with Room database",
            "Consume REST APIs with Retrofit & Coroutines",
            "Publish your app to Google Play Store"
        ],
        chapters: [
            { title: "Module 1: Kotlin & Android Studio Setup", lessons: [
                { name: "1. Kotlin Language Essentials", duration: "30 min" },
                { name: "2. Android Studio & Project Structure", duration: "20 min" },
                { name: "3. Jetpack Compose UI Fundamentals", duration: "40 min" }
            ]},
            { title: "Module 2: Architecture & Data", lessons: [
                { name: "4. MVVM Pattern & State Management", duration: "35 min" },
                { name: "5. Room Database & Offline Storage", duration: "40 min" },
                { name: "6. Retrofit API Integration", duration: "35 min" }
            ]},
            { title: "Module 3: Production & Publishing", lessons: [
                { name: "7. Testing & Performance Optimization", duration: "30 min" },
                { name: "8. Capstone: Publish to Play Store", duration: "45 min" }
            ]}
        ]
    },

    "tech-7": {
        title: "Docker, Kubernetes & DevOps Infrastructure",
        category: "DevOps Engineering",
        instructor: "Mumshad Mannambeth",
        rating: 4.9,
        reviews: "16,400",
        duration: "25 Hours",
        lessonsCount: "32 Lessons",
        students: "59,000 Enrolled",
        price: "$84.99",
        originalPrice: "$169.99",
        image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=800&q=80",
        desc: "Master containerization with Docker, orchestration with Kubernetes, and CI/CD pipelines. Deploy microservices at scale with Helm, Terraform, and GitOps workflows.",
        outcomes: [
            "Containerize applications with Docker & multi-stage builds",
            "Deploy and manage Kubernetes clusters on EKS & GKE",
            "Create Helm charts for repeatable deployments",
            "Build CI/CD pipelines with GitHub Actions & ArgoCD",
            "Implement infrastructure as code with Terraform",
            "Monitor services with Prometheus & Grafana dashboards"
        ],
        chapters: [
            { title: "Module 1: Docker Containerization", lessons: [
                { name: "1. Containers vs Virtual Machines", duration: "15 min" },
                { name: "2. Dockerfile Best Practices", duration: "30 min" },
                { name: "3. Docker Compose & Multi-Container Apps", duration: "35 min" }
            ]},
            { title: "Module 2: Kubernetes Orchestration", lessons: [
                { name: "4. Pods, Deployments & Services", duration: "40 min" },
                { name: "5. ConfigMaps, Secrets & Volumes", duration: "30 min" },
                { name: "6. Helm Charts & Package Management", duration: "35 min" }
            ]},
            { title: "Module 3: CI/CD & GitOps", lessons: [
                { name: "7. GitHub Actions & ArgoCD Pipelines", duration: "40 min" },
                { name: "8. Capstone: Full Microservices Deployment", duration: "50 min" }
            ]}
        ]
    },

    "tech-8": {
        title: "Data Structures & Algorithms in Java",
        category: "Computer Science",
        instructor: "Tim Buchalka",
        rating: 4.8,
        reviews: "22,100",
        duration: "48 Hours",
        lessonsCount: "60 Lessons",
        students: "81,200 Enrolled",
        price: "$69.99",
        originalPrice: "$139.99",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
        desc: "Master data structures and algorithms for coding interviews. Cover arrays, linked lists, trees, graphs, dynamic programming, and solve 200+ LeetCode-style problems in Java.",
        outcomes: [
            "Implement arrays, linked lists, stacks & queues from scratch",
            "Master binary trees, BSTs, heaps & graph algorithms",
            "Solve dynamic programming problems with memoization",
            "Understand Big-O complexity analysis for time & space",
            "Practice 200+ coding interview problems (Easy to Hard)",
            "Prepare for FAANG-level technical interviews"
        ],
        chapters: [
            { title: "Module 1: Fundamentals & Linear Structures", lessons: [
                { name: "1. Big-O Notation & Complexity Analysis", duration: "25 min" },
                { name: "2. Arrays & Hash Tables", duration: "40 min" },
                { name: "3. Linked Lists, Stacks & Queues", duration: "45 min" }
            ]},
            { title: "Module 2: Trees & Graphs", lessons: [
                { name: "4. Binary Trees & BST Operations", duration: "40 min" },
                { name: "5. Graph Traversal: BFS & DFS", duration: "35 min" },
                { name: "6. Shortest Path: Dijkstra & A*", duration: "40 min" }
            ]},
            { title: "Module 3: Advanced Algorithms", lessons: [
                { name: "7. Dynamic Programming Patterns", duration: "50 min" },
                { name: "8. Mock Interview & Problem Solving", duration: "60 min" }
            ]}
        ]
    },

    // ===================== LANGUAGES =====================
    "lang-1": {
        title: "Complete Business English Communication",
        category: "Business English",
        instructor: "Emma Watson",
        rating: 4.9, reviews: "15,200", duration: "20 Hours", lessonsCount: "26 Lessons",
        students: "58,400 Enrolled", price: "$49.99", originalPrice: "$99.99",
        image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80",
        desc: "Master professional English for business meetings, presentations, email writing, and negotiations. Build confidence in corporate communication and cross-cultural business contexts.",
        outcomes: ["Deliver confident business presentations in English", "Write professional emails, reports & proposals", "Lead meetings and conference calls effectively", "Master negotiation vocabulary and techniques", "Understand cross-cultural communication nuances", "Earn a Business English proficiency certificate"],
        chapters: [
            { title: "Module 1: Professional Communication", lessons: [
                { name: "1. Business English Foundations", duration: "18 min" }, { name: "2. Email Writing Best Practices", duration: "25 min" }, { name: "3. Meeting Vocabulary & Phrases", duration: "20 min" }
            ]},
            { title: "Module 2: Presentations & Negotiations", lessons: [
                { name: "4. Structuring Business Presentations", duration: "30 min" }, { name: "5. Negotiation Language & Tactics", duration: "35 min" }, { name: "6. Cross-Cultural Communication", duration: "25 min" }
            ]},
            { title: "Module 3: Advanced Business Writing", lessons: [
                { name: "7. Reports, Proposals & Documentation", duration: "35 min" }, { name: "8. Capstone: Business Case Presentation", duration: "40 min" }
            ]}
        ]
    },

    "lang-2": {
        title: "Spanish Immersion for Absolute Beginners",
        category: "Spanish Language",
        instructor: "Carlos Ramirez",
        rating: 4.8, reviews: "11,400", duration: "32 Hours", lessonsCount: "40 Lessons",
        students: "42,100 Enrolled", price: "$39.99", originalPrice: "$79.99",
        image: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=800&q=80",
        desc: "Learn Spanish from zero through immersive conversation practice, grammar drills, cultural insights, and real-world scenario role-plays. Reach A2 conversational level.",
        outcomes: ["Hold basic everyday conversations in Spanish", "Master essential grammar: verb conjugations, tenses & pronouns", "Build vocabulary for travel, dining, shopping & socializing", "Understand Latin American vs Castilian Spanish differences", "Practice with native speaker audio exercises", "Prepare for DELE A2 certification exam"],
        chapters: [
            { title: "Module 1: Basics & Pronunciation", lessons: [
                { name: "1. Spanish Alphabet & Sounds", duration: "15 min" }, { name: "2. Greetings & Self Introduction", duration: "20 min" }, { name: "3. Numbers, Dates & Time", duration: "25 min" }
            ]},
            { title: "Module 2: Grammar & Conversation", lessons: [
                { name: "4. Present Tense Verb Conjugation", duration: "35 min" }, { name: "5. Everyday Conversation Practice", duration: "30 min" }, { name: "6. Restaurant & Shopping Scenarios", duration: "25 min" }
            ]},
            { title: "Module 3: Culture & Fluency", lessons: [
                { name: "7. Latin American Culture & Idioms", duration: "30 min" }, { name: "8. Capstone: Full Conversation Exam", duration: "40 min" }
            ]}
        ]
    },

    "lang-3": { title: "Conversational Mandarin Chinese Masterclass", category: "Mandarin Chinese", instructor: "Mei Ling", rating: 4.7, reviews: "7,800", duration: "28 Hours", lessonsCount: "34 Lessons", students: "26,900 Enrolled", price: "$59.99", originalPrice: "$119.99", image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=800&q=80", desc: "Learn Mandarin Chinese through tonal practice, character writing (Pinyin & Hanzi), and immersive conversation scenarios for travel and business.", outcomes: ["Master the 4 tones and Pinyin romanization system", "Read and write 500+ essential Chinese characters", "Hold basic conversations for travel and daily life", "Understand Chinese business etiquette and culture", "Practice with native speaker listening exercises", "Prepare for HSK 2 certification exam"], chapters: [{ title: "Module 1: Tones, Pinyin & Characters", lessons: [{ name: "1. Mandarin Tones & Pronunciation", duration: "20 min" }, { name: "2. Pinyin System & Typing", duration: "25 min" }, { name: "3. First 100 Characters", duration: "35 min" }]}, { title: "Module 2: Conversation & Grammar", lessons: [{ name: "4. Basic Sentence Structure", duration: "30 min" }, { name: "5. Daily Conversation Practice", duration: "25 min" }, { name: "6. Numbers, Money & Bargaining", duration: "20 min" }]}, { title: "Module 3: HSK Preparation", lessons: [{ name: "7. HSK 2 Reading & Listening Drills", duration: "40 min" }, { name: "8. Capstone: Mock HSK Exam", duration: "45 min" }]}] },

    "lang-4": { title: "German Language Certificate A1 - B2", category: "German Language", instructor: "Klaus Fischer", rating: 4.9, reviews: "9,300", duration: "45 Hours", lessonsCount: "56 Lessons", students: "34,500 Enrolled", price: "$69.99", originalPrice: "$139.99", image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80", desc: "Comprehensive German course from A1 beginner to B2 upper-intermediate. Master grammar, conversation, reading comprehension, and Goethe-Zertifikat exam preparation.", outcomes: ["Build German vocabulary from 0 to 4000+ words", "Master German grammar: cases, articles, verb forms", "Achieve B2-level conversational fluency", "Prepare for Goethe-Zertifikat B2 exam", "Understand German culture, idioms & expressions", "Practice writing formal letters and essays"], chapters: [{ title: "Module 1: A1-A2 Foundations", lessons: [{ name: "1. German Alphabet & Pronunciation", duration: "15 min" }, { name: "2. Greetings & Basic Phrases", duration: "20 min" }, { name: "3. Nominative & Accusative Cases", duration: "35 min" }]}, { title: "Module 2: B1 Intermediate", lessons: [{ name: "4. Dative Case & Prepositions", duration: "30 min" }, { name: "5. Past Tenses: Perfekt & Präteritum", duration: "35 min" }, { name: "6. Conversation: Work & Travel", duration: "25 min" }]}, { title: "Module 3: B2 & Exam Prep", lessons: [{ name: "7. Subjunctive Mood & Complex Sentences", duration: "40 min" }, { name: "8. Goethe B2 Mock Exam", duration: "50 min" }]}] },

    "lang-5": { title: "French Fluency through Real Conversation", category: "French Language", instructor: "Camille Dubois", rating: 4.8, reviews: "8,100", duration: "24 Hours", lessonsCount: "30 Lessons", students: "29,800 Enrolled", price: "$44.99", originalPrice: "$89.99", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80", desc: "Learn French through real conversation practice, everyday scenarios, and cultural immersion. Focus on spoken fluency, pronunciation, and practical communication.", outcomes: ["Speak conversational French for travel and daily life", "Master French pronunciation, liaisons & nasal vowels", "Understand spoken French in movies, news & podcasts", "Write informal and formal French communications", "Explore French culture, cuisine & social etiquette", "Prepare for DELF B1 certification"], chapters: [{ title: "Module 1: Pronunciation & Basics", lessons: [{ name: "1. French Sounds & Alphabet", duration: "18 min" }, { name: "2. Essential Phrases & Greetings", duration: "20 min" }, { name: "3. Present Tense Conjugation", duration: "30 min" }]}, { title: "Module 2: Conversation Practice", lessons: [{ name: "4. Café, Restaurant & Shopping", duration: "25 min" }, { name: "5. Travel & Direction Vocabulary", duration: "20 min" }, { name: "6. Expressing Opinions & Emotions", duration: "30 min" }]}, { title: "Module 3: Fluency & Culture", lessons: [{ name: "7. French Cinema & Music Analysis", duration: "35 min" }, { name: "8. Capstone: Live Conversation Exam", duration: "40 min" }]}] },

    "lang-6": { title: "Japanese N5 to N3 Exam Preparation", category: "Japanese Language", instructor: "Kenji Sato", rating: 4.9, reviews: "12,100", duration: "50 Hours", lessonsCount: "62 Lessons", students: "41,000 Enrolled", price: "$79.99", originalPrice: "$159.99", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80", desc: "Master Japanese from Hiragana to JLPT N3 level. Covers Katakana, Kanji, grammar patterns, reading comprehension, and listening practice with native speakers.", outcomes: ["Read and write Hiragana, Katakana & 600+ Kanji", "Master N5-N3 grammar patterns with example sentences", "Build vocabulary of 3000+ words for daily use", "Practice listening with anime, drama & news clips", "Understand Japanese honorific levels (Keigo)", "Pass JLPT N3 certification exam"], chapters: [{ title: "Module 1: Kana & N5 Basics", lessons: [{ name: "1. Hiragana & Katakana Mastery", duration: "30 min" }, { name: "2. Basic Sentence Patterns", duration: "25 min" }, { name: "3. First 100 Kanji Characters", duration: "40 min" }]}, { title: "Module 2: N4 Grammar & Conversation", lessons: [{ name: "4. Te-form & Verb Conjugations", duration: "35 min" }, { name: "5. Daily Life Conversations", duration: "30 min" }, { name: "6. Reading Short Passages", duration: "25 min" }]}, { title: "Module 3: N3 Preparation", lessons: [{ name: "7. Complex Grammar & Keigo", duration: "45 min" }, { name: "8. JLPT N3 Mock Test", duration: "60 min" }]}] },

    "lang-7": { title: "IELTS & TOEFL Speaking Band 8+ Masterclass", category: "English Exam Prep", instructor: "David Wills", rating: 4.9, reviews: "18,900", duration: "18 Hours", lessonsCount: "24 Lessons", students: "72,300 Enrolled", price: "$54.99", originalPrice: "$109.99", image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80", desc: "Achieve Band 8+ in IELTS Speaking and 28+ in TOEFL Speaking. Master fluency techniques, vocabulary expansion, pronunciation training, and high-scoring response templates.", outcomes: ["Score Band 8+ in IELTS Speaking with proven templates", "Achieve 28+ in TOEFL iBT Speaking section", "Master pronunciation, intonation & stress patterns", "Expand academic vocabulary by 2000+ words", "Practice with 50+ real exam speaking topics", "Get feedback on recorded speaking submissions"], chapters: [{ title: "Module 1: Speaking Foundations", lessons: [{ name: "1. IELTS & TOEFL Format Overview", duration: "15 min" }, { name: "2. Fluency & Coherence Techniques", duration: "25 min" }, { name: "3. Pronunciation Training Drills", duration: "30 min" }]}, { title: "Module 2: Response Templates", lessons: [{ name: "4. IELTS Part 2: Cue Card Strategy", duration: "35 min" }, { name: "5. TOEFL Independent Speaking Tasks", duration: "30 min" }, { name: "6. Band 9 Sample Answers Analysis", duration: "25 min" }]}, { title: "Module 3: Mock Exams", lessons: [{ name: "7. Full IELTS Speaking Mock Test", duration: "40 min" }, { name: "8. Full TOEFL Speaking Mock Test", duration: "35 min" }]}] },

    "lang-8": { title: "Arabic Language & Dialect Fundamentals", category: "Arabic Language", instructor: "Tariq Al-Mansoor", rating: 4.7, reviews: "4,500", duration: "26 Hours", lessonsCount: "32 Lessons", students: "15,200 Enrolled", price: "$49.99", originalPrice: "$99.99", image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80", desc: "Learn Modern Standard Arabic and conversational Egyptian dialect. Master the Arabic script, grammar foundations, and practical phrases for travel and business.", outcomes: ["Read and write Arabic script fluently", "Master Arabic grammar: root system, verb forms & cases", "Hold conversations in Egyptian dialect (Amiya)", "Understand Modern Standard Arabic (Fusha) news & media", "Learn cultural etiquette for Arabic-speaking countries", "Build vocabulary for travel, business & daily life"], chapters: [{ title: "Module 1: Arabic Script & Phonetics", lessons: [{ name: "1. Arabic Alphabet & Letter Forms", duration: "25 min" }, { name: "2. Vowels, Shadda & Tanween", duration: "20 min" }, { name: "3. Reading Practice: Signs & Labels", duration: "30 min" }]}, { title: "Module 2: Grammar & MSA", lessons: [{ name: "4. Root System & Word Patterns", duration: "35 min" }, { name: "5. Noun-Adjective Agreement", duration: "25 min" }, { name: "6. Present Tense Verb Conjugation", duration: "30 min" }]}, { title: "Module 3: Egyptian Dialect", lessons: [{ name: "7. Colloquial Egyptian Phrases", duration: "30 min" }, { name: "8. Capstone: Conversation Practice", duration: "40 min" }]}] },

    // ===================== COMMUNICATION =====================
    "comm-1": { title: "Public Speaking & Keynote Presentation Secrets", category: "Public Speaking", instructor: "Chris Anderson", rating: 4.9, reviews: "19,400", duration: "15 Hours", lessonsCount: "20 Lessons", students: "68,900 Enrolled", price: "$59.99", originalPrice: "$119.99", image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80", desc: "Overcome stage fright and deliver TED-quality presentations. Master storytelling, slide design, audience engagement, and impromptu speaking techniques.", outcomes: ["Overcome public speaking anxiety with proven techniques", "Structure compelling narratives using the TED framework", "Design minimalist, high-impact presentation slides", "Master vocal variety, pacing & stage movement", "Handle Q&A sessions and impromptu speaking", "Deliver a polished keynote presentation as capstone"], chapters: [{ title: "Module 1: Foundations & Mindset", lessons: [{ name: "1. Overcoming Public Speaking Fear", duration: "18 min" }, { name: "2. The TED Talk Formula", duration: "25 min" }, { name: "3. Storytelling Frameworks", duration: "30 min" }]}, { title: "Module 2: Delivery Techniques", lessons: [{ name: "4. Vocal Variety & Pacing", duration: "25 min" }, { name: "5. Body Language & Stage Presence", duration: "30 min" }, { name: "6. Slide Design Best Practices", duration: "20 min" }]}, { title: "Module 3: Practice & Performance", lessons: [{ name: "7. Handling Tough Q&A Sessions", duration: "25 min" }, { name: "8. Capstone: Record Your Keynote", duration: "35 min" }]}] },

    "comm-2": { title: "Executive Leadership & Team Management", category: "Leadership", instructor: "Simon Sinek", rating: 4.9, reviews: "24,100", duration: "18 Hours", lessonsCount: "24 Lessons", students: "95,000 Enrolled", price: "$89.99", originalPrice: "$179.99", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80", desc: "Develop executive leadership skills for managing teams, driving innovation, and building organizational culture. Covers servant leadership, OKRs, and strategic decision-making.", outcomes: ["Apply the 'Start With Why' leadership philosophy", "Set and track team OKRs (Objectives & Key Results)", "Master 1-on-1 coaching and performance feedback", "Build high-trust, psychologically safe teams", "Make strategic decisions under uncertainty", "Navigate organizational change and transformation"], chapters: [{ title: "Module 1: Leadership Foundations", lessons: [{ name: "1. Start With Why: Finding Purpose", duration: "20 min" }, { name: "2. Servant Leadership Principles", duration: "25 min" }, { name: "3. Building Trust in Teams", duration: "30 min" }]}, { title: "Module 2: Team Management", lessons: [{ name: "4. OKRs & Goal Setting", duration: "30 min" }, { name: "5. Effective 1-on-1 Meetings", duration: "25 min" }, { name: "6. Performance Reviews & Feedback", duration: "35 min" }]}, { title: "Module 3: Strategic Leadership", lessons: [{ name: "7. Decision Making Frameworks", duration: "30 min" }, { name: "8. Leading Through Change", duration: "40 min" }]}] },

    "comm-3": { title: "Negotiation Skills & Conflict Resolution", category: "Negotiation", instructor: "Chris Voss", rating: 4.9, reviews: "21,000", duration: "14 Hours", lessonsCount: "18 Lessons", students: "82,400 Enrolled", price: "$74.99", originalPrice: "$149.99", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80", desc: "Learn FBI-level negotiation tactics for business and life. Master tactical empathy, mirroring, labeling, calibrated questions, and conflict de-escalation strategies.", outcomes: ["Apply tactical empathy and active listening in negotiations", "Use mirroring and labeling to build instant rapport", "Ask calibrated questions that guide outcomes", "Handle salary negotiations and business deal closings", "De-escalate conflicts in professional and personal settings", "Practice with 20+ real-world negotiation scenarios"], chapters: [{ title: "Module 1: Core Negotiation Principles", lessons: [{ name: "1. Never Split the Difference Philosophy", duration: "20 min" }, { name: "2. Tactical Empathy Explained", duration: "25 min" }, { name: "3. Mirroring & Labeling Techniques", duration: "30 min" }]}, { title: "Module 2: Advanced Tactics", lessons: [{ name: "4. Calibrated Questions & The Ackerman Model", duration: "35 min" }, { name: "5. Salary & Business Deal Negotiation", duration: "30 min" }, { name: "6. Dealing with Difficult Counterparts", duration: "25 min" }]}, { title: "Module 3: Conflict Resolution", lessons: [{ name: "7. De-escalation & Mediation Strategies", duration: "30 min" }, { name: "8. Capstone: Live Negotiation Roleplay", duration: "40 min" }]}] },

    "comm-4": { title: "Emotional Intelligence (EQ) in the Workplace", category: "Emotional Intelligence", instructor: "Dr. Daniel Goleman", rating: 4.8, reviews: "13,200", duration: "10 Hours", lessonsCount: "14 Lessons", students: "48,100 Enrolled", price: "$44.99", originalPrice: "$89.99", image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80", desc: "Develop emotional intelligence for career growth. Master self-awareness, empathy, social skills, and emotional regulation to become a more effective leader and communicator.", outcomes: ["Understand the 5 pillars of emotional intelligence", "Develop self-awareness through mindfulness practices", "Master empathy and perspective-taking in the workplace", "Regulate emotions during high-stress situations", "Build stronger professional relationships", "Apply EQ to leadership and team management"], chapters: [{ title: "Module 1: Self-Awareness & Regulation", lessons: [{ name: "1. What is Emotional Intelligence?", duration: "15 min" }, { name: "2. Self-Awareness Exercises", duration: "20 min" }, { name: "3. Emotional Regulation Techniques", duration: "25 min" }]}, { title: "Module 2: Social Skills & Empathy", lessons: [{ name: "4. Active Listening & Empathy Mapping", duration: "25 min" }, { name: "5. Building Rapport in Teams", duration: "30 min" }, { name: "6. Managing Difficult Conversations", duration: "25 min" }]}, { title: "Module 3: EQ in Leadership", lessons: [{ name: "7. Emotionally Intelligent Leadership", duration: "30 min" }, { name: "8. Capstone: EQ Action Plan", duration: "25 min" }]}] },

    "comm-5": { title: "Persuasive Business Writing & Email Etiquette", category: "Business Writing", instructor: "Rachel Green", rating: 4.7, reviews: "8,600", duration: "8 Hours", lessonsCount: "12 Lessons", students: "31,200 Enrolled", price: "$34.99", originalPrice: "$69.99", image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80", desc: "Write clear, persuasive business communications. Master email etiquette, report writing, proposal creation, and executive-level communication that drives results.", outcomes: ["Write professional emails that get responses", "Structure business reports and executive summaries", "Create compelling proposals and pitch documents", "Master tone, brevity, and clarity in writing", "Avoid common business writing mistakes", "Develop a personal writing style guide"], chapters: [{ title: "Module 1: Email Mastery", lessons: [{ name: "1. Email Structure & Subject Lines", duration: "15 min" }, { name: "2. Tone & Professionalism", duration: "20 min" }, { name: "3. Follow-ups & Cold Outreach", duration: "25 min" }]}, { title: "Module 2: Business Documents", lessons: [{ name: "4. Report Writing Framework", duration: "30 min" }, { name: "5. Proposal & Pitch Decks", duration: "25 min" }, { name: "6. Executive Summaries", duration: "20 min" }]}, { title: "Module 3: Advanced Writing", lessons: [{ name: "7. Persuasive Writing Techniques", duration: "25 min" }, { name: "8. Capstone: Complete Communication Package", duration: "30 min" }]}] },

    "comm-6": { title: "Mastering Cross-Cultural Team Collaboration", category: "Global Communication", instructor: "Prof. Erin Meyer", rating: 4.8, reviews: "6,400", duration: "12 Hours", lessonsCount: "16 Lessons", students: "22,500 Enrolled", price: "$49.99", originalPrice: "$99.99", image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80", desc: "Navigate cultural differences in global teams. Master the Culture Map framework, adapt communication styles, and build inclusive team dynamics across 8 cultural dimensions.", outcomes: ["Understand the 8 scales of the Culture Map framework", "Adapt communication style for high vs low context cultures", "Navigate hierarchy, feedback, and decision-making across cultures", "Build inclusive meeting practices for distributed teams", "Handle cultural misunderstandings with empathy", "Create a personal cross-cultural action plan"], chapters: [{ title: "Module 1: Culture Map Framework", lessons: [{ name: "1. Introduction to Cultural Dimensions", duration: "20 min" }, { name: "2. Communication: High vs Low Context", duration: "25 min" }, { name: "3. Feedback: Direct vs Indirect", duration: "25 min" }]}, { title: "Module 2: Working Across Cultures", lessons: [{ name: "4. Decision Making & Hierarchy", duration: "30 min" }, { name: "5. Trust Building: Task vs Relationship", duration: "25 min" }, { name: "6. Leading Global Virtual Teams", duration: "30 min" }]}, { title: "Module 3: Practical Application", lessons: [{ name: "7. Case Studies: Global Team Challenges", duration: "35 min" }, { name: "8. Capstone: Cross-Cultural Action Plan", duration: "30 min" }]}] },

    "comm-7": { title: "Body Language & Non-Verbal Mastery", category: "Body Language", instructor: "Vanessa Van Edwards", rating: 4.8, reviews: "15,300", duration: "11 Hours", lessonsCount: "16 Lessons", students: "54,000 Enrolled", price: "$39.99", originalPrice: "$79.99", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80", desc: "Decode body language signals and master non-verbal communication. Learn power poses, micro-expressions, hand gestures, and spatial dynamics for professional success.", outcomes: ["Read micro-expressions and facial action coding", "Use power poses and confident body positioning", "Master hand gestures for impactful presentations", "Detect deception through non-verbal cues", "Improve first impressions in interviews & networking", "Apply body language insights in video calls"], chapters: [{ title: "Module 1: Body Language Science", lessons: [{ name: "1. Introduction to Non-Verbal Communication", duration: "15 min" }, { name: "2. Micro-Expressions & Facial Coding", duration: "25 min" }, { name: "3. Posture & Power Poses", duration: "20 min" }]}, { title: "Module 2: Practical Application", lessons: [{ name: "4. Hand Gestures & Presentation Body Language", duration: "25 min" }, { name: "5. Spatial Dynamics & Proximity", duration: "20 min" }, { name: "6. Video Call Body Language", duration: "25 min" }]}, { title: "Module 3: Advanced Reading", lessons: [{ name: "7. Detecting Deception & Discomfort", duration: "30 min" }, { name: "8. Capstone: Body Language Audit", duration: "35 min" }]}] },

    "comm-8": { title: "Storytelling for Tech Leaders & Product Managers", category: "Storytelling", instructor: "Matthew Dicks", rating: 4.9, reviews: "9,100", duration: "13 Hours", lessonsCount: "18 Lessons", students: "36,800 Enrolled", price: "$59.99", originalPrice: "$119.99", image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80", desc: "Use storytelling to influence stakeholders, pitch products, and inspire teams. Master narrative structure, data storytelling, and the art of making technical ideas resonate.", outcomes: ["Structure compelling stories using the 5-second moment technique", "Use storytelling in product pitches and stakeholder updates", "Transform data and metrics into engaging narratives", "Build your personal brand story for networking", "Present technical concepts to non-technical audiences", "Master impromptu storytelling for meetings and events"], chapters: [{ title: "Module 1: Storytelling Fundamentals", lessons: [{ name: "1. The Science of Story & Memory", duration: "18 min" }, { name: "2. Finding Your Story: The 5-Second Moment", duration: "25 min" }, { name: "3. Story Structure: Beginning, Stakes, Resolution", duration: "30 min" }]}, { title: "Module 2: Business Storytelling", lessons: [{ name: "4. Product Pitch Storytelling", duration: "25 min" }, { name: "5. Data Storytelling & Visualization", duration: "30 min" }, { name: "6. Personal Brand Narrative", duration: "20 min" }]}, { title: "Module 3: Advanced Techniques", lessons: [{ name: "7. Impromptu Storytelling Skills", duration: "25 min" }, { name: "8. Capstone: Live Storytelling Performance", duration: "40 min" }]}] }
};

export const getCourseDetail = (id) => {
    let course = null;
    // Check localStorage admin_courses first
    try {
        const saved = localStorage.getItem('admin_courses');
        if (saved) {
            const list = JSON.parse(saved);
            const found = list.find(c => c.id === id);
            if (found) {
                // If admin customized chapters/videos exist, prioritize them!
                const freshCourse = (id && courseDetailData[id]) ? courseDetailData[id] : null;
                course = {
                    ...found,
                    chapters: (found.chapters && found.chapters.length > 0)
                        ? found.chapters
                        : (freshCourse && freshCourse.chapters ? freshCourse.chapters : [])
                };
            }
        }
    } catch (e) { }

    if (!course) {
        course = (id && courseDetailData[id]) ? courseDetailData[id] : courseDetailData['ai-1'];
    }

    // Ensure standard paid/free properties exist
    const isPaid = course.isPaid !== undefined 
        ? course.isPaid 
        : (course.price && !String(course.price).toLowerCase().includes('free'));

    // Convert any dollar ($) price or custom price to clean INR format
    let formattedPrice = 'Free';
    let numericInr = 0;
    if (isPaid) {
        if (course.inrPrice && !isNaN(Number(course.inrPrice))) {
            numericInr = Number(course.inrPrice);
        } else if (course.price && String(course.price).includes('$')) {
            const num = parseFloat(String(course.price).replace(/[^0-9.]/g, ''));
            numericInr = !isNaN(num) ? Math.round(num * 80) : 499;
        } else if (course.price && String(course.price).includes('₹')) {
            const num = parseFloat(String(course.price).replace(/[^0-9.]/g, ''));
            numericInr = !isNaN(num) ? Math.round(num) : 499;
        } else if (course.price && !isNaN(parseFloat(course.price))) {
            numericInr = Math.round(parseFloat(course.price));
        } else {
            numericInr = 499;
        }
        formattedPrice = `₹${numericInr}`;
    }

    let formattedOriginalPrice = '₹1,999';
    if (isPaid) {
        if (course.originalPrice && String(course.originalPrice).includes('$')) {
            const num = parseFloat(String(course.originalPrice).replace(/[^0-9.]/g, ''));
            formattedOriginalPrice = `₹${!isNaN(num) ? Math.round(num * 80) : numericInr * 3}`;
        } else if (course.originalPrice && String(course.originalPrice).includes('₹')) {
            formattedOriginalPrice = course.originalPrice;
        } else {
            formattedOriginalPrice = `₹${numericInr * 3 || 1999}`;
        }
    }

    return {
        ...course,
        id: course.id || id || 'ai-1',
        isPaid: isPaid,
        inrPrice: numericInr,
        price: formattedPrice,
        originalPrice: formattedOriginalPrice,
        includesCertificate: course.includesCertificate !== undefined ? course.includesCertificate : isPaid,
        includesSourceCode: course.includesSourceCode !== undefined ? course.includesSourceCode : isPaid,
        includesQuizzes: course.includesQuizzes !== undefined ? course.includesQuizzes : isPaid,
        includesDoubtSupport: course.includesDoubtSupport !== undefined ? course.includesDoubtSupport : isPaid
    };
};

export default courseDetailData;
