"use client";
import { signIn } from "next-auth/react";
import FormField from "@/components/FormField";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export default function SignIn() {
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
    setLoading(true);
    const response = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
    setLoading(false);
    if (response?.error) {
      switch (response.error) {
        case "CredentialsSignin":
          toast.error("Invalid Credentilas");
          break;
        default:
          toast.error("Something Went Wrong");
      }
    } else {
      toast.success("Logged In Successfully");
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
          <p className="text-red-500 text-sm text-center w-60 sm:w-96">
            {passwordError}
          </p>
        )}
        <Button
          type="submit"
          disabled={buttonDisabled || loading}
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
          GitHub
        </Button>
        <Button onClick={() => signIn("google")} className="w-full">
          Google
        </Button>
      </div>
      <p className="text-sm">
        <sup className="text-red-500">*</sup> Indicates required fields
      </p>
    </div>
  );
}
