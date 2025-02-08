"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import LoadingUiBtn from "@/components/common/LoadingUiBtn";
import { createRequestMessage } from "@/actions/request/request.action";
import toast from "react-hot-toast";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset } = useForm<RequestMessage>({});

  const handleForm = async (data: RequestMessage) => {
    setIsSubmitting(true);
    try {
      const res = await createRequestMessage(data);
      if (res.success) {
        toast.success("Message sent successfully");
        reset();
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form action="" onSubmit={handleSubmit(handleForm)} className="space-y-4">
      <Input type="text" placeholder="Your Name" {...register("name")} />
      <Input
        type="email"
        placeholder="Your Email"
        {...register("email")}
        required
      />
      <Textarea
        placeholder="Your Message"
        rows={3}
        {...register("message")}
        required
      />
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? <LoadingUiBtn /> : "Send Message"}
      </Button>
    </form>
  );
}
