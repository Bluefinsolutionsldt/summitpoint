"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  CheckCircle2,
  User,
  AtSign,
  Building,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

// Define the form schema
const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  gender: z.enum(["male", "female"], {
    required_error: "Please select your gender.",
  }),
  age: z.enum(["below18", "18-35", "35-45", "46-60", "above60"], {
    required_error: "Please select your age range.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  organization: z.string().min(2, {
    message: "Organization must be at least 2 characters.",
  }),
  industry: z.enum(
    [
      "telecom",
      "banking",
      "incubator",
      "insurance",
      "health",
      "agriculture",
      "academia",
      "cso",
      "government",
    ],
    {
      required_error: "Please select your industry.",
    }
  ),
  marketingConsent: z.boolean(),
  privacyPolicy: z.boolean().refine((val) => val === true, {
    message: "You must agree to the privacy policy.",
  }),
});

// Extract the type from the schema
type FormValues = z.infer<typeof formSchema>;

export function RegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const { toast } = useToast();

  // Initialize the form with proper type
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      organization: "",
      marketingConsent: false,
      privacyPolicy: false,
    },
  });

  // Handle form submission
  const onSubmit = (data: FormValues) => {
    setIsSubmitting(true);

    // Short timeout to show the loading state for better UX
    setTimeout(() => {
      // Extract first name from full name
      const firstName = data.fullName.split(" ")[0];

      toast({
        title: "Registration Successful",
        description: "You have been registered for the event successfully!",
        variant: "default",
      });

      setSubmitSuccess(true);

      // Redirect to success page with name as query parameter
      window.location.href = `/register/success?name=${encodeURIComponent(
        firstName
      )}`;

      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <Card className="w-full mx-auto overflow-hidden border border-gray-100">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4">
        <CardTitle className="text-xl md:text-2xl font-bold text-center">
          REGISTRATION FORM
        </CardTitle>
      </CardHeader>
      <CardContent className="p-5 sm:p-6 relative">
        {isSubmitting && (
          <div className="absolute inset-0 bg-white/80 z-10 flex items-center justify-center">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin mx-auto mb-3 text-blue-600" />
              <p className="text-gray-700 font-medium">
                Submitting your registration...
              </p>
            </div>
          </div>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Personal Information Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 pb-1 mb-2">
                <User className="h-4 w-4 text-blue-600" />
                <h3 className="text-base font-semibold text-gray-800">
                  Personal Information
                </h3>
              </div>

              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Full name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John Doe"
                        {...field}
                        className="h-10 rounded-md border-gray-200 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Gender
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex space-x-6"
                        >
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <RadioGroupItem
                                value="male"
                                className="text-blue-600 border-2"
                              />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer text-gray-600">
                              Male
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <RadioGroupItem
                                value="female"
                                className="text-blue-600 border-2"
                              />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer text-gray-600">
                              Female
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Age
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-10 rounded-md border-gray-200 focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                            <SelectValue placeholder="Select your age range" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-56">
                          <SelectItem value="below18">Below 18</SelectItem>
                          <SelectItem value="18-35">18-35</SelectItem>
                          <SelectItem value="35-45">35-45</SelectItem>
                          <SelectItem value="46-60">46-60</SelectItem>
                          <SelectItem value="above60">Above 60</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center gap-2 pb-1 mb-2">
                <AtSign className="h-4 w-4 text-blue-600" />
                <h3 className="text-base font-semibold text-gray-800">
                  Contact Information
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="your.email@example.com"
                          {...field}
                          className="h-10 rounded-md border-gray-200 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Phone
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="+255 123 456 789"
                          {...field}
                          className="h-10 rounded-md border-gray-200 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Organization Information Section */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center gap-2 pb-1 mb-2">
                <Building className="h-4 w-4 text-blue-600" />
                <h3 className="text-base font-semibold text-gray-800">
                  Organization Information
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="organization"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Organization
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your company or organization"
                          {...field}
                          className="h-10 rounded-md border-gray-200 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Industry
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-10 rounded-md border-gray-200 focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                            <SelectValue placeholder="Select your industry" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-56 rounded-md">
                          <SelectItem value="telecom">Telecom</SelectItem>
                          <SelectItem value="banking">
                            Banking & Financial services
                          </SelectItem>

                          <SelectItem value="incubator">Incubator</SelectItem>
                          <SelectItem value="insurance">Insurance</SelectItem>
                          <SelectItem value="health">Health</SelectItem>
                          <SelectItem value="agriculture">
                            Agriculture
                          </SelectItem>
                          <SelectItem value="academia">Academia</SelectItem>
                          <SelectItem value="cso">CSO/NGO</SelectItem>
                          <SelectItem value="government">Government</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Consent Section */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center gap-2 pb-1 mb-2">
                <CheckCircle2 className="h-4 w-4 text-blue-600" />
                <h3 className="text-base font-semibold text-gray-800">
                  Agreements
                </h3>
              </div>

              <div className="space-y-3">
                <FormField
                  control={form.control}
                  name="marketingConsent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border border-gray-200 p-3">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="mt-0.5 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-normal text-gray-700">
                          I agree and provide consent for my pictures and videos
                          to be used on this platform
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="privacyPolicy"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border border-gray-200 p-3">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="mt-0.5 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-normal text-gray-700">
                          I agree to the{" "}
                          <a href="#" className="text-blue-600 hover:underline">
                            Privacy Policy
                          </a>{" "}
                          of the Summit Point platform
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="mt-6">
              <Button
                type="submit"
                className={`w-full h-11 mt-4 text-base font-semibold transition-colors rounded-lg flex items-center justify-center gap-2 ${
                  submitSuccess
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Processing...
                  </>
                ) : submitSuccess ? (
                  <>
                    Registration Complete
                    <CheckCircle2 className="w-4 h-4 ml-2" />
                  </>
                ) : (
                  <>
                    Complete Registration
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
