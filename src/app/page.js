import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-10">
      <h1 className="text-4xl font-extrabold text-center">Welcome</h1>

      <p className="text-lg text-center max-w-md">
        Step inside and explore amazing profiles. You won’t regret clicking
        below!
      </p>
      <Button>
        <Link href="/users">Go to Users Page</Link>
      </Button>
    </div>
  );
}
