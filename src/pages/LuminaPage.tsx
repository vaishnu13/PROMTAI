import OptimizerPage from "./OptimizerPage";

export default function LuminaPage() {
  return (
    <main className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center font-sans selection:bg-white/20 selection:text-white">
      {/* Background Video */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-[0]"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260429_114316_1c7889ad-2885-410e-b493-98119fee0ddb.mp4"
      />

      {/* Content Wrapper */}
      <div className="relative z-10 w-full max-w-7xl px-4 md:px-8 pt-20 md:pt-28 flex flex-col items-center justify-start h-full">
        
        {/* AI Prompt Optimizer Container */}
        <div className="w-full">
          <OptimizerPage />
        </div>
      </div>
    </main>
  );
}
