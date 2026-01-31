"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import api from "@/services/api";
import Link from "next/link";
import { Loader2, User, Mail, Lock, Film, ArrowRight, Eye, EyeOff, Shield, UserCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const signupSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["user", "admin"]),
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      role: "user",
    },
  });

  const password = watch("password");
  const role = watch("role");
  const passwordStrength = password
    ? password.length >= 8
      ? "Strong"
      : password.length >= 6
        ? "Medium"
        : "Weak"
    : "";

  const onSubmit = async (data: SignupFormData) => {
    try {
      setLoading(true);
      await api.post("/api/auth/signup", data);
      toast.success("Account created! Please sign in.");
      router.push("/login");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-base-200">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-3">
            <Film size={32} className="text-primary-content" />
          </div>
          <h1 className="text-3xl font-bold text-base-content">Create Account</h1>
          <p className="text-base-content/60 mt-1">Join CineManage today</p>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name Input */}
              <div className="form-control">
                <label className="label pb-1">
                  <span className="label-text font-semibold">Full Name</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" size={18} />
                  <input
                    {...register("name")}
                    type="text"
                    placeholder="John Doe"
                    className={`input input-bordered w-full pl-10 ${errors.name ? "input-error" : ""
                      }`}
                  />
                </div>
                <AnimatePresence>
                  {errors.name && (
                    <motion.label
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="label pt-1 pb-0"
                    >
                      <span className="label-text-alt text-error">{errors.name.message}</span>
                    </motion.label>
                  )}
                </AnimatePresence>
              </div>

              {/* Email Input */}
              <div className="form-control">
                <label className="label pb-1">
                  <span className="label-text font-semibold">Email</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" size={18} />
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="your@email.com"
                    className={`input input-bordered w-full pl-10 ${errors.email ? "input-error" : ""
                      }`}
                  />
                </div>
                <AnimatePresence>
                  {errors.email && (
                    <motion.label
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="label pt-1 pb-0"
                    >
                      <span className="label-text-alt text-error">{errors.email.message}</span>
                    </motion.label>
                  )}
                </AnimatePresence>
              </div>

              {/* Password Input */}
              <div className="form-control">
                <label className="label pb-1">
                  <span className="label-text font-semibold">Password</span>
                  {passwordStrength && (
                    <span
                      className={`label-text-alt font-semibold ${passwordStrength === "Strong"
                        ? "text-success"
                        : passwordStrength === "Medium"
                          ? "text-warning"
                          : "text-error"
                        }`}
                    >
                      {passwordStrength}
                    </span>
                  )}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" size={18} />
                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    className={`input input-bordered w-full pl-10 pr-10 ${errors.password ? "input-error" : ""
                      }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {password && (
                  <div className="mt-2">
                    <div className="flex gap-1">
                      <div
                        className={`h-1 flex-1 rounded-full transition-all ${password.length >= 1 ? "bg-error" : "bg-base-300"
                          }`}
                      />
                      <div
                        className={`h-1 flex-1 rounded-full transition-all ${password.length >= 6 ? "bg-warning" : "bg-base-300"
                          }`}
                      />
                      <div
                        className={`h-1 flex-1 rounded-full transition-all ${password.length >= 8 ? "bg-success" : "bg-base-300"
                          }`}
                      />
                    </div>
                  </div>
                )}
                <AnimatePresence>
                  {errors.password && (
                    <motion.label
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="label pt-1 pb-0"
                    >
                      <span className="label-text-alt text-error">{errors.password.message}</span>
                    </motion.label>
                  )}
                </AnimatePresence>
              </div>

              {/* Role Selection */}
              <div className="form-control">
                <label className="label pb-1">
                  <span className="label-text font-semibold">Account Type</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label className={`cursor-pointer`}>
                    <input
                      type="radio"
                      {...register("role")}
                      value="user"
                      className="hidden peer"
                    />
                    <div className={`card border-2 transition-all ${role === "user"
                      ? "border-primary bg-primary/10"
                      : "border-base-300 hover:border-base-content/20"
                      }`}>
                      <div className="card-body p-4 items-center text-center">
                        <UserCircle size={24} className={role === "user" ? "text-primary" : "text-base-content/60"} />
                        <span className="font-semibold text-sm">User</span>
                      </div>
                    </div>
                  </label>
                  <label className={`cursor-pointer`}>
                    <input
                      type="radio"
                      {...register("role")}
                      value="admin"
                      className="hidden peer"
                    />
                    <div className={`card border-2 transition-all ${role === "admin"
                      ? "border-primary bg-primary/10"
                      : "border-base-300 hover:border-base-content/20"
                      }`}>
                      <div className="card-body p-4 items-center text-center">
                        <Shield size={24} className={role === "admin" ? "text-primary" : "text-base-content/60"} />
                        <span className="font-semibold text-sm">Admin</span>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full mt-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight size={20} />
                  </>
                )}
              </button>

              <p className="text-xs text-center text-base-content/60 pt-1">
                By signing up, you agree to our{" "}
                <Link href="#" className="text-primary hover:underline">
                  Terms
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </form>

            <div className="divider my-3">OR</div>

            <div className="text-center">
              <p className="text-sm text-base-content/70">
                Already have an account?{" "}
                <Link href="/login" className="text-primary font-semibold hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
