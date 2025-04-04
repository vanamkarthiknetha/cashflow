import Image from "next/image";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen w-full justify-between font-inter">
      <section className="flex-center size-full max-sm:px-6">
        {children}
      </section>
      <div className="auth-asset">
        <div>
          {/* <Image
            src="/icons/auth-image.svg"
            alt="Auth image"
            width={500}
            height={500}
            className="rounded-l-xl object-contain"
          /> */}
        </div>
      </div>
    </main>
  );
}
