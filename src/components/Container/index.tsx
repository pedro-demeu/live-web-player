import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-screen flex flex-col align-center justify-between">
      {children}
    </main>
  );
};

export default Container;