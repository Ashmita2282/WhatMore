import React, { useState, useEffect } from 'react';
import { Pencil } from 'lucide-react'; // Importing the edit icon
import styles from './profileContent.module.css';

const ProfileContent = () => {
    const [profile, setProfile] = useState({ name: '', email: '', store_id: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch('http://localhost:5000/client/getProfile', {
                    credentials: 'include', // Ensure cookies/session are included if needed
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                console.log("Fetched Profile:", data); // Debugging
                setProfile(data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            const response = await fetch('http://localhost:5000/client/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ name: profile.name, email: profile.email }), // Send email too
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const updatedProfile = await response.json();
            console.log("Updated Profile:", updatedProfile);
            setProfile(updatedProfile.client); // Ensure state updates
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };
    

// Function to fetch updated profile data
// const fetchUpdatedProfile = async () => {
//     try {
//         const response = await fetch('http://localhost:5000/client/profile', {
//             credentials: 'include',
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const updatedData = await response.json();
//         console.log("Fetched Updated Profile:", updatedData); // Debugging
//         setProfile(updatedData);
//     } catch (error) {
//         console.error('Error fetching updated profile:', error);
//     }
// };


    if (loading) return <p className={styles.loading}>Loading...</p>;

    return (
        <div className={styles.profileContainer}>
            <div className={styles.header}>
                <h1 className={styles.heading}>My Profile</h1>
                <Pencil className={styles.editIcon} onClick={() => setIsEditing(true)} />
            </div>

            {isEditing ? (
                <>
                    <label className={styles.label}>Name:</label>
                    <input
                        className={styles.input}
                        type="text"
                        name="name"
                        value={profile.name}
                        onChange={handleChange}
                    />
                    <label className={styles.label}>Email:</label>
                    <input
                        className={styles.input}
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                        // disabled
                    />
                    <button className={`${styles.button} ${styles.saveBtn}`} onClick={handleSave}>
                        Save
                    </button>
                    <button className={`${styles.button} ${styles.cancelBtn}`} onClick={() => setIsEditing(false)}>
                        Cancel
                    </button>
                </>
            ) : (
                <>
                    <p className={styles.profileText}><strong>Name:</strong> {profile.name}</p>
                    <p className={styles.profileText}><strong>Email:</strong> {profile.email}</p>
                    <p className={styles.profileText}><strong>Store ID:</strong> {profile.store_id}</p>
                </>
            )}
        </div>
    );
};

export default ProfileContent;
