import HomeContent from "@/components/home-content";
import { getCurrentAge } from "@/lib/site";

export default async function Home() {
  const age = await getCurrentAge();

  return <HomeContent age={age} />;
}
