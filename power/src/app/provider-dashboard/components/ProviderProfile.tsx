"use client";

import { useEffect, useState } from "react";
import {
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

/**
 * Full Provider Profile component
 * - Upload (base64->/api/upload)
 * - Gallery / Certificates / Experience docs
 * - Working hours editor
 * - Address fields
 * - Pricing table (add/edit/delete)
 * - Team members (add/edit/delete)
 * - Bank details
 * - Categories
 * - Online / Verified toggles
 * - Save -> POST /api/provider/update
 * - LocalStorage sync: providerUser
 *
 * NOTE: This is a client component. Ensure you have /api/upload and
 * /api/provider/update endpoints implemented server-side as discussed.
 */

function defaultWorkingHours() {
  return {
    monday: { start: "09:00", end: "18:00", active: true },
    tuesday: { start: "09:00", end: "18:00", active: true },
    wednesday: { start: "09:00", end: "18:00", active: true },
    thursday: { start: "09:00", end: "18:00", active: true },
    friday: { start: "09:00", end: "18:00", active: true },
    saturday: { start: "10:00", end: "16:00", active: false },
    sunday: { start: "00:00", end: "00:00", active: false },
  };
}

// Default specializations (pre-populated)
const defaultSpecializations = [
  "Plumbing",
  "Electrical",
  "HVAC",
  "Cleaning",
  "Handyman",
  "Landscaping",
  "Painting",
  "Carpentry",
  "Appliance Repair"
];

// Default services (suggested comma-separated values)
const defaultServices = [
  "Pipe Installation and Repair",
  "Wiring and Electrical Panel Upgrade",
  "AC Installation and Maintenance",
  "Deep House Cleaning",
  "Furniture Assembly and Minor Repairs",
  "Lawn Mowing and Garden Design",
  "Interior and Exterior Painting",
  "Custom Cabinet Making and Woodwork",
  "Refrigerator and Washing Machine Repair"
].join(", ");

export default function ProviderProfile() {
  const [provider, setProvider] = useState(null);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});

  useEffect(() => {
    const fetchProviderData = async () => {
      try {
        setLoading(true);
        const p = localStorage.getItem("providerUser") || localStorage.getItem("currentUser");
        
        if (p) {
          const userData = JSON.parse(p);
          const providerId = userData._id || userData.id;
          
          // Fetch complete provider data from MongoDB
          const response = await fetch(`/api/providers/${providerId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch provider data');
          }
          
          const data = await response.json();
          
          if (data.success && data.provider) {
            const providerData = data.provider;
            setProvider(providerData);
            
            // Initialize form with all data from MongoDB
            setForm({
              id: providerData._id || providerData.id,
              fullName: providerData.fullName || "",
              phone: providerData.phone || "",
              profileImage: providerData.profileImage || "",
              bio: providerData.bio || "",
              experience: providerData.experience || "",
              services: (providerData.services || []).join(", ") || defaultServices,
              workingHours: providerData.workingHours || defaultWorkingHours(),
              address: providerData.address || { fullAddress: "", city: "", area: "", pincode: "", lat: "", lng: "", radiusKm: 10 },
              gallery: providerData.gallery || [],
              certificates: providerData.certificates || [],
              pricing: providerData.pricing || [],
              bankDetails: providerData.bankDetails || { accountName: "", accountNumber: "", ifsc: "", upiId: "", bankName: "" },
              experienceDocs: providerData.experienceDocs || [],
              teamMembers: providerData.teamMembers || [],
              categories: (providerData.categories || []).join(", "),
              verified: !!providerData.verified,
              online: providerData.online ?? true,
              // Technician-specific fields
              serviceType: providerData.serviceType || "",
              availability: providerData.availability || "full-time",
              serviceRadius: providerData.serviceRadius || 10,
              specializations: providerData.specializations || defaultSpecializations,
              skills: providerData.skills || [],
              qualifications: providerData.qualifications || [],
              tools: providerData.tools || [],
            });
          } else {
            // Fallback to localStorage data if API fails
            const data = JSON.parse(p);
            setProvider(data);
            setForm({
              id: data._id || data.id,
              fullName: data.fullName || "",
              phone: data.phone || "",
              profileImage: data.profileImage || "",
              bio: data.bio || "",
              experience: data.experience || "",
              services: (data.services || []).join(", ") || defaultServices,
              workingHours: data.workingHours || defaultWorkingHours(),
              address: data.address || { fullAddress: "", city: "", area: "", pincode: "", lat: "", lng: "", radiusKm: 10 },
              gallery: data.gallery || [],
              certificates: data.certificates || [],
              pricing: data.pricing || [],
              bankDetails: data.bankDetails || { accountName: "", accountNumber: "", ifsc: "", upiId: "", bankName: "" },
              experienceDocs: data.experienceDocs || [],
              teamMembers: data.teamMembers || [],
              categories: (data.categories || []).join(", "),
              verified: !!data.verified,
              online: data.online ?? true,
              // Default technician-specific fields with pre-populated specializations and services
              serviceType: "",
              availability: "full-time",
              serviceRadius: 10,
              specializations: defaultSpecializations,
              skills: [],
              qualifications: [],
              tools: [],
            });
          }
        } else {
          // No provider in localStorage
          setForm({
            workingHours: defaultWorkingHours(),
            address: { fullAddress: "", city: "", area: "", pincode: "", lat: "", lng: "", radiusKm: 10 },
            gallery: [],
            certificates: [],
            pricing: [],
            bankDetails: { accountName: "", accountNumber: "", ifsc: "", upiId: "", bankName: "" },
            experienceDocs: [],
            teamMembers: [],
            services: defaultServices,
            categories: "",
            online: true,
            verified: false,
            // Default technician-specific fields with pre-populated specializations and services
            serviceType: "",
            availability: "full-time",
            serviceRadius: 10,
            specializations: defaultSpecializations,
            skills: [],
            qualifications: [],
            tools: [],
          });
        }
      } catch (err) {
        console.error("Failed to load provider data", err);
        // Fallback to localStorage if API fails
        try {
          const p = localStorage.getItem("providerUser") || localStorage.getItem("currentUser");
          if (p) {
            const data = JSON.parse(p);
            setProvider(data);
            setForm({
              id: data._id || data.id,
              fullName: data.fullName || "",
              phone: data.phone || "",
              profileImage: data.profileImage || "",
              bio: data.bio || "",
              experience: data.experience || "",
              services: (data.services || []).join(", ") || defaultServices,
              workingHours: data.workingHours || defaultWorkingHours(),
              address: data.address || { fullAddress: "", city: "", area: "", pincode: "", lat: "", lng: "", radiusKm: 10 },
              gallery: data.gallery || [],
              certificates: data.certificates || [],
              pricing: data.pricing || [],
              bankDetails: data.bankDetails || { accountName: "", accountNumber: "", ifsc: "", upiId: "", bankName: "" },
              experienceDocs: data.experienceDocs || [],
              teamMembers: data.teamMembers || [],
              categories: (data.categories || []).join(", "),
              verified: !!data.verified,
              online: data.online ?? true,
              // Default technician-specific fields with pre-populated specializations and services
              serviceType: "",
              availability: "full-time",
              serviceRadius: 10,
              specializations: defaultSpecializations,
              skills: [],
              qualifications: [],
              tools: [],
            });
          }
        } catch (innerErr) {
          console.error("Fallback to localStorage also failed", innerErr);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProviderData();
  }, []);

  // ----------------------------
  // Helper: convert file -> base64 and send to /api/upload
  // ----------------------------
  const uploadBase64 = (file, type = "gallery", index = null) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async () => {
        const result = reader.result; // data:*/*;base64,...
        try {
          // Set upload progress
          setUploadProgress(prev => ({ ...prev, [`${type}-${index || 'new'}`]: 10 }));
          
          const res = await fetch("/api/upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ filename: file.name, data: result }),
          });
          
          setUploadProgress(prev => ({ ...prev, [`${type}-${index || 'new'}`]: 90 }));
          
          const d = await res.json();
          if (!d.success) return reject(d.error || "Upload failed");
          
          setUploadProgress(prev => ({ ...prev, [`${type}-${index || 'new'}`]: 100 }));
          setTimeout(() => {
            setUploadProgress(prev => {
              const newProgress = { ...prev };
              delete newProgress[`${type}-${index || 'new'}`];
              return newProgress;
            });
          }, 1000);
          
          resolve(d.url);
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = () => reject("File read error");
      reader.readAsDataURL(file);
    });

  // ----------------------------
  // Gallery / certificates / docs helpers
  // ----------------------------
  const onUploadProfileImage = async (file) => {
    try {
      setUploading(true);
      const url = await uploadBase64(file, "profile");
      setForm((s) => ({ ...s, profileImage: url }));
    } catch (err) {
      console.error(err);
      alert("Profile image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const onAddGallery = async (files) => {
    if (!files || files.length === 0) return;
    
    setUploading(true);
    const newGallery = [...(form.gallery || [])];
    
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const url = await uploadBase64(file, "gallery", newGallery.length + i);
        newGallery.push(url);
      }
      
      setForm((s) => ({ ...s, gallery: newGallery }));
    } catch (err) {
      console.error(err);
      alert("Gallery upload failed");
    } finally {
      setUploading(false);
    }
  };

  const onAddCertificate = async (files) => {
    if (!files || files.length === 0) return;
    
    setUploading(true);
    const newCertificates = [...(form.certificates || [])];
    
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const url = await uploadBase64(file, "certificate", newCertificates.length + i);
        newCertificates.push(url);
      }
      
      setForm((s) => ({ ...s, certificates: newCertificates }));
    } catch (err) {
      console.error(err);
      alert("Certificate upload failed");
    } finally {
      setUploading(false);
    }
  };

  const onAddExperienceDoc = async (file) => {
    try {
      setUploading(true);
      const url = await uploadBase64(file, "experience");
      setForm((s) => ({ ...s, experienceDocs: [...(s.experienceDocs || []), url] }));
    } catch (err) {
      console.error(err);
      alert("Experience doc upload failed");
    } finally {
      setUploading(false);
    }
  };

  // ----------------------------
  // Skills helpers
  // ----------------------------
  const addSkill = () => {
    setForm((s) => ({ ...s, skills: [...(s.skills || []), { name: "", level: "intermediate" }] }));
  };
  const updateSkill = (idx, change) => {
    setForm((s) => {
      const copy = [...(s.skills || [])];
      copy[idx] = { ...copy[idx], ...change };
      return { ...s, skills: copy };
    });
  };
  const deleteSkill = (idx) => {
    setForm((s) => {
      const copy = [...(s.skills || [])];
      copy.splice(idx, 1);
      return { ...s, skills: copy };
    });
  };

  // ----------------------------
  // Qualifications helpers
  // ----------------------------
  const addQualification = () => {
    setForm((s) => ({ ...s, qualifications: [...(s.qualifications || []), { name: "", institution: "", year: "" }] }));
  };
  const updateQualification = (idx, change) => {
    setForm((s) => {
      const copy = [...(s.qualifications || [])];
      copy[idx] = { ...copy[idx], ...change };
      return { ...s, qualifications: copy };
    });
  };
  const deleteQualification = (idx) => {
    setForm((s) => {
      const copy = [...(s.qualifications || [])];
      copy.splice(idx, 1);
      return { ...s, qualifications: copy };
    });
  };

  // ----------------------------
  // Tools helpers
  // ----------------------------
  const addTool = () => {
    setForm((s) => ({ ...s, tools: [...(s.tools || []), { name: "", description: "" }] }));
  };
  const updateTool = (idx, change) => {
    setForm((s) => {
      const copy = [...(s.tools || [])];
      copy[idx] = { ...copy[idx], ...change };
      return { ...s, tools: copy };
    });
  };
  const deleteTool = (idx) => {
    setForm((s) => {
      const copy = [...(s.tools || [])];
      copy.splice(idx, 1);
      return { ...s, tools: copy };
    });
  };

  // ----------------------------
  // Pricing helpers
  // ----------------------------
  const addPricingRow = () => {
    setForm((s) => ({ ...s, pricing: [...(s.pricing || []), { service: "", price: 0, description: "" }] }));
  };
  const updatePricing = (idx, change) => {
    setForm((s) => {
      const copy = [...(s.pricing || [])];
      copy[idx] = { ...copy[idx], ...change };
      return { ...s, pricing: copy };
    });
  };
  const deletePricing = (idx) => {
    setForm((s) => {
      const copy = [...(s.pricing || [])];
      copy.splice(idx, 1);
      return { ...s, pricing: copy };
    });
  };

  // ----------------------------
  // Team helpers
  // ----------------------------
  const addTeamMember = () => {
    setForm((s) => ({ ...s, teamMembers: [...(s.teamMembers || []), { name: "", phone: "", skills: [] }] }));
  };
  const updateTeamMember = (idx, change) => {
    setForm((s) => {
      const copy = [...(s.teamMembers || [])];
      copy[idx] = { ...copy[idx], ...change };
      return { ...s, teamMembers: copy };
    });
  };
  const deleteTeamMember = (idx) => {
    setForm((s) => {
      const copy = [...(s.teamMembers || [])];
      copy.splice(idx, 1);
      return { ...s, teamMembers: copy };
    });
  };

  // ----------------------------
  // Gallery remove helpers
  // ----------------------------
  const removeGallery = (idx) => setForm((s) => ({ ...s, gallery: (s.gallery || []).filter((_, i) => i !== idx) }));
  const removeCertificate = (idx) => setForm((s) => ({ ...s, certificates: (s.certificates || []).filter((_, i) => i !== idx) }));
  const removeExperienceDoc = (idx) => setForm((s) => ({ ...s, experienceDocs: (s.experienceDocs || []).filter((_, i) => i !== idx) }));

  // ----------------------------
  // Online/Offline toggle
  // ----------------------------
  const toggleOnlineStatus = async () => {
    const newOnlineStatus = !form.online;
    
    // Update the form state immediately for UI responsiveness
    setForm((s) => ({ ...s, online: newOnlineStatus }));
    
    try {
      const res = await fetch("/api/provider/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: form.id,
          online: newOnlineStatus,
        }),
      });
      const data = await res.json();
      if (!data.success) {
        // Revert on error
        setForm((s) => ({ ...s, online: !newOnlineStatus }));
        alert(data.error || "Failed to update online status");
      } else {
        // Update localStorage
        const updatedProvider = { ...provider, online: newOnlineStatus };
        localStorage.setItem("providerUser", JSON.stringify(updatedProvider));
        localStorage.setItem("currentUser", JSON.stringify(updatedProvider));
        setProvider(updatedProvider);
      }
    } catch (err) {
      console.error(err);
      // Revert on error
      setForm((s) => ({ ...s, online: !newOnlineStatus }));
      alert("Network error while updating online status");
    }
  };

  // ----------------------------
  // Save handler -> call /api/provider/update
  // ----------------------------
  const save = async () => {
    setSaving(true);
    try {
      // build payload
      const payload = {
        id: form.id,
        fullName: form.fullName,
        phone: form.phone,
        profileImage: form.profileImage,
        bio: form.bio,
        experience: form.experience,
        services: (form.services || "").split(",").map((s) => s.trim()).filter(Boolean),
        workingHours: form.workingHours,
        address: form.address,
        gallery: form.gallery,
        certificates: form.certificates,
        pricing: form.pricing,
        bankDetails: form.bankDetails,
        experienceDocs: form.experienceDocs,
        teamMembers: form.teamMembers,
        categories: (form.categories || "").split(",").map((s) => s.trim()).filter(Boolean),
        verified: !!form.verified,
        online: !!form.online,
        // Include technician-specific fields
        serviceType: form.serviceType,
        availability: form.availability,
        serviceRadius: form.serviceRadius,
        specializations: form.specializations,
        skills: form.skills,
        qualifications: form.qualifications,
        tools: form.tools,
      };

      const res = await fetch("/api/provider/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!data.success) {
        alert(data.error || "Update failed");
        console.error(data);
      } else {
        // sync localStorage
        localStorage.setItem("providerUser", JSON.stringify(data.provider));
        localStorage.setItem("currentUser", JSON.stringify(data.provider));
        setProvider(data.provider);
        setForm((s) => ({ ...s, id: data.provider._id }));
        setEditMode(false);
        alert("Saved successfully");
      }
    } catch (err) {
      console.error(err);
      alert("Network error while saving");
    } finally {
      setSaving(false);
    }
  };

  // ----------------------------
  // Cancel -> restore form from provider
  // ----------------------------
  const cancel = () => {
    if (!provider) return;
    setForm({
      id: provider._id || provider.id,
      fullName: provider.fullName || "",
      phone: provider.phone || "",
      profileImage: provider.profileImage || "",
      bio: provider.bio || "",
      experience: provider.experience || "",
      services: (provider.services || []).join(", ") || defaultServices,
      workingHours: provider.workingHours || defaultWorkingHours(),
      address: provider.address || { fullAddress: "", city: "", area: "", pincode: "", lat: "", lng: "", radiusKm: 10 },
      gallery: provider.gallery || [],
      certificates: provider.certificates || [],
      pricing: provider.pricing || [],
      bankDetails: provider.bankDetails || { accountName: "", accountNumber: "", ifsc: "", upiId: "", bankName: "" },
      experienceDocs: provider.experienceDocs || [],
      teamMembers: provider.teamMembers || [],
      categories: (provider.categories || []).join(", "),
      verified: !!provider.verified,
      online: provider.online ?? true,
      // Include technician-specific fields with pre-populated defaults
      serviceType: provider.serviceType || "",
      availability: provider.availability || "full-time",
      serviceRadius: provider.serviceRadius || 10,
      specializations: provider.specializations || defaultSpecializations,
      skills: provider.skills || [],
      qualifications: provider.qualifications || [],
      tools: provider.tools || [],
    });
    setEditMode(false);
  };

  // ----------------------------
  // Small UI helpers
  // ----------------------------
  const avatarSrc = form.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent((form.fullName||provider?.fullName||"U"))}`;

  if (loading) return <div className="p-6">Loading…</div>;
  if (!provider) return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded shadow text-center max-w-md">
        <h2 className="text-2xl font-bold mb-3">Provider Profile</h2>
        <p className="mb-6">No provider is currently logged in. Please login as a provider.</p>
        <a href="/login" className="bg-blue-600 text-white px-4 py-2 rounded">Go to Login</a>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Provider Profile</h1>
            <p className="text-sm text-gray-600">Manage your business information, working hours, gallery and payments.</p>
          </div>

          <div className="flex items-center gap-3">
            {!editMode ? (
              <button onClick={() => setEditMode(true)} className="px-4 py-2 bg-blue-600 text-white rounded flex items-center gap-2">
                <PencilIcon className="h-4 w-4" /> Edit
              </button>
            ) : (
              <>
                <button onClick={cancel} className="px-4 py-2 bg-gray-200 rounded flex items-center gap-2">
                  <XMarkIcon className="h-4 w-4" /> Cancel
                </button>
                <button onClick={save} disabled={saving} className="px-4 py-2 bg-green-600 text-white rounded flex items-center gap-2">
                  <CheckIcon className="h-4 w-4" /> {saving ? "Saving..." : "Save"}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Profile top card */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex gap-6 items-center">
            <img src={avatarSrc} alt="avatar" className="w-28 h-28 rounded-full object-cover border" />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  {!editMode ? (
                    <h2 className="text-xl font-semibold">{provider.fullName}</h2>
                  ) : (
                    <input value={form.fullName} onChange={(e)=>setForm({...form, fullName: e.target.value})} className="text-xl font-semibold w-full border-b pb-1" />
                  )}
                  <p className="text-sm text-gray-600">{provider.email}</p>
                </div>

                <div className="text-right space-y-2">
                  {/* Online/Offline Toggle */}
                  <div className="flex items-center justify-end">
                    <span className={`mr-2 text-sm ${form.online ? "text-green-600" : "text-gray-600"}`}>
                      {form.online ? "Online" : "Offline"}
                    </span>
                    <button
                      onClick={toggleOnlineStatus}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${form.online ? 'bg-green-500' : 'bg-gray-300'}`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${form.online ? 'translate-x-6' : 'translate-x-1'}`}
                      />
                    </button>
                  </div>
                  <div>
                    <span className={`${form.verified ? "text-green-700" : "text-gray-600"}`}>{form.verified ? "Verified" : "Not verified"}</span>
                  </div>
                </div>
              </div>

              {editMode && (
                <div className="mt-3 space-y-2">
                  <label className="block text-sm">Profile image (URL)</label>
                  <input value={form.profileImage} onChange={(e)=>setForm({...form, profileImage: e.target.value})} className="w-full border p-2 rounded" placeholder="Image URL" />
                  <div className="pt-2">
                    <label className="block text-sm mb-1">Or upload file</label>
                    <input type="file" accept="image/*" onChange={async (e)=>{ 
                      const f = e.target.files?.[0]; 
                      if (f) await onUploadProfileImage(f); 
                    }} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left column */}
          <div className="space-y-6">

            {/* Services Section - New */}
            <div className="bg-white p-6 rounded shadow">
              <h3 className="font-semibold mb-3">Services & Specializations</h3>
              
              <div className="mb-4">
                <label className="text-sm">Service Type</label>
                {!editMode ? (
                  <p className="mt-1">{provider.serviceType || "Not specified"}</p>
                ) : (
                  <select 
                    value={form.serviceType || ""} 
                    onChange={(e) => setForm({...form, serviceType: e.target.value})}
                    className="w-full border p-2 rounded"
                  >
                    <option value="">Select service type</option>
                    <option value="technician">Technician</option>
                    <option value="consultant">Consultant</option>
                    <option value="contractor">Contractor</option>
                    <option value="professional">Professional Service</option>
                    <option value="other">Other</option>
                  </select>
                )}
              </div>

              <div className="mb-4">
                <label className="text-sm">Availability</label>
                {!editMode ? (
                  <p className="mt-1 capitalize">{provider.availability || "full-time"}</p>
                ) : (
                  <select 
                    value={form.availability || "full-time"} 
                    onChange={(e) => setForm({...form, availability: e.target.value})}
                    className="w-full border p-2 rounded"
                  >
                    <option value="full-time">Full Time</option>
                    <option value="part-time">Part Time</option>
                    <option value="weekends">Weekends Only</option>
                    <option value="on-call">On Call</option>
                  </select>
                )}
              </div>

              <div className="mb-4">
                <label className="text-sm">Service Radius (km)</label>
                {!editMode ? (
                  <p className="mt-1">{provider.serviceRadius || 10} km</p>
                ) : (
                  <input 
                    type="number" 
                    value={form.serviceRadius || 10} 
                    onChange={(e) => setForm({...form, serviceRadius: Number(e.target.value)})}
                    className="w-full border p-2 rounded"
                    min="1"
                    max="100"
                  />
                )}
              </div>

              <div className="mb-4">
                <label className="text-sm">Specializations (comma separated)</label>
                {!editMode ? (
                  <p className="mt-1">{(provider.specializations || defaultSpecializations).join(", ") || "None specified"}</p>
                ) : (
                  <input 
                    value={(form.specializations || defaultSpecializations).join(", ")} 
                    onChange={(e) => setForm({...form, specializations: e.target.value.split(",").map(s => s.trim()).filter(Boolean)})}
                    className="w-full border p-2 rounded"
                    placeholder="e.g., Plumbing, Electrical, HVAC"
                  />
                )}
              </div>
            </div>

            {/* Skills Section - New */}
            <div className="bg-white p-6 rounded shadow">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold">Technical Skills</h3>
                {editMode && (
                  <button onClick={addSkill} className="px-3 py-1 bg-blue-600 text-white rounded flex items-center gap-2">
                    <PlusIcon className="h-4 w-4" /> Add Skill
                  </button>
                )}
              </div>
              
              <div className="space-y-3">
                {(form.skills || []).map((skill, idx) => (
                  <div key={idx} className="grid grid-cols-12 gap-2 items-center">
                    <div className="col-span-5">
                      <input 
                        value={skill.name} 
                        onChange={(e) => updateSkill(idx, { name: e.target.value })} 
                        disabled={!editMode} 
                        className="w-full border p-2 rounded" 
                        placeholder="Skill name" 
                      />
                    </div>
                    <div className="col-span-5">
                      <select 
                        value={skill.level} 
                        onChange={(e) => updateSkill(idx, { level: e.target.value })} 
                        disabled={!editMode} 
                        className="w-full border p-2 rounded"
                      >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                        <option value="expert">Expert</option>
                      </select>
                    </div>
                    <div className="col-span-2 text-right">
                      {editMode && (
                        <button onClick={() => deleteSkill(idx)} className="text-red-600">
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                {(!(form.skills || []).length) && (
                  <div className="text-gray-500">No skills added yet</div>
                )}
              </div>
            </div>

            {/* Qualifications Section - New */}
            <div className="bg-white p-6 rounded shadow">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold">Qualifications & Certifications</h3>
                {editMode && (
                  <button onClick={addQualification} className="px-3 py-1 bg-blue-600 text-white rounded flex items-center gap-2">
                    <PlusIcon className="h-4 w-4" /> Add
                  </button>
                )}
              </div>
              
              <div className="space-y-3">
                {(form.qualifications || []).map((qual, idx) => (
                  <div key={idx} className="border rounded p-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      <div>
                        <input 
                          value={qual.name} 
                          onChange={(e) => updateQualification(idx, { name: e.target.value })} 
                          disabled={!editMode} 
                          className="w-full border p-2 rounded" 
                          placeholder="Qualification name" 
                        />
                      </div>
                      <div>
                        <input 
                          value={qual.institution} 
                          onChange={(e) => updateQualification(idx, { institution: e.target.value })} 
                          disabled={!editMode} 
                          className="w-full border p-2 rounded" 
                          placeholder="Institution" 
                        />
                      </div>
                      <div className="flex gap-2">
                        <input 
                          value={qual.year} 
                          onChange={(e) => updateQualification(idx, { year: e.target.value })} 
                          disabled={!editMode} 
                          className="w-full border p-2 rounded" 
                          placeholder="Year" 
                        />
                        {editMode && (
                          <button onClick={() => deleteQualification(idx)} className="text-red-600">
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {(!(form.qualifications || []).length) && (
                  <div className="text-gray-500">No qualifications added yet</div>
                )}
              </div>
            </div>

            {/* Tools & Equipment Section - New */}
            <div className="bg-white p-6 rounded shadow">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold">Tools & Equipment</h3>
                {editMode && (
                  <button onClick={addTool} className="px-3 py-1 bg-blue-600 text-white rounded flex items-center gap-2">
                    <PlusIcon className="h-4 w-4" /> Add Tool
                  </button>
                )}
              </div>
              
              <div className="space-y-3">
                {(form.tools || []).map((tool, idx) => (
                  <div key={idx} className="grid grid-cols-12 gap-2 items-center">
                    <div className="col-span-5">
                      <input 
                        value={tool.name} 
                        onChange={(e) => updateTool(idx, { name: e.target.value })} 
                        disabled={!editMode} 
                        className="w-full border p-2 rounded" 
                        placeholder="Tool name" 
                      />
                    </div>
                    <div className="col-span-6">
                      <input 
                        value={tool.description} 
                        onChange={(e) => updateTool(idx, { description: e.target.value })} 
                        disabled={!editMode} 
                        className="w-full border p-2 rounded" 
                        placeholder="Description" 
                      />
                    </div>
                    <div className="col-span-1 text-right">
                      {editMode && (
                        <button onClick={() => deleteTool(idx)} className="text-red-600">
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                {(!(form.tools || []).length) && (
                  <div className="text-gray-500">No tools added yet</div>
                )}
              </div>
            </div>

            {/* Contact & Address */}
            <div className="bg-white p-6 rounded shadow space-y-4">
              <h3 className="font-semibold">Contact & Address</h3>
              <div>
                <label className="text-sm">Phone</label>
                {!editMode ? <p className="mt-1">{provider.phone || "Not set"}</p> : <input value={form.phone} onChange={(e)=>setForm({...form, phone: e.target.value})} className="w-full border p-2 rounded" />}
              </div>

              <div>
                <label className="text-sm">Full address</label>
                {!editMode ? <p className="mt-1">{(provider.address && provider.address.fullAddress) || "Not set"}</p> : <input value={form.address?.fullAddress || ""} onChange={(e)=>setForm({...form, address: {...form.address, fullAddress: e.target.value}})} className="w-full border p-2 rounded" />}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="text-sm">City</label>
                  {!editMode ? <p className="mt-1">{provider.address?.city || "—"}</p> : <input value={form.address?.city || ""} onChange={(e)=>setForm({...form, address:{...form.address, city: e.target.value}})} className="w-full border p-2 rounded" />}
                </div>
                <div>
                  <label className="text-sm">Area</label>
                  {!editMode ? <p className="mt-1">{provider.address?.area || "—"}</p> : <input value={form.address?.area || ""} onChange={(e)=>setForm({...form, address:{...form.address, area: e.target.value}})} className="w-full border p-2 rounded" />}
                </div>
                <div>
                  <label className="text-sm">Pincode</label>
                  {!editMode ? <p className="mt-1">{provider.address?.pincode || "—"}</p> : <input value={form.address?.pincode || ""} onChange={(e)=>setForm({...form, address:{...form.address, pincode: e.target.value}})} className="w-full border p-2 rounded" />}
                </div>
                <div>
                  <label className="text-sm">Service radius (km)</label>
                  {!editMode ? <p className="mt-1">{provider.address?.radiusKm ?? "10"}</p> : <input type="number" value={form.address?.radiusKm || 10} onChange={(e)=>setForm({...form, address:{...form.address, radiusKm: Number(e.target.value)}})} className="w-full border p-2 rounded" />}
                </div>
              </div>
            </div>

            {/* Working hours */}
            <div className="bg-white p-6 rounded shadow">
              <h3 className="font-semibold">Working Hours</h3>
              <p className="text-sm text-gray-500 mb-2">Toggle active days and set start/end times</p>
              <div className="space-y-3">
                {Object.keys(form.workingHours || defaultWorkingHours()).map((day) => {
                  const wh = form.workingHours?.[day];
                  return (
                    <div key={day} className="flex items-center gap-3">
                      <div className="w-24 capitalize">{day}</div>
                      <div>
                        <label className="text-xs text-gray-500 block">Start</label>
                        <input disabled={!wh?.active} type="time" value={wh?.start || "09:00"} onChange={(e)=>setForm(s=>({...s, workingHours:{...s.workingHours, [day]:{...s.workingHours[day], start: e.target.value}}}))} className="border p-1 rounded" />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 block">End</label>
                        <input disabled={!wh?.active} type="time" value={wh?.end || "18:00"} onChange={(e)=>setForm(s=>({...s, workingHours:{...s.workingHours, [day]:{...s.workingHours[day], end: e.target.value}}}))} className="border p-1 rounded" />
                      </div>
                      <div className="ml-auto">
                        <label className="text-xs text-gray-500 block">Active</label>
                        <input type="checkbox" checked={!!wh?.active} onChange={(e)=>setForm(s=>({...s, workingHours:{...s.workingHours, [day]:{...s.workingHours[day], active: e.target.checked}}}))} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Gallery */}
            <div className="bg-white p-6 rounded shadow">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold">Gallery</h3>
                {editMode && (
                  <div className="relative">
                    <label className="px-3 py-1 bg-blue-600 text-white rounded flex items-center gap-2 cursor-pointer">
                      <PlusIcon className="h-4 w-4" /> Add Images
                      <input 
                        type="file" 
                        accept="image/*" 
                        multiple 
                        onChange={async (e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            await onAddGallery(e.target.files);
                          }
                        }} 
                        className="hidden" 
                      />
                    </label>
                    {uploading && <span className="ml-2 text-sm text-gray-500">Uploading...</span>}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {(form.gallery || []).map((g, i) => (
                  <div key={i} className="relative border rounded overflow-hidden">
                    <img src={g} className="w-full h-28 object-cover" />
                    {editMode && (
                      <button 
                        onClick={() => removeGallery(i)} 
                        className="absolute top-1 right-1 bg-white rounded-full p-1 shadow"
                      >
                        <TrashIcon className="h-4 w-4 text-red-600" />
                      </button>
                    )}
                    {uploadProgress[`gallery-${i}`] && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="text-white text-sm">{uploadProgress[`gallery-${i}`]}%</div>
                      </div>
                    )}
                  </div>
                ))}
                {(!(form.gallery||[]).length) && (
                  <div className="col-span-full text-gray-500 text-center py-4">
                    No images yet. {editMode && "Click 'Add Images' to upload."}
                  </div>
                )}
              </div>
            </div>

            {/* Certificates */}
            <div className="bg-white p-6 rounded shadow">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold">Certificates</h3>
                {editMode && (
                  <div className="relative">
                    <label className="px-3 py-1 bg-blue-600 text-white rounded flex items-center gap-2 cursor-pointer">
                      <PlusIcon className="h-4 w-4" /> Add Certificates
                      <input 
                        type="file" 
                        accept="image/*,.pdf" 
                        multiple 
                        onChange={async (e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            await onAddCertificate(e.target.files);
                          }
                        }} 
                        className="hidden" 
                      />
                    </label>
                    {uploading && <span className="ml-2 text-sm text-gray-500">Uploading...</span>}
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {(form.certificates || []).map((c, i) => (
                  <div key={i} className="relative border rounded overflow-hidden">
                    {c.match(/\.(jpeg|jpg|gif|png)$/i) ? (
                      <img 
                        src={c} 
                        className="w-full h-32 object-cover" 
                        alt={`Certificate ${i+1}`}
                      />
                    ) : (
                      <div className="h-32 flex flex-col items-center justify-center bg-gray-100">
                        <span className="text-xs text-gray-500">PDF Document</span>
                        <span className="text-xs text-gray-500 mt-1 px-2 text-center truncate w-full">
                          {c.split('/').pop()}
                        </span>
                      </div>
                    )}
                    <div className="p-2 bg-white">
                      <a 
                        href={c} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-blue-600 text-sm underline block truncate"
                      >
                        {c.split('/').pop()}
                      </a>
                    </div>
                    {editMode && (
                      <button 
                        onClick={() => removeCertificate(i)} 
                        className="absolute top-1 right-1 bg-white rounded-full p-1 shadow"
                      >
                        <TrashIcon className="h-4 w-4 text-red-600" />
                      </button>
                    )}
                    {uploadProgress[`certificate-${i}`] && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="text-white text-sm">{uploadProgress[`certificate-${i}`]}%</div>
                      </div>
                    )}
                  </div>
                ))}
                {(!(form.certificates||[]).length) && (
                  <div className="col-span-full text-gray-500 text-center py-4">
                    No certificates uploaded. {editMode && "Click 'Add Certificates' to upload."}
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Right column */}
          <div className="space-y-6">

            {/* Bio & Services */}
            <div className="bg-white p-6 rounded shadow">
              <h3 className="font-semibold">Bio & Services</h3>
              <div className="mb-3">
                <label className="text-sm">Bio</label>
                {!editMode ? <p className="mt-1">{provider.bio || "Not set"}</p> : <textarea rows={4} value={form.bio} onChange={(e)=>setForm({...form, bio: e.target.value})} className="w-full border p-2 rounded" />}
              </div>

              <div>
                <label className="text-sm">Services (comma separated)</label>
                {!editMode ? <p className="mt-1">{(provider.services||[]).join(", ") || defaultServices}</p> : <input value={form.services} onChange={(e)=>setForm({...form, services: e.target.value})} className="w-full border p-2 rounded" />}
              </div>
            </div>

            {/* Pricing table */}
            <div className="bg-white p-6 rounded shadow">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold">Pricing</h3>
                {editMode && <button onClick={addPricingRow} className="px-3 py-1 bg-blue-600 text-white rounded flex items-center gap-2"><PlusIcon className="h-4 w-4" /> Add</button>}
              </div>

              <div className="space-y-3">
                {(form.pricing || []).map((p, i) => (
                  <div key={i} className="grid grid-cols-12 gap-2 items-center">
                    <div className="col-span-5">
                      <input value={p.service} onChange={(e)=>updatePricing(i, { service: e.target.value })} disabled={!editMode} className="w-full border p-2 rounded" placeholder="Service name" />
                    </div>
                    <div className="col-span-3">
                      <input type="number" value={p.price} onChange={(e)=>updatePricing(i, { price: Number(e.target.value) })} disabled={!editMode} className="w-full border p-2 rounded" placeholder="Price" />
                    </div>
                    <div className="col-span-3">
                      <input value={p.description} onChange={(e)=>updatePricing(i, { description: e.target.value })} disabled={!editMode} className="w-full border p-2 rounded" placeholder="Description (optional)" />
                    </div>
                    <div className="col-span-1 text-right">
                      {editMode && <button onClick={()=>deletePricing(i)} className="text-red-600"><TrashIcon className="h-5 w-5" /></button>}
                    </div>
                  </div>
                ))}
                {(!(form.pricing||[]).length) && <div className="text-gray-500">No pricing items</div>}
              </div>
            </div>

            {/* Team members */}
            <div className="bg-white p-6 rounded shadow">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold">Team Members</h3>
                {editMode && <button onClick={addTeamMember} className="px-3 py-1 bg-blue-600 text-white rounded flex items-center gap-2"><PlusIcon className="h-4 w-4" /> Add</button>}
              </div>
              <div className="space-y-3">
                {(form.teamMembers || []).map((m, idx) => (
                  <div key={idx} className="border rounded p-3">
                    <div className="flex gap-3 items-center">
                      <div className="flex-1">
                        <input value={m.name} onChange={(e)=>updateTeamMember(idx, { name: e.target.value })} disabled={!editMode} placeholder="Name" className="w-full border p-2 rounded mb-2" />
                        <input value={m.phone} onChange={(e)=>updateTeamMember(idx, { phone: e.target.value })} disabled={!editMode} placeholder="Phone" className="w-full border p-2 rounded mb-2" />
                        <input value={(m.skills||[]).join(", ")} onChange={(e)=>updateTeamMember(idx, { skills: (e.target.value||"").split(",").map(s=>s.trim()).filter(Boolean) })} disabled={!editMode} placeholder="Skills (comma separated)" className="w-full border p-2 rounded" />
                      </div>
                      {editMode && <div><button onClick={()=>deleteTeamMember(idx)} className="text-red-600"><TrashIcon className="h-5 w-5" /></button></div>}
                    </div>
                  </div>
                ))}
                {(!(form.teamMembers||[]).length) && <div className="text-gray-500">No team members</div>}
              </div>
            </div>

            {/* Bank details */}
            <div className="bg-white p-6 rounded shadow">
              <h3 className="font-semibold mb-2">Bank / Payment details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="text-sm">Account holder name</label>
                  {!editMode ? <p>{provider.bankDetails?.accountName || "Not set"}</p> : <input value={form.bankDetails?.accountName || ""} onChange={(e)=>setForm({...form, bankDetails:{...form.bankDetails, accountName: e.target.value}})} className="w-full border p-2 rounded" />}
                </div>
                <div>
                  <label className="text-sm">Account number</label>
                  {!editMode ? <p>{provider.bankDetails?.accountNumber || "Not set"}</p> : <input value={form.bankDetails?.accountNumber || ""} onChange={(e)=>setForm({...form, bankDetails:{...form.bankDetails, accountNumber: e.target.value}})} className="w-full border p-2 rounded" />}
                </div>
                <div>
                  <label className="text-sm">IFSC</label>
                  {!editMode ? <p>{provider.bankDetails?.ifsc || "Not set"}</p> : <input value={form.bankDetails?.ifsc || ""} onChange={(e)=>setForm({...form, bankDetails:{...form.bankDetails, ifsc: e.target.value}})} className="w-full border p-2 rounded" />}
                </div>
                <div>
                  <label className="text-sm">UPI ID</label>
                  {!editMode ? <p>{provider.bankDetails?.upiId || "Not set"}</p> : <input value={form.bankDetails?.upiId || ""} onChange={(e)=>setForm({...form, bankDetails:{...form.bankDetails, upiId: e.target.value}})} className="w-full border p-2 rounded" />}
                </div>
              </div>
            </div>

            {/* Experience docs */}
            <div className="bg-white p-6 rounded shadow">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold">Experience Documents</h3>
                {editMode && <input type="file" accept=".pdf,image/*" onChange={async (e)=>{ const f=e.target.files?.[0]; if(f) await onAddExperienceDoc(f); }} />}
              </div>
              <div className="space-y-2">
                {(form.experienceDocs || []).map((d, i) => (
                  <div key={i} className="flex justify-between items-center border rounded p-2">
                    <a href={d} target="_blank" rel="noreferrer" className="text-blue-600 underline break-all">{d}</a>
                    {editMode && <button onClick={()=>removeExperienceDoc(i)} className="text-red-600">Remove</button>}
                  </div>
                ))}
                {(!(form.experienceDocs||[]).length) && <div className="text-gray-500">No experience docs</div>}
              </div>
            </div>

            {/* Categories / misc */}
            <div className="bg-white p-6 rounded shadow">
              <h3 className="font-semibold mb-2">Categories & Misc</h3>
              <label className="text-sm">Categories (comma separated)</label>
              {!editMode ? <p className="mt-1">{(provider.categories || []).join(", ") || "None"}</p> : <input value={form.categories} onChange={(e)=>setForm({...form, categories: e.target.value})} className="w-full border p-2 rounded" />}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}