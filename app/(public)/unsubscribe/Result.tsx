import Link from "next/link";
import React from "react";

interface ResultProps {
  title: string;
  description: string;
  error?: boolean;
}

const Result: React.FC<ResultProps> = ({ title, description, error }) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center space-y-2">
        <p className={`text-sm font-semibold ${error ? "text-red-500" : ""}`}>
          {title}
        </p>
        <p className="text-sm text-muted-foreground">{description}</p>
        <Link href="/" className="text-sm underline">
          Back to site →
        </Link>
      </div>
    </div>
  );
};

export default Result;
