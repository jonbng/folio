"use client";

import { Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ShareButton({ imageId }: { imageId: string }) {
  return (
    <Button
      variant="outline"
      size="sm"
      className="mt-4"
      onClick={() => {
        const tweetText = encodeURIComponent(
          `Check out this amazing photo from Jonathan Bangert's gallery!`
        );
        const tweetUrl = encodeURIComponent(
          `https://yourdomain.com/p/${imageId}`
        );
        window.open(
          `https://twitter.com/intent/tweet?text=${tweetText}&url=${tweetUrl}`,
          "_blank"
        );
      }}
    >
      <Twitter className="w-4 h-4 mr-2" />
      Share on Twitter
    </Button>
  );
}