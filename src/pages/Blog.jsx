import { useEffect, useRef, useState } from "react";
import "../styles/Blog.css";
 import { useAuth } from "../auth/AuthContext";

/* LS_KEY to store data in local storage */
const LS_KEY = "blog_posts";

function readPosts() {

  /* Try to get blog posts from website local storage */
  try {

    let raw = localStorage.getItem(LS_KEY);

    let arr;

    if (raw) {
      arr = JSON.parse(raw);
    } else {
      arr = [];
    }

    if (Array.isArray(arr)) {
      return arr;
    } else {
      return [];
    }

  } catch {

    return [];
  }
}

/* Save posts to website localstorage */
function savePosts(posts) {

  localStorage.setItem(LS_KEY, JSON.stringify(posts));
}

function normalizeTags(text) {

  return text

    /* Split multiple tags seperated by comma up */
    .split(",")
    .map(function (t) {
  
      /* Convert to lowercase */
      return t.trim().toLowerCase();
    })

    /* Remove empty tags */
    .filter(function (t) {

      return t.length > 0;
    });
}

export default function Blog() {

  const { isLoggedIn } = useAuth();

  /* Set initial states for react hooks */
  const [posts, setPosts] = useState(readPosts);
  const [term, setTerm] = useState("");
  const [tagOnly, setTagOnly] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  /* Sets reference to DOM Objects */
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const tagsRef = useRef(null);
  const fileRef = useRef(null);

  function persistPosts() {
    savePosts(posts);
  }

  /* Reload posts on change */
  useEffect(persistPosts, [posts]);

  /* Create new blog post */
  function onCreate(event) {

    /* Stop browser reload */
    event.preventDefault();

    /* Set DOM elements */
    const titleEl = titleRef.current;
    const contentEl = contentRef.current;
    const tagsEl = tagsRef.current;
    const fileEl = fileRef.current;

    /* Trim up values and normalize */
    let title;
    if (titleEl) {
      title = titleEl.value.trim();
    } else {
      title = "";
    }

    let content;

    /* Build the blog */

    if (contentEl) {
      content = contentEl.value.trim();
    } else {
      content = "";
    }

    let tags;
    if (tagsEl) {
      tags = normalizeTags(tagsEl.value);
    } else {
      tags = [];
    }

    let file;
    if (fileEl && fileEl.files && fileEl.files.length > 0) {
      file = fileEl.files[0];
    } else {
      file = null;
    }

    if (!title) {
      alert("Please add a title.");
      return;
    }

    /* Self explanatory */
    function makePost(imageDataUrl) {
      return {
        id: String(Date.now()),
        title: title,
        content: content,
        tags: tags,
        image: imageDataUrl || null,
        date: new Date().toISOString(),
      };
    }

    /* Put the new post to the front of posts */
    function commit(post) {

      /* Triggers re-render (useEffect) */
      setPosts(function (prev) {
        return [post].concat(prev);
      });

      /* Clear form fields so input form resets after posting */
      if (titleEl) titleEl.value = "";
      if (contentEl) contentEl.value = "";
      if (tagsEl) tagsEl.value = "";
      if (fileEl) fileEl.value = "";
    }

    /* Helper function for posting photos in blog */
    function handleReaderLoad(reader) {
      commit(makePost(reader.result));
    }

    /* Error, dont post image */
    function handleReaderError() {
      commit(makePost(null));
    }

    /* If image is selected to upload */
    if (file) {

      const reader = new FileReader();

      /* Reads the file */
      reader.onload = function () {
        handleReaderLoad(reader);
      };

      reader.onerror = function () {
        handleReaderError();
      };

      /* Convert image from binary into base64 string */
      reader.readAsDataURL(file);

    } else {

      /* No image selected */
      commit(makePost(null));
    }
  }

  function removePost(id) {

    /* prev = current posts array before deletion */
    setPosts(function (prev) {
      return prev.filter(function (p) {

        /* Create new posts array filtering out the id we want to delete */
        return p.id !== id;
      });
    });
  }

  function handleClearForm() {

    /* Just clears the text in the creat blog form when you press clear */
    if (titleRef.current) titleRef.current.value = "";
    if (contentRef.current) contentRef.current.value = "";
    if (tagsRef.current) tagsRef.current.value = "";
    if (fileRef.current) fileRef.current.value = "";
  }

  /* Helper functions that bind the React state change functions to buttons on the website */
  function handleTermChange(event) {
    setTerm(event.target.value);
  }

  function handleTagChange(event) {
    setTagOnly(event.target.value);
  }

  function handleSortChange(event) {
    setSortBy(event.target.value);
  }

  function handleResetFilters() {
    setTerm("");
    setTagOnly("");
    setSortBy("newest");
  }

  /* Ties the action for the delete button to removePost */
  function handleRemovePost(event) {
    
    let id;

    if (event.currentTarget && event.currentTarget.dataset) {

        id = event.currentTarget.dataset.id;
    
    } else {
  
        id = null;
    }
    
    if (id) {
      removePost(id);
    }
  }

  /* Filtering & sorting */

  /* Trim the term or taq we're searching for */
  const searchTerm = term.trim().toLowerCase();
  const tagSearch = tagOnly.trim().toLowerCase();

  function postMatches(post) {

    /* Build haystack */
    const haystack = (post.title + " " + post.content + " " + post.tags.join(" ")).toLowerCase();

    let matchesTerm;

    /* Search for term */
    if (searchTerm.length === 0) {
      matchesTerm = true;

    } else {
      matchesTerm = haystack.indexOf(searchTerm) !== -1;
    }

    let matchesTag;

    /* Search for tag */
    if (tagSearch.length === 0) {
      matchesTag = true;
    } else {
      matchesTag = post.tags.indexOf(tagSearch) !== -1;
    }

    return matchesTerm && matchesTag;
  }

  /* Compare dates between posts for sorting */
  function comparePosts(a, b) {

    const da = new Date(a.date).getTime();
    const db = new Date(b.date).getTime();

    if (sortBy === "newest") {
      return db - da;

    } else {

      return da - db;
    }
  }

  /* Finally filter and sort using lovely react functions */
  const filtered = posts.filter(postMatches).sort(comparePosts);

  // Render helpers to remove inline conditionals
  function renderImage(post) {
  
    if (post.image) {

      /* Create the image on the page */
      return <img src={post.image} alt="" className="post-image" />;

    } else {

      return null;
    }
  }

  /* Render tags */
  function renderTags(post) {

    if (post.tags.length > 0) {

      /* loops through tags and adds them to the blog */
      return <div className="row wrap tags">{post.tags.map(renderTagChip)}</div>;

    } else {

      return null;
    }
  }

  function renderTagChip(tag, index) {
    return (

      /* Creates the little pill box the tags go in */
      <span key={index} className="chip">
        #{tag}
      </span>
    );
  }

  function renderContent(post) {

    if (post.content) {

      /* Renders the context of the blog post */
      return <p className="post-content">{post.content}</p>;

    } else {

      return null;
    }
  }

  function renderPost(post) {
    return (

      /* Assign a key to the article element from the post id to track the post */
      <article key={post.id} className="post">
        
        <div className="row space-between wrap">
          <h3 className="post-title">{post.title}</h3>
          <span className="post-date">{new Date(post.date).toLocaleString()}</span>
        </div>

        {renderImage(post)}
        {renderTags(post)}
        {renderContent(post)}

        <div>
          {isLoggedIn && (
            <button
              type="button"
              className="btn ghost"
              data-id={post.id}
              onClick={handleRemovePost}
            >
              Delete
            </button>
          )}
        </div>
      </article>
    );
  }

  /* Render the lists of posts */
  function renderPostsList() {

    if (filtered.length === 0) {
      return <p className="muted">No posts yet.</p>;

    } else {
      /* .map loops through filtered posts and calls renderPost on them */
      return filtered.map(renderPost);
    }
  }

  return (
    <div className="blog">

      {/* Create new post */}
      {!isLoggedIn ? (
        <div className="card">
          <h2 className="title">New Post</h2>
          <p className="muted">You must be logged in to create a blog post.</p>
        </div>
      ) : (
        <form onSubmit={onCreate} className="card">
          <h2 className="title">New Post</h2>
          <input ref={titleRef} type="text" placeholder="Title" className="input" />
          <textarea ref={contentRef} placeholder="Write something…" className="input textarea" />
          <input ref={tagsRef} type="text" placeholder="Tags (comma separated)" className="input" />
          <input ref={fileRef} type="file" accept="image/*" className="input file" />
          <div className="row">
            <button type="submit" className="btn">Post</button>
            <button type="button" className="btn ghost" onClick={handleClearForm}>Clear</button>
          </div>
        </form>
      )}

      {/* Term filters */}
      <div className="card">
        <div className="row wrap">
          <input
            className="input flex1"
            value={term}
            onChange={handleTermChange}
            placeholder="Search (single word is fine)"
          />

          {/* Tag filters */}
          <input
            className="input flex1"
            value={tagOnly}
            onChange={handleTagChange}
            placeholder="Filter by tag (single tag)"
          />

          {/* Date Sorting */}
          <select className="input" value={sortBy} onChange={handleSortChange}>
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>

          {/* Reset filters */}
          <button type="button" className="btn ghost" onClick={handleResetFilters}>
            Reset
          </button>
        </div>
      </div>

      {/* Posts */}
      <div className="list">{renderPostsList()}</div>
    </div>
  );
}
