import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  updateItem,
  fetchItemById,
  selectAllData,
} from "../../Features/dataManagement/dataSlice";
import { RootState, AppDispatch } from "../../store/store";
import {
  Button,
  Container,
  Typography,
  CircularProgress,
  Avatar,
  IconButton,
  Box,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface FormData {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  imgUrl: string | null;
}

const EditBlogPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector(selectAllData);
  const blogPost = data.find((item) => item.id === parseInt(id || "", 10));
  const status = useSelector((state: RootState) => state.data.status);

  const [imgUrl, setImgUrl] = useState<string | null>(blogPost?.imgUrl || null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { handleSubmit, reset, setValue } = useForm<FormData>({
    defaultValues: {
      title: blogPost?.title || "",
      content: blogPost?.content || "",
    },
  });

  useEffect(() => {
    if (!blogPost) {
      dispatch(fetchItemById(parseInt(id || "", 10)));
    } else {
      reset({
        title: blogPost?.title,
        content: blogPost?.content,
      });
      setImgUrl(blogPost?.imgUrl || null);
    }
  }, [id, blogPost, dispatch, reset]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setImageFile(selectedFile);
      setImgUrl(URL.createObjectURL(selectedFile));
    }
  };

  const onSubmit = (data: FormData) => {
    if (blogPost) {
      const updatedData = {
        id: blogPost.id,
        title: data.title,
        content: data.content,
        createdAt: blogPost.createdAt,
        imgUrl: imageFile ? URL.createObjectURL(imageFile) : imgUrl,
      };
      dispatch(updateItem({ id: blogPost.id, newData: updatedData }));
      navigate(`/post/${blogPost.id}`);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const getImageUrl = (imgUrl: string | File | null) => {
    if (!imgUrl) {
      return "";
    }
    if (typeof imgUrl === "string") {
      return imgUrl;
    } else {
      return URL.createObjectURL(imgUrl);
    }
  };

  if (status === "loading") {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  if (!blogPost) {
    return (
      <Container>
        <Typography variant="h6">Blog post not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Edit Blog Post
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "start",
            gap: 2,
          }}
        >
          <Box display="flex" alignItems="center" mb={3}>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="icon-button-file"
              type="file"
              onChange={handleImageChange}
            />
            <label htmlFor="icon-button-file">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <Avatar
                  src={getImageUrl(imgUrl)}
                  sx={{ width: 150, height: 150 }}
                />
                <PhotoCamera
                  sx={{ position: "absolute", right: -10, bottom: -10 }}
                />
              </IconButton>
            </label>
          </Box>
          <Box
            width={"100%"}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <ReactQuill
              value={blogPost?.title || ""}
              onChange={(value) => setValue("title", value)}
              placeholder="Write your title here..."
              style={{ height: "80px", marginBottom: "20px" }}
            />
            <ReactQuill
              value={blogPost?.content || ""}
              onChange={(value) => setValue("content", value)}
              placeholder="Write your content here..."
              style={{ height: "250px", marginBottom: "20px" }}
            />

            <Box mt={2}>
              <Button type="submit" variant="contained" color="primary">
                Update
              </Button>
              <Button
                type="button"
                variant="outlined"
                color="secondary"
                onClick={handleCancel}
                sx={{ ml: 2 }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      </form>
    </Container>
  );
};

export default EditBlogPostPage;
