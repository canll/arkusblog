import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <header style={{ padding: "10px", background: "#eee" }}>
        <h1>My Blog</h1>
        <nav>
          <p style={{ margin: "0 10px" }}>Home</p>
          <p style={{ margin: "0 10px" }}>New Post</p>
        </nav>
      </header>
      <main style={{ padding: "20px" }}>{children}</main>
      <footer
        style={{ padding: "10px", background: "#eee", textAlign: "center" }}
      >
        <p>&copy; 2024 My Blog</p>
      </footer>
    </div>
  );
};

export default Layout;
