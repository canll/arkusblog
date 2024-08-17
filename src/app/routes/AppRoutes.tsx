import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BlogListPage from "../main/pages/BlogListPage";
import BlogDetailPage from "../main/pages/BlogDetailPage";
import NewBlogPostPage from "../main/pages/NewBlogPostPage";
import EditBlogPostPage from "../main/pages/EditBlogPostPage";
import NotFoundPage from "../main/pages/NotFoundPage";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BlogListPage />} />
        <Route path="/post/:id" element={<BlogDetailPage />} />
        <Route path="/new" element={<NewBlogPostPage />} />
        <Route path="/edit/:id" element={<EditBlogPostPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
