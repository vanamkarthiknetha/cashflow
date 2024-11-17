import MobileNav from "@/components/MobileNav";
import SideBar from "@/components/SideBar";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn={firstName:"Karthik"}
  return (
    <main className="flex h-screen w-full font-inter">
      <SideBar user={loggedIn}/>
      <div className="flex flex-col size-full ">
        <div className="root-layout">
          <Image src={'/icons/logo.svg'} width={30} height={30} alt="logo" />
          <div className="">
            <MobileNav user={loggedIn}/>
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}
