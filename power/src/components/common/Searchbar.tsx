"use client";

type SearchbarProps = {
  small?: boolean;
};

export function Searchbar({ small }: SearchbarProps) {
  return (
    <div
      className={`${
        small ? "p-1" : "p-3"
      } bg-white shadow-lg rounded-xl flex gap-3 items-center`}
    >
      {/* Location Input */}
      <input
        type="text"
        placeholder="Enter your location"
        className={`border px-4 py-2 rounded-lg w-44 md:w-60 text-gray-700 outline-none`}
      />

      {/* Category Dropdown */}
      <select
        className="border px-4 py-2 rounded-lg text-gray-700 outline-none min-w-[150px]"
      >
        <option>All Categories</option>
        <option>Electrician</option>
        <option>Plumber</option>
        <option>AC Repair</option>
        <option>Carpenter</option>
        <option>Painter</option>
        <option>IT Support</option>
        <option>CCTV Technician</option>
        <option>Appliance Repair</option>
      </select>

      {/* Button */}
      <button className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
        Search
      </button>
    </div>
  );
}
