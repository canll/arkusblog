import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchData,
  selectAllData,
  setSearchText,
  selectSearchText,
} from "../../Features/dataManagement/dataSlice";
import { RootState, AppDispatch } from "../../store/store";
import { Box, Button, Grid, TextField } from "@mui/material";
import BlogCard from "../components/BlogCard";
import InfiniteScroll from "react-infinite-scroll-component";
import BlogLoader from "../components/BlogLoader";
const BlogListPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const data = useSelector(selectAllData);
  const searchText = useSelector(selectSearchText);
  const status = useSelector((state: RootState) => state.data.status);
  const error = useSelector((state: RootState) => state.data.error);
  const [page, setPage] = useState(1);
  const [blogs, setBlogs] = useState<any[]>([]); // Tüm blogları saklayacak state
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchData());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (status === "succeeded") {
      const filteredBlogs = data.filter((item) =>
        item.title.toLowerCase().includes(searchText.toLowerCase())
      );
      const newBlogs = filteredBlogs.slice((page - 1) * 6, page * 6);

      if (page === 1) {
        setBlogs(newBlogs);
      } else {
        setBlogs((prev) => [...prev, ...newBlogs]);
      }

      if (newBlogs.length < 6) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    }
  }, [status, page, searchText, data]);
  const loadMoreBlogs = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPage(1);
    dispatch(setSearchText(e.target.value));
  };
  const clearSearchText = () => {
    dispatch(setSearchText(""));
  };
  const goToBlogCreate = () => {
    navigate(`/new`);
    clearSearchText();
  };
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <Box>
      <Grid container spacing={3} direction={"row"} alignItems={"center"}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Search"
            variant="outlined"
            fullWidth
            value={searchText}
            onChange={handleSearchChange}
            style={{ margin: "20px 0" }}
          />
        </Grid>
        <Grid item xs={12} md={6} display={"flex"} justifyContent={"flex-end"}>
          <Button variant="contained" color="info" onClick={goToBlogCreate}>
            {" "}
            Create Blog
          </Button>
        </Grid>
      </Grid>

      <InfiniteScroll
        dataLength={blogs.length}
        next={loadMoreBlogs}
        hasMore={hasMore}
        loader={<BlogLoader />}
      >
        <Grid container spacing={2}>
          {blogs.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <BlogCard item={item} onReadMore={clearSearchText} />
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    </Box>
  );
};

export default BlogListPage;
