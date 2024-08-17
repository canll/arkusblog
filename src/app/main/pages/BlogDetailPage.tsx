import { useNavigate } from "react-router-dom";

const BlogDetailPage = () => {
  const navigate = useNavigate();

  const goToBlogEdit = (id: number) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div>
      <h1 onClick={() => goToBlogEdit(1)}>BlogDetailPage</h1>
    </div>
  );
};

export default BlogDetailPage;
