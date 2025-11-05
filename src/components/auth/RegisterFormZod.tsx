"use client";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { registerSchema } from "../../../validators/auth-validator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { SubmitButton } from "../buttons/SubmitBtn";
import Socials from "./Socials";
import { Paytone_One } from "next/font/google";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { generateVerificationToken } from "@/utils/token";
import { IsUserEmailExist } from "../../../server/actions";
import { sendCodeThroughNodemailer } from "../../../server/auth";

const pay = Paytone_One({ subsets: ["latin"], weight: "400" });

const RegisterForm = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [preEmail, setPreEmail] = useState("");
  const [preOtp, setPreOtp] = useState("");
  const [expires, setExpires] = useState<Date | null>();
  const [code, setCode] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
      otp: "",
    },
  });

  const getCode = async () => {
    setCode(true);
    const email = form.getValues("email"); // Get the email value
    const username = form.getValues("username"); // Get the username value
    const checkUserEmailExist = await IsUserEmailExist(email);
    
    if (checkUserEmailExist) {
      setCode(false);
      return setError("Email already exist");
    }
    if (!email) {
      setError("Please enter your email first.");
      setCode(false);
      return;
    }
    setPreEmail(email);
    setError("");
    const { otp, expires } = await generateVerificationToken();
    //send verification email
    const emailRes = await sendCodeThroughNodemailer(email, username, otp);
    if (emailRes.status != 200) {
      setCode(false);
      return setError("Something was wrong via send email");
    }
    setPreOtp(otp);
    setExpires(expires);
  };

  const onSubmit = async (values: { username: string; email: string; password: string; otp: string }) => {
    setLoading(true);
    const username = values.username;
    const email = values.email;
    const password = values.password;
    const otp = values.otp;

    if (!username || !email || !password || !otp) return setError("Filled all details");
    if (email !== preEmail) return setError("Email does not match");
    if (otp !== preOtp) return setError("OTP does not match");
    else {
      try {
        let res = await fetch("/api/auth/register", {
          method: "POST",
          body: JSON.stringify({ ...values, expires }),
        });
        let data = await res.json();
        if (res.ok) {
          setSuccess(data.message);
          setLoading(false);
          router.refresh();
          router.push("/auth/login");
        } else if (!res.ok) {
          setLoading(false);
          setError(data.message);
        }
      } catch (error) {
        console.log("Error in sign up", error);
        setLoading(false);
      }
    }
  };

  return (
    <div className="z-20 sm:w-[420px] w-[300px] bg-zinc-900 p-6 rounded-2xl">
      <div className="flex items-center justify-center">
        <Link href={`/`}>
          <h2 className={` text-[38px] text-neutral-800 dark:text-neutral-200 ${pay.className}`}>
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent font-bold">PersonaAI</span>
          </h2>
        </Link>
      </div>
      <p className="mt-2 text-sm opacity-60 text-center">Only register via Email or Google to access Persona AI all features.</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 my-6"
          noValidate
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <LabelInputContainer className={"mb-4"}>
                  <FormControl>
                    <Input
                      className="rounded-lg h-[42px]"
                      placeholder="Your name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </LabelInputContainer>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <LabelInputContainer className={"mb-4"}>
                  <FormControl>
                    <Input
                      className="rounded-lg h-[42px] border-[1px]"
                      placeholder="youremail@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </LabelInputContainer>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <LabelInputContainer className={"mb-4"}>
                  <FormControl>
                    <Input
                      className="rounded-lg h-[42px] border-[1px] "
                      type="password"
                      placeholder="Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </LabelInputContainer>
              </FormItem>
            )}
          />
          <div className="flex items-start gap-4">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      className="rounded-lg w-full h-[42px] border-[1px]  !overflow-hidden"
                      type="text "
                      maxLength={6}
                      placeholder="Your OTP"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div
              onClick={code ? undefined : getCode}
              className={` cursor-pointer h-[42px] bg-input/40 text-zinc-400 border-[1px] rounded-lg text-sm inline-flex items-center justify-center whitespace-nowrap px-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:opacity-80 ${
                code ? "opacity-30 hover:!opacity-30" : " "
              }`}
            >
              Send code
            </div>
          </div>
          <div className="flex gap-2 items-start mt-4">
            <RadioGroup defaultValue="comfortable">
              <div className="flex items-center space-x-2 mt-[5px] ">
                <RadioGroupItem
                  className=" rounded-sm border-zinc-700 border-[1px]"
                  value="default"
                  id="r1"
                />
              </div>
            </RadioGroup>

            <div className="text-sm text-neutral-500">
              I confirm that I have read and agree to the Azeorex's{" "}
              <a
                href="https://cdn.deepseek.com/policies/en-US/deepseek-terms-of-use.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                Terms of Use
              </a>{" "}
              &{" "}
              <a
                href="https://cdn.deepseek.com/policies/en-US/deepseek-privacy-policy.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                Privacy Policy
              </a>
              .
            </div>
          </div>
          <div className={`mb-4 ${error ? "text-red-500 text-[0.8rem] font-medium" : " text-emerald-500 text-[0.8rem] font-medium"} `}>{error ? error : success}</div>

          <SubmitButton
            className="bg-blue-500 border-x relative group/btn block w-full text-white rounded-lg h-10 border border-blue-600 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] py-0 text-base"
            disable_className="opacity-80 border-x w-full text-white rounded-xl h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] text-base"
            loading={loading}
          >
            Sign up &rarr;
            <BottomGradient />
          </SubmitButton>
          <h4 className="text-white/60 mt-4 text-center text-sm">
            Already have an acoount?{" "}
            <span className=" text-blue-600">
              <Link href={`/auth/login`}>Login</Link>
            </span>
          </h4>
        </form>
      </Form>
      <div className="bg-gradient-to-r from-transparent via-neutral-600 to-transparent my-6 h-[1px] w-full" />
      <Socials />
    </div>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={cn("flex flex-col space-y-2 w-full", className)}>{children}</div>;
};

export default RegisterForm;
