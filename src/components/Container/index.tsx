import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-screen bg-gray-900 w-full flex flex-col max-h-screen justify-between items-center">
      {children}
    </main>
  );
};

export default Container;