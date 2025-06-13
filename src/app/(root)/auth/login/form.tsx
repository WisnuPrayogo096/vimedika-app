"use client";
import {
  Form,
  FormField,
  FormMessage,
  FormItem,
  FormControl,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginAction } from "@/lib/actions/auth";
import { loginSchema } from "@/validation-schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LuEye, LuEyeOff, LuLoaderCircle } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const credentials = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { isSubmitting } = credentials.formState;

  const onSubmit = async (data: LoginFormData) => {
    try {
      setErrorMessage("");

      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("password", data.password);

      const result = await loginAction(
        { success: false, message: "" },
        formData
      );

      if (result.success) {
        toast({
          title: result.message,
          description: "Redirecting to branch selection...",
          duration: 2000,
        });
        router.push("/auth/select-branch");
      } else {
        if (result.fieldErrors) {
          Object.entries(result.fieldErrors).forEach(([field, message]) => {
            credentials.setError(field as keyof LoginFormData, {
              type: "server",
              message: message as string,
            });
          });
        } else {
          setErrorMessage(result.message || "Login failed");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      const errorMsg =
        error instanceof Error ? error.message : "An unexpected error occurred";
      setErrorMessage(errorMsg);

      toast({
        title: "Login Error",
        description: errorMsg,
        variant: "destructive",
        duration: 4000,
      });
      reportError(error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Form {...credentials}>
      <form onSubmit={credentials.handleSubmit(onSubmit)}>
        <div className="my-4">
          <FormField
            control={credentials.control}
            name="username"
            render={({ field }) => (
              <FormItem className="text-white">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    disabled={isSubmitting}
                    autoComplete="username"
                    placeholder="Enter your username"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="my-4">
          <FormField
            control={credentials.control}
            name="password"
            render={({ field }) => (
              <FormItem className="text-white">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      disabled={isSubmitting}
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      aria-invalid={!!credentials.formState.errors.password}
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute top-0.5 right-0.5 bottom-0.5 rounded-r bg-transparent px-3 text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 transition-colors"
                      disabled={isSubmitting}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <LuEye className="w-5 h-5" />
                      ) : (
                        <LuEyeOff className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex w-full items-center justify-center mt-10">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full font-semibold bg-white text-primary hover:bg-white/90 hover:shadow-lg disabled:opacity-50 transition-colors"
          >
            {isSubmitting ? (
              <>
                <LuLoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                <span>Please wait...</span>
              </>
            ) : (
              <span>Sign In</span>
            )}
          </Button>
        </div>

        {errorMessage && (
          <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-md">
            <p className="text-red-500 text-sm text-center">{errorMessage}</p>
            <button
              type="button"
              onClick={() => setErrorMessage("")}
              className="mt-2 text-xs text-red-400 hover:text-red-200 underline block mx-auto"
            >
              Dismiss
            </button>
          </div>
        )}
      </form>
    </Form>
  );
}
