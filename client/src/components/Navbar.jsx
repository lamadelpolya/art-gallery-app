import { forwardRef } from "react";

const Navbar = forwardRef(({ toggleSidebar }, ref) => {
  return (
    <nav
      ref={ref}
      className="sticky top-0 z-50 flex items-center justify-between border-2 border-pallette-50 bg-pallette-400 p-4 text-pallette-200"
    >
      <h1 className="flex-grow text-left text-6xl font-normal">ARTRA</h1>
      <button className="px-5 py-2" onClick={toggleSidebar}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="inline-block h-10 w-10 stroke-current" // Increased size here
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>
    </nav>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;
