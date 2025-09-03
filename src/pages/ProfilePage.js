import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Spinner from "../components/Common/Spinner";
import toast from "react-hot-toast";
import api from "../api/axiosConfig";

const ProfilePage = () => {
  const { userId, userName, loading, updateProfile, deleteAccount } =
    useContext(AuthContext);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
  });
  const [saving, setSaving] = useState(false);
  const [fetchingUser, setFetchingUser] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserDetails = async () => {
      if (!userId) {
        console.log("No userId available");
        return;
      }

      setFetchingUser(true);
      try {
        console.log("Fetching user details for userId:", userId);
        const response = await api.get(`/customers/${userId}`);
        console.log("User details response:", response.data);

        const {
          firstName,
          lastName,
          dateOfBirth,
          phoneNumber,
          address,
          city,
          state,
        } = response.data;

        console.log("Raw dateOfBirth from API:", dateOfBirth);

        const formattedDateOfBirth = dateOfBirth
          ? new Date(dateOfBirth).toISOString().split("T")[0]
          : "";

        console.log("Formatted dateOfBirth for input:", formattedDateOfBirth);

        setForm({
          firstName: firstName || "",
          lastName: lastName || "",
          dateOfBirth: formattedDateOfBirth,
          phoneNumber: phoneNumber || "",
          address: address || "",
          city: city || "",
          state: state || "",
        });
      } catch (error) {
        console.error("Failed to fetch user details:", error);
        toast.error("Failed to load user details");
        // Keep existing form values if API fails - don't reset them
      } finally {
        setFetchingUser(false);
      }
    };

    getUserDetails();
  }, [userId, userName]);

  if (loading || fetchingUser) return <Spinner />;
  if (!userId) return null;

  const onChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const onSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { personalResponse, locationResponse } = await updateProfile(
        form,
        userId
      );
      console.log("Personal response:", personalResponse.data);
      console.log("Location response:", locationResponse.data);
      toast.success("Profile updated");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async () => {
    if (!window.confirm("Delete account? This cannot be undone.")) return;
    try {
      await deleteAccount();
      toast.success("Account deleted");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete account");
    }
  };

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Your Profile</h2>
        <form onSubmit={onSave} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                name="firstName"
                value={form.firstName}
                onChange={onChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                name="lastName"
                value={form.lastName}
                onChange={onChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              name="phoneNumber"
              type="tel"
              value={form.phoneNumber}
              onChange={onChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              name="dateOfBirth"
              type="date"
              value={form.dateOfBirth}
              onChange={onChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              name="address"
              value={form.address}
              onChange={onChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                name="city"
                value={form.city}
                onChange={onChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                State
              </label>
              <input
                name="state"
                value={form.state}
                onChange={onChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={onDelete}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
            >
              Delete Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
