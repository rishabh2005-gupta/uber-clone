import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen w-full overflow-hidden bg-neutral-950 text-white">
      <div className="relative flex min-h-screen flex-col">
        <div className="relative h-[72vh] overflow-hidden bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1619059558110-c45be64b73ae?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
          <div className="absolute inset-0  from-black/20 via-black/30 to-black/70" />

          <img
            className="absolute left-6 top-8 w-60"
            src="https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoid2VhcmVcL2ZpbGVcLzhGbTh4cU5SZGZUVjUxYVh3bnEyLnN2ZyJ9:weare:F1cOF9Bps96cMy7r9Y2d7affBYsDeiDoIHfqZrbcxAw?width=1200&height=417"
            alt="Uber Logo"
          />

          <div className="absolute bottom-8 left-6 right-6 rounded-[1.75rem] border border-white/20 bg-white/10 p-6 backdrop-blur-md">
            <p className="mb-2 text-sm uppercase tracking-[0.3em] text-white/70">
              Ride with ease
            </p>
            <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
              Get Started with Uber
            </h2>
          </div>
        </div>

        <div className="flex flex-col justify-center bg-white px-6 py-8 text-black">
          <p className="text-center text-9xl text-neutral-500">
            Fast, reliable rides wherever you need them.
          </p>

          <Link
  to="/captainLogin"
  className="mt-6 flex w-full items-center justify-center rounded-xl bg-black px-6 py-7 text-5xl font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-neutral-800"
>
  Continue
</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
