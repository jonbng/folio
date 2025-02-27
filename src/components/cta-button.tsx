import type React from "react";
import { Button } from "@/components/ui/button";

interface CTAButtonProps {
  text: string;
  href: string;
  icon?: React.ReactNode;
}

export default function CTAButton({ text, href, icon }: CTAButtonProps) {
  return (
    <Button asChild size="lg" className="font-semibold" variant={"actualGhost"}>
      <a href={href} className="inline-flex items-center gap-2">
        {icon}
        <span className="animate-underline text-lg font-medium">{text}</span>
      </a>
    </Button>
  );
}
