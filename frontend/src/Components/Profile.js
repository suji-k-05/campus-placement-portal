import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./Auth";
import "./Profile.css";
import { generateResume } from "./ResumeGenerator";

export default function Profile() {
  const auth = useAuth();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState({});

  useEffect(() => {
    if (auth.user) {
      axios
        .get("http://localhost:3002/register/getdetails")
        .then((res) => {
          const foundUser = res.data.find(
            (student) =>
              student.email.trim().toLowerCase() ===
              (auth.user?.email?.trim().toLowerCase() || "")
          );
          setUserDetails(foundUser || null);
          setUpdatedData(foundUser || {}); 
        })
        .catch((err) => console.error("API Error:", err))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [auth.user]);

  const handleChange = (field, value) => {
    setUpdatedData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddItem = (field, value) => {
    if (value.trim() !== "") {
      setUpdatedData(prev => ({
        ...prev,
        [field]: [...(prev[field] || []), value]
      }));
    }
  };
  console.log("User Details:", userDetails);


  const handleRemoveItem = (field, index) => {
    setUpdatedData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleUpdate = () => {
    axios
      .put(`http://localhost:3002/register/update/${userDetails._id}`, updatedData)
      .then(() => {
        alert("Profile updated successfully!");
        setUserDetails(updatedData);
        setEditing(false);
      })
      .catch((err) => console.error("Update Error:", err));
  };

  if (!auth.user) return <h3>Please log in to view your profile</h3>;
  if (loading) return <h3>Loading your details...</h3>;
  if (!userDetails) return <h3>No details found for your account.</h3>;

  return (
    <div className="profile-table-container">
      <h2>Welcome, {userDetails.firstname} {userDetails.lastname}!</h2>
      <button className="logout-btn" onClick={auth.logout}>Logout</button>

      {!editing ? (
        <>
          <table className="profile-table">
            <tbody>
              {Object.entries(userDetails || {})
                .filter(([key]) => key !== "_id" && key !== "__v") 
                .map(([key, value]) => (
                  <tr key={key}>
                    <td><strong>{key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " ")}:</strong></td>
                    <td>
                      {["github", "linkedin"].includes(key.toLowerCase()) ? (
                        <a href={value} target="_blank" rel="noopener noreferrer">{value}</a> 
                      ) : Array.isArray(value) ? (
                        <ul>
                          {value.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        value
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          <button className="update-profile-btn" onClick={() => setEditing(true)}>Update Profile</button>
          <button className="resume-btn" onClick={() => generateResume(userDetails.email)}>Generate Resume</button>
          </>
      ) : (
        <>
          <h3>Edit Profile</h3>
          <table className="profile-table">
            <tbody>
              {Object.entries(updatedData)
                .filter(([key]) => key !== "_id" && key !== "__v") 
                .map(([key, value]) => (
                  <tr key={key}>
                    <td>{key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " ")}:</td>
                    <td>
                      {["github", "linkedin"].includes(key.toLowerCase()) ? (
                        <input 
                          type="url" 
                          value={value || ""} 
                          placeholder={`Enter ${key} link`} 
                          onChange={(e) => handleChange(key, e.target.value)} 
                        />
                      ) : Array.isArray(value) ? (
                        <>
                          <ul>
                            {value.map((item, index) => (
                              <li key={index}>
                                <input
                                  type="text"
                                  value={item}
                                  onChange={(e) => {
                                    const newArr = [...value];
                                    newArr[index] = e.target.value;
                                    setUpdatedData((prev) => ({ ...prev, [key]: newArr }));
                                  }}
                                />
                                <button onClick={() => handleRemoveItem(key, index)}>❌</button>
                              </li>
                            ))}
                          </ul>
                          <input
                            type="text"
                            placeholder={`Add new ${key}`}
                            onKeyDown={(e) => e.key === "Enter" && handleAddItem(key, e.target.value)}
                          />
                        </>
                      ) : (
                        <input type="text" value={value || ""} onChange={(e) => handleChange(key, e.target.value)} />
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>          
          <button className="save-btn" onClick={handleUpdate}>Save Changes</button>
          <button className="cancel-btn" onClick={() => setEditing(false)}>Cancel</button>
        </>
      )}
    </div>
  );
}
