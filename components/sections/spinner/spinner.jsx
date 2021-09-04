import React from "react";

export const Spinner = () => {
  const { isAuthenticated } = useMoralis();
  
  return (
    <div>
      Hello I am a spinenr!
    </div>
  );
};
