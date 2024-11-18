"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Footer from "./Footer";

const MobileNav = ({user}:MobileNavProps) => {
  const pathname = usePathname();
  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger>
          <Image
            src={"/icons/hamburger.svg"}
            width={30}
            height={30}
            alt="hamburger"
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent side={"left"} className="bg-white border-none">
          <SheetTitle className="hidden"></SheetTitle>
          <>
            <Link
              href={"/"}
              className="flex items-center cursor-pointer  gap-1 px-4"
            >
              <Image
                src={"/icons/logo.svg"}
                width={34}
                height={34}
                alt="CashFlow logo"
              />
              <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
                CashFlow
              </h1>
            </Link>
            <div className="mobilenav-sheet">
              <SheetClose asChild>
                <nav className="flex flex-col h-full gap-6 pt-16 text-white">
                  {sidebarLinks.map((item) => {
                    const isActive =
                      pathname === item.route ||
                      pathname.startsWith(`${item.route}/`);
                    return (
                      <SheetClose key={item.label} asChild>
                        <Link
                          href={item.route}
                          className={cn("mobilenav-sheet_close w-full", {
                            "bg-bank-gradient": isActive,
                          })}
                        >
                          <div className="relative size-6">
                            <Image
                              src={item.imgURL}
                              alt={item.label}
                              width={20}
                              height={20}
                              className={cn({
                                "brightness-[3] invert-0": isActive,
                              })}
                            />
                          </div>
                          <p
                            className={cn("text-16 font-semibold text-black-2", {
                              "!text-white": isActive,
                            })}
                          >
                            {item.label}
                          </p>
                        </Link>
                      </SheetClose>
                    );
                  })}
                  {/* USER */}
                </nav>
              </SheetClose>
              <Footer user={user} type="mobile"/>
            </div>

          </>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
