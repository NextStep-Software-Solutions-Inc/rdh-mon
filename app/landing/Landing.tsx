import { Link } from "react-router";
import { Button } from "~/components/ui/button";

export default function Landing() {
  return (
    <main className="container mx-auto h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center">
        <h3 className="text-4xl font-semibold mb-4">
          Hello Farmer! 👋
        </h3>
        <h1 className="text-6xl font-bold mb-4">Welcome to Egg Moon</h1>
        <p className="text-lg">Your one-stop solution for monitoring egg encubation.</p>
        <p className="text-lg">Get started by navigating through the app.</p>
      </div>
      <div className="mt-8">
        <Link to={"/dashboard"}>
          <Button>
            Let's Go!
          </Button>
        </Link>
      </div>
    </main>
  );
}