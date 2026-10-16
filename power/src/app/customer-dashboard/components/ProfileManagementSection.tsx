"use client";

import React, { useEffect, useState } from "react";
import Icon from "@/components/ui/AppIcon";
import AppImage from "@/components/ui/AppImage";

// Convert file → base64
const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

interface CustomerProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  profileImage: string;
  profileImageAlt: string;
}

interface Props {
  onChangePassword: () => void;
}

const ProfileManagementSection = ({ onChangePassword }: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState<CustomerProfile>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    profileImage: "",
    profileImageAlt: "User profile",
  });

  // -------------------------------
  // LOAD LOGIN USER FROM STORAGE
  // -------------------------------
  useEffect(() => {
    try {
      const data = localStorage.getItem("customerUser");
      if (!data) return;

      const user = JSON.parse(data);

      setFormData({
        name: user.fullName || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "",
        state: user.state || "",
        zipCode: user.zipCode || "",
        profileImage: user.profileImage || "",
        profileImageAlt: `${user.fullName} profile`,
      });
    } catch (e) {
      console.log("Error loading profile:", e);
    }
  }, []);

  // -------------------------------
  // SAVE PROFILE
  // -------------------------------
  const handleSave = () => {
    const updated = {
      fullName: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
      profileImage: formData.profileImage || "",
    };

    localStorage.setItem("customerUser", JSON.stringify(updated));
    localStorage.setItem("currentUser", JSON.stringify(updated));

    // Update all components live
    window.dispatchEvent(new Event("storage"));

    setIsEditing(false);
  };

  // CANCEL EDIT
  const handleCancel = () => {
    window.location.reload();
  };

  // IMAGE UPLOAD
  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const base64 = await fileToBase64(file);

    setFormData({
      ...formData,
      profileImage: base64,
      profileImageAlt: `${formData.name} profile`,
    });
  };

  return (
    <div className="card p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Profile Settings</h2>

        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-primary text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <Icon name="PencilIcon" size={16} /> Edit Profile
          </button>
        ) : (
          <div className="space-x-2">
            <button
              onClick={handleSave}
              className="bg-primary text-white px-4 py-2 rounded-md"
            >
              Save
            </button>

            <button
              onClick={handleCancel}
              className="bg-gray-300 px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* PROFILE IMAGE */}
        <div className="text-center">
          <div className="relative inline-block">
            <AppImage
              src={
                formData.profileImage?.length
                  ? formData.profileImage
                  : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      formData.name
                    )}`
              }
              alt={formData.profileImageAlt}
              className="w-32 h-32 rounded-full object-cover mx-auto"
            />

            {isEditing && (
              <>
                <input
                  type="file"
                  id="upload-profile"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />

                <label
                  htmlFor="upload-profile"
                  className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer"
                >
                  <Icon name="CameraIcon" size={16} />
                </label>
              </>
            )}
          </div>

          <h3 className="mt-4 text-lg font-semibold">{formData.name}</h3>
          <p className="text-muted-foreground">{formData.email}</p>
        </div>

        {/* DETAILS FORM */}
        <div className="lg:col-span-2 space-y-6">

          <div>
            <label className="font-medium">Full Name</label>
            {isEditing ? (
              <input
                className="input w-full"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            ) : (
              <p>{formData.name}</p>
            )}
          </div>

          <div>
            <label className="font-medium">Email</label>
            {isEditing ? (
              <input
                className="input w-full"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            ) : (
              <p>{formData.email}</p>
            )}
          </div>

          <div>
            <label className="font-medium">Phone</label>
            {isEditing ? (
              <input
                className="input w-full"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            ) : (
              <p>{formData.phone}</p>
            )}
          </div>

          <div>
            <label className="font-medium">Address</label>
            {isEditing ? (
              <input
                className="input w-full"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
            ) : (
              <p>{formData.address}</p>
            )}
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label>City</label>
              {isEditing ? (
                <input
                  className="input w-full"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                />
              ) : (
                <p>{formData.city}</p>
              )}
            </div>

            <div>
              <label>State</label>
              {isEditing ? (
                <input
                  className="input w-full"
                  value={formData.state}
                  onChange={(e) =>
                    setFormData({ ...formData, state: e.target.value })
                  }
                />
              ) : (
                <p>{formData.state}</p>
              )}
            </div>

            <div>
              <label>ZIP</label>
              {isEditing ? (
                <input
                  className="input w-full"
                  value={formData.zipCode}
                  onChange={(e) =>
                    setFormData({ ...formData, zipCode: e.target.value })
                  }
                />
              ) : (
                <p>{formData.zipCode}</p>
              )}
            </div>
          </div>

          <button
            onClick={onChangePassword}
            className="text-primary flex items-center gap-2"
          >
            <Icon name="KeyIcon" size={16} /> Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileManagementSection;
