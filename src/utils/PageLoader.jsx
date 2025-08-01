import { Loader2 } from "lucide-react";
import usePageLoader from "../utils/pageLoaderStore";

const PageLoader = () => {
    const isLoading = usePageLoader((state) => state.isLoading);

    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 z-[9999] bg-white/70 flex items-center justify-center">
            <Loader2 className="animate-spin w-8 h-8 text-blue-600" />
        </div>
    );
};

export default PageLoader;


