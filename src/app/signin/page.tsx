"use client";
import { signIn } from "next-auth/react";
import FormField from "@/components/FormField";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function SignIn() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (formData.email.length > 0 && formData.password.length > 7) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [formData]);

  const handleSignIn = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/user/login", formData);
      if (response.data.success === true) {
        toast.success(response.data.message);
      }
      router.push("/");
    } catch (error: any) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setFormData({ ...formData, password: newPassword });

    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
    } else {
      setPasswordError("");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-5">
      <p className="text-xl sm:text-3xl font-black">Medium-Blog</p>
      <p className="text-xl sm:text-3xl font-bold">Sign In To Your Account</p>
      <p className="font-semibold">
        Create new account?{" "}
        <Link href={"/signup"} className="underline text-blue-500">
          Sign Up
        </Link>
      </p>
      <form
        onSubmit={handleSignIn}
        className="flex flex-col justify-center items-center space-y-3"
      >
        <FormField
          label="Email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          type="email"
          key="email"
          required={true}
        ></FormField>
        <FormField
          label="Password"
          name="password"
          placeholder="Enter a password"
          value={formData.password}
          onChange={handlePasswordChange}
          type="password"
          required
        />
        {passwordError && (
          <p className="text-red-500 text-sm">{passwordError}</p>
        )}
        <Button
          type="submit"
          disabled={buttonDisabled}
          className="w-full disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 className="animate-spin" /> : "Sign In"}
        </Button>
      </form>
      <div className="relative flex items-center w-60 sm:w-96">
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="bg-white px-2 font-medium">OR</p>
        </div>
        <hr className="w-full border-t border-gray-300" />
      </div>
      <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-5 w-60 sm:w-96">
        <Button onClick={() => signIn("github")} className="w-full">
          {loading ? <Loader2 className="animate-spin" /> : "GitHub"}
        </Button>
        <Button onClick={() => signIn("google")} className="w-full">
          {loading ? <Loader2 className="animate-spin" /> : "Google"}
        </Button>
      </div>
      <p className="text-sm">
        <sup className="text-red-500">*</sup> Indicates required fields
      </p>
      <p className="font-semibold">
        Continue without signin?{" "}
        <Link href={"/"} className="underline text-blue-500">
          Explore
        </Link>
      </p>
    </div>
  );
}
