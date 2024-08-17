import { useNavigate } from "react-router-dom";

const BlogListPage = () => {
  const navigate = useNavigate();

  const goToBlogDetail = (id: number) => {
    navigate(`/post/${id}`); // Belirtilen id'ye sahip blog detay sayfasına geçiş yapar
  };
  const goToBlogCreate = () => {
    navigate(`/new`); // Belirtilen id'ye sahip blog detay sayfasına geçiş yapar
  };

  return (
    <div>
      <h1 onClick={() => goToBlogDetail(1)}>BlogListPage</h1>
      <h1 onClick={goToBlogCreate}>BlogListPage</h1>
    </div>
  );
};

export default BlogListPage;
