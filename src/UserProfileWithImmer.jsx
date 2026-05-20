import { useImmer } from "use-immer";
import "./UserProfileWithImmer.css";

function UserProfileWithImmer() {
  const [userProfile, updateUserProfile] = useImmer({
    name: "Aden Osman",
    email: "aden@example.com",
    contactDetails: {
      phone: "206-555-1234",
      address: "Seattle, WA",
    },
    preferences: {
      newsletter: false,
      notifications: true,
    },
  });

  function updateContactDetails(newPhone, newAddress) {
    updateUserProfile((draft) => {
      draft.contactDetails.phone = newPhone;
      draft.contactDetails.address = newAddress;
    });
  }

  function toggleNewsletterSubscription() {
    updateUserProfile((draft) => {
      draft.preferences.newsletter = !draft.preferences.newsletter;
    });
  }

  return (
    <div className="profile-container">
      <h1>User Profile With Immer</h1>

      <label>Name</label>
      <input
        value={userProfile.name}
        onChange={(e) =>
          updateUserProfile((draft) => {
            draft.name = e.target.value;
          })
        }
      />

      <label>Email</label>
      <input
        value={userProfile.email}
        onChange={(e) =>
          updateUserProfile((draft) => {
            draft.email = e.target.value;
          })
        }
      />

      <label>Phone</label>
      <input
        value={userProfile.contactDetails.phone}
        onChange={(e) =>
          updateContactDetails(e.target.value, userProfile.contactDetails.address)
        }
      />

      <label>Address</label>
      <input
        value={userProfile.contactDetails.address}
        onChange={(e) =>
          updateContactDetails(userProfile.contactDetails.phone, e.target.value)
        }
      />

      <label className="checkbox-row">
        <input
          type="checkbox"
          checked={userProfile.preferences.newsletter}
          onChange={toggleNewsletterSubscription}
        />
        Subscribe to newsletter
      </label>

      <label className="checkbox-row">
        <input
          type="checkbox"
          checked={userProfile.preferences.notifications}
          onChange={() =>
            updateUserProfile((draft) => {
              draft.preferences.notifications =
                !draft.preferences.notifications;
            })
          }
        />
        Enable notifications
      </label>

      <h2>Current User Profile State</h2>
      <pre>{JSON.stringify(userProfile, null, 2)}</pre>
    </div>
  );
}

export default UserProfileWithImmer;
