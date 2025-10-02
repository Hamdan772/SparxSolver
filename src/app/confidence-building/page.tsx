import AiCoach from "@/components/common/ai-coach";

export default function ConfidenceBuildingPage() {
  return (
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
         <div className="max-w-4xl mx-auto w-full">
           <AiCoach 
              topic="confidence building"
              initialMessage="Hello! I'm your AI confidence coach. What's on your mind? Let's work together to build up your self-assurance."
            />
        </div>
      </main>
  );
}
