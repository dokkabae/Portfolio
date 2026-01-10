import "../styles/Home.css";
import ProfileImg from "../resources/profile.jpg"; // fallback image
import { useAuth } from "../auth/AuthContext";
import { useState, useRef } from "react";
import LoginForm from "../components/LoginForm";
import LogoutButton from "../components/LogoutButton";


/* Helper function to make plans and interests appear as a list */
/* split(\n) breaks up lines */
/* map(string.trim) removes whitespace */
/* .filter(boolean) removes empty lines */

const toList = (text) =>
  text.split("\n").map(string => string.trim()).filter(Boolean);

export default function Home() {

  const { isLoggedIn } = useAuth();
  const disabled = !isLoggedIn;
  const [showLogin, setShowLogin] = useState(false);
  
  /* Default values to set things up */
  const defaults = {

    name: "Ian du Toit",
    photo: ProfileImg,
    interests: ["Photography","Reading","Coding","Camping","Gaming"],
    plans: [
      "Become a software developer",
      "Move to South America",
      "Start making music",
      "Grow a beard",
      "Learn Mandarin"
    ]
  };

  /* Load the default values */
  const storedName = localStorage.getItem("name");
  const storedPhoto = localStorage.getItem("photo");
  const storedInterests = JSON.parse(localStorage.getItem("interests"));
  const storedPlans     = JSON.parse(localStorage.getItem("plans"));

  const nameRef = useRef(null);
  const interestsRef = useRef(null);
  const plansRef = useRef(null);
  const fileRef = useRef(null);

/* Save profile edits */
  const onSave = () => {

    /* Collect data from text fields */
    const name = (nameRef.current?.value || "").trim();
    const interests = toList(interestsRef.current?.value || "");
    const plans = toList(plansRef.current?.value || "");

    /* Keep the current stored photo for backup */
    const currentPhoto = localStorage.getItem("photo") || "";

    function persist(finalPhoto) {
    
      /* Send the items to browser local storage */
      localStorage.setItem("name", name);
      localStorage.setItem("photo", finalPhoto);
      localStorage.setItem("interests", JSON.stringify(interests));
      localStorage.setItem("plans", JSON.stringify(plans));
      window.location.reload();
    }

    /* If a new file is chosen, save it, otherwise keep the existing photo */
    let file = null;
    if (fileRef.current && fileRef.current.files && fileRef.current.files.length > 0) {
      file = fileRef.current.files[0];
    }

    if (file) {
      const reader = new FileReader();
      /* base64 data URL */
      reader.onload = () => persist(reader.result);

      /* Fallback, use default photo */
      reader.onerror = () => persist(currentPhoto);
      reader.readAsDataURL(file);

    } else {
    
      /* No new file → keep the existing stored photo */
      persist(currentPhoto);
    }
  };


  return (
    <div className="home">
      <section className="edit-card">
        <div className="edit-layout">
          {/* LEFT: Edit details */}
          <div className="edit-main">
            <h2 className="headers">Edit Profile</h2>

            {!isLoggedIn && (
              <div className="auth-hint">Login to edit your profile and upload a photo.</div>
            )}

            {/* Edit name */}
            <label className="headers">Name</label>
            <input
              type="text"
              defaultValue={storedName}
              ref={nameRef}
              className="edit-input"
              placeholder="Enter your name"
              disabled={disabled}
            />

            {/* Edit profile photo */}

            {/* Or upload a new photo */}
            <label className="headers">Upload Profile Photo</label>
            <input
              type="file"
              accept="image/*"
              ref={fileRef}
              className="edit-input"
              disabled={disabled}
            />

            {/* Edit interests */}
            <label className="headers">Interests</label>
            <textarea
              id="text1"
              defaultValue={storedInterests.join("\n")}
              ref={interestsRef}
              className="edit-input"
              placeholder="One interest per line"
              disabled={disabled}
            />

            {/* Edit plans */}
            <label className="headers">Plans</label>
            <textarea
              id="text2"
              defaultValue={storedPlans.join("\n")}
              ref={plansRef}
              className="edit-input"
              placeholder="One plan per line"
              disabled={disabled}
            />

            {/* Save edits */}
            <button onClick={onSave} className="save-btn" disabled={disabled}>
              Save
            </button>
          </div>

          {/* RIGHT: Auth panel */}
          <aside className="auth-panel">
            {!isLoggedIn ? (
              <>
                <h3 className="headers" style={{ marginTop: 0 }}>Login</h3>

                {/* Toggle to show the inline form */}
                {!showLogin ? (
                  <button
                    className="save-btn"
                    type="button"
                    onClick={() => setShowLogin(true)}
                    style={{ width: "100%" }}
                  >
                    Login
                  </button>
                ) : (
                  <div className="auth-form-wrapper">
                    <LoginForm />
                  </div>
                )}
              </>
            ) : (
              <>
                <h3 className="headers" style={{ marginTop: 0 }}>Account</h3>
                <p className="muted" style={{ margin: "0 0 12px 0" }}>You’re logged in.</p>
                <LogoutButton />
              </>
            )}
          </aside>
        </div>
      </section>
    </div>
  );
}
