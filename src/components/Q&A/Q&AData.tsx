import { QAItem } from "../../components/Q&A/Q&ACarousel";

export interface EnhancedQAItem extends QAItem {
  hint?: string;
  id: string;
  question: string;
  answer: string;
}

export const hrQuestions: EnhancedQAItem[] = [
  {
    id: "q1",
    question: "Where do you see yourself in next five years?",
    answer: "I see myself being a more developed and grown up individual having a greater set of skills, command and in depth knowledge of the major technologies out there. I wish to grow not just as an individual but along with the entire company taking it to new heights and always doing my level best in ensuring I give my 100% and even more.",
    hint: "Focus on professional growth and alignment with company goals"
  },
  {
    id: "q2",
    question: "What are your expectations from company XYZ?",
    answer: "I expect myself being a more developed and grown up individual having a greater set of skills, command and in depth knowledge of the major technologies out there. I wish to grow not just as an individual but along with the entire company taking it to new heights and always doing my level best in ensuring I give my 100% and even more.",
    hint: "Discuss opportunities for learning, growth, and mutual benefit"
  },
  {
    id: "q3",
    question: "Can you describe your ideal work environment?",
    answer: "My ideal work environment is collaborative yet focused, where teams communicate effectively and support each other. I thrive in places that balance structure with creativity, providing clear expectations while allowing flexibility in approaching solutions. I value a culture that prioritizes continuous learning, constructive feedback, and celebrates both individual and team achievements.",
    hint: "Consider culture, collaboration, and work-life balance"
  },
  {
    id: "q4",
    question: "What is your greatest professional achievement?",
    answer: "My greatest professional achievement was leading a cross-functional team to successfully launch a new product line that exceeded revenue targets by 35% in its first quarter. By facilitating effective communication between design, engineering, and marketing teams, we were able to solve complex integration issues that had previously delayed the project. This experience taught me the value of collaborative problem-solving and strengthened my project management skills.",
    hint: "Highlight measurable results and skills demonstrated"
  },
  {
    id: "q5",
    question: "How do you handle stress and pressure?",
    answer: "I manage stress by maintaining perspective and breaking large challenges into smaller, actionable tasks. When facing pressure, I prioritize effectively, focus on solutions rather than problems, and ensure I maintain healthy work-life boundaries. I've found that regular exercise, mindfulness practices, and occasionally stepping back to reassess situations helps me stay productive and make better decisions even during high-pressure periods.",
    hint: "Discuss specific strategies and examples of effectiveness"
  }
];

export const technicalQuestions: EnhancedQAItem[] = [
  {
    id: "t1",
    question: "Explain the difference between REST and GraphQL",
    answer: "REST is an architectural style where clients request specific endpoints with fixed data structures. It typically requires multiple requests to gather related data from different resources. GraphQL, on the other hand, is a query language that allows clients to request exactly the data they need in a single request. While REST has better caching, GraphQL offers more flexibility, reduced over-fetching, and is often more efficient for complex applications with varied data requirements.",
    hint: "Compare fetching strategies, efficiency, and use cases"
  },
  {
    id: "t2",
    question: "What are the benefits of TypeScript over JavaScript?",
    answer: "TypeScript provides static type checking that helps identify errors during development rather than at runtime. It offers better tooling with enhanced autocompletion, navigation, and refactoring support. TypeScript's interfaces, generics, and type declarations make code more self-documenting and maintainable, especially in large projects. While adding a compilation step, these benefits typically lead to more robust applications and improved team coordination.",
    hint: "Think about type safety, developer experience, and maintenance"
  },
  {
    id: "t3",
    question: "How would you optimize website performance?",
    answer: "To optimize website performance, I would implement several strategies: minimize HTTP requests by bundling files and using CSS sprites; enable compression and caching for faster load times; optimize images through proper sizing and formats like WebP; utilize lazy loading for off-screen content; implement code splitting to load only what's needed initially; reduce server response time through efficient database queries and caching; and prioritize critical rendering path for better perceived performance.",
    hint: "Consider both frontend and backend optimizations"
  },
  {
    id: "t4",
    question: "Explain the concept of memoization in React",
    answer: "Memoization is an optimization technique in React that helps prevent unnecessary re-renders by caching the results of expensive function calls. React provides `useMemo` and `useCallback` hooks for this purpose. `useMemo` memoizes the return value of a function, while `useCallback` memoizes the function itself. By using these hooks, you can improve performance by avoiding redundant calculations and preventing child components from re-rendering when their props haven't changed.",
    hint: "Consider performance optimization techniques in React"
  }
];

export const behavioralQuestions: EnhancedQAItem[] = [
  {
    id: "b1",
    question: "Describe a situation where you had to adapt to a significant change",
    answer: "When my company underwent a sudden reorganization, my team was merged with another department with different methodologies and tools. I quickly scheduled one-on-one meetings with new team members to understand their workflows and expertise. I then organized knowledge-sharing sessions where both teams could present their best practices. By focusing on the complementary strengths of both approaches, I helped create a unified workflow that incorporated the best elements from each team, resulting in improved efficiency and team cohesion.",
    hint: "Focus on your adaptability and positive outcomes"
  },
  {
    id: "b2",
    question: "Tell me about a time you faced a difficult challenge in a team project",
    answer: "During a critical product launch, our team discovered a major technical issue just two weeks before the deadline. Rather than panicking, I organized an emergency problem-solving session where we broke down the issue into components and assigned specialized task forces. I implemented daily stand-ups to track progress and remove blockers quickly. By reprioritizing less critical features and coordinating extended working hours fairly among team members who could accommodate them, we delivered a stable product on time. This experience reinforced the importance of clear communication and collaborative problem-solving under pressure.",
    hint: "Highlight problem-solving skills and team collaboration"
  }
];
