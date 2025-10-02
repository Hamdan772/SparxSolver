import AiCoach from "@/components/common/ai-coach";

export default function FriendshipAdvicePage() {
  return (
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="max-w-4xl mx-auto w-full">
            <AiCoach 
                topic="friendship advice"
                initialMessage="Hello! I'm your AI coach for friendship. Whether you want to make new friends or strengthen existing bonds, I'm here to help. What's on your mind?"
            />
        </div>
      </main>
  );
}
