"use client";

import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { generateConversationStarters } from "@/ai/flows/generate-conversation-starters";
import { useGoals } from "@/context/goals-context";
import { useProgress } from "@/context/progress-context";

export default function ConversationStartersForm() {
  const [situation, setSituation] = useState("");
  const [interests, setInterests] = useState("");
  const [starters, setStarters] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { achieveGoal } = useGoals();
  const { logActivity } = useProgress();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setStarters([]);

    try {
      const result = await generateConversationStarters({ situation, interests });
      setStarters(result.conversationStarters);
      achieveGoal('ice-breaker');
      logActivity('conversation-starter');
    } catch (err) {
      setError("Sorry, we couldn't generate conversation starters at this time. Please try again later.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Generate Icebreakers</CardTitle>
          <CardDescription>Get AI-powered ideas for any situation.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="situation">Social Situation</Label>
              <Input
                id="situation"
                value={situation}
                onChange={(e) => setSituation(e.target.value)}
                placeholder="e.g., a party, a first date"
                required
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="interests">Interests</Label>
              <Input
                id="interests"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                placeholder="e.g., movies, technology, sports"
                required
              />
            </div>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Ideas
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {error && <p className="text-destructive text-center">{error}</p>}

      {starters.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Here are some ideas:</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {starters.map((starter, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 p-3 bg-card rounded-md border animate-in fade-in-50"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                    <Sparkles className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
                    <span>{starter}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
