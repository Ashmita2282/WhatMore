import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./FacebookAuth.module.css";

const FacebookAuth = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState([]);
  const [selectedInstaAccount, setSelectedInstaAccount] = useState([]);
  const [InstaAccounts, setInstaAccounts] = useState([]);
  const [isInstaOptions, setInstaOptions] = useState(true);
  const [pageAccessToken, setPageAccessToken] = useState('');

  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const token = localStorage.getItem("token");

  const handleFacebookSubmit = async () => {
    console.log("Selected Account:", selectedAccount);
  
    if (!selectedAccount) {
      alert("No account selected.");
      return;
    }
  
    // Retrieve token from localStorage
    if (!token) {
      alert("Authentication error. Please log in again.");
      return;
    }
  
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/facebook/save_pageId",
        { selectedAccount },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token
            "Content-Type": "application/json",
          },
          withCredentials: true, 
        }
      );
  
      console.log("Selected account sent successfully:", response.data);
      
      await fetchInstaDetails();
      handleNext();
    } catch (error) {
      console.error("Error sending selected account:", error.response?.data || error.message);
      alert(error.response?.data?.error || "Failed to send account selection.");
    }
  };
  
  

  const handleInstaSubmit = async () => {
    console.log("Selected Insta Account:", selectedInstaAccount);
    if (!selectedInstaAccount) {
      alert.error("No account selected.");
      return;
    }

    setInstaOptions(!isInstaOptions);
    try {
      const response = await axios.post("http://localhost:5000/auth/facebook/insta/accounts",
        {selectedInstaAccount},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token
            "Content-Type": "application/json",
          },
          withCredentials: true, 
        }
      );

      console.log("Selected account sent:", response.data);
      handleNext();
    } catch (error) {
      console.error("Error sending selected account:", error);
    }
  };

  // Function to handle fetching Facebook pages
  const fetchFacebookPages = async () => {
    let errorMessage = ''; // Variable to hold error message

    try {
      const response = await fetch('http://localhost:5000/auth/facebook/page_id',
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token
            "Content-Type": "application/json",
          },
          withCredentials: true, 
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to get pages from the backend.");
      }

      const data = await response.json();

      // Check if there are no accounts
      if (!data.accounts || data.accounts.length === 0) {
        throw new Error('No pages found for the given token.');
      }

      setAccounts(data.accounts); // Storing the accounts in the state
      handleNext(); // Move to the next step
    } catch (err) {
      console.error("Fetch Error:", err); // Debugging
      alert(`Error: ${err.message}`)
    };
  };


  const fetchInstaDetails = async () => {
    try {
      const response = await fetch('http://localhost:5000/auth/facebook/getInstagramAccount',
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token
            "Content-Type": "application/json",
          },
          withCredentials: true, 
        }
      );

      // Check if response is not OK (status code other than 200-299)
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to get insta details");
      }

      const data = await response.json();

      console.log(data)

      // Check if there are no accounts or if data structure is unexpected
      if (!data.instagram_id || !data.instagram_username) {
        throw new Error('No Instagram accounts are linked.');
      }

      // If there's data, we can set it directly
      setInstaAccounts([data]);
    } catch (err) {
      console.error("Fetch Error:", err); // Debugging
      alert(`Error: ${err.message}`);
    }
  };

  const handleGetPageAccessToken = async () => {
    try {
      // Send a GET request to your backend API
      const response = await axios.get('http://localhost:5000/auth/facebook/save_page_access_token',
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token
            "Content-Type": "application/json",
          },
          withCredentials: true, 
        }
      );

      if (!response.data || response.data.error) {
        throw new Error(response.data.error || "Failed to get page access token");
      }

      console.log(response.data)
      // Store the page access token in state
      setPageAccessToken(response.data.pageAccessToken);
      navigate('/client');
    } catch (err) {
      console.error("Fetch Error:", err); // Debugging
      alert(`Error: ${err.message}`);
    }
  };


  // const handleConnectInstaClick = () => {
  //   window.open(
  //     "https://www.facebook.com/settings/?tab=linked_instagram",
  //     "_blank"
  //   );
  // };

  const handleConnectShopify = () => {
    const shopName = "gristiptest.myshopify.com";
    window.location.href = `http://localhost:5000/auth/shopify?shop=${shopName}`;
  };

  return (
    <div className={styles.container}>
      {currentStep === 1 && (
        <div className={styles.stepDiv}>
          <h2>You're All Set!</h2>
          <p>Your Facebook account has been successfully connected. Now you can easily sync your data, manage your business, and enjoy a seamless experience.</p>

          <button className={styles.nextBtn} onClick={fetchFacebookPages}>
            Next
          </button>
        </div>
      )}

      {currentStep === 2 && (
        <div className={styles.stepDiv}>
          <h2>Choose a facebook page</h2>
          <p>A Facebook Page is needed to connect your Instagram Business account, allowing you to manage posts, messages, and insights efficiently.</p>

          <p>Select an account:</p>
          {accounts.length > 0 ? (
            <div className={styles.checkbox_div}>
              {accounts.map((account) => (
                <div key={account.id} className={styles.checkbox_outer_div}>
                  <input
                    type="checkbox"
                    id={account.id}
                    checked={selectedAccount === account.id}
                    onChange={() =>
                      setSelectedAccount((prev) => (prev === account.id ? null : account.id))
                    }
                  />
                  <div className={styles.checkbox_inner_div}>
                    {account?.name?.charAt(0).toUpperCase() || ""}
                  </div>
                  <label htmlFor={account.id}>
                    {account.name} <br /> {account.id}
                  </label>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <p>No Facebook pages available</p>
            </div>
          )}

          <button className={styles.backBtn} onClick={handleBack}>
            Back
          </button>
          <button className={styles.nextBtn} onClick={handleFacebookSubmit} disabled={selectedAccount.length === 0}>
            Next
          </button>
        </div>
      )}

      {currentStep === 3 && (
        <div className={styles.stepDiv}>
          <h2>Choose an Instagram Business Account</h2>
          <p>The profile and posts will be accessed from the Instagram business account you select.</p>
          <p>Select an account:</p>

          {InstaAccounts.length > 0 ? (
            <div className={styles.checkbox_div}>
              {InstaAccounts.map((InstaAccount) => {
                return (
                  <div key={InstaAccount.instagram_id} className={styles.checkbox_outer_div}>
                    <input
                      type="checkbox"
                      id={InstaAccount.instagram_id}
                      checked={selectedInstaAccount === InstaAccount.instagram_id}
                      onChange={() =>
                        setSelectedInstaAccount((prev) =>
                          prev === InstaAccount.instagram_id ? null : InstaAccount.instagram_id
                        )
                      }
                    />
                    <div className={styles.checkbox_inner_div}>
                      {InstaAccount?.instagram_username?.charAt(0).toUpperCase() || ""}
                    </div>
                    <label htmlFor={InstaAccount.instagram_id}>
                      {InstaAccount.instagram_username} <br />
                      {InstaAccount.instagram_id}
                    </label>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>
              <p>No Instagram pages available</p>
            </div>
          )}
          <button className={styles.backBtn} onClick={handleBack}>
            Back
          </button>
          <button className={styles.nextBtn} onClick={handleInstaSubmit} disabled={selectedInstaAccount.length === 0}>
            Next
          </button>
        </div>
      )}


      {(
    currentStep === 4 && (
      <div className={styles.stepDiv}>
        <h2>Connect Your E-commerce Store</h2>
        <p>Link your online store to access product details and display them to customers.</p>

        {/* E-commerce platform options */}
        <div className={styles.optionsContainer}>
          <div className={styles.optionCard} onClick={handleConnectShopify}>
            <img
              src="images/shopify.png"
              alt="Shopify"
              className={styles.optionLogo}
            />
            <p>Shopify</p>
          </div>

          <div className={styles.optionCard}>
            <img
              src="images/woo.png
              "
              alt="WooCommerce"
              className={styles.optionLogo}
            />
            <p>WooCommerce</p>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className={styles.buttonContainer}>
          <button className={styles.backBtn} onClick={handleBack}>
            Back
          </button>
          <button className={styles.nextBtn} onClick={handleNext}>
           Next
          </button>
        </div>
      </div>
    )
  )}

      {currentStep === 5 && (
        <div className={styles.stepDiv}>
          <h2>Review the permissions requested by Videowebapp</h2>
            <div  className={styles.info_container}>
              <div className={styles.info_box}>
               <h9>Access your public profile</h9>
               <p>Allows the app to read your default public profile fields</p>
               <hr/>
              </div>
          
              <div className={styles.info_box}>
               <h9>Access profile and posts from the Instagram account connected to your Page</h9>
               <p>Allows the app to read your Instagram account profile information and media</p>
               <hr/>
              </div>

              <div className={styles.info_box}>
               <h9>Show a list of the Pages you manage</h9>
               <p>Allows the app to access the list of Facebook Pages you manage</p>
               <hr/>
              </div>

              <div className={styles.info_box}>
               <h9>Manage your business settings</h9>
               <p>Allows the app to access and update your business details</p>
              </div>
            </div>
           
          <button className={styles.backBtn} onClick={handleBack}>
            Back
          </button>
          <button className={styles.nextBtn} onClick={handleGetPageAccessToken}>
            Got it
          </button>
        </div>
      )}
    </div>
  );
};

export default FacebookAuth;
