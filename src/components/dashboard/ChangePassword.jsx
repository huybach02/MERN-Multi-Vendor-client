import React from "react";

const ChangePassword = () => {
  return (
    <div className="p-4 bg-white">
      <h2 className="text-2xl font-semibold text-blue-600 mb-5">
        Change Password
      </h2>
      <form>
        <div className="flex flex-col gap-1 mb-3">
          <label htmlFor="old_password">Old Password</label>
          <input
            type="password"
            id="old_password"
            name="old_password"
            placeholder="Enter old password"
            className="outline-none px-3 py-2 border rounded-md"
          />
        </div>
        <div className="flex flex-col gap-1 mb-3">
          <label htmlFor="new_password">New Password</label>
          <input
            type="password"
            id="new_password"
            name="new_password"
            placeholder="Enter new password"
            className="outline-none px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <button className="px-8 py-2 bg-main hover:shadow-md text-white rounded-md">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
