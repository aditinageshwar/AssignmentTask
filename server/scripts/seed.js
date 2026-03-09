import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Article from '../models/Article.js';
import { connectDB, disconnectDB } from '../config/database.js';

dotenv.config();

const mockArticles = [
  {
    title: "AI Breakthroughs: How Machine Learning is Reshaping Tech",
    description: "Explore the latest developments in artificial intelligence and machine learning that are transforming industries worldwide.",
    content: "Artificial intelligence continues to evolve at an unprecedented pace. From natural language processing to computer vision, machine learning models are becoming increasingly sophisticated. Major tech companies are investing billions into AI research, leading to breakthroughs in autonomous systems, medical diagnostics, and predictive analytics.",
    author: "Sarah Chen",
    category: "Technology",
    imageUrl: "https://images.unsplash.com/photo-1677442d019cecf8ea990af989bda56a30a9f74f2?w=800&h=400&fit=crop",
    tags: ["AI", "Technology", "Machine Learning"],
    readTime: 8
  },
  {
    title: "The Future of Quantum Computing",
    description: "Understanding quantum computing and its potential to revolutionize technology as we know it.",
    content: "Quantum computing represents the next frontier in computational power. Unlike classical computers that use bits (0s and 1s), quantum computers use quantum bits or qubits, which can exist in multiple states simultaneously. This enables them to process vast amounts of information in parallel, solving problems that would take classical computers thousands of years.",
    author: "Michael Zhang",
    category: "Technology",
    imageUrl: "https://images.unsplash.com/photo-1635333904645-2a5ad629ffa8?w=800&h=400&fit=crop",
    tags: ["Quantum", "Computing", "Technology"],
    readTime: 10
  },
  {
    title: "Tech Giants Report Record Q4 Earnings",
    description: "Major technology companies exceed investor expectations with strong financial performance in the latest quarter.",
    content: "The latest earnings reports from major tech companies show impressive growth despite economic headwinds. Cloud services, AI products, and subscription models are driving revenue increases. Investors remain optimistic about the sector's long-term prospects, particularly in emerging technologies.",
    author: "James Wilson",
    category: "Business",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop",
    tags: ["Business", "Finance", "Tech"],
    readTime: 6
  },
  {
    title: "New Breakthrough in Cancer Research",
    description: "Scientists announce promising results from immunotherapy trials treating various cancer types.",
    content: "Researchers have made significant progress in cancer treatment through advanced immunotherapy techniques. Clinical trials show that new CAR-T cell therapies are effective against multiple cancer types. These developments offer hope for millions of patients worldwide and could transform cancer treatment protocols.",
    author: "Dr. Emma Thompson",
    category: "Science",
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=400&fit=crop",
    tags: ["Science", "Medicine", "Health"],
    readTime: 9
  },
  {
    title: "Climate Change: New Solutions Emerge",
    description: "Innovative approaches to carbon capture and renewable energy are gaining momentum worldwide.",
    content: "As climate change accelerates, new technologies for carbon capture and renewable energy storage are emerging. Companies are developing more efficient solar panels, advanced wind turbines, and next-generation battery systems. International cooperation and government incentives are accelerating the transition to sustainable energy.",
    author: "Lisa Anderson",
    category: "Science",
    imageUrl: "https://images.unsplash.com/photo-1497976750333-16e1529ef0ff?w=800&h=400&fit=crop",
    tags: ["Climate", "Environment", "Science"],
    readTime: 7
  },
  {
    title: "Latest Health Trends Everyone Should Know",
    description: "Discover the most important health and wellness trends that are shaping how we live in 2024.",
    content: "Health trends continue to evolve with a focus on preventive care, mental health, and personalized medicine. Wearable technology is becoming more sophisticated, enabling better health monitoring. Telemedicine adoption has increased significantly, making healthcare more accessible to remote populations.",
    author: "Dr. Robert Martinez",
    category: "Health",
    imageUrl: "https://images.unsplash.com/photo-1576091160599-112ba73d17d3?w=800&h=400&fit=crop",
    tags: ["Health", "Wellness", "Medicine"],
    readTime: 5
  },
  {
    title: "Streaming Wars: The Next Generation",
    description: "Entertainment platforms battle for dominance with new content and innovative features.",
    content: "The streaming industry continues to evolve with new competitors entering the market. Platforms are investing in original content, live events, and exclusive partnerships. Consumers benefit from more choice, though subscription fatigue is becoming a concern. The industry is shifting toward ad-supported models and bundling strategies.",
    author: "Peter Jackson",
    category: "Entertainment",
    imageUrl: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=800&h=400&fit=crop",
    tags: ["Entertainment", "Streaming", "Media"],
    readTime: 6
  },
  {
    title: "Major Studio Announces Ambitious Film Slate",
    description: "A leading entertainment company unveils plans for numerous blockbuster productions over the next three years.",
    content: "Hollywood studios are ramping up production of major blockbuster films and streaming series. With cinemas recovering and streaming platforms maturing, studios are investing heavily in content across all platforms. Franchises continue to dominate, with sequels and spinoffs of popular properties leading the release schedules.",
    author: "Jennifer Davis",
    category: "Entertainment",
    imageUrl: "https://images.unsplash.com/photo-1534972151404-c8e4ea4b5302?w=800&h=400&fit=crop",
    tags: ["Movies", "Entertainment", "Hollywood"],
    readTime: 5
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();
    
    // Clear existing articles
    await Article.deleteMany({});
    console.log('Cleared existing articles');

    // Insert mock articles
    const insertedArticles = await Article.insertMany(mockArticles);
    console.log(`Successfully seeded ${insertedArticles.length} articles`);

    await disconnectDB();
    console.log('Seeding completed');
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
};

seedDatabase();
