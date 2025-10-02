import AiCoach from "@/components/common/ai-coach";

export default function PublicSpeakingPage() {
  return (
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="max-w-4xl mx-auto w-full">
            <AiCoach 
                topic="public speaking"
                initialMessage="Hello! I'm your AI coach for public speaking. How can I help you prepare for your next speech or presentation today?"
            />
        </div>
      </main>
  );
}
