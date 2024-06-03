import { Loader2 } from "lucide-react";

function Loader() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Loader2 className="animate-spin h-8 w-8" />
    </div>
  );
}

export default Loader;
