import React from "react";

interface MarkdownContentProps {
  children: React.ReactNode;
  className?: string;
}

const MarkdownContent: React.FC<MarkdownContentProps> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`
        [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:mb-4 [&>h1]:mt-8
        [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:mb-3 [&>h2]:mt-6
        [&>h3]:text-xl [&>h3]:font-medium [&>h3]:mb-2 [&>h3]:mt-4
        [&>p]:mb-4 [&>p]:leading-relaxed
        [&>ul]:mb-4 [&>ul]:pl-6 [&>ul]:list-disc
        [&>ol]:mb-4 [&>ol]:pl-6 [&>ol]:list-decimal
        [&>li]:mb-1
        [&>a]:text-blue-600 [&>a]:underline hover:[&>a]:text-blue-800
        dark:[&>a]:text-blue-400 dark:hover:[&>a]:text-blue-300
        [&>img]:rounded-lg [&>img]:shadow-md [&>img]:my-6 [&>img]:max-w-full
        [&>pre]:bg-gray-100 [&>pre]:p-4 [&>pre]:rounded-lg [&>pre]:overflow-x-auto
        dark:[&>pre]:bg-gray-800
        [&>code]:bg-gray-100 [&>code]:px-1 [&>code]:rounded
        dark:[&>code]:bg-gray-800
        ${className}
      `.trim()}>
      {children}
    </div>
  );
};

export default MarkdownContent;
