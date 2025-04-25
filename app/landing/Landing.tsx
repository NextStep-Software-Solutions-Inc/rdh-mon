import { Link } from "react-router";
import { Button } from "~/components/ui/button";

export default function Landing() {
  return (
    <main className="container mx-auto h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center">
        <img src="/eggspose.png" alt="Eggspose Logo" className="h-60 lg:h-80 mb-4" />
        <h3 className="text-3xl lg:text-4xl font-semibold mb-4">
          Hello egg farmer! 👋
        </h3>
        <h1 className="text-4xl lg:text-6xl font-bold mb-4 text-center ">Welcome to <span className="animated-gradient bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent tracking-wide font-black">Eggspose</span></h1>
        <p className="text-base lg:text-lg text-center">Your one-stop solution for monitoring egg encubation and detection.</p>
        <p className="text-base lg:text-lg text-center">Get started by navigating through the app.</p>
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