"use client";

import { Button } from "@/components/ui/button";
import XIcon from "./XIcon";

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
          `https://jonathanb.dk/p/${imageId}`
        );
        window.open(
          `https://twitter.com/intent/tweet?text=${tweetText}&url=${tweetUrl}`,
          "_blank"
        );
      }}
    >
      <XIcon className="w-4 h-4 mr-2" />
      Share on X
    </Button>
  );
}
