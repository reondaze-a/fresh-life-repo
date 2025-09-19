import { useSearchParams } from "next/navigation";

export default function useFromReader({ onValue }) {
  const params = useSearchParams();
  useEffect(() => {
    onValue(params.get("from") || "/");
  }, [params.toString().onValue]);
  return null;
}
