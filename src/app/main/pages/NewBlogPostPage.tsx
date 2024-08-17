import { useNavigate } from "react-router-dom";

const NewBlogPostPage = () => {
  const navigate = useNavigate();

  const goToBlogDetail = (id: number) => {
    navigate(`/post/${id}`);
  };

  return (
    <div>
      <h1 onClick={() => goToBlogDetail(1)}>NewBlogPostPage</h1>
    </div>
  );
};

export default NewBlogPostPage;
