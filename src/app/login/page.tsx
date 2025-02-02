"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import LoadingUiBtn from "@/components/common/LoadingUiBtn";

type FormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm<FormData>();
  const handleLogin = async (data: FormData) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const response = await res.json();
      console.log(response);
      if (res.ok && response.token) {
        localStorage.setItem("token", response.token); // Store token
        router.push("/");
        toast.success("Login successful!");
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/");
    }
  }, [router]);

  return (
    <div className=" w-full h-screen grid place-items-center">
      <div className=" space-y-5">
        <h2 className=" text-lg font-semibold lg:text-2xl text-center">
          Login to Dashboard
        </h2>
        <form
          action=""
          onSubmit={handleSubmit(handleLogin)}
          className=" space-y-3"
        >
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              {...register("email")}
              className=" w-full md:w-[350px]"
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" {...register("password")} />
          </div>
          <div className=" text-center">
            <Button type="submit" disabled={isLoading} className="">
              {isLoading ? <LoadingUiBtn /> : "Login"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
