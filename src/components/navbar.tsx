import React, { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

// Move dark mode logic to a function
function toggleDarkMode() {
  const isDark = document.documentElement.classList.contains("dark");
  if (!isDark) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
  setThemeIcons();
}

function setThemeIcons() {
  const sunIcon = document.getElementsByClassName("sun-icon");
  const moonIcon = document.getElementsByClassName("moon-icon");
  const isDark = document.documentElement.classList.contains("dark");
  Array.from(sunIcon).forEach((el) => el.classList.toggle("hidden", isDark));
  Array.from(moonIcon).forEach((el) => el.classList.toggle("hidden", !isDark));
}

const Navbar: React.FC = () => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  useEffect(() => {
    // Set initial theme
    if (
      localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    setThemeIcons();
  }, []);

  useEffect(() => {
    if (popoverOpen) {
      setThemeIcons();
    }
  }, [popoverOpen]);

  return (
    <nav className="px-4 sm:px-6 lg:px-8 mx-auto flex items-center justify-between py-2 sticky top-0 z-50 text-gray-500 dark:text-white bg-background/40 backdrop-blur-3xl backdrop-saturate-150 shadow-sm">
      <a
        className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2"
        href="/">
        <img src="/favicon.svg" alt="Logo" className="h-8 w-8 inline-block" />
        Ray Fon Watson
      </a>

      <div className="hidden md:flex space-x-4 items-center">
        {/* Resume icon */}
        <a
          href="https://drive.google.com/file/d/1G8rrqlHVj8YadlK36a5bVON5DN93Tp1u/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="px-2 py-1 flex gap-x-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-newspaper-icon lucide-newspaper">
            <path d="M15 18h-5"></path>
            <path d="M18 14h-8"></path>
            <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2"></path>
            <rect width="8" height="4" x="10" y="6" rx="1"></rect>
            <title>View my resume!</title>
          </svg>
          Resume
        </a>

        {/* GitHub icon */}
        <a
          href="https://github.com/r4yfon"
          target="_blank"
          rel="noopener noreferrer"
          className="px-2 py-1 flex gap-x-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-github-icon lucide-github">
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
            <path d="M9 18c-4.51 2-5-2-7-2"></path>
            <title>View my GitHub profile!</title>
          </svg>
          GitHub
        </a>

        {/* Mail icon */}
        <a
          href="mailto:srayfon93@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="px-2 py-1 flex gap-x-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-mail-icon lucide-mail">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <path d="M22 6l-10 7L2 6"></path>
            <title>Send me an email!</title>
          </svg>
          Email
        </a>

        {/* Dark mode button */}
        <button
          className="simple-dark-toggle p-2 me-3 md:me-0 flex gap-x-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
          aria-label="Toggle dark mode"
          type="button"
          onClick={toggleDarkMode}>
          <span className="sun-icon hidden">
            {/* Lucide Sun SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-sun-icon lucide-sun">
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M12 2v2"></path>
              <path d="M12 20v2"></path>
              <path d="m4.93 4.93 1.41 1.41"></path>
              <path d="m17.66 17.66 1.41 1.41"></path>
              <path d="M2 12h2"></path>
              <path d="M20 12h2"></path>
              <path d="m6.34 17.66-1.41 1.41"></path>
              <path d="m19.07 4.93-1.41 1.41"></path>
              <title>Toggle dark mode</title>
            </svg>
          </span>
          <span className="moon-icon hidden">
            {/* Lucide Moon SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-moon-icon lucide-moon">
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
              <title>Toggle dark mode</title>
            </svg>
          </span>
        </button>
      </div>

      {/* Hamburger for mobile */}
      <div className="md:hidden flex items-center">
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
          <PopoverTrigger className="hover:bg-gray-200 p-1 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <line x1="4" y1="7" x2="24" y2="7"></line>
              <line x1="4" y1="14" x2="24" y2="14"></line>
              <line x1="4" y1="21" x2="24" y2="21"></line>
            </svg>
          </PopoverTrigger>
          <PopoverContent className="p-2 w-48">
            <a
              href="https://drive.google.com/file/d/1G8rrqlHVj8YadlK36a5bVON5DN93Tp1u/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 py-1 flex gap-x-1 rounded-md hover:bg-gray-200 text-gray-500 dark:text-white dark:hover:bg-gray-600 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-newspaper-icon lucide-newspaper">
                <path d="M15 18h-5"></path>
                <path d="M18 14h-8"></path>
                <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2"></path>
                <rect width="8" height="4" x="10" y="6" rx="1"></rect>
                <title>View my resume!</title>
              </svg>
              Resume
            </a>
            <a
              href="https://github.com/r4yfon"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 py-1 flex gap-x-1 rounded-md hover:bg-gray-200 text-gray-500 dark:text-white dark:hover:bg-gray-600 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-github-icon lucide-github">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                <path d="M9 18c-4.51 2-5-2-7-2"></path>
                <title>View my GitHub profile!</title>
              </svg>
              GitHub
            </a>
            <a
              href="mailto:srayfon93@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 py-1 flex gap-x-1 rounded-md hover:bg-gray-200 text-gray-500 dark:text-white dark:hover:bg-gray-600 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-mail-icon lucide-mail">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <path d="M22 6l-10 7L2 6"></path>
                <title>Send me an email!</title>
              </svg>
              Email
            </a>
            {/* Dark mode button */}
            <button
              className="simple-dark-toggle px-2 py-1 me-3 md:me-0 flex gap-x-1 rounded-md w-full text-gray-500 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
              aria-label="Toggle dark mode"
              type="button"
              id="mobile-dark-toggle"
              onClick={toggleDarkMode}>
              <span className="sun-icon hidden">
                {/* Lucide Sun SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-sun-icon lucide-sun">
                  <circle cx="12" cy="12" r="4"></circle>
                  <path d="M12 2v2"></path>
                  <path d="M12 20v2"></path>
                  <path d="m4.93 4.93 1.41 1.41"></path>
                  <path d="m17.66 17.66 1.41 1.41"></path>
                  <path d="M2 12h2"></path>
                  <path d="M20 12h2"></path>
                  <path d="m6.34 17.66-1.41 1.41"></path>
                  <path d="m19.07 4.93-1.41 1.41"></path>
                  <title>Toggle dark mode</title>
                </svg>
              </span>
              <span className="moon-icon hidden">
                {/* Lucide Moon SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-moon-icon lucide-moon">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                  <title>Toggle dark mode</title>
                </svg>
              </span>
              <span className="dark:hidden">Dark mode</span>
              <span className="hidden dark:inline">Light mode</span>
            </button>
          </PopoverContent>
        </Popover>
      </div>
    </nav>
  );
};

export default Navbar;
