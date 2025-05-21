"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomInput from "./CustomInput";
import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/actions/user.actions";
import PlaidLink from "./PlaidLink";
import { toast } from "sonner";

const AuthForm = ({ type }: AuthFormProps) => {
  const [domLoaded, setDomLoaded] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    setDomLoaded(true);
  }, []);

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = authFormSchema(type);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      address1: "",
      city: "",
      state: "",
      postalCode: "",
      dateOfBirth: "",
      ssn: "",
      email: "",
      password: "",
      // firstName: "User",
      // lastName: "Random",
      // address1: "abc, xyz",
      // city: "Hyderabad",
      // state: "NY",
      // postalCode: "12345",
      // dateOfBirth: "2004-01-01",
      // ssn: "1234",
      // email: "test@gmail.com",
      // password: "12345678",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      // Sign up with Appwrite & create plaid token
      if (type === "sign-up") {
        const userData = {
          firstName: data.firstName!,
          lastName: data.lastName!,
          address1: data.address1!,
          city: data.city!,
          state: data.state!,
          postalCode: data.postalCode!,
          dateOfBirth: data.dateOfBirth!,
          ssn: data.ssn!,
          email: data.email,
          password: data.password,
        };
        const response = await signUp(userData);
        if(response.success){
          setUser(response.user);
        }else{
          setIsLoading(false);
          toast.error(response.message)
        }
      }
      if (type === "sign-in") {
        const response = await signIn({
          email: data.email,
          password: data.password,
        });
        if (response.success) router.push("/");
        else {
          setIsLoading(false);
          console.log(response.message)
          toast.error(response.message)
        }
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      
    }
  };
  // useEffect(()=>{
  //   toast("Sign in with tester@gmail.com / 12345678 to explore or create an account.",{
  //     duration:20000,
  //     style: {
  //       fontSize:"15px"
  //     },
  //   });
  // },[])
  useEffect(() => {
    const handleComplete = () => setIsLoading(false);

    if (isLoading) {
      const interval = setInterval(() => {
        if (window.location.pathname === "/") {
          handleComplete();
          clearInterval(interval);
        }
      }, 300); // Check every 300ms

      return () => clearInterval(interval);
    }
  }, [isLoading]);

  return (
    domLoaded && (
      <section className="auth-form">
        <header className="flex flex-col gap-5 md:gap-8">
          <Link href="/" className="cursor-pointer flex items-center gap-1">
            <Image
              src="/icons/logo.svg"
              width={34}
              height={34}
              alt="CashFlow logo"
            />
            <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
              CashFlow
            </h1>
          </Link>

          <div className="flex flex-col gap-1 md:gap-3">
            <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
              {user
                ? "Link Account"
                : type === "sign-in"
                ? "Sign In"
                : "Sign Up"}
              <p className="text-16 font-normal text-gray-600">
                {user
                  ? "Link your account to get started"
                  : "Please enter your details"}
              </p>
            </h1>
          </div>
        </header>
        {user ? (
          <div className="flex flex-col gap-4">
            <PlaidLink user={user} variant="primary" />
          </div>
        ) : (
          <>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                {type === "sign-up" && (
                  <>
                    <div className="flex gap-4">
                      <CustomInput
                        control={form.control}
                        name="firstName"
                        label="First Name"
                        placeholder="Enter your first name"
                      />
                      <CustomInput
                        control={form.control}
                        name="lastName"
                        label="Last Name"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <CustomInput
                      control={form.control}
                      name="address1"
                      label="Address"
                      placeholder="Enter your specific address"
                    />
                    <CustomInput
                      control={form.control}
                      name="city"
                      label="City"
                      placeholder="Enter your city"
                    />
                    <div className="flex gap-4">
                      <CustomInput
                        control={form.control}
                        name="state"
                        label="State"
                        placeholder="Example: NY"
                      />
                      <CustomInput
                        control={form.control}
                        name="postalCode"
                        label="Postal Code"
                        placeholder="Example: 11101"
                      />
                    </div>
                    <div className="flex gap-4">
                      <CustomInput
                        control={form.control}
                        name="dateOfBirth"
                        label="Date of Birth"
                        placeholder="YYYY-MM-DD"
                      />
                      <CustomInput
                        control={form.control}
                        name="ssn"
                        label="SSN"
                        placeholder="Example: 1234"
                      />
                    </div>
                  </>
                )}

                <CustomInput
                  control={form.control}
                  name="email"
                  label="Email"
                  placeholder="Enter your email"
                />

                <CustomInput
                  control={form.control}
                  name="password"
                  label="Password"
                  placeholder="Enter your password"
                />

                <div className="flex flex-col gap-4">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="form-btn"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={20} className="animate-spin" /> &nbsp;
                        Loading...
                      </>
                    ) : type === "sign-in" ? (
                      "Sign In"
                    ) : (
                      "Sign Up"
                    )}
                  </Button>
                </div>
              </form>
            </Form>

            <footer className="flex justify-center gap-1">
              <p className="text-14 font-normal text-gray-600">
                {type === "sign-in"
                  ? "Don't have an account?"
                  : "Already have an account?"}
              </p>
              <Link
                href={type === "sign-in" ? "/sign-up" : "/sign-in"}
                className="form-link"
              >
                {type === "sign-in" ? "Sign up" : "Sign in"}
              </Link>
            </footer>
          </>
        )}
      </section>
    )
  );
};

export default AuthForm;
