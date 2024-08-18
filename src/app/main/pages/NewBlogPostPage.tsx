import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { Button, Box, Avatar, IconButton, Typography } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  createItem,
  selectAllData,
} from "../../Features/dataManagement/dataSlice";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useDispatch, useSelector } from "react-redux";
const NewBlogPostPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [titleError, setTitleError] = useState(false);
  const [contentError, setContentError] = useState(false);
  const data = useSelector(selectAllData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  const validateFields = () => {
    let isValid = true;

    if (title.trim() === "") {
      setTitleError(true);
      isValid = false;
    } else {
      setTitleError(false);
    }

    if (content.trim() === "") {
      setContentError(true);
      isValid = false;
    } else {
      setContentError(false);
    }

    return isValid;
  };

  const generateNumericId = (existingIds: number[]): number => {
    return Math.max(...existingIds) + 1;
  };

  const existingIds = data.map((post) => post.id);

  const handleSubmit = () => {
    if (!validateFields()) {
      return;
    }

    const newId = generateNumericId(existingIds);
    const newBlogPost = {
      id: newId,
      title,
      content,
      createdAt: new Date().toISOString(),
      imgUrl: imageFile ? URL.createObjectURL(imageFile) : null,
    };

    dispatch(createItem(newBlogPost));
    navigate(`/post/${newId}`);
  };

  const getImageUrl = (file: File | null) => {
    return file ? URL.createObjectURL(file) : "";
  };

  return (
    <Box sx={{ maxWidth: 800, margin: "auto" }}>
      <Typography variant="h4" align="center" component="h1" gutterBottom>
        Create New Blog Post
      </Typography>
      <Box
        sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}
        display="flex"
        gap={3}
        alignItems="start"
      >
        <Box display="flex" justifyContent="center" alignItems="center">
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="icon-button-file"
            type="file"
            onChange={handleImageChange}
          />
          <label htmlFor="icon-button-file">
            <IconButton component="span">
              <Avatar
                src={getImageUrl(imageFile)}
                sx={{ width: 150, height: 150 }}
              />
              <PhotoCamera
                sx={{ position: "absolute", right: -10, bottom: -10 }}
              />
            </IconButton>
          </label>
        </Box>

        <Box width={"100%"} display={"flex"} flexDirection={"column"} gap={4}>
          <Box>
            <ReactQuill
              value={title}
              onChange={setTitle}
              placeholder="Write your title here..."
              style={{ height: "80px", marginBottom: "20px" }}
            />
            {titleError && (
              <Typography color="error" variant="body2">
                Title is required.
              </Typography>
            )}
          </Box>

          <Box>
            <ReactQuill
              value={content}
              onChange={setContent}
              placeholder="Write your content here..."
              style={{ height: "300px", marginBottom: "20px" }}
            />
            {contentError && (
              <Typography color="error" variant="body2">
                Content is required.
              </Typography>
            )}
          </Box>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
            onClick={handleSubmit}
          >
            Create Post
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default NewBlogPostPage;
