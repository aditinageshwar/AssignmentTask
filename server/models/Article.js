import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500
    },
    content: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      required: true,
      enum: ['Technology', 'Business', 'Science', 'Health', 'Entertainment'],
      default: 'Technology'
    },
    imageUrl: {
      type: String,
      required: true
    },
    tags: {
      type: [String],
      default: []
    },
    readTime: {
      type: Number,
      default: 5
    },
    views: {
      type: Number,
      default: 0
    },
    publishedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

const Article = mongoose.model('Article', articleSchema);
export default Article;
