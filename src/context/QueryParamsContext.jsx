"use client";

import { createContext, useContext, useMemo } from "react";
import { useSearchParams } from "next/navigation";

const QueryParamsCtx = createContext({});

export function QueryParamsProvider({ children }) {
  const sp = useSearchParams();
  
  // Recompute only when query string changes
  const value = useMemo(
    () => Object.fromEntries(sp.entries()),
    [sp.toString()]
  );


  return (
    <QueryParamsCtx.Provider value={value}>
      {children}
    </QueryParamsCtx.Provider>
  );
}

export function useQueryParams() {
  return useContext(QueryParamsCtx) || {};
}

export function useQueryParam(name, def = "") {
  const q = useQueryParams();
  return q[name] ?? def;
}
