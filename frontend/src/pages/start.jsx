import { Link } from 'react-router-dom'

const Start = () => {
  return (
   <div className="h-screen w-full flex flex-col">

  {/* Background Image Section */}
  <div className="relative h-[75%] bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1619059558110-c45be64b73ae?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">

    {/* Uber Logo */}
    <img
      className="absolute top-8 left-6 w-20"
      src="https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoid2VhcmVcL2ZpbGVcLzhGbTh4cU5SZGZUVjUxYVh3bnEyLnN2ZyJ9:weare:F1cOF9Bps96cMy7r9Y2d7affBYsDeiDoIHfqZrbcxAw?width=1200&height=417"
      alt="Uber Logo"
    />
  </div>

  {/* Bottom White Section */}
  <div className="h-[25%] bg-white flex flex-col justify-center px-6">

    <h2 className="text-4xl font-bold text-center leading-tight">
      Get Started with Uber
    </h2>

    <Link
      to="/login"
      className="mt-8 w-full bg-black text-white text-xl font-semibold py-4 rounded-lg flex items-center justify-center hover:bg-neutral-800 transition"
    >
      Continue
    </Link>

  </div>

</div>
  )
}

export default Start