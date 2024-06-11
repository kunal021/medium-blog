import { Loader2 } from "lucide-react";

function Loader() {
  return (
    <div className="fixed flex justify-center items-center inset-0">
      <Loader2 className="animate-spin h-8 w-8" />
    </div>
  );
}

export default Loader;
