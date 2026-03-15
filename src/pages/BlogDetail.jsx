import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Footer from '../components/Footer';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/blogs/${id}`);
        if(response.ok) {
           const data = await response.json();
           if (typeof data.images === 'string') {
              try { data.images = JSON.parse(data.images); } catch(e) { data.images = []; }
           }
           setBlog(data);
        } else {
           console.error("Blog not found");
        }
      } catch (err) {
        console.error("Error fetching blog:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div style={{ background: '#0F0F0F', minHeight: '100vh', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h2 className="animate-pulse">Loading story...</h2>
      </div>
    );
  }

  if (!blog) {
    return (
      <div style={{ background: '#0F0F0F', minHeight: '100vh', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h2>Story not found</h2>
        <button onClick={() => navigate('/blogs')} style={{marginTop: '1rem', padding: '1rem 2rem', background: '#c6ff00', color: 'black', border: 'none', borderRadius: '15px', cursor: 'pointer', fontWeight: 'bold'}}>Back to Stories</button>
      </div>
    );
  }

  return (
    <div className="blog-article-page">

      <style>{`
        .blog-article-page {
          background-color: #0F0F0F;
          min-height: 100vh;
          color: white;
          font-family: 'Inter', sans-serif;
        }

        .article-hero {
          height: 60vh;
          width: 100%;
          position: relative;
          display: flex;
          align-items: flex-end;
          background: url(${blog.image}) center/cover fixed;
        }

        .article-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, #0F0F0F 0%, rgba(15,15,15,0.4) 100%);
        }

        .article-header {
           position: relative;
           z-index: 2;
           padding: 4rem 15%;
           width: 100%;
           text-align: center;
        }

        .article-category {
           color: var(--primary, #c6ff00);
           font-weight: 800;
           letter-spacing: 2px;
           text-transform: uppercase;
           margin-bottom: 1.5rem;
           display: inline-block;
        }

        .article-title {
           font-size: 4rem;
           font-weight: 950;
           letter-spacing: -1.5px;
           line-height: 1.1;
           max-width: 1000px;
           margin: 0 auto;
           margin-bottom: 2rem;
        }

        .article-meta {
           display: flex;
           justify-content: center;
           align-items: center;
           gap: 2rem;
           color: rgba(255,255,255,0.7);
           font-weight: 600;
        }

        .meta-divider {
           width: 5px;
           height: 5px;
           background: var(--primary, #c6ff00);
           border-radius: 50%;
        }

        .article-container {
           max-width: 900px;
           margin: 0 auto;
           padding: 4rem 2rem;
           font-size: 1.25rem;
           line-height: 1.8;
           color: rgba(255,255,255,0.85);
        }

        .article-container p {
           margin-bottom: 2rem;
        }

        .article-container h2, 
        .article-container h3 {
           color: white;
           font-weight: 900;
           margin-top: 4rem;
           margin-bottom: 1.5rem;
           line-height: 1.3;
        }

        .article-container h2 { font-size: 2.5rem; }
        .article-container h3 { font-size: 2rem; }

        .article-container blockquote {
           border-left: 4px solid var(--primary, #c6ff00);
           padding: 2rem;
           margin: 3rem 0;
           background: rgba(255,255,255,0.02);
           font-style: italic;
           font-size: 1.5rem;
           border-radius: 0 20px 20px 0;
           color: white;
        }

        /* Hack for rendering raw text properly line-broken */
        .content-render {
           white-space: pre-wrap;
        }

        @media (max-width: 1024px) {
           .article-header { padding: 4rem 5%; }
           .article-title { font-size: 3rem; }
           .article-container { font-size: 1.15rem; }
        }
      `}</style>
      
      <section className="article-hero">
         <header className="article-header animate-fade-in-up">
            <span className="article-category">{blog.category}</span>
            <h1 className="article-title">{blog.title}</h1>
            <div className="article-meta">
               <span>By {blog.author}</span>
               <div className="meta-divider"></div>
               <span>{new Date(blog.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
               <div className="meta-divider"></div>
               <span>{Math.ceil(blog.content.length / 1000)} min read</span>
            </div>
         </header>
      </section>

      <main className="article-container animate-fade-in-up" style={{animationDelay: '0.2s'}}>
        {blog.excerpt && (
           <p style={{fontSize: '1.5rem', fontWeight: 600, color: 'white', marginBottom: '3rem'}}>
              {blog.excerpt}
           </p>
        )}
        <div className="content-render">
           {blog.content}
        </div>
        
        {blog.images && blog.images.length > 0 && (
          <div className="blog-gallery" style={{marginTop: '4rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem'}}>
             {blog.images.map((img, idx) => img && (
                <img key={idx} src={img} alt={`Story visual ${idx + 1}`} style={{width: '100%', height: '300px', objectFit: 'cover', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)'}} />
             ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default BlogDetail;
