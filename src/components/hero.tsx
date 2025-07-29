import { Button } from "@/components/ui/button";
import { RESUME_URL } from "@/constants/urls";
import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full">
        <div className="text-left">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl mb-4 font-caprasimo">
            I'm Ray Fon
          </h3>
          <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed text-gray-700 dark:text-gray-300 mb-8">
            I'm meticulous about detail and passionate about software
            development and design. My fascination with technology began at age
            8, when I jailbroke my first iPhone. That curiosity has driven me
            ever since to explore, build, and create innovative solutions that
            achieve both form and function.
          </p>

          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <Button asChild size="lg">
              <a
                href="mailto:srayfon93@gmail.com"
                className="flex items-center gap-2">
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
                Get in Touch
              </a>
            </Button>

            <Button asChild variant="outline" size="lg">
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2">
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
                View Resume
              </a>
            </Button>

            <Button asChild variant="outline" size="lg">
              <a
                href="https://github.com/r4yfon"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2">
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
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
