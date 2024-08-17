import { useNavigate } from "react-router-dom";

const EditBlogPostPage = () => {
  const navigate = useNavigate();

  const goToBlogDetail = (id: number) => {
    navigate(`/post/${id}`); // Belirtilen id'ye sahip blog detay sayfasına geçiş yapar
  };

  return (
    <div>
      <h1 onClick={() => goToBlogDetail(1)}>EditBlogPostPage</h1>
    </div>
  );
};

export default EditBlogPostPage;
