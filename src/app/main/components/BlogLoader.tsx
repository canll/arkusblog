import { Grid, Skeleton, Stack } from "@mui/material";

const BlogLoader = () => {
  return (
    <Grid container spacing={3} sx={{ mt: 2 }}>
      {[...Array(3)]?.map((advisor, idx) => (
        <Grid key={`blogCardLoader-${idx}`} item xs={6} md={4}>
          <Stack direction={"row"} gap={2.4}>
            <Stack width={"25%"}>
              <Skeleton
                variant="rounded"
                width={"100%"}
                height={"80px"}
                sx={{ borderRadius: "50%" }}
              />
            </Stack>
            <Stack width={"80%"} pr={"1rem"} pb={"0.5rem"} pt={"0.5rem"}>
              <Skeleton variant="text" sx={{ fontSize: 13 }} />
              <Skeleton variant="text" sx={{ fontSize: 13 }} />
              <Skeleton variant="text" sx={{ fontSize: 13 }} />
              <Skeleton variant="text" sx={{ fontSize: 13 }} />
              <Skeleton variant="text" sx={{ fontSize: 13 }} />
            </Stack>
          </Stack>
        </Grid>
      ))}
    </Grid>
  );
};

export default BlogLoader;
