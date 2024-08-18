import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  selectAllData,
  deleteItem,
} from "../../Features/dataManagement/dataSlice";
import { AppDispatch } from "../../store/store";
import { Button, Typography, Box, Card, Stack, CardMedia } from "@mui/material";

import ReactHtmlParser from "html-react-parser";

const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", options);
};

const BlogDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector(selectAllData);
  const blogPost = data.find((item) => item.id === parseInt(id || "", 10));
  const formattedDate = formatDate(blogPost ? blogPost.createdAt : "");
  const handleDelete = (id: number) => {
    dispatch(deleteItem(id));
    navigate(`/`);
  };
  const handleEdit = (id: number) => {
    navigate(`/edit/${id}`);
  };
  const handleCancel = () => {
    navigate("/");
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
  return (
    <Box>
      <Card
        sx={{
          borderRadius: "20px",
          backgroundColor: (theme) =>
            theme.palette.mode === "light" ? "#eaf2f9" : "#1E284E",
          p: 2,
        }}
      >
        {blogPost?.imgUrl && (
          <CardMedia
            component="img"
            alt={".."}
            src={getImageUrl(blogPost.imgUrl)}
            sx={{ height: "180px", objectFit: "contain" }}
          />
        )}

        <Typography my={2} align="center" variant="h4">
          {" "}
          {blogPost ? ReactHtmlParser(blogPost.title) : ""}
        </Typography>

        <Stack direction={"row"} alignItems={"start"} spacing={7}>
          <Typography variant="body1" align="justify">
            {blogPost ? ReactHtmlParser(blogPost.content) : ""}
          </Typography>
        </Stack>
        <Typography sx={{ pt: 2 }} variant="body2" align="right">
          {formattedDate}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: 6,
            mt: 2,
          }}
        >
          {" "}
          <Button
            variant="contained"
            onClick={() => handleEdit(Number(blogPost?.id))}
          >
            {" "}
            Update Blog
          </Button>
          <Button
            color="error"
            variant="outlined"
            onClick={() => handleDelete(Number(blogPost?.id))}
          >
            {" "}
            Delete
          </Button>
          <Button
            type="button"
            variant="outlined"
            color="secondary"
            onClick={handleCancel}
            sx={{ ml: 2 }}
          >
            Back All Blogs
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default BlogDetailPage;
