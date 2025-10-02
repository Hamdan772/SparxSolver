import ConversationStartersForm from "./conversation-starters-form";

export default function ConversationStartersPage() {
  return (
      <main className="flex flex-1 flex-col items-center gap-4 p-4 md:gap-8 md:p-8">
        <div className="max-w-2xl w-full">
          <div className="text-center">
            <p className="text-muted-foreground mb-6">
              Never be at a loss for words. Describe a situation and some interests, and let our AI generate conversation starters for you.
            </p>
          </div>
          <ConversationStartersForm />
        </div>
      </main>
  );
}
