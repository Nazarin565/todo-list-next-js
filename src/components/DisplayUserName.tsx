"use client";

import React, { useEffect, useState } from "react";

export const DisplayUserName = () => {
  const [displayName, setDisplayName] = useState<string | null>(null);

  useEffect(() => {
    setDisplayName(localStorage.getItem("displayName"));
  }, []);

  return <h1>Hello, {displayName}</h1>;
};
