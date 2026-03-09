import Article from '../models/Article.js';
import Bookmark from '../models/Bookmark.js';

export const getAllArticles = async (req, res) => {
  try {
    const { category, search, limit = 20, page = 1 } = req.query;
    const skip = (page - 1) * limit;

    let query = {};

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const articles = await Article.find(query)
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Article.countDocuments(query);

    res.json({
      articles,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    // Increment views
    article.views += 1;
    await article.save();

    // Check if bookmarked by current user
    let isBookmarked = false;
    if (req.userId) {
      const bookmark = await Bookmark.findOne({
        user: req.userId,
        article: article._id
      });
      isBookmarked = !!bookmark;
    }

    res.json({ ...article.toObject(), isBookmarked });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createArticle = async (req, res) => {
  try {
    const { title, description, content, author, category, imageUrl, tags, readTime } = req.body;

    const article = new Article({
      title,
      description,
      content,
      author,
      category,
      imageUrl,
      tags,
      readTime
    });

    await article.save();
    res.status(201).json(article);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.json(article);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    // Also delete related bookmarks
    await Bookmark.deleteMany({ article: article._id });

    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = ['Technology', 'Business', 'Science', 'Health', 'Entertainment'];
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
