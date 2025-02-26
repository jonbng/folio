import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          Couldn&apos;t find the page!
        </h1>
        <p className="text-xl text-zinc-600 mb-8">
          Looks like you went off the map. No worries!
        </p>
        <Button asChild>
          <Link href="/">Head back home</Link>
        </Button>
      </div>
    </div>
  );
}
