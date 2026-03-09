import Bookmark from '../models/Bookmark.js';
import Article from '../models/Article.js';

export const getBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ user: req.userId })
      .populate('article')
      .sort({ createdAt: -1 });

    res.json(bookmarks.map(b => b.article));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const toggleBookmark = async (req, res) => {
  try {
    const { articleId } = req.body;

    // Check if article exists
    const article = await Article.findById(articleId);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    // Check if bookmark already exists
    const existingBookmark = await Bookmark.findOne({
      user: req.userId,
      article: articleId
    });

    if (existingBookmark) {
      // Remove bookmark
      await Bookmark.deleteOne({ _id: existingBookmark._id });
      res.json({ bookmarked: false, message: 'Bookmark removed' });
    } else {
      // Create bookmark
      const bookmark = new Bookmark({
        user: req.userId,
        article: articleId
      });
      await bookmark.save();
      res.status(201).json({ bookmarked: true, message: 'Bookmark added' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBookmark = async (req, res) => {
  try {
    const { articleId } = req.params;

    const bookmark = await Bookmark.findOneAndDelete({
      user: req.userId,
      article: articleId
    });

    if (!bookmark) {
      return res.status(404).json({ message: 'Bookmark not found' });
    }

    res.json({ message: 'Bookmark deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const checkBookmark = async (req, res) => {
  try {
    const { articleId } = req.params;

    const bookmark = await Bookmark.findOne({
      user: req.userId,
      article: articleId
    });

    res.json({ isBookmarked: !!bookmark });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
