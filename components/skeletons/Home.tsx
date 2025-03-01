import { Skeleton } from "@/components/ui/skeleton";

const HomeSkeleton = () => {
  return (<>
    <section className="home">
      <div className="home-content">
      {/* Header Skeleton */}

        <header className="home-header">
        <div className="home-header space-y-4">
        <Skeleton className="w-full h-[280px]" />
      </div>
        </header>
      {/* Transactions Skeleton */}

        <div className="space-y-4">
        <Skeleton className="h-6 w-1/2 rounded-md" />
        <Skeleton className="h-6 w-2/3 rounded-md" />
        <Skeleton className="h-6 w-3/4 rounded-md" />
      </div>
      </div>
      {/* Right Sidebar Skeleton */}

    </section>
    </>

  );
};

export default HomeSkeleton;
