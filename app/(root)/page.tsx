import Home from "@/components/Home";
import Loading from "@/components/Loading";
import { Suspense } from "react";

const page = async ({ searchParams }: SearchParamProps) => {
  
  return (
    <Suspense fallback={<Loading type="home"/>}>
      <Home searchParams={searchParams}></Home>
    </Suspense>
  );
};

export default page;
