import { useNavigate } from "react-router-dom";
import { Avatar, Button, Card, Grid, Stack, Typography } from "@mui/material";
import ReactHtmlParser from "html-react-parser";

interface probs {
  item: any;
  onReadMore: () => void;
}
const BlogCard = ({ item, onReadMore }: probs) => {
  const navigate = useNavigate();
  const goToBlogDetail = (id: number) => {
    onReadMore();
    navigate(`/post/${id}`);
  };
  const truncateHTML = (html: string, maxLength: number) => {
    let truncatedText = "";
    let totalLength = 0;

    const parts = ReactHtmlParser(html, {
      trim: true,
      replace: (domNode: any) => {
        if (domNode.type === "text") {
          const remainingLength = maxLength - totalLength;

          if (domNode.data.length + totalLength <= maxLength) {
            totalLength += domNode.data.length;
            truncatedText += domNode.data;
          } else {
            truncatedText += domNode.data.substring(0, remainingLength);
            totalLength += remainingLength;
          }
        } else if (totalLength < maxLength) {
          return domNode;
        }
      },
    });

    return truncatedText + "...";
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
    <Grid key={item.id} item>
      <Card
        sx={{
          position: "relative",
          borderRadius: "20px",
          height: "300px",
          backgroundColor: (theme) =>
            theme.palette.mode === "light" ? "#eaf2f9" : "#1E284E",
          p: 2,
        }}
      >
        <Stack direction={"row"} alignItems={"center"} spacing={2} mb={2}>
          <Avatar
            src={getImageUrl(item.imgUrl)}
            style={{ width: 100, height: 100 }}
          />
          <Typography variant="h6"> {ReactHtmlParser(item.title)}</Typography>
        </Stack>
        <Stack>
          <Typography variant="body2" align="justify">
            {" "}
            {item.content.length <= 250
              ? ReactHtmlParser(item.content)
              : ReactHtmlParser(truncateHTML(item.content, 250))}
          </Typography>
          <Button
            sx={{ position: "absolute", bottom: "15px", right: "20px" }}
            variant="contained"
            color="primary"
            onClick={() => goToBlogDetail(item.id)}
          >
            {" "}
            Read More
          </Button>
        </Stack>
      </Card>
    </Grid>
  );
};

export default BlogCard;
