import type { SkillStage } from "@/types";

export const skillStages: SkillStage[] = [
  {
    id: "acquired",
    title: "Compétences acquises",
    badge: "ACQUIS",
    description: "Les compétences déjà acquises, organisées par domaine.",
    categories: [
      {
        category: "Software Development",
        skills: ["Python", "Java", "JavaScript", "OOP", "Algorithms"],
      },
      {
        category: "Web Development",
        skills: [
          "Full-Stack",
          "REST APIs",
          "Front-End",
          "Back-End",
          "Web Architecture",
        ],
      },
      {
        category: "Data & AI",
        skills: [
          "Data Engineering",
          "Data Analytics",
          "Machine Learning",
          "NLP",
          "Generative AI",
          "AI Agents",
        ],
      },
      {
        category: "Cloud Computing",
        skills: [
          "AWS",
          "Google Cloud",
          "Cloud Architecture",
          "Cloud Engineering",
          "Cloud Operations",
        ],
      },
      {
        category: "DevOps & Systems",
        skills: [
          "Linux",
          "Bash",
          "Git",
          "CI/CD",
          "Containers",
          "System Administration",
        ],
      },
      {
        category: "Cybersecurity",
        skills: ["Cloud Security", "System Security", "Network Fundamentals"],
      },
    ],
  },
  {
    id: "in-progress",
    title: "Compétences en cours de validation",
    badge: "EN COURS",
    description: "Les compétences actuellement en cours de validation.",
    categories: [
      {
        category: "Advanced Software Engineering",
        skills: [
          "Java",
          "OOP",
          "Software Architecture",
          "Application Development",
        ],
      },
      {
        category: "Systems & Infrastructure",
        skills: [
          "Linux Administration",
          "System Administration",
          "Networking",
          "Infrastructure",
        ],
      },
      {
        category: "Cloud & AI Technologies",
        skills: [
          "AWS",
          "Google Cloud",
          "Machine Learning",
          "Generative AI",
          "NLP",
          "Cloud Security",
        ],
      },
      {
        category: "Project Development",
        skills: [
          "Full-Stack Projects",
          "2D Game Development",
          "IoT / Smart Systems",
          "Collaborative Development",
        ],
      },
    ],
  },
  {
    id: "upcoming",
    title: "Spécialisation Big Data & Intelligence Artificielle",
    badge: "À VENIR",
    description:
      "Les compétences qui seront développées lors de ma future spécialisation Big Data & IA, prévue de 2027 à 2029.",
    categories: [
      {
        category: "Big Data & Data Engineering",
        skills: [
          "Big Data",
          "Data Engineering",
          "Hadoop",
          "Apache Spark",
          "Data Streaming",
          "Real-Time Processing",
          "Distributed Computing",
          "Parallel Computing",
        ],
      },
      {
        category: "Artificial Intelligence & Machine Learning",
        skills: [
          "Machine Learning",
          "Classification",
          "Regression",
          "Clustering",
          "Deep Learning",
          "Image Classification",
          "Reinforcement Learning",
        ],
      },
      {
        category: "NLP & Generative AI",
        skills: [
          "Natural Language Processing",
          "Transformers",
          "LLM",
          "Fine-Tuning",
          "Generative AI",
          "AI Agents",
        ],
      },
      {
        category: "Cloud & Data Infrastructure",
        skills: [
          "Cloud Computing",
          "Distributed Clusters",
          "Scalability",
          "Cloud Architecture",
          "Data Infrastructure",
          "Large-Scale Data Processing",
        ],
      },
      {
        category: "Data Visualization & Analytics",
        skills: [
          "Data Analytics",
          "Data Visualization",
          "Structured Data",
          "Unstructured Data",
          "Data Interpretation",
        ],
      },
      {
        category: "AI Engineering & MLOps",
        skills: [
          "AI Integration",
          "Full-Stack AI Applications",
          "CI/CD",
          "GitHub Actions",
          "Model Integration",
          "AI Deployment",
        ],
      },
      {
        category: "AI Security, Ethics & Governance",
        skills: [
          "Data Security",
          "AI Security",
          "Explainable AI (XAI)",
          "Algorithmic Bias",
          "AI Governance",
          "AI Act",
          "GDPR / RGPD",
          "CNIL",
          "AI Compliance",
        ],
      },
    ],
  },
];
